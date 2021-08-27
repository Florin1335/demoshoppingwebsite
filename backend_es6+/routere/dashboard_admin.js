import express from 'express';
import utilizatori from '../mongodbSchemas/utilizatori.js';
import placiVideo from '../mongodbSchemas/placaVideo.js';
import procesoare from '../mongodbSchemas/procesor.js';
import placiDeBaza from '../mongodbSchemas/placaDeBaza.js';
import memoriiRam from '../mongodbSchemas/memorieRam.js';
import ssd from '../mongodbSchemas/ssd.js';
import hdd from '../mongodbSchemas/hdd.js';
import surse from '../mongodbSchemas/sursa.js';
import carcase from '../mongodbSchemas/carcasa.js';
import coolere from '../mongodbSchemas/cooler.js';
import ventilatoare from '../mongodbSchemas/ventilator.js';
import fileUpload from 'express-fileupload';
import path from 'path';
import mimetypes from 'mime-types';
import stocuri from '../mongodbSchemas/stocuri.js';
import mongoose from 'mongoose';
import cos from '../mongodbSchemas/cos.js';
import comenzi from '../mongodbSchemas/comenzi.js';

const colectii = [placiVideo, procesoare, placiDeBaza, memoriiRam, ssd, hdd, surse, carcase, coolere, ventilatoare];
const categorii = {
    'placivideo': placiVideo,
    'procesoare': procesoare,
    'placidebaza': placiDeBaza,
    'memoriiram': memoriiRam,
    'ssd': ssd,
    'hdd': hdd,
    'surse': surse,
    'carcase': carcase,
    'coolere': coolere,
    'ventilatoare': ventilatoare
}
var dashboard_admin = express.Router();
dashboard_admin.use(fileUpload());

const protectie_admin = async (req, res, next) =>{
    if (req.session.isAuth === true){
        let email = req.session.email;
        const exista = await utilizatori.findOne({email});
        if (exista){
            if (exista.isAdmin === true){
                next();
            }else
                res.status(403).send('status-accesul-interzis');
        }else{
            res.status(404).send('status-userul-nu-exista');
        }
    }
    else
        res.status(401).send('status-user-nelogat');
}
dashboard_admin.use(protectie_admin);

dashboard_admin.get('/categorii', (req ,res) => {
    let categorii_res = [];
    for (let i in categorii)
        categorii_res.push(i);
    res.send(categorii_res);
});

dashboard_admin.post('/proprietati', (req, res) => {
    let proprietati = [];
    if (categorii[req.body.value]){
        for (let i in categorii[req.body.value].schema.paths)
            proprietati.push(i);
        res.send(proprietati);
    }else
        res.status(400).send('status-categoria-nu-exista');
    
});
dashboard_admin.post('/upload', (req, res) => {
    const mutaImagini = (img, cale) => {
        return new Promise((resolve, reject) => {
            img.mv(cale, (err, result) => {
                if (err)
                    return reject(err);
                resolve(result);
            });
        });
    }
    let proprietati = JSON.parse(req.body.proprietati);
    let stoc = JSON.parse(req.body.stoc);
    let obj_insert = new categorii[proprietati.categorie](proprietati);
    obj_insert.validate((err) => {
        if (err)
            res.send(err.message);
        else{
            let stoc_insert = new stocuri();
            stoc_insert['id_produs'] = obj_insert._id.toString();
            stoc_insert['stoc'] = stoc;
            stoc_insert.validate(async (err_stoc) => {
                if (err_stoc){
                    res.send(err_stoc.message);
                }else{
                    if (req.files){
                        let nr = 0;
                        let id = obj_insert._id.toString();
                        for (let i in req.files){
                            let cale;
                            if (i === 'thumbnail')
                                cale = path.join(__dirname, '../../frontend/imagini/', proprietati.categorie + '/', id + '.' + mimetypes.extension(req.files[i].mimetype));
                            else
                                cale = path.join(__dirname, '../../frontend/imagini/', proprietati.categorie + '/', id + '-galerie' + nr + '.' + mimetypes.extension(req.files[i].mimetype));
                            try{
                                const result = await mutaImagini(req.files[i], cale);
                                if (i === 'thumbnail')
                                    obj_insert.imagine = './imagini/' + proprietati.categorie + '/' + id + '.' + mimetypes.extension(req.files[i].mimetype);
                                else
                                    obj_insert.galerie.push('./imagini/' + proprietati.categorie + '/' + id + '-galerie' + nr + '.' + mimetypes.extension(req.files[i].mimetype));
                                nr++;
                            }catch(error_mv){
                                return res.send(error_mv.message);
                            }
                        }
                    }
                    await obj_insert.save(async (err) => {
                        if (err)
                            res.send(err.message);
                        else{
                            await stoc_insert.save((err) => {
                                if (err)
                                    res.send(err.message);
                                else
                                    res.send('Produsul a fost salvat cu succes!');
                            });
                        }
                    });
                }
            });
        }
    });
});

dashboard_admin.post('/detalii_stergere', async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.body.id)){
        let produs;
        for (let i=0;i<colectii.length;i++){
            produs = await colectii[i].findById(req.body.id);
            if (produs) break;
        }
        if (produs)
            res.send(produs.denumire);
        else
            res.send('Produsul nu a putut fi gasit');
    }
    else
        res.send('Id produs invalid.');
});

dashboard_admin.post('/stergere', async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.body.id)){
        let produs;
        for (let i=0;i<colectii.length;i++){
            produs = await colectii[i].findById(req.body.id);
            if (produs) break;
        }
        if (produs){
            await produs.remove(async (err) => {
                if (err)
                    res.send(err.message);
                else{
                    res.send('Produsul a fost sters cu succes!');
                    // Stergere din stoc
                    let stoc = await stocuri.findOne({id_produs: req.body.id});
                    if (stoc)
                        await stoc.remove((err) => {
                            if (err)
                                console.log(err.message);
                        });
                    // Stergere produs din toate cosurile.
                    let cosuri = await cos.find({});
                    for (let i in cosuri)
                        if (cosuri[i].produse[req.body.id]){
                            delete cosuri[i].produse[req.body.id];
                            cosuri[i].markModified('produse');
                            await cosuri[i].save((err) => {
                                if (err)
                                    console.log(err.message);
                            });
                        }
                }
            });
        }else{
            res.send('Produsul nu a fost găsit.');
        }     
    }
    else
        res.send('Id produs invalid.');
});

dashboard_admin.post('/modifica_pret', async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.body.id)){
        let produs;
        for (let i=0;i<colectii.length;i++){
            produs = await colectii[i].findById(req.body.id);
            if (produs) break;
        }
        if (produs){
            produs.pret = req.body.pret;
            produs.markModified('pret');
            await produs.save((err) => {
                if (err)
                    res.send(err.message);
                else
                    res.send('Pretul produsului a fost modificat cu succes. Noul pret: ' + req.body.pret + ' RON.');
            });
        }else
            res.send('Produsul nu a putut fi găsit.')
    }
    else
        res.send('Id-ul introdus este invalid.');
});

dashboard_admin.get('/preluare_comenzi', async (req, res) => {
    let listaComenzi = await comenzi.find({status: 0}).limit(5);
    let raspuns = [];
    if (listaComenzi){
        for (let i of listaComenzi){
            let obj = {
                id: i._id,
                data: i.data
            };
            raspuns.push(obj);
        }
    }
    res.send(raspuns);
});

dashboard_admin.post('/preluare_comanda', async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.body.id)){
        let comanda = await comenzi.findById(req.body.id);
        if (comanda){
            if (comanda.status === 0){
                comanda.id_operator = req.session.userID;
                comanda.status = 1;
                comanda.istoric = comanda.istoric + '<br>' + Date() + ' - Comanda a fost preluată de un operator și urmează să fie pregătită.';
                comanda.markModified('id_operator');
                comanda.markModified('status');
                comanda.markModified('istoric');
                await comanda.save((err) => {
                    if (err)
                        res.send('Eroare: ' + err.message);
                    else
                        res.send('Comanda a fost preluată cu succes.');
                });
            }
            else{
                res.send('Comanda a fost deja preluată de altcineva.')
            }
        }else
            res.send('Comanda nu a putut fi gasită.')
    }else
        res.send('Id-ul comenzi este invalid.')
});

dashboard_admin.get('/comenzi_preluate', async (req, res) => {
    let listaComenzi = await comenzi.find({status: 1, id_operator: req.session.userID});
    let raspuns = [];
    for (let i of listaComenzi){
        let obj = {
            id: i._id,
            data: i.data,
            nume: i.nume,
            prenume: i.prenume,
            telefon: i.telefon,
            judet: i.judet,
            oras: i.oras,
            adresa: i.adresa,
            cos: i.cos
        };
        raspuns.push(obj);
    }
    res.send(raspuns);
});

dashboard_admin.post('/finalizare_comanda', async (req, res) => {
    let id_comanda = req.body.id;
    let comanda = await comenzi.findById(id_comanda);
    if (comanda){
        if (comanda.status === 2){
            res.send('Comanda a fost deja finalizată.');
        }
        else{
            comanda.status = 2;
            comanda.istoric = comanda.istoric + '<br>' + Date() + ' - Comanda a fost finalizată și urmează să fie trimisă.';
            comanda.markModified('status');
            comanda.markModified('istoric');
            await comanda.save((err) => {
                if (err)
                    res.send('Eroare: ' + err.message);
                else
                    res.send('Comanda a fost finalizată cu succes!');
            });
        }
    }else
        res.send('Eroare, comanda nu există.')
});

export default dashboard_admin;

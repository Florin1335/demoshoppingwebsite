import express from 'express';
import expressAsyncHandler from 'express-async-handler';
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
import mongoose from 'mongoose';
import stocuri from '../mongodbSchemas/stocuri.js';
const colectii = [placiVideo, procesoare, placiDeBaza, memoriiRam, ssd, hdd, surse, carcase, coolere, ventilatoare];
const categorie = express.Router();

// Pentru o categorie de componente trebuie sa cerem bazei de date toate produsele
//din acea categorie (colectie).
categorie.get('/placiVideo', async (req, res) => {
    var raspuns = await placiVideo.find({});   
    for (let i in raspuns){
        raspuns[i] = raspuns[i].toObject();
        let stoc;
        let id = raspuns[i]._id;
        let produs = await stocuri.findOne({id_produs: id});
        if (produs){
            if (produs.stoc > 0)
                stoc = 'În stoc';
            else
                stoc = 'Nu este în stoc';
        }else
            stoc = 'Stoc necunoscut';
        raspuns[i].stoc = stoc;
    }
    res.send(raspuns);
});
categorie.get('/procesoare', expressAsyncHandler(async (req, res) => {
    var raspuns = await procesoare.find({});   
    for (let i in raspuns){
        raspuns[i] = raspuns[i].toObject();
        let stoc;
        let id = raspuns[i]._id;
        let produs = await stocuri.findOne({id_produs: id});
        if (produs){
            if (produs.stoc > 0)
                stoc = 'În stoc';
            else
                stoc = 'Nu este în stoc';
        }else
            stoc = 'Stoc necunoscut';
        raspuns[i].stoc = stoc;
    }
    res.send(raspuns);
}));
categorie.get('/placiDeBaza', async (req, res) => {
    var raspuns = await placiDeBaza.find({});   
    for (let i in raspuns){
        raspuns[i] = raspuns[i].toObject();
        let stoc;
        let id = raspuns[i]._id;
        let produs = await stocuri.findOne({id_produs: id});
        if (produs){
            if (produs.stoc > 0)
                stoc = 'În stoc';
            else
                stoc = 'Nu este în stoc';
        }else
            stoc = 'Stoc necunoscut';
        raspuns[i].stoc = stoc;
    }
    res.send(raspuns);
});
categorie.get('/memoriiRam', async (req, res) => {
    var raspuns = await memoriiRam.find({});   
    for (let i in raspuns){
        raspuns[i] = raspuns[i].toObject();
        let stoc;
        let id = raspuns[i]._id;
        let produs = await stocuri.findOne({id_produs: id});
        if (produs){
            if (produs.stoc > 0)
                stoc = 'În stoc';
            else
                stoc = 'Nu este în stoc';
        }else
            stoc = 'Stoc necunoscut';
        raspuns[i].stoc = stoc;
    }
    res.send(raspuns);
});
categorie.get('/ssd', async (req, res) => {
    var raspuns = await ssd.find({});   
    for (let i in raspuns){
        raspuns[i] = raspuns[i].toObject();
        let stoc;
        let id = raspuns[i]._id;
        let produs = await stocuri.findOne({id_produs: id});
        if (produs){
            if (produs.stoc > 0)
                stoc = 'În stoc';
            else
                stoc = 'Nu este în stoc';
        }else
            stoc = 'Stoc necunoscut';
        raspuns[i].stoc = stoc;
    }
    res.send(raspuns);
});
categorie.get('/hdd', async (req, res) => {
    var raspuns = await hdd.find({});   
    for (let i in raspuns){
        raspuns[i] = raspuns[i].toObject();
        let stoc;
        let id = raspuns[i]._id;
        let produs = await stocuri.findOne({id_produs: id});
        if (produs){
            if (produs.stoc > 0)
                stoc = 'În stoc';
            else
                stoc = 'Nu este în stoc';
        }else
            stoc = 'Stoc necunoscut';
        raspuns[i].stoc = stoc;
    }
    res.send(raspuns);
});
categorie.get('/surse', async (req, res) => {
    var raspuns = await surse.find({});   
    for (let i in raspuns){
        raspuns[i] = raspuns[i].toObject();
        let stoc;
        let id = raspuns[i]._id;
        let produs = await stocuri.findOne({id_produs: id});
        if (produs){
            if (produs.stoc > 0)
                stoc = 'În stoc';
            else
                stoc = 'Nu este în stoc';
        }else
            stoc = 'Stoc necunoscut';
        raspuns[i].stoc = stoc;
    }
    res.send(raspuns);
});
categorie.get('/carcase', async (req, res) => {
    var raspuns = await carcase.find({});   
    for (let i in raspuns){
        raspuns[i] = raspuns[i].toObject();
        let stoc;
        let id = raspuns[i]._id;
        let produs = await stocuri.findOne({id_produs: id});
        if (produs){
            if (produs.stoc > 0)
                stoc = 'În stoc';
            else
                stoc = 'Nu este în stoc';
        }else
            stoc = 'Stoc necunoscut';
        raspuns[i].stoc = stoc;
    }
    res.send(raspuns);
});
categorie.get('/coolere', async (req, res) => {
    var raspuns = await coolere.find({});   
    for (let i in raspuns){
        raspuns[i] = raspuns[i].toObject();
        let stoc;
        let id = raspuns[i]._id;
        let produs = await stocuri.findOne({id_produs: id});
        if (produs){
            if (produs.stoc > 0)
                stoc = 'În stoc';
            else
                stoc = 'Nu este în stoc';
        }else
            stoc = 'Stoc necunoscut';
        raspuns[i].stoc = stoc;
    }
    res.send(raspuns);
});
categorie.get('/ventilatoare', async (req, res) => {
    var raspuns = await ventilatoare.find({});   
    for (let i in raspuns){
        raspuns[i] = raspuns[i].toObject();
        let stoc;
        let id = raspuns[i]._id;
        let produs = await stocuri.findOne({id_produs: id});
        if (produs){
            if (produs.stoc > 0)
                stoc = 'În stoc';
            else
                stoc = 'Nu este în stoc';
        }else
            stoc = 'Stoc necunoscut';
        raspuns[i].stoc = stoc;
    }
    res.send(raspuns);
});
categorie.get('/:id', expressAsyncHandler(async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)){
        var produs;
        for (let i=0;i<colectii.length;i++){
            produs = await colectii[i].findById(req.params.id);
            if (produs) break;
        }
        if (produs){
            produs = produs.toObject();
            let stoc;
            let id = produs._id;
            let status_stoc = await stocuri.findOne({id_produs: id});
            if (status_stoc){
                if (status_stoc.stoc > 0)
                    stoc = 'În stoc';
                else
                    stoc = 'Nu este în stoc';
            }else
                stoc = 'Stoc necunoscut';
            produs.stoc = stoc;
            res.json(produs);
        }
        else res.json('status-404');
    }
    else
        res.json('status-404');
}));

export default categorie;
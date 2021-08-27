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
import minisearch from 'minisearch';
import stocuri from '../mongodbSchemas/stocuri.js';

const cautare = express.Router();
const arrayCategorii = [placiVideo, procesoare, placiDeBaza, memoriiRam, ssd, hdd, surse, carcase, coolere, ventilatoare];

cautare.get('/:query', expressAsyncHandler(async (req, res) => {
    let query = (req.params.query).replaceAll('+', ' ');
    let totalPotriviri = [];
    for (let i=0;i<arrayCategorii.length;i++){
        let rezultate = await arrayCategorii[i].find({});
        let proprietati = [];
        for (let j=0;j<rezultate.length;j++){
            for (let k in rezultate[j])
                if (proprietati.indexOf(k) === -1)
                    proprietati.push(k);
        }
        let mini_search = new minisearch({
            fields: ['denumire'],
            storeFields: proprietati
        });
        mini_search.addAll(rezultate);
        let gasit = mini_search.search(query, {fuzzy: 0.2});
        totalPotriviri = totalPotriviri.concat(gasit);
    }
    for (let i in totalPotriviri){
        totalPotriviri[i] = totalPotriviri[i].toObject();
        let stoc;
        let id = totalPotriviri[i]._id;
        let status_stoc = await stocuri.findOne({id_produs: id});
        if (status_stoc){
            if (status_stoc.stoc > 0)
                stoc = 'În stoc';
            else
                stoc = 'Nu este în stoc';
        }else
            stoc = 'Stoc necunoscut';
        totalPotriviri[i].stoc = stoc;
    }
    res.json(totalPotriviri);
}));


export default cautare;
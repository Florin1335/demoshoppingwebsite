import mongoose from 'mongoose';

const procesorSchema = new mongoose.Schema({
    denumire: {type: String, required: true},
    producator: {type: String},
    cod_producator: {type: String, unique: true},
    categorie: {type: String, required: true},
    imagine: {type: String},
    garantie: {type: String},
    galerie: [{type: String}],
    serie: {type: String},
    socket: {type: String, required: true},
    nucleu: {type: String},
    numar_nuclee: {type: Number},
    numar_threaduri: {type: Number},
    frecventa: {type: String},
    frecventa_turbo:  {type: String},
    cache1: {type: String},
    cache2: {type: String},
    cache3: {type: String},
    tehnologie: {type: String},
    tdp: {type: String},
    cooler_stock: {type: String},
    //suport memorie
    tip_memorie: {type: String},
    memorie_maxima: {type: String},
    frecventa: {type: String},
    channel: {type: String},
    pret: {type: Number, required: true}
}, {strict: false});
const procesoare = mongoose.model('procesoare', procesorSchema, 'procesoare');
export default procesoare;
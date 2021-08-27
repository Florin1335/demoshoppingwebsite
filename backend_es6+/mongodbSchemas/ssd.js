import mongoose from 'mongoose';

const ssdSchema = new mongoose.Schema({
    denumire: {type: String, required: true},
    cod_producator: {type: String, unique: true},
    categorie: {type: String, required: true},
    producator: {type: String},
    imagine: {type: String},
    garantie: {type: String},
    galerie: [{type: String}],
    pret: {type: Number, required: true},
    seria: {type: String},
    form_factor: {type: String},
    interfata: {type: String},
    capacitate: {type: String},
    arhitectura: {type: String},
    controller: {type: String},
    citire_maxima: {type: String},
    scriere_maxima: {type: String},
    tbw: {type: String}
}, {strict: false});

const ssd = mongoose.model('ssd', ssdSchema, 'ssd');
export default ssd;
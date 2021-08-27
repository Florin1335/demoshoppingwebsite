import mongoose from 'mongoose';

const sursaSchema = new mongoose.Schema({
    denumire: {type: String, required: true},
    cod_producator: {type: String, unique: true},
    categorie: {type: String, required: true},
    producator: {type: String},
    imagine: {type: String},
    garantie: {type: String},
    pret: {type: Number, required: true},
    galerie: [{type: String}],
    tip: {type: String},
    putere: {type: String},
    numar_ventilatoare: {type: String},
    voltaj: {type: String},
    eficienta: {type: String},
    certificare: {type: String},
    dimensiuni: {type: String},
    modulara: {type: String},
    protectii: {type: String},
    platforma_oem: {type: String},
}, {strict: false});

const surse = mongoose.model('surse', sursaSchema, 'surse');
export default surse;
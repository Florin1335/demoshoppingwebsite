import mongoose from 'mongoose';

const ventilatorSchema = new mongoose.Schema({
    denumire: {type: String, required: true},
    cod_producator: {type: String, unique: true},
    categorie: {type: String, required: true},
    producator: {type: String},
    imagine: {type: String},
    garantie: {type: String},
    galerie: [{type: String}],
    pret: {type: Number, required: true},
    dimensiune: {type: String},
    viteza_de_rotatie: {type: String},
    flux_aer: {type: String},
    conector: {type: String},
    voltaj: {type: String}
}, {strict: false});

const ventilatoare = mongoose.model('ventilatoare', ventilatorSchema, 'ventilatoare');
export default ventilatoare;
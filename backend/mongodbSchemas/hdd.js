import mongoose from 'mongoose';

const hddSchema = new mongoose.Schema({
    denumire: {type: String, required: true},
    cod_producator: {type: String, unique: true},
    categorie: {type: String, required: true},
    producator: {type: String},
    imagine: {type: String},
    garantie: {type: String},
    galerie: [{type: String}],
    pret: {type: Number, required: true},
    seria: {type: String},
    interfata: {type: String},
    capacitate: {type: String},
    buffer: {type: String},
    viteza: {type: String},
    form_factor: {type: String}
}, {strict: false});

const hdd = mongoose.model('hdd', hddSchema, 'hdd');
export default hdd;
import mongoose from 'mongoose';

const memorieRamSchema = new mongoose.Schema({
    denumire: {type: String, required: true},
    cod_producator: {type: String, unique: true},
    categorie: {type: String, required: true},
    producator: {type: String},
    imagine: {type: String},
    garantie: {type: String},
    galerie: [{type: String}],
    pret: {type: Number, required: true},
    tip: {type: String},
    capacitate: {type: String},
    frecventa: {type: String},
    latenta_cas: {type: String},
    tensiune_alimentare: {type: String},
    timing: {type: String}
}, {strict: false});

const memoriiRam = mongoose.model('memoriiRam', memorieRamSchema, 'memoriiRam');
export default memoriiRam;
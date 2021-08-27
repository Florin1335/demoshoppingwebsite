import mongoose from 'mongoose';

const coolerSchema = new mongoose.Schema({
    denumire: {type: String, required: true},
    cod_producator: {type: String, unique: true},
    producator: {type: String},
    categorie: {type: String, required: true},
    imagine: {type: String},
    garantie: {type: String},
    galerie: [{type: String}],
    pret: {type: Number, required: true},
    tip_racire: {type: String},
    numar_heatpipe: {type: String},
    inaltime: {type: String, required: true},
    numar_ventilatoare: {type: String},
    rpm_ventilator: {type: String},
    flux_aer: {type: String},
    greutate: {type: String},
    dimensiuni: {type: String},
    compatibilitate_socket: {type: String}
}, {strict: false});

const coolere = mongoose.model('coolere', coolerSchema, 'coolere');
export default coolere;
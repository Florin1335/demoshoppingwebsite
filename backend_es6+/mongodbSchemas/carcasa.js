import mongoose from 'mongoose';

const carcasaSchema = new mongoose.Schema({
    denumire: {type: String, required: true},
    cod_producator: {type: String, unique: true},
    producator: {type: String},
    categorie: {type: String, required: true},
    imagine: {type: String},
    garantie: {type: String},
    galerie: [{type: String}],
    pret: {type: Number, required: true},
    compatibilitate_placa_de_baza: {type: String},
    tip_carcasa: {type: String},
    pozitionare_sursa: {type: String},
    culoare: {type: String},
    sursa: {type: String},
    dimensiuni: {type: String},
    greutate: {type: String},
    panou_lateral_transparent: {type: String},
    inaltime_cooler_cpu: {type: String},
    lungime_placa_video: {type: String},
    iluminare: {type: String},
    ventilatoare_incluse: {type: String},
    numar_maxim_ventilatoare: {type: String}
}, {strict: false});

const carcase = mongoose.model('carcase', carcasaSchema, 'carcase');
export default carcase;
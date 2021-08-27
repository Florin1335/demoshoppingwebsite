import mongoose from 'mongoose';

const placaVideoSchema = new mongoose.Schema({
    // denumire
    denumire: {type: String, required: true},
    producator: {type: String, required: true},
    cod_producator: {type: String, unique: true},
    categorie: {type: String, required: true},
    imagine: {type: String},
    galerie: [{type: String}],
    garantie: {type: String},
    // compatibilitate
    interfata: {type: String, required: true},
    rezolutie_maxima: {type: String},
    // informatii tehnice
    // chipset
    producator_chipset: {type: String},
    seria: {type: String},
    tehnologie: {type: String},
    procesor_grafic: {type: String},
    gpu_clock: {type: String},
    gpu_boost_clock: {type: String},
    cuda_cores: {type: Number},
    // memorie
    tip_memorie: {type: String},
    dimensiune_memorie: {type: String},
    bus_memorie: {type: String},
    frecventa_memorie: {type: String},
    // porturi
    vga: {type: Number},
    dvi: {type: Number},
    hdmi: {type: Number},
    display_port: {type: Number},
    // dimensiuni si alimentare
    dimensiuni: {type: String},
    alimentare_separata: {type: String},
    pret: {type: Number, required: true}
}, {strict: false});
const placiVideo = mongoose.model('placiVideo',placaVideoSchema,'placiVideo');
export default placiVideo;
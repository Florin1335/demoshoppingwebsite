import mongoose from 'mongoose';

const comandaSchema = new mongoose.Schema({
    id_utilizator: {type: String, required: true},
    data: {type: Number, required: true},
    nume: {type: String, required: true},
    prenume: {type: String, required: true},
    telefon: {type: String, required: true},
    judet: {type: String, required: true},
    oras: {type: String, required: true},
    adresa: {type: String, required: true},
    cos: {type: Object, required: true},
    istoric: {type: String},
    status: {type: Number, default: 0},
    id_operator: {type: String}
});

const comenzi = mongoose.model('comenzi', comandaSchema, 'comenzi');
export default comenzi;
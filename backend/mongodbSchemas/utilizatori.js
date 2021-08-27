import mongoose from 'mongoose';

const utilizatorSchema = new mongoose.Schema({
    nume: {type: String, required: true},
    prenume: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    parola: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    adresa: {type: Object},
    activat: {type: Boolean, default: false},
    cod_activare: {type: String, unique: true}
});

const utilizatori = mongoose.model('utilizatori', utilizatorSchema, 'utilizatori');

export default utilizatori;
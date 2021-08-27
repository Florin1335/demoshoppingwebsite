import mongoose from 'mongoose';

const cosSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    cart: {type: Object},
});

const cos = mongoose.model('cos', cosSchema, 'cos');
export default cos;
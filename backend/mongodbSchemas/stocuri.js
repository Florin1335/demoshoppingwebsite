import mongoose from 'mongoose';

const stocuriSchema = new mongoose.Schema({
    id_produs: {type: String, required: true, unique: true},
    stoc: {type: Number, required: true}
});

const stocuri = mongoose.model('stocuri', stocuriSchema, 'stocuri');
export default stocuri;
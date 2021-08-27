"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const hddSchema = new _mongoose.default.Schema({
  denumire: {
    type: String,
    required: true
  },
  cod_producator: {
    type: String,
    unique: true
  },
  categorie: {
    type: String,
    required: true
  },
  producator: {
    type: String
  },
  imagine: {
    type: String
  },
  garantie: {
    type: String
  },
  galerie: [{
    type: String
  }],
  pret: {
    type: Number,
    required: true
  },
  seria: {
    type: String
  },
  interfata: {
    type: String
  },
  capacitate: {
    type: String
  },
  buffer: {
    type: String
  },
  viteza: {
    type: String
  },
  form_factor: {
    type: String
  }
}, {
  strict: false
});

const hdd = _mongoose.default.model('hdd', hddSchema, 'hdd');

var _default = hdd;
exports.default = _default;
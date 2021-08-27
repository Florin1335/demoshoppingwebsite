"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ssdSchema = new _mongoose.default.Schema({
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
  form_factor: {
    type: String
  },
  interfata: {
    type: String
  },
  capacitate: {
    type: String
  },
  arhitectura: {
    type: String
  },
  controller: {
    type: String
  },
  citire_maxima: {
    type: String
  },
  scriere_maxima: {
    type: String
  },
  tbw: {
    type: String
  }
}, {
  strict: false
});

const ssd = _mongoose.default.model('ssd', ssdSchema, 'ssd');

var _default = ssd;
exports.default = _default;
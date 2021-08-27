"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const procesorSchema = new _mongoose.default.Schema({
  denumire: {
    type: String,
    required: true
  },
  producator: {
    type: String
  },
  cod_producator: {
    type: String,
    unique: true
  },
  categorie: {
    type: String,
    required: true
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
  serie: {
    type: String
  },
  socket: {
    type: String,
    required: true
  },
  nucleu: {
    type: String
  },
  numar_nuclee: {
    type: Number
  },
  numar_threaduri: {
    type: Number
  },
  frecventa: {
    type: String
  },
  frecventa_turbo: {
    type: String
  },
  cache1: {
    type: String
  },
  cache2: {
    type: String
  },
  cache3: {
    type: String
  },
  tehnologie: {
    type: String
  },
  tdp: {
    type: String
  },
  cooler_stock: {
    type: String
  },
  //suport memorie
  tip_memorie: {
    type: String
  },
  memorie_maxima: {
    type: String
  },
  frecventa: {
    type: String
  },
  channel: {
    type: String
  },
  pret: {
    type: Number,
    required: true
  }
}, {
  strict: false
});

const procesoare = _mongoose.default.model('procesoare', procesorSchema, 'procesoare');

var _default = procesoare;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const coolerSchema = new _mongoose.default.Schema({
  denumire: {
    type: String,
    required: true
  },
  cod_producator: {
    type: String,
    unique: true
  },
  producator: {
    type: String
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
  pret: {
    type: Number,
    required: true
  },
  tip_racire: {
    type: String
  },
  numar_heatpipe: {
    type: String
  },
  inaltime: {
    type: String,
    required: true
  },
  numar_ventilatoare: {
    type: String
  },
  rpm_ventilator: {
    type: String
  },
  flux_aer: {
    type: String
  },
  greutate: {
    type: String
  },
  dimensiuni: {
    type: String
  },
  compatibilitate_socket: {
    type: String
  }
}, {
  strict: false
});

const coolere = _mongoose.default.model('coolere', coolerSchema, 'coolere');

var _default = coolere;
exports.default = _default;
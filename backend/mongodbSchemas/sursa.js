"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sursaSchema = new _mongoose.default.Schema({
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
  pret: {
    type: Number,
    required: true
  },
  galerie: [{
    type: String
  }],
  tip: {
    type: String
  },
  putere: {
    type: String
  },
  numar_ventilatoare: {
    type: String
  },
  voltaj: {
    type: String
  },
  eficienta: {
    type: String
  },
  certificare: {
    type: String
  },
  dimensiuni: {
    type: String
  },
  modulara: {
    type: String
  },
  protectii: {
    type: String
  },
  platforma_oem: {
    type: String
  }
}, {
  strict: false
});

const surse = _mongoose.default.model('surse', sursaSchema, 'surse');

var _default = surse;
exports.default = _default;
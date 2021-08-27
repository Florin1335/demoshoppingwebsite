"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ventilatorSchema = new _mongoose.default.Schema({
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
  dimensiune: {
    type: String
  },
  viteza_de_rotatie: {
    type: String
  },
  flux_aer: {
    type: String
  },
  conector: {
    type: String
  },
  voltaj: {
    type: String
  }
}, {
  strict: false
});

const ventilatoare = _mongoose.default.model('ventilatoare', ventilatorSchema, 'ventilatoare');

var _default = ventilatoare;
exports.default = _default;
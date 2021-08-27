"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const placaDeBazaSchema = new _mongoose.default.Schema({
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
  format: {
    type: String,
    required: true
  },
  soclu: {
    type: String,
    required: true
  },
  model_chipset: {
    type: String,
    required: true
  },
  interfata_grafica: {
    type: String
  },
  placa_video_integrata: {
    type: String
  },
  numar_sata: {
    type: String
  },
  numar_m2: {
    type: String
  },
  tip_memorie: {
    type: String
  },
  memorie_maxima: {
    type: String
  },
  numar_sloturi: {
    type: String
  },
  tehnologie: {
    type: String
  },
  frecvente_suportate: {
    type: String
  },
  pret: {
    type: Number,
    required: true
  }
}, {
  strict: false
});

const placiDeBaza = _mongoose.default.model('placiDeBaza', placaDeBazaSchema, 'placiDeBaza');

var _default = placiDeBaza;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const memorieRamSchema = new _mongoose.default.Schema({
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
  tip: {
    type: String
  },
  capacitate: {
    type: String
  },
  frecventa: {
    type: String
  },
  latenta_cas: {
    type: String
  },
  tensiune_alimentare: {
    type: String
  },
  timing: {
    type: String
  }
}, {
  strict: false
});

const memoriiRam = _mongoose.default.model('memoriiRam', memorieRamSchema, 'memoriiRam');

var _default = memoriiRam;
exports.default = _default;
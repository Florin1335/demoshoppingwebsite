"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const comandaSchema = new _mongoose.default.Schema({
  id_utilizator: {
    type: String,
    required: true
  },
  data: {
    type: Number,
    required: true
  },
  nume: {
    type: String,
    required: true
  },
  prenume: {
    type: String,
    required: true
  },
  telefon: {
    type: String,
    required: true
  },
  judet: {
    type: String,
    required: true
  },
  oras: {
    type: String,
    required: true
  },
  adresa: {
    type: String,
    required: true
  },
  cos: {
    type: Object,
    required: true
  },
  istoric: {
    type: String
  },
  status: {
    type: Number,
    default: 0
  },
  id_operator: {
    type: String
  }
});

const comenzi = _mongoose.default.model('comenzi', comandaSchema, 'comenzi');

var _default = comenzi;
exports.default = _default;
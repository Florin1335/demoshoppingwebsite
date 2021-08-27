"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const utilizatorSchema = new _mongoose.default.Schema({
  nume: {
    type: String,
    required: true
  },
  prenume: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  parola: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  adresa: {
    type: Object
  },
  activat: {
    type: Boolean,
    default: false
  },
  cod_activare: {
    type: String,
    unique: true
  }
});

const utilizatori = _mongoose.default.model('utilizatori', utilizatorSchema, 'utilizatori');

var _default = utilizatori;
exports.default = _default;
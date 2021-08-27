"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const stocuriSchema = new _mongoose.default.Schema({
  id_produs: {
    type: String,
    required: true,
    unique: true
  },
  stoc: {
    type: Number,
    required: true
  }
});

const stocuri = _mongoose.default.model('stocuri', stocuriSchema, 'stocuri');

var _default = stocuri;
exports.default = _default;
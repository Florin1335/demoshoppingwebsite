"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cosSchema = new _mongoose.default.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  cart: {
    type: Object
  }
});

const cos = _mongoose.default.model('cos', cosSchema, 'cos');

var _default = cos;
exports.default = _default;
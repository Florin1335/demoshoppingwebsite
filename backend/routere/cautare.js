"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _placaVideo = _interopRequireDefault(require("../mongodbSchemas/placaVideo.js"));

var _procesor = _interopRequireDefault(require("../mongodbSchemas/procesor.js"));

var _placaDeBaza = _interopRequireDefault(require("../mongodbSchemas/placaDeBaza.js"));

var _memorieRam = _interopRequireDefault(require("../mongodbSchemas/memorieRam.js"));

var _ssd = _interopRequireDefault(require("../mongodbSchemas/ssd.js"));

var _hdd = _interopRequireDefault(require("../mongodbSchemas/hdd.js"));

var _sursa = _interopRequireDefault(require("../mongodbSchemas/sursa.js"));

var _carcasa = _interopRequireDefault(require("../mongodbSchemas/carcasa.js"));

var _cooler = _interopRequireDefault(require("../mongodbSchemas/cooler.js"));

var _ventilator = _interopRequireDefault(require("../mongodbSchemas/ventilator.js"));

var _minisearch = _interopRequireDefault(require("minisearch"));

var _stocuri = _interopRequireDefault(require("../mongodbSchemas/stocuri.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cautare = _express.default.Router();

const arrayCategorii = [_placaVideo.default, _procesor.default, _placaDeBaza.default, _memorieRam.default, _ssd.default, _hdd.default, _sursa.default, _carcasa.default, _cooler.default, _ventilator.default];
cautare.get("/:query", (0, _expressAsyncHandler.default)(async (req, res) => {
  console.log(req.params);
  let query = req.params.query.replaceAll("%20", " ");
  console.log(req.params.query.replace(/%20/g, " "));
  let totalPotriviri = [];

  for (let i = 0; i < arrayCategorii.length; i++) {
    let rezultate = await arrayCategorii[i].find({});
    let proprietati = [];

    for (let j = 0; j < rezultate.length; j++) {
      for (let k in rezultate[j]) if (proprietati.indexOf(k) === -1) proprietati.push(k);
    }

    let mini_search = new _minisearch.default({
      fields: ["denumire"],
      storeFields: proprietati
    });
    mini_search.addAll(rezultate);
    let gasit = mini_search.search(query, {
      fuzzy: 0.2
    });
    totalPotriviri = totalPotriviri.concat(gasit);
  }

  for (let i in totalPotriviri) {
    totalPotriviri[i] = totalPotriviri[i].toObject();
    let stoc;
    let id = totalPotriviri[i]._id;
    let status_stoc = await _stocuri.default.findOne({
      id_produs: id
    });

    if (status_stoc) {
      if (status_stoc.stoc > 0) stoc = "În stoc";else stoc = "Nu este în stoc";
    } else stoc = "Stoc necunoscut";

    totalPotriviri[i].stoc = stoc;
  }

  res.json(totalPotriviri);
}));
var _default = cautare;
exports.default = _default;
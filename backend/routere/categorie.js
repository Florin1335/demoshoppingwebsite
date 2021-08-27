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

var _mongoose = _interopRequireDefault(require("mongoose"));

var _stocuri = _interopRequireDefault(require("../mongodbSchemas/stocuri.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const colectii = [_placaVideo.default, _procesor.default, _placaDeBaza.default, _memorieRam.default, _ssd.default, _hdd.default, _sursa.default, _carcasa.default, _cooler.default, _ventilator.default];

const categorie = _express.default.Router(); // Pentru o categorie de componente trebuie sa cerem bazei de date toate produsele
//din acea categorie (colectie).


categorie.get('/placiVideo', async (req, res) => {
  var raspuns = await _placaVideo.default.find({});

  for (let i in raspuns) {
    raspuns[i] = raspuns[i].toObject();
    let stoc;
    let id = raspuns[i]._id;
    let produs = await _stocuri.default.findOne({
      id_produs: id
    });

    if (produs) {
      if (produs.stoc > 0) stoc = 'În stoc';else stoc = 'Nu este în stoc';
    } else stoc = 'Stoc necunoscut';

    raspuns[i].stoc = stoc;
  }

  res.send(raspuns);
});
categorie.get('/procesoare', (0, _expressAsyncHandler.default)(async (req, res) => {
  var raspuns = await _procesor.default.find({});

  for (let i in raspuns) {
    raspuns[i] = raspuns[i].toObject();
    let stoc;
    let id = raspuns[i]._id;
    let produs = await _stocuri.default.findOne({
      id_produs: id
    });

    if (produs) {
      if (produs.stoc > 0) stoc = 'În stoc';else stoc = 'Nu este în stoc';
    } else stoc = 'Stoc necunoscut';

    raspuns[i].stoc = stoc;
  }

  res.send(raspuns);
}));
categorie.get('/placiDeBaza', async (req, res) => {
  var raspuns = await _placaDeBaza.default.find({});

  for (let i in raspuns) {
    raspuns[i] = raspuns[i].toObject();
    let stoc;
    let id = raspuns[i]._id;
    let produs = await _stocuri.default.findOne({
      id_produs: id
    });

    if (produs) {
      if (produs.stoc > 0) stoc = 'În stoc';else stoc = 'Nu este în stoc';
    } else stoc = 'Stoc necunoscut';

    raspuns[i].stoc = stoc;
  }

  res.send(raspuns);
});
categorie.get('/memoriiRam', async (req, res) => {
  var raspuns = await _memorieRam.default.find({});

  for (let i in raspuns) {
    raspuns[i] = raspuns[i].toObject();
    let stoc;
    let id = raspuns[i]._id;
    let produs = await _stocuri.default.findOne({
      id_produs: id
    });

    if (produs) {
      if (produs.stoc > 0) stoc = 'În stoc';else stoc = 'Nu este în stoc';
    } else stoc = 'Stoc necunoscut';

    raspuns[i].stoc = stoc;
  }

  res.send(raspuns);
});
categorie.get('/ssd', async (req, res) => {
  var raspuns = await _ssd.default.find({});

  for (let i in raspuns) {
    raspuns[i] = raspuns[i].toObject();
    let stoc;
    let id = raspuns[i]._id;
    let produs = await _stocuri.default.findOne({
      id_produs: id
    });

    if (produs) {
      if (produs.stoc > 0) stoc = 'În stoc';else stoc = 'Nu este în stoc';
    } else stoc = 'Stoc necunoscut';

    raspuns[i].stoc = stoc;
  }

  res.send(raspuns);
});
categorie.get('/hdd', async (req, res) => {
  var raspuns = await _hdd.default.find({});

  for (let i in raspuns) {
    raspuns[i] = raspuns[i].toObject();
    let stoc;
    let id = raspuns[i]._id;
    let produs = await _stocuri.default.findOne({
      id_produs: id
    });

    if (produs) {
      if (produs.stoc > 0) stoc = 'În stoc';else stoc = 'Nu este în stoc';
    } else stoc = 'Stoc necunoscut';

    raspuns[i].stoc = stoc;
  }

  res.send(raspuns);
});
categorie.get('/surse', async (req, res) => {
  var raspuns = await _sursa.default.find({});

  for (let i in raspuns) {
    raspuns[i] = raspuns[i].toObject();
    let stoc;
    let id = raspuns[i]._id;
    let produs = await _stocuri.default.findOne({
      id_produs: id
    });

    if (produs) {
      if (produs.stoc > 0) stoc = 'În stoc';else stoc = 'Nu este în stoc';
    } else stoc = 'Stoc necunoscut';

    raspuns[i].stoc = stoc;
  }

  res.send(raspuns);
});
categorie.get('/carcase', async (req, res) => {
  var raspuns = await _carcasa.default.find({});

  for (let i in raspuns) {
    raspuns[i] = raspuns[i].toObject();
    let stoc;
    let id = raspuns[i]._id;
    let produs = await _stocuri.default.findOne({
      id_produs: id
    });

    if (produs) {
      if (produs.stoc > 0) stoc = 'În stoc';else stoc = 'Nu este în stoc';
    } else stoc = 'Stoc necunoscut';

    raspuns[i].stoc = stoc;
  }

  res.send(raspuns);
});
categorie.get('/coolere', async (req, res) => {
  var raspuns = await _cooler.default.find({});

  for (let i in raspuns) {
    raspuns[i] = raspuns[i].toObject();
    let stoc;
    let id = raspuns[i]._id;
    let produs = await _stocuri.default.findOne({
      id_produs: id
    });

    if (produs) {
      if (produs.stoc > 0) stoc = 'În stoc';else stoc = 'Nu este în stoc';
    } else stoc = 'Stoc necunoscut';

    raspuns[i].stoc = stoc;
  }

  res.send(raspuns);
});
categorie.get('/ventilatoare', async (req, res) => {
  var raspuns = await _ventilator.default.find({});

  for (let i in raspuns) {
    raspuns[i] = raspuns[i].toObject();
    let stoc;
    let id = raspuns[i]._id;
    let produs = await _stocuri.default.findOne({
      id_produs: id
    });

    if (produs) {
      if (produs.stoc > 0) stoc = 'În stoc';else stoc = 'Nu este în stoc';
    } else stoc = 'Stoc necunoscut';

    raspuns[i].stoc = stoc;
  }

  res.send(raspuns);
});
categorie.get('/:id', (0, _expressAsyncHandler.default)(async (req, res) => {
  if (_mongoose.default.Types.ObjectId.isValid(req.params.id)) {
    var produs;

    for (let i = 0; i < colectii.length; i++) {
      produs = await colectii[i].findById(req.params.id);
      if (produs) break;
    }

    if (produs) {
      produs = produs.toObject();
      let stoc;
      let id = produs._id;
      let status_stoc = await _stocuri.default.findOne({
        id_produs: id
      });

      if (status_stoc) {
        if (status_stoc.stoc > 0) stoc = 'În stoc';else stoc = 'Nu este în stoc';
      } else stoc = 'Stoc necunoscut';

      produs.stoc = stoc;
      res.json(produs);
    } else res.json('status-404');
  } else res.json('status-404');
}));
var _default = categorie;
exports.default = _default;
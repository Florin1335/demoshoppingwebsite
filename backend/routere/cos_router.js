"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _cos = _interopRequireDefault(require("../mongodbSchemas/cos.js"));

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

var _comenzi = _interopRequireDefault(require("../mongodbSchemas/comenzi.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const colectii = [_placaVideo.default, _procesor.default, _placaDeBaza.default, _memorieRam.default, _ssd.default, _hdd.default, _sursa.default, _carcasa.default, _cooler.default, _ventilator.default];

var cos_router = _express.default.Router();

const protectie_autentificare = async (req, res, next) => {
  if (req.session.isAuth === true) next();else res.status(401).json('Utilizator neautentificat.');
};

cos_router.use(protectie_autentificare);
cos_router.post('/set', async (req, res) => {
  let email = req.session.email;
  const exista = await _cos.default.findOne({
    email
  });

  if (exista) {
    exista.cart = req.body;
    await exista.save(err => {
      if (err) res.status(500).json(err.message);else res.json('Coșul a fost salvat cu succes.');
    });
  } else {
    let newCart = new _cos.default({
      cart: req.body,
      email
    });
    await newCart.save(err => {
      if (err) res.json(err.message);else res.json('Coșul a fost salvat cu succes.');
    });
  }
});
cos_router.get('/get', async (req, res) => {
  let email = req.session.email;
  const exista = await _cos.default.findOne({
    email
  });

  if (exista) {
    res.json(exista.cart);
  } else {
    res.json(null);
  }
});
cos_router.delete('/golire', async (req, res) => {
  let email = req.session.email;
  const raspuns = await _cos.default.deleteOne({
    email
  });
  if (raspuns.ok === 1) res.json('Coșul a fost golit cu succes.');else res.json('Eroare la golire coș de cumpărături.');
});
cos_router.post('/comanda', async (req, res) => {
  if (req.body['nume'] && req.body['prenume'] && req.body['telefon'] && req.body['judet'] && req.body['oras'] && req.body['adresa']) {
    let email = req.session.email;
    var cos_comanda = await _cos.default.findOne({
      email
    });

    if (cos_comanda) {
      cos_comanda = cos_comanda.toObject();
      let produse_comanda = {};
      let pret_total = 0;
      let array_stocuri = [];
      let array_cantitate = [];
      let mesaj_raspuns = '';

      for (let i in cos_comanda.cart) {
        let produs;

        if (_mongoose.default.Types.ObjectId.isValid(i)) {
          for (let j = 0; j < colectii.length; j++) {
            produs = await colectii[j].findById(i);
            if (produs) break;
          }
        }

        if (produs) {
          mesaj_raspuns += '\n' + produs.denumire + ' Cantitate: ' + cos_comanda.cart[i] + ' Pret/bucată: ' + produs.pret + ' RON';
          let stoc_produs = await _stocuri.default.findOne({
            id_produs: i
          });

          if (!stoc_produs) {
            return res.status(404).json('Eroare, unul sau mai multe produse nu se află în stoc.');
          } else {
            if (stoc_produs.stoc > 0) {
              if (stoc_produs.stoc - cos_comanda.cart[i] < 0) return res.status(404).json('Eroare, stoc insuficient pentru: ' + produs.denumire);
              array_stocuri.push(stoc_produs);
              array_cantitate.push(cos_comanda.cart[i]);
              pret_total += produs.pret * cos_comanda.cart[i];
              produse_comanda[i] = [cos_comanda.cart[i], produs.pret]; // id : [cantitate, pret]
            } else return res.status(404).json('Eroare, unul sau mai multe produse nu se află în stoc.');
          }
        } else {
          return res.status(404).json('Eroare, un produs nu a putut fi găsit. Goliți coșul și încercați din nou.');
        }
      } // daca s-a ajuns aici, toate produsele sunt in stoc si se poate salva comanda si scadea stocurile
      // salvare comanda in db + raspuns


      let comanda = new _comenzi.default({
        id_utilizator: req.session.userID,
        data: Date.now(),
        nume: req.body.nume,
        prenume: req.body.prenume,
        telefon: req.body.telefon,
        judet: req.body.judet,
        oras: req.body.oras,
        adresa: req.body.adresa,
        cos: produse_comanda,
        istoric: Date() + ' - Comanda a fost plasată și este în așteptare.'
      });
      await comanda.save(err => {
        if (err) res.status(500).json('Eroare: ' + err.message);else res.json('Comanda a fost plasată cu succes!');
      }); // modificare stocuri

      for (let i = 0; i < array_stocuri.length; i++) {
        array_stocuri[i].stoc -= array_cantitate[i];
        array_stocuri[i].markModified('stoc');
        await array_stocuri[i].save(err => {
          if (err) console.log('Eroare stergere stoc pentru produs cu id ' + array_stocuri.id_produs + ', cantitate ' + array_cantitate[i]);
        });
      }
    } else res.status(500).json('Eroare, coșul este gol.');
  } else res.status(500).json('Toate câmpurile sunt obligatorii.');
});
var _default = cos_router;
exports.default = _default;
import express from "express";
import expressAsyncHandler from "express-async-handler";
import utilizatori from "../mongodbSchemas/utilizatori.js";
import bcrypt from "bcrypt";
import comenzi from "../mongodbSchemas/comenzi.js";
import mongoose from "mongoose";
import placiVideo from "../mongodbSchemas/placaVideo.js";
import procesoare from "../mongodbSchemas/procesor.js";
import placiDeBaza from "../mongodbSchemas/placaDeBaza.js";
import memoriiRam from "../mongodbSchemas/memorieRam.js";
import ssd from "../mongodbSchemas/ssd.js";
import hdd from "../mongodbSchemas/hdd.js";
import surse from "../mongodbSchemas/sursa.js";
import carcase from "../mongodbSchemas/carcasa.js";
import coolere from "../mongodbSchemas/cooler.js";
import ventilatoare from "../mongodbSchemas/ventilator.js";
import mailjet from "node-mailjet";
import crypto from "crypto";

const colectii = [
  placiVideo,
  procesoare,
  placiDeBaza,
  memoriiRam,
  ssd,
  hdd,
  surse,
  carcase,
  coolere,
  ventilatoare,
];
var auth = express.Router();
let mailjetClient = mailjet.connect(
  process.env.mailjetKey || "ecc8f1b34b0aac72d80efe7d04359771",
  process.env.mailjetSecretKey || "188b938d212c6ca8fb9dbf88beb6728d"
);

auth.get(
  "/",
  expressAsyncHandler((req, res) => {
    if (req.session.isAuth === true) res.json(true);
    else res.json(false);
  })
);

const trimiteEmailConfirmare = (prenume, email, cod_activare) => {
  const request = mailjetClient.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "xflorinutz@gmail.com",
          Name: "ComponentePC",
        },
        To: [
          {
            Email: email,
            Name: prenume,
          },
        ],
        Subject: "Activare cont pe site-ul ComponentePC",
        HTMLPart: `<h1>Confirmare cont pe site-ul ComponentePC</h1>
          <h2>Salut ${prenume},</h2>
          <p>Pentru activarea contului dumneavoastră apăsați <a href=https://demoshoppingwebsite.herokuapp.com/activare_cont/${cod_activare}>aici.</a></p>`,
        CustomID: "AppGettingStartedTest",
      },
    ],
  });
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
};
auth.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    let { email, parola, nume, prenume } = req.body;
    email = email.toLowerCase();
    let exista_deja = await utilizatori.findOne({ email });
    if (exista_deja)
      res.status(500).json("Adresa de email este deja înregistrată.");
    else {
      const parola_criptata = await bcrypt.hash(parola, 10);
      if (parola_criptata) {
        let cod_random = "";
        cod_random = crypto.randomBytes(64).toString("hex");
        let newuser = new utilizatori({
          email,
          parola: parola_criptata,
          nume,
          prenume,
          cod_activare: cod_random,
        });
        await newuser.save((err) => {
          if (err) res.status(500).json("Eroare: " + err.message);
          else {
            res.json(
              "Utilizatorul a fost înregistrat cu succes. Accesați link-ul din email pentru activare."
            );
            trimiteEmailConfirmare(
              newuser.prenume,
              newuser.email,
              newuser.cod_activare
            );
          }
        });
      } else res.status(500).json("Eroare, încercați din nou.");
    }
  })
);

auth.post("/activare_cont", async (req, res) => {
  const cod = req.body.cod_activare;
  const exista = await utilizatori.findOne({ cod_activare: cod });
  if (exista) {
    exista.activat = true;
    exista.markModified("activat");
    await exista.save((err) => {
      if (err) res.status(500).json("Eroare: " + err.message);
      else {
        res.json(
          "Contul dumneavoastră a fost activat cu succes. Veți fi redirecționați în scurt timp la pagina de autentificare."
        );
      }
    });
  } else
    res
      .status(500)
      .json("Contul a fost deja activat sau codul de activare nu există.");
});

auth.post("/login", async (req, res) => {
  const email = req.body.email.toLowerCase();
  const parola = req.body.parola;
  const exista = await utilizatori.findOne({ email });
  if (exista) {
    const compara_parola = await bcrypt.compare(parola, exista.parola);
    if (compara_parola === true) {
      if (exista.activat === true) {
        req.session.isAuth = true;
        req.session.userID = exista._id;
        req.session.email = exista.email;
        res
          .status(200)
          .send(JSON.stringify("Utilizator autentificat cu succes."));
      } else {
        res.status(403).json("Utilizator neactivat.");
      }
    } else {
      res.status(401).json("Email sau parola gresită.");
    }
  } else res.status(401).json("Email sau parola gresită.");
});

auth.delete("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) res.status(500).json(err.message);
    else res.json("Logout cu succes.");
  });
});

const protectie_autentificare = async (req, res, next) => {
  if (req.session.isAuth === true) next();
  else res.status(401).json("Utilizator neautentificat.");
};
auth.use(protectie_autentificare);

auth.get("/info", async (req, res) => {
  // user info
  const user = await utilizatori.findById(req.session.userID);
  if (user) {
    const data = {
      email: user.email,
      nume: user.nume,
      prenume: user.prenume,
      isAdmin: user.isAdmin,
      adresa: user.adresa,
    };
    res.json(data);
  } else res.status(500).json("Eroare preluare date.");
});

auth.post("/adresa/set", async (req, res) => {
  // setare adresă
  let email = req.session.email;
  const exista = await utilizatori.findOne({ email });
  if (exista) {
    let ok = 1;
    for (let i in req.body)
      if (req.body[i].length === 0 || req.body[i].length > 200) {
        ok = 0;
        break;
      }
    if (ok === 0) res.json("status-eroare-date-eronate");
    else {
      exista.adresa = req.body;
      await exista.save((err) => {
        if (err) res.json(err.message);
        else res.json("status-adresa-salvata");
      });
    }
  } else res.json("status-eroare-utilizatorul-nu-exista");
});

auth.get("/comenzi", async (req, res) => {
  // se va returna un array ce contine comenzile
  let userID = req.session.userID;
  const exista = await comenzi.find({ id_utilizator: userID });
  let raspuns = [];
  if (exista) {
    for (let j = 0; j < exista.length; j++) {
      let obj = {};
      for (let i in exista[j].cos) {
        let produs;
        if (mongoose.Types.ObjectId.isValid(i))
          for (let k = 0; k < colectii.length; k++) {
            produs = await colectii[k].findById(i);
            if (produs) break;
          }
        if (produs) obj[produs.denumire] = exista[j].cos[i];
        else obj[i] = exista[j].cos[i];
      }
      obj["istoric"] = exista[j].istoric;
      obj["finalizata"] = exista[j].status === 2 ? true : false;
      raspuns.push(obj);
    }
  }
  if (raspuns.length !== 0) res.json(raspuns);
  else res.status(404).json("Nici o comandă.");
});

export default auth;

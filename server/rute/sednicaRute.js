const express = require("express");
const ruter = express.Router();

const { SednicaKontroler } = require("../kontroleri/sednicaKontroler.js");

const instancaKontrolera = new SednicaKontroler();

ruter
  .route("/sednica")
  .post(instancaKontrolera.KreirajSednicu)
  .get(instancaKontrolera.PregledSvihSednica);

ruter
  .route("/sednica/:id")
  .get(instancaKontrolera.PregledOdredjeneSednice)
  .delete(instancaKontrolera.BrisanjeSednice);

module.exports = ruter;

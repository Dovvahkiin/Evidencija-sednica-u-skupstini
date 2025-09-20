const express = require("express");
const ruter = express.Router();

const { SednicaKontroler } = require("../kontroleri/sednicaKontroler.js");

const instancaKontrolera = new SednicaKontroler();

ruter
  .route("/sednica")
  .post(instancaKontrolera.KreirajSednicu)
  .get(instancaKontrolera.PregledSvihSednica);

ruter.get("/sednica/:id", instancaKontrolera.PregledOdredjeneSednice);

module.exports = ruter;

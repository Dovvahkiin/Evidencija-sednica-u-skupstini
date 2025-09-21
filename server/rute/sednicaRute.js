const express = require("express");
const ruter = express.Router();

const { SednicaKontroler } = require("../kontroleri/sednicaKontroler.js");
const { OvlascenjeIAutentikacija } = require("../posrednici/autentikacija.js");

const instancaKontrolera = new SednicaKontroler();
const instanceAutentikacije = new OvlascenjeIAutentikacija();

ruter
  .route("/sednice")
  .post(
    instanceAutentikacije.Autentikacija,
    instanceAutentikacije.ProveraOvlascenja("admin"),
    instancaKontrolera.KreirajSednicu
  )
  .get(instancaKontrolera.PregledSvihSednica);

ruter
  .route("/sednica/:id")
  .all(
    instanceAutentikacije.Autentikacija,
    instanceAutentikacije.ProveraOvlascenja("admin")
  )
  .get(instancaKontrolera.PregledOdredjeneSednice)
  .delete(instancaKontrolera.BrisanjeSednice)
  .put(instancaKontrolera.IzmenaSednice);

module.exports = ruter;

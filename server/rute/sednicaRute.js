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
  .get(instancaKontrolera.PregledOdredjeneSednice)
  .delete(
    instanceAutentikacije.Autentikacija,
    instanceAutentikacije.ProveraOvlascenja("admin"),
    instancaKontrolera.BrisanjeSednice
  )
  .put(
    instanceAutentikacije.Autentikacija,
    instanceAutentikacije.ProveraOvlascenja("admin"),
    instancaKontrolera.IzmenaSednice
  );

module.exports = ruter;

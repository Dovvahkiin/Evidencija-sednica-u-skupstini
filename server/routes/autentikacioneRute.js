const express = require("express");
const ruter = express.Router();

const { OvlascenjeIAutentikacija } = require("../posrednici/autentikacija.js");
const {
  AutentikacijaKontroler,
} = require("../kontroleri/autentikacioniKontroler.js");
const instanceAutentikacije = new OvlascenjeIAutentikacija();
const instancaAutentikacionogKontrolera = new AutentikacijaKontroler();

ruter.post(
  "/prijava",
  instanceAutentikacije.ProveraAutentikacije,
  instancaAutentikacionogKontrolera.PrijavaKorisnika
);

ruter.post("/odjava", instancaAutentikacionogKontrolera.OdjavaKorisnika);

ruter.get(
  "/token",
  instanceAutentikacije.Autentikacija,
  instancaAutentikacionogKontrolera.ProveriKorisnika
);

module.exports = ruter;

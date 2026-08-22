const express = require("express");
const ruter = express.Router();

const { OvlascenjeIAutentikacija } = require("../posrednici/autentikacija.js");
const { KorisnickiKontroler } = require("../kontroleri/korisnickiKontroler.js");
const instanceAutentikacije = new OvlascenjeIAutentikacija();
const instancaKorisnika = new KorisnickiKontroler();

ruter.get(
  "/profil",
  instanceAutentikacije.Autentikacija,
  instancaKorisnika.VratiKorisnikaPoIDu
);

module.exports = ruter;

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

ruter.post("/odjava", (req, res) => {
  res.clearCookie("token");
  console.log("Korisnik je odjavljen uspesno!");
  res.status(200).json({ Poruka: "Korisnik je uspesno odjavljen." });
});

module.exports = ruter;

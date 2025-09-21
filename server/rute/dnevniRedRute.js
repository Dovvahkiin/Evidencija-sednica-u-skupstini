const express = require("express");
const ruter = express.Router();

const { DnevniRedKontroler } = require("../kontroleri/dnevniRedKontroler.js");
const { OvlascenjeIAutentikacija } = require("../posrednici/autentikacija.js");

const instancaKontrolera = new DnevniRedKontroler();
const instanceAutentikacije = new OvlascenjeIAutentikacija();

ruter
  .route("/sednica/:id/dnevnired")
  .all(
    instanceAutentikacije.Autentikacija,
    instanceAutentikacije.ProveraOvlascenja("admin")
  )
  .post(instancaKontrolera.KreiranjeDnevnogReda)
  .put(instancaKontrolera.AzuriranjeDnevnogReda)
  .delete(instancaKontrolera.BrisanjeDnevnogReda);

module.exports = ruter;

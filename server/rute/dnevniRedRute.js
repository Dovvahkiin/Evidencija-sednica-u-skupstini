const express = require("express");
const ruter = express.Router();

const { DnevniRedKontroler } = require("../kontroleri/dnevniRedKontroler.js");

const instancaKontrolera = new DnevniRedKontroler();

ruter
  .route("/sednica/:id/dnevnired")
  .post(instancaKontrolera.KreiranjeDnevnogReda)
  .put(instancaKontrolera.AzuriranjeDnevnogReda)
  .delete(instancaKontrolera.BrisanjeDnevnogReda);

module.exports = ruter;

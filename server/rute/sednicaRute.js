const express = require("express");
const ruter = express.Router();

const {
  SednicaPostKontroler,
  SednicaGetKontroler,
} = require("../kontroleri/sednicaKontroler.js");

const instanceSednicePostKontrolera = new SednicaPostKontroler();
const instanceSedniceGetKontrolera = new SednicaGetKontroler();

ruter
  .route("/sednica")
  .post(instanceSednicePostKontrolera.KreirajSednicu)
  .get(instanceSedniceGetKontrolera.PregledSvihSednica);

module.exports = ruter;

const express = require("express");
const ruter = express.Router();

const SednicaPostKontroler = require("../kontroleri/sednicaKontroler.js");

const instanceSednicePostKontrolera = new SednicaPostKontroler();

ruter.post("/sednica", instanceSednicePostKontrolera.KreirajSednicu);

module.exports = ruter;

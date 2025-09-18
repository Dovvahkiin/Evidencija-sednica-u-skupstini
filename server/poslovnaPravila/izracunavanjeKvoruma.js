const fs = require("fs");
const path = require("path");

const poslovnoPraviloUlaz = path.join(__dirname, "ukupnoClanova.json");
const poslovnoPraviloIzlaz = path.join(__dirname, "kvorum.json");

const jsonFajlCitanje = fs.readFileSync(poslovnoPraviloUlaz, "utf8");
const jsonPodaci = JSON.parse(jsonFajlCitanje);

const kvorum = {
  kvorum: Math.floor((jsonPodaci.ukupanBrojClanova * 50) / 100 + 1),
};

const kvorumOsvezi = () => {
  const noviPodatakJson = JSON.stringify(kvorum);
  fs.writeFileSync(poslovnoPraviloIzlaz, noviPodatakJson, "utf8");
};

module.exports = kvorumOsvezi;

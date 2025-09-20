const fs = require("fs");
const path = require("path");
const poslovnoPraviloIzlaz = path.join(__dirname, "kvorum.json");

const ucitajKvorum = () => {
  const jsonKvorumPodaci = fs.readFileSync(poslovnoPraviloIzlaz, "utf8");
  return jsonKvorumPodaci;
};
const ucitajUkupnoClanova = () => {
  const poslovnoPraviloUlaz = path.join(__dirname, "ukupnoClanova.json");
  const jsonClanovi = fs.readFileSync(poslovnoPraviloUlaz, "utf8");
  const jsonPodaci = JSON.parse(jsonClanovi);
  return jsonPodaci;
};

const jsonClanovi = ucitajUkupnoClanova();
const kvorum = {
  kvorum: Math.floor((jsonClanovi.ukupanBrojClanova * 50) / 100 + 1),
};

const kvorumOsvezi = () => {
  const noviPodatakJson = JSON.stringify(kvorum);
  const noviKvorum = fs.writeFileSync(
    poslovnoPraviloIzlaz,
    noviPodatakJson,
    "utf8"
  );
  return noviKvorum;
};

module.exports = { kvorumOsvezi, ucitajKvorum, ucitajUkupnoClanova };

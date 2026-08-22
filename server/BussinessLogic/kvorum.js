const fs = require("fs");
const path = require("path");
const poslovnoPraviloUlaz = path.join(__dirname, "ukupnoClanova.json");

class UcitavanjeClanova {
  UcitajUkupnoClanova = async () => {
    const clanovi = JSON.parse(fs.readFileSync(poslovnoPraviloUlaz, "utf8"));
    return clanovi.ukupanBrojClanova;
  };
}

class IzracunavanjeKvoruma extends UcitavanjeClanova {
  IzracunajKvorum = async () => {
    const ukupnoClanova = await this.UcitajUkupnoClanova();
    const kvorum = Math.floor((ukupnoClanova * 50) / 100 + 1);
    return kvorum;
  };
}

class DetaljiPodatakaClanova extends IzracunavanjeKvoruma {
  DaLiImaDovoljnoPrisutnih = async (podaci) => {
    const kvorum = await this.IzracunajKvorum();
    if (podaci >= kvorum) return true;
    else return false;
  };
}

module.exports = { DetaljiPodatakaClanova, UcitavanjeClanova };

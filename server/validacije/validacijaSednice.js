const {
  ucitajUkupnoClanova,
} = require("../poslovnaPravila/izracunavanjeKvoruma.js");

const clanovi = ucitajUkupnoClanova();
const ukupanBrojClanova = clanovi.ukupanBrojClanova;

class ValidacijaSednice {
  async ValidirajPodatkeUnosa(unos = {}) {
    const { NazivSednice, DatumSednice, BrojPrisutnih, StatusSedniceID } = unos;

    const greske = [];

    if (!NazivSednice || NazivSednice.length === 0) {
      greske.push("Naziv ne moze biti prazan! \n");
    }
    if (!DatumSednice) {
      greske.push("Datum sednice ne moze biti prazan!");
    }
    if (
      !BrojPrisutnih ||
      BrojPrisutnih > ukupanBrojClanova ||
      BrojPrisutnih < 0
    ) {
      greske.push(
        "Broj prisutnih ne moze biti veci od:" +
          ukupanBrojClanova +
          "ili manji od 0 ili prazan!"
      );
    }
    if (!StatusSedniceID || StatusSedniceID > 2 || StatusSedniceID < 1) {
      greske.push("Status ne moze biti veci od 2 ili manji od 1 ili prazan");
    }

    return greske;
  }
}

class PoziviValidacija extends ValidacijaSednice {
  async ValidacijaUnosa(podaci) {
    const greske = this.ValidirajPodatkeUnosa(podaci);
    if (greske.length > 0) {
      console.error("Greske pri validaciji:\n" + greske);
      return { validacija: true, greske };
    }
    return { validacija: true };
  }
}

module.exports = { PoziviValidacija };

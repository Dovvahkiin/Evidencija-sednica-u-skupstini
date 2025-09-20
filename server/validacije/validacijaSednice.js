const {
  ucitajUkupnoClanova,
} = require("../poslovnaPravila/izracunavanjeKvoruma.js");

const clanovi = ucitajUkupnoClanova();

class ValidacijaSednice {
  async ValidirajPodatkeUnosa(unos = {}) {
    const ukupanBrojClanova = clanovi.ukupanBrojClanova;
    const { NazivSednice, DatumSednice, BrojPrisutnih, StatusSedniceID } = unos;

    const greske = [];

    if (!NazivSednice || NazivSednice.length === 0) {
      greske.push("Naziv ne moze biti prazan! \n");
    }
    if (!DatumSednice) {
      greske.push("Datum sednice ne moze biti prazan! \n");
    }
    if (
      !BrojPrisutnih ||
      BrojPrisutnih > ukupanBrojClanova ||
      BrojPrisutnih < 0
    ) {
      greske.push(
        "Broj prisutnih ne moze biti veci od: " +
          ukupanBrojClanova +
          " ili manji od 0 ili prazan!"
      );
    }
    if (!StatusSedniceID || StatusSedniceID > 4 || StatusSedniceID < 1) {
      greske.push("Status ne moze biti veci od 4 ili manji od 1 ili prazan\n");
    }

    return greske;
  }
}

class PoziviValidacija extends ValidacijaSednice {
  async ValidacijaUnosa(podaci) {
    const greske = await this.ValidirajPodatkeUnosa(podaci);
    if (greske.length > 0) {
      console.log("\n\nGreske pri validaciji:\n\n" + greske.join("\n"));
      return { validacija: false, greske };
    }
    return { validacija: true };
  }
}

module.exports = { PoziviValidacija };

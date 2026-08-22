const { UcitavanjeClanova } = require("../BussinessLogic/kvorum.js");

const instancaClanova = new UcitavanjeClanova();

class ValidacijaSednice {
  async ValidirajPodatkeUnosa(unos = {}) {
    const clanovi = await instancaClanova.UcitajUkupnoClanova();
    const { NazivSednice, DatumSednice, BrojPrisutnih, StatusSedniceID } = unos;

    const greske = [];

    if (
      !NazivSednice ||
      NazivSednice.length === 0 ||
      NazivSednice.trim() === ""
    ) {
      greske.push("Naziv ne moze biti prazan! \n");
    }
    if (!DatumSednice || DatumSednice.trim() === "") {
      greske.push("Datum sednice ne moze biti prazan! \n");
    }
    if (
      !BrojPrisutnih ||
      BrojPrisutnih.trim() === "" ||
      BrojPrisutnih > clanovi ||
      BrojPrisutnih < 0
    ) {
      greske.push(
        "Broj prisutnih ne moze biti veci od: " +
          clanovi +
          " ili manji od 0 ili prazan!",
      );
    }

    if (
      !StatusSedniceID ||
      StatusSedniceID > 4 ||
      StatusSedniceID < 1 ||
      StatusSedniceID.trim() === ""
    ) {
      greske.push("Status ne moze biti veci od 4 ili manji od 1 ili prazan\n");
    }

    return greske;
  }

  async ValidirajIzmenuPodataka(unos = {}) {
    const clanovi = await instancaClanova.UcitajUkupnoClanova();
    const { NazivSednice, DatumSednice, BrojPrisutnih, StatusSedniceID } = unos;
    const greske = [];

    if (NazivSednice) {
      if (NazivSednice.length < 1 || NazivSednice.trim() === "") {
        greske.push(
          "Naziv sednice mora imati barem jedan karakter.\nNaziv ne sme imati samo razmake bez karaktera.\n",
        );
      }
    }

    if (StatusSedniceID === 1) {
      const danas = new Date();
      if (DatumSednice < danas.getFullYear() || DatumSednice.trim() === "") {
        greske.push(
          "Datum ne moze biti manji od danasnjeg datuma ili samo razmaci.\n",
        );
      }
    }
    if (StatusSedniceID) {
      if (StatusSedniceID > 4 || StatusSedniceID < 1) {
        greske.push(
          "Status ne moze biti veci od 4 ili manji od 1 ili prazan ili samo razmaci \n",
        );
      }
    }
    if (BrojPrisutnih) {
      if (BrojPrisutnih > clanovi || BrojPrisutnih < 0) {
        greske.push(
          "Broj prisutnih ne moze biti veci od: " +
            clanovi +
            " ili manji od 0 ili samo razmaci!",
        );
      }
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

  async ValidacijaIzmene(podaci) {
    const greske = await this.ValidirajIzmenuPodataka(podaci);
    if (greske.length > 0) {
      console.log("\n\nGreske pri validaciji:\n\n" + greske.join("\n"));
      return { validacija: false, greske };
    }
    return { validacija: true };
  }
}

module.exports = { PoziviValidacija };

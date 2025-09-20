const BazniModel = require("./GlavniBazniModel.js");

class SednicaAkcijaModel extends BazniModel {
  constructor() {
    super("sednica");
  }

  async DodajNovuSednicu(
    NazivSednice,
    DatumSednice,
    BrojPrisutnih,
    StatusSedniceID,
    ZapisnikSednice
  ) {
    try {
      const upit = "CALL dodajNovuSednicu (?,?,?,?,?)";
      const [rezultat] = await this.izvrsiUpit(upit, [
        NazivSednice,
        DatumSednice,
        BrojPrisutnih,
        StatusSedniceID,
        ZapisnikSednice,
      ]);
      return rezultat;
    } catch (greska) {
      console.error(greska);
      throw greska;
    }
  }

  async ObrisiSednicu(IDSednice) {
    try {
      const upit = "CALL obrisiSednicu (?)";
      const [rezultat] = await this.izvrsiUpit(upit, [IDSednice]);
      return rezultat;
    } catch (greska) {
      console.error(greska);
      throw greska;
    }
  }

  async IzmeniSednicu(
    IDSednice,
    NazivSednice,
    DatumSednice,
    BrojPrisutnih,
    StatusSedniceID,
    ZapisnikSednice
  ) {
    try {
      const upit = "CALL azurirajSednicu (?,?,?,?,?,?)";
      const [rezultat] = await this.izvrsiUpit(upit, [
        IDSednice,
        NazivSednice,
        DatumSednice,
        BrojPrisutnih,
        StatusSedniceID,
        ZapisnikSednice,
      ]);
      return rezultat;
    } catch (greska) {
      console.error(greska);
      throw greska;
    }
  }
}

class SednicaPregledModel extends BazniModel {
  constructor() {
    super("pregledsvihsednica");
  }
}

module.exports = { SednicaAkcijaModel, SednicaPregledModel };

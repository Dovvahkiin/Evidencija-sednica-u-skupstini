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

  async ObrisiSednicu(id) {
    try {
      const upit = "CALL obrisiSednicu (?)";
      const rezultat = await this.izvrsiUpit(upit, [id]);
      const daLiJeObrisano = rezultat[0]?.[0]?.obrisanRed || 0;
      return daLiJeObrisano;
    } catch (greska) {
      console.error(greska);
      return greska;
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
        NazivSednice || null,
        DatumSednice || null,
        BrojPrisutnih || null,
        StatusSedniceID || null,
        ZapisnikSednice || null,
      ]);
      return rezultat;
    } catch (greska) {
      console.error(greska);
      return greska;
    }
  }
}

class SednicaPregledModel extends BazniModel {
  constructor() {
    super("pregledsvihsednica");
  }
}

module.exports = { SednicaAkcijaModel, SednicaPregledModel };

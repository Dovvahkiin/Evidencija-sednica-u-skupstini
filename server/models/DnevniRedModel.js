const BazniModel = require("./GlavniBazniModel");

class DnevniRedModel extends BazniModel {
  constructor() {
    super("dnevni_red");
  }
  async DodajDnevniRed(TekstDnevnogReda, IDSednice) {
    try {
      const upit = "CALL dodajDnevniRed (?,?)";
      const [rezultat] = await this.izvrsiUpit(upit, [
        TekstDnevnogReda,
        IDSednice,
      ]);
      return rezultat;
    } catch (greska) {
      throw greska;
    }
  }

  async AzurirajDnevniRed(IDSednice, TekstDnevnogReda) {
    try {
      const upit = "CALL azurirajDnevniRed (?,?)";
      const [rezultat] = await this.izvrsiUpit(upit, [
        IDSednice,
        TekstDnevnogReda,
      ]);
      return rezultat;
    } catch (greska) {
      throw greska;
    }
  }

  async ObrisiDnevniRed(IDDnevnogReda) {
    try {
      const upit = "CALL obrisiDnevniRed (?)";
      const rezultat = await this.izvrsiUpit(upit, [IDDnevnogReda]);
      return rezultat[0][0].obrisano;
    } catch (greska) {
      throw greska;
    }
  }
}

module.exports = { DnevniRedModel };

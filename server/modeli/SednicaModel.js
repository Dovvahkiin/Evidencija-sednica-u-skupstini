const BazniModel = require("./GlavniBazniModel.js");

class SednicaModel extends BazniModel {
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
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = SednicaModel;

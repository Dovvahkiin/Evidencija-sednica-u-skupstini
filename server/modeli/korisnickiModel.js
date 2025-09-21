const GlavniBazniModel = require("./GlavniBazniModel.js");

class KorisnickiModel extends GlavniBazniModel {
  constructor() {
    super("pregledProfilaKorisnika");
  }

  PrijavljivanjeKorisnika = async (email, lozinka) => {
    try {
      const upit =
        "SELECT * FROM pregledProfilaKorisnika where EmailKorisnika = ? and LozinkaKorisnika = ? LIMIT 1";
      const [prijava] = await this.izvrsiUpit(upit, [email, lozinka]);
      return prijava;
    } catch (greska) {
      throw greska;
    }
  };
}

module.exports = { KorisnickiModel };

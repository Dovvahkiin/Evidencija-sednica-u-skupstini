const podaciBaze = require("../konfiguracije/konfiguracijaBaze.js");

class BazniModel {
  constructor(imeTabele) {
    this.imeTabele = imeTabele;
  }

  async izvrsiUpit(upit, parametri = []) {
    const [redovi] = await podaciBaze.query(upit, parametri);
    return redovi;
  }

  async vratiSve() {
    try {
      const upit = `select * from ${this.imeTabele}`;
      const rezultat = await this.izvrsiUpit(upit);
      return rezultat;
    } catch (greska) {
      console.error(greska);
    }
  }

  async vratiPoIDu(id) {
    try {
      const upit = `select * from ${this.imeTabele} where ID = ?`;
      const rezultat = await this.izvrsiUpit(upit, [id]);
      return rezultat;
    } catch (greska) {
      console.error(greska);
      throw greska;
    }
  }
}

module.exports = BazniModel;

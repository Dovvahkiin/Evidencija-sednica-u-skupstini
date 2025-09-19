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
    const upit = `select * from ${this.imeTabele}`;
    const rezultat = await this.izvrsiUpit(upit);
    return rezultat;
  }
}

module.exports = BazniModel;

const podaciBaze = require("../konfiguracije/konfiguracijaBaze.js");

class BazniModel {
  constructor(imeTabele) {
    this.imeTabele = imeTabele;
  }

  async izvrsiUpit(upit, parametri = []) {
    const [rezultat] = await podaciBaze.query(upit, parametri);
    return rezultat;
  }

  async izvrsiExecuteUpit(upit, parametri = []) {
    const [rezultat] = await podaciBaze.execute(upit, parametri);
    return rezultat;
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

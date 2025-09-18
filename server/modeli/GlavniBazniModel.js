const podaciBaze = require("../konfiguracije/konfiguracijaBaze.js");

class BazniModel {
  constructor(imeTabele) {
    this.imeTabele = imeTabele;
  }

  izvrsiUpit = (upit, parametri) => {
    return new Promise((uspeh, neuspeh) => {
      podaciBaze.query(upit, parametri, (greska, rezultat) => {
        if (greska) {
          neuspeh(greska);
        } else {
          uspeh(rezultat);
        }
      });
    });
  };

  async vratiSve() {
    const upit = `select * from ${this.imeTabele}`;
    const rezultat = await this.izvrsiUpit(upit);
    return rezultat;
  }
}

module.exports = { BazniModel };

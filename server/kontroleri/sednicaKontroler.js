const {
  SednicaAkcijaModel,
  SednicaPregledModel,
} = require("../modeli/SednicaModel.js");

const instancaAkcijeSednice = new SednicaAkcijaModel();
const instancaPregledaSednica = new SednicaPregledModel();

class SednicaGetKontroler {
  async PregledSvihSednica(req, res) {
    const pregledajSveSednice = await instancaPregledaSednica.vratiSve();
    try {
      return res.status(200).json({ Akcija: true, pregledajSveSednice });
    } catch (greska) {
      console.error(greska);
      return res.status(404).json({ Akcija: false, greska });
    }
  }
}

class SednicaPostKontroler {
  async KreirajSednicu(req, res) {
    try {
      const {
        NazivSednice,
        DatumSednice,
        BrojPrisutnih,
        StatusSedniceID,
        ZapisnikSednice,
      } = req.body;

      const napraviNovuSednicu = await instancaAkcijeSednice.DodajNovuSednicu(
        NazivSednice,
        DatumSednice,
        BrojPrisutnih,
        StatusSedniceID,
        ZapisnikSednice
      );

      console.log("Uspesno kreiranje sednice.");
      return res.status(201).json({ Uspeh: true, napraviNovuSednicu });
    } catch (greska) {
      console.error(greska);
      return res.status(500).json({ greska: "server error!" });
    }
  }
}

module.exports = { SednicaPostKontroler, SednicaGetKontroler };

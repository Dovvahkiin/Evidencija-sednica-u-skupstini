const SednicaModel = require("../modeli/SednicaModel.js");

const instancaModelaSednice = new SednicaModel();

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

      const napraviNovuSednicu = await instancaModelaSednice.DodajNovuSednicu(
        NazivSednice,
        DatumSednice,
        BrojPrisutnih,
        StatusSedniceID,
        ZapisnikSednice
      );

      console.log("Uspesno kreiranje sednice.");
      return res.status(201).json({ Uspeh: true, napraviNovuSednicu });
    } catch (greska) {
      console.log(greska);
      return res.status(500).json({ greska: "server error!" });
    }
  }
}

module.exports = SednicaPostKontroler;

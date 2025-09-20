const {
  SednicaAkcijaModel,
  SednicaPregledModel,
} = require("../modeli/SednicaModel.js");

const { PoziviValidacija } = require("../validacije/validacijaSednice.js");

const instancaValidacijaSednice = new PoziviValidacija();
const instancaAkcijeSednice = new SednicaAkcijaModel();
const instancaPregledaSednica = new SednicaPregledModel();

class SednicaKontroler {
  async PregledSvihSednica(req, res) {
    const pregledajSveSednice = await instancaPregledaSednica.vratiSve();
    try {
      if (pregledajSveSednice.length === 0) {
        return res.status(404).json({
          Akcija: false,
          Poruka: "Ne postoji ni jedna zabelezena sednica!",
        });
      } else return res.status(200).json({ Akcija: true, pregledajSveSednice });
    } catch (greska) {
      console.error(greska);
      return res.status(404).json({ Akcija: false, greska });
    }
  }

  async PregledOdredjeneSednice(req, res) {
    const ID = parseInt(req.params.id, 10);
    try {
      const pregledSednicePoIDu = await instancaPregledaSednica.vratiPoIDu(ID);
      if (pregledSednicePoIDu.length === 0) {
        return res
          .status(404)
          .json({ Akcija: false, Poruka: "Sednica ne postoji!" });
      } else {
        return res.status(200).json({ Akcija: true, pregledSednicePoIDu });
      }
    } catch (greska) {
      console.error(greska);
      return res.status(500).json({ Akcija: false, greska });
    }
  }
  async KreirajSednicu(req, res) {
    const podaciKreiranja = req.body;
    const rezultatValidacije = await instancaValidacijaSednice.ValidacijaUnosa(
      podaciKreiranja
    );
    if (!rezultatValidacije.validacija) {
      return res
        .status(400)
        .json({ GreskaValidacije: true, greske: rezultatValidacije.greske });
    }

    try {
      const {
        NazivSednice,
        DatumSednice,
        BrojPrisutnih,
        StatusSedniceID,
        ZapisnikSednice,
      } = podaciKreiranja;

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
      return res.status(500).json({ greska: "server error!", greska });
    }
  }
}

module.exports = { SednicaKontroler };

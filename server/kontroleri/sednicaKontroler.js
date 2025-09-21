const {
  SednicaAkcijaModel,
  SednicaPregledModel,
  SednicaDetaljanPregledModel,
} = require("../modeli/SednicaModel.js");

const { PoziviValidacija } = require("../validacije/validacijaSednice.js");
const { DetaljiPodatakaClanova } = require("../poslovnaPravila/kvorum.js");

const instancaValidacijaSednice = new PoziviValidacija();
const instancaAkcijeSednice = new SednicaAkcijaModel();
const instancaPregledaSednica = new SednicaPregledModel();
const instancaDetaljnogPregledaSednice = new SednicaDetaljanPregledModel();
const instancaDetalja = new DetaljiPodatakaClanova();

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
      const pregledSednicePoIDu =
        await instancaDetaljnogPregledaSednice.vratiPoIDu(ID);
      if (pregledSednicePoIDu.length === 0) {
        return res
          .status(404)
          .json({ Akcija: false, Poruka: "Sednica ne postoji!" });
      } else {
        return res.status(200).json({ Akcija: true, pregledSednicePoIDu });
      }
    } catch (greska) {
      console.log(greska);
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

      let noviStatus = StatusSedniceID;

      const proveraPrisutnih = await instancaDetalja.DaLiImaDovoljnoPrisutnih(
        BrojPrisutnih
      );
      if (!proveraPrisutnih) {
        noviStatus = 3;
      }

      const napraviNovuSednicu = await instancaAkcijeSednice.DodajNovuSednicu(
        NazivSednice,
        DatumSednice,
        BrojPrisutnih,
        noviStatus,
        ZapisnikSednice
      );

      if (napraviNovuSednicu[0]?.greska) {
        return res
          .status(400)
          .json({ Uspeh: false, Greska: napraviNovuSednicu[0].greska });
      } // proveravanje da li je baza izbacila gresku

      console.log("Uspesno kreiranje sednice.");
      return res.status(201).json({ Uspeh: true, napraviNovuSednicu });
    } catch (greska) {
      console.error(greska);
      return res.status(500).json({ greska: "server error!", greska });
    }
  }

  async BrisanjeSednice(req, res) {
    try {
      const IDSednice = parseInt(req.params.id, 10); // req.params.[element] - element u nasem slucaju id je ono sto stoji u ruti kao parametar
      const rezultatBrisanja = await instancaAkcijeSednice.ObrisiSednicu(
        IDSednice
      );
      if (rezultatBrisanja > 0) {
        return res.status(200).json({
          Akcija: true,
          Poruka: "Sednica sa ID " + IDSednice + " je obrisana!",
        });
      } else
        return res
          .status(404)
          .json({ Akcija: false, Greska: "Sednica ne postoji." });
    } catch (greska) {
      console.error(greska);
      return res.status(500).json({ Greska: greska });
    }
  }

  async IzmenaSednice(req, res) {
    const podaciIzmene = req.body;
    const rezultatValidacije = await instancaValidacijaSednice.ValidacijaIzmene(
      podaciIzmene
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
      } = podaciIzmene;

      const ID = parseInt(req.params.id, 10);
      const rezultatIzmene = await instancaAkcijeSednice.IzmeniSednicu(
        ID,
        NazivSednice,
        DatumSednice,
        BrojPrisutnih,
        StatusSedniceID,
        ZapisnikSednice
      );

      console.log("Uspesna izmena sednice.");
      return res.status(202).json({ Uspeh: true, rezultatIzmene });
    } catch (greska) {
      console.error(greska);
      res.status(500).json({ Greska: greska });
    }
  }
}

module.exports = { SednicaKontroler };

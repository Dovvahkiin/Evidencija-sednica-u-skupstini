const { DnevniRedModel } = require("../modeli/DnevniRedModel.js");
const { PoziviValidacija } = require("../validacije/validacijaDnevnogReda.js");

const instancaDnevnogReda = new DnevniRedModel();
const instancaValidacije = new PoziviValidacija();

class DnevniRedKontroler {
  async KreiranjeDnevnogReda(req, res) {
    const ID = parseInt(req.params.id, 10);
    const { TekstTacke } = req.body;
    const rezultatValidacije = await instancaValidacije.ValidacijaPodataka(
      TekstTacke
    );
    if (!rezultatValidacije.validacija) {
      return res
        .status(400)
        .json({ GreskaValidacije: true, greska: rezultatValidacije.greska });
    }
    try {
      const kreirajDnevniRed = await instancaDnevnogReda.DodajDnevniRed(
        TekstTacke,
        ID
      );

      if (kreirajDnevniRed[0]?.greska) {
        return res
          .status(400)
          .json({ Uspeh: false, Greska: kreirajDnevniRed[0].greska });
      } // proveravanje da li je baza izbacila gresku

      console.log("Uspesno kreiranje dnevnog reda.");
      res.status(201).json({ Uspeh: true, kreirajDnevniRed });
    } catch (greska) {
      res.status(500).json({ greska: "Server error!", greska });
    }
  }

  async AzuriranjeDnevnogReda(req, res) {
    const ID = parseInt(req.params.id, 10);
    const { TekstTacke } = req.body;
    const rezultatValidacije = await instancaValidacije.ValidacijaPodataka(
      TekstTacke
    );
    if (!rezultatValidacije.validacija) {
      res
        .status(400)
        .json({ GreskaValidacije: true, greska: rezultatValidacije.greska });
    }
    try {
      const azurirajDnevniRed = await instancaDnevnogReda.AzurirajDnevniRed(
        ID,
        TekstTacke
      );
      console.log("Uspesno azuriranje tacke.");
      res.status(201).json({ Uspeh: true, azurirajDnevniRed });
    } catch (greska) {
      res.status(500).json({ Greska: "Server error!", greska });
    }
  }

  async BrisanjeDnevnogReda(req, res) {
    try {
      const ID = parseInt(req.params.id, 10);
      const rezultatBrisanja = await instancaDnevnogReda.ObrisiDnevniRed(ID);
      console.log(rezultatBrisanja);

      if (rezultatBrisanja === 1) {
        return res
          .status(200)
          .json({ Akcija: true, Poruka: "Uspesno brisanje dnevnog reda." });
      } else
        return res
          .status(404)
          .json({ Akcija: false, Greska: "Dnevni red ne postoji!" });
    } catch (greska) {
      return res.status(500).json({ Greska: "Server error!", greska });
    }
  }
}

module.exports = { DnevniRedKontroler };

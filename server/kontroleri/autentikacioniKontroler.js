const { KorisnickiModel } = require("../modeli/korisnickiModel.js");
const { ValidacijaKorisnika } = require("../validacije/validacijaKorisnika.js");
const jwt = require("jsonwebtoken");
const TAJNA = process.env.TAJNA_SESIJE;

const instancaValidacijeKorisnika = new ValidacijaKorisnika();
const instancaKorisnika = new KorisnickiModel();

class AutentikacijaKontroler {
  PrijavaKorisnika = async (req, res) => {
    const podaci = req.body;
    const rezultatValidacije =
      await instancaValidacijeKorisnika.ValidirajPrijavu(podaci);

    if (rezultatValidacije.length > 0) {
      return res.status(400).json({ Greske: rezultatValidacije });
    }

    try {
      const { email, lozinka } = podaci;

      const podaciKorisnika = await instancaKorisnika.PrijavljivanjeKorisnika(
        email,
        lozinka
      );
      console.log(podaciKorisnika);

      if (!podaciKorisnika || podaciKorisnika.length === 0) {
        console.log("Pogresan email ili lozinka");
        return res.status(500).json({ Greska: "Netacni podaci prijave." });
      }

      const token = jwt.sign(
        {
          id: podaciKorisnika.ID,
          email: podaciKorisnika.EmailKorisnika,
          status: podaciKorisnika.StatusKorisnika,
        },
        TAJNA,
        { expiresIn: "2h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
      });

      console.log(
        "Korisnik " + podaciKorisnika.ImeKorisnika + " je uspesno prijavljen."
      );
      res.status(200).json({ Uspeh: true, token });
    } catch (greska) {
      return res.status(500).json({ Greska: "Greska na serveru!", greska });
    }
  };
}

module.exports = { AutentikacijaKontroler };

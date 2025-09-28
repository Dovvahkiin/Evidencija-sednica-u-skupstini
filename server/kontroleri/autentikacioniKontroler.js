const { KorisnickiModel } = require("../modeli/korisnickiModel.js");
const { ValidacijaKorisnika } = require("../validacije/validacijaKorisnika.js");
const jwt = require("jsonwebtoken");
const TAJNA = process.env.TAJNA_SESIJE;
const OSVEZI = process.env.OSVEZI_SESIJU;

const instancaValidacijeKorisnika = new ValidacijaKorisnika();
const instancaKorisnika = new KorisnickiModel();

class AutentikacijaKontroler {
  PrijavaKorisnika = async (req, res) => {
    const podaci = req.body;
    const rezultatValidacije =
      await instancaValidacijeKorisnika.ValidirajPrijavu(podaci);

    if (rezultatValidacije.length > 0) {
      return res.status(400).json({ Greska: rezultatValidacije });
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
        return res
          .status(401)
          .json({ Uspeh: false, Greska: "Pogresan email ili lozinka" });
      }

      const token = jwt.sign(
        {
          id: podaciKorisnika.ID,
          email: podaciKorisnika.EmailKorisnika,
          status: podaciKorisnika.StatusKorisnika,
        },
        TAJNA,
        { expiresIn: "15m" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 15 * 60 * 1000, // 15 minuta
      });

      console.log(
        "Korisnik " + podaciKorisnika.ImeKorisnika + " je uspesno prijavljen."
      );
      res.status(200).json({ Uspeh: true, email, token });
    } catch (greska) {
      return res.status(500).json({ Greska: "Greska na serveru!", greska });
    }
  };

  OdjavaKorisnika = async (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ Poruka: "Uspesno ste se odjavili!" });
  };

  ProveriKorisnika = async (req, res) => {
    try {
      const korisnikID = req.user.id;
      const podaciKorisnika = await instancaKorisnika.vratiPoIDu(korisnikID);
      if (!podaciKorisnika || podaciKorisnika.length === 0)
        return res
          .status(404)
          .json({ Uspeh: false, Greska: "Korisnik nije pronadjen!" });
      const {
        ID,
        PrezimeKorisnika,
        ImeKorisnika,
        EmailKorisnika,
        StatusKorisnika,
      } = podaciKorisnika[0];

      res.status(200).json({
        Uspeh: true,
        korisnik: {
          id: ID,
          prezime: PrezimeKorisnika,
          ime: ImeKorisnika,
          email: EmailKorisnika,
          status: StatusKorisnika,
          // Možeš dodati više: role, datum kreiranja, itd.
        },
      });
    } catch (greska) {
      return res.status(500).json({ Greska: "Greska na server!" });
    }
  };
}

module.exports = { AutentikacijaKontroler };

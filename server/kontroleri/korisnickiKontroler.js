const { KorisnickiModel } = require("../modeli/korisnickiModel.js");
const BazniModel = require("../modeli/GlavniBazniModel.js");

const instancaKorisnika = new KorisnickiModel();

class KorisnickiKontroler extends BazniModel {
  VratiKorisnikaPoIDu = async (req, res) => {
    const ID = req.user.id;
    const rezultatKorisnika = await instancaKorisnika.vratiPoIDu(ID);
    if (!rezultatKorisnika) {
      return res.status(404).json({ Greska: "Korisnik ne postoji!" });
    }
    return res.status(200).json({ Korisnik: rezultatKorisnika });
  };
}

module.exports = { KorisnickiKontroler };

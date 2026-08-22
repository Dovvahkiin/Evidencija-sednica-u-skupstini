const jwt = require("jsonwebtoken");
const TAJNA = process.env.TAJNA_SESIJE;

class OvlascenjeIAutentikacija {
  Autentikacija = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ Greska: "Neovlascen pristup!" });

    try {
      const korisnik = jwt.verify(token, TAJNA);
      req.user = korisnik;
      next();
    } catch (greska) {
      return res
        .status(401)
        .json({ Greska: "Token nije odgovarajuci!", greska });
    }
  };

  ProveraAutentikacije = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return next();

    try {
      jwt.verify(token, TAJNA);
      return res.status(403).json({
        Greska: "Ne mozete pristupiti stranici jer ste vec prijavljeni.",
      });
    } catch (greska) {
      next();
    }
  };

  ProveraOvlascenja = (...dozvoljeniStatusiKorisnika) => {
    return (req, res, next) => {
      if (!req.user)
        return res.status(401).json({ Greska: "Neovlascen pristup!" });
      if (!dozvoljeniStatusiKorisnika.includes(req.user.status)) {
        return res.status(403).json({ Greska: "Zabranjeno!" });
      }
      next();
    };
  };
}

module.exports = { OvlascenjeIAutentikacija };

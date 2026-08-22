import { useState } from "react";
import { PrijavaOdjavaHookvoi } from "../hookovi/PrijavaOdjavaHook";
import { ValidacijaPrijave } from "../scripts/validacije/Validacije";
import { useNavigate } from "react-router-dom";
import { useAutentikacija } from "../scripts/AutentikacioniKontest";

function Prijava() {
  const [vrednosti, PostaviVrednosti] = useState({
    email: "",
    lozinka: "",
  });

  const navigacija = useNavigate();

  const { greskaa } = PrijavaOdjavaHookvoi();

  const { PrijavaKorisnika, greskaAutentikacije } = useAutentikacija();
  function promenaTeksta(e) {
    PostaviVrednosti({ ...vrednosti, [e.target.name]: e.target.value });
  }

  const PrihvatanjeForme = async (e) => {
    let odgovor = true;

    e.preventDefault();
    const rezultatValidacije = ValidacijaPrijave(vrednosti);
    if (rezultatValidacije) {
      return alert(rezultatValidacije);
    }
    try {
      odgovor = await PrijavaKorisnika(vrednosti.email, vrednosti.lozinka);
    } catch (greska) {
      console.log(greskaAutentikacije);

      return greska;
    } finally {
      if (odgovor) {
        navigacija("/");
      }
    }
  };

  return (
    <main className="glavniFormat prijava">
      <form className="prijavaStranica" onSubmit={PrihvatanjeForme}>
        <h1>Prijava korisnika</h1>
        {greskaAutentikacije ? (
          <span style={{ color: "red" }}>{greskaAutentikacije}</span>
        ) : (
          <></>
        )}
        <div className="unosPolje">
          <label htmlFor="email">Vaš email: </label>
          <input
            type="text"
            name="email"
            placeholder="Unesite vaš email"
            onChange={promenaTeksta}
            value={vrednosti.email}
          />
        </div>
        <div className="unosPolje">
          <label htmlFor="lozinka">Lozinka: </label>
          <input
            type="password"
            name="lozinka"
            placeholder="Unesite vašu lozinku"
            onChange={promenaTeksta}
            value={vrednosti.lozinka}
          />
        </div>

        <div className="unosPolje">
          <button type="submit">Prijava</button>
        </div>
        <hr className="linijaPrijave" />
      </form>
    </main>
  );
}

export default Prijava;

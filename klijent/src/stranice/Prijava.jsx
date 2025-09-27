import { useState } from "react";
import { PrijavaOdjavaHookvoi } from "../hookovi/AutentikacioniHook";
import { ValidacijaPrijave } from "../skripte/validacije/Validacije";
import { useNavigate } from "react-router-dom";

function Prijava() {
  const [vrednosti, PostaviVrednosti] = useState({
    email: "",
    lozinka: "",
  });
  const navigacija = useNavigate();

  const { PrijavaKorisnika, greskaa } = PrijavaOdjavaHookvoi();

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
      console.log(greskaa);

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
        {greskaa ? <span style={{ color: "red" }}>{greskaa}</span> : <></>}
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
            type="lozinka"
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

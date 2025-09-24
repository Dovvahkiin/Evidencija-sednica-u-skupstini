import { useState } from "react";

function Prijava() {
  const [vrednosti, PostaviVrednosti] = useState({
    email: "",
    lozinka: "",
  });

  function promenaTeksta(e) {
    PostaviVrednosti({ ...vrednosti, [e.target.name]: [e.target.value] });
  }

  return (
    <main className="glavniFormat prijava">
      <form className="prijavaStranica">
        <h1>Prijava korisnika</h1>
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

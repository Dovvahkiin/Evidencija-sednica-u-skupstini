import React, { useState } from "react";
import Footer from "../../komponente/Footer";
import Header from "../../komponente/Header/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { VratiSednicuPoIDu } from "../../hookovi/SednicaHook";
import { DnevniRedHook } from "../../hookovi/DnevniRedHook";
import { ValidacijaDnevnogReda } from "../../scripts/validacije/Validacije";

function DodajDnevniRed() {
  const { id } = useParams();
  const [TekstTacke, PostaviDnevniRed] = useState("");
  const { DodavanjeDnevnogReda } = DnevniRedHook();
  const navigacija = useNavigate();

  const { sednicaPoIDu } = VratiSednicuPoIDu(id);
  const postojecaSednica = sednicaPoIDu?.[0];
  console.log(postojecaSednica);

  const PrihvatanjeForme = async (e) => {
    e.preventDefault();
    const rezultatValidacije = ValidacijaDnevnogReda(TekstTacke);
    console.log(rezultatValidacije);
    if (rezultatValidacije) {
      return alert(rezultatValidacije);
    }
    try {
      await DodavanjeDnevnogReda(TekstTacke, id);
    } catch (greska) {
      return greska;
    } finally {
      alert("Dnevni red je uspesno dodat!");
      navigacija(`/sednica/${id}`);
    }
  };

  return (
    <main>
      <Header />
      {postojecaSednica ? (
        <form className="okvirSajta" onSubmit={PrihvatanjeForme}>
          <h1>Dodaj dnevni red za sednicu pod brojem: {id}</h1>
          <div className="prijavaStranica">
            <div className="unosPolje sednica">
              <label htmlFor="DnevniRed">Dnevni red:</label>
              <textarea
                name="TekstTacke"
                id="TekstTacke"
                cols={40}
                rows={8}
                value={TekstTacke}
                onChange={(e) => PostaviDnevniRed(e.target.value)}
                placeholder="Unesite dnevni red"
              ></textarea>
            </div>
            <div className="unosPolje sednica">
              <button type="submit">Dodaj Dnevni Red</button>
            </div>
          </div>
        </form>
      ) : (
        <div className="okvirSajta">
          <div className="prijavaStranica">
            <p>Sednica ne postoji!</p>
            <Link to="/">Vrati se na pocetnu stranu</Link>
          </div>
        </div>
      )}
      <Footer />
    </main>
  );
}

export default DodajDnevniRed;

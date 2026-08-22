import React, { useState } from "react";
import TabelaPregled from "../komponente/tabele/TabelaPregled";
import Header from "../komponente/Header/Header";
import Footer from "../komponente/Footer";
import Pretraga from "../komponente/Pretraga";
import { VratiSednice } from "../hookovi/SednicaHook";
import { useAutentikacija } from "../scripts/AutentikacioniKontest";

const PocetnaPrijavljen = () => {
  const [pretragaID, postaviPretragaID] = useState("");
  const { greska } = VratiSednice();

  return (
    <main>
      <Header />
      <section className="okvirSajta">
        {greska == null ? (
          <Pretraga elementPretrage={postaviPretragaID} />
        ) : (
          <></>
        )}
        <TabelaPregled PretragaPoIDu={pretragaID} />
        <Footer />
      </section>
    </main>
  );
};

const PocetnaNijePrijavljen = () => {
  return (
    <main>
      <Header />
      <section className="okvirSajta">
        <h1>Molimo prijavite se da bi koristili sajt!</h1>
        <Footer />
      </section>
    </main>
  );
};

function Pocetna() {
  const { korisnik, ucitavanje } = useAutentikacija();

  if (ucitavanje) {
    return (
      <main>
        <Header />
        <section className="okvirSajta">
          <p>Učitavanje...</p>
        </section>
      </main>
    );
  }
  return !korisnik ? <PocetnaNijePrijavljen /> : <PocetnaPrijavljen />;
}

export default Pocetna;

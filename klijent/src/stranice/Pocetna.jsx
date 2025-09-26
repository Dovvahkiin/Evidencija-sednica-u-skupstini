import React, { useState } from "react";
import TabelaPregled from "../komponente/tabele/TabelaPregled";
import Header from "../komponente/Header/Header";
import Footer from "../komponente/Footer";
import Pretraga from "../komponente/Pretraga";
import { VratiSednice } from "../hookovi/SednicaHook";

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
  return PocetnaPrijavljen();
}

export default Pocetna;

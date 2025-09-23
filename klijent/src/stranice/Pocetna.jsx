import React from "react";
import TabelaPregled from "../komponente/tabele/TabelaPregled";
import Header from "../komponente/Header/Header";
import Footer from "../komponente/Footer";

const PocetnaPrijavljen = () => {
  return (
    <main>
      <Header />
      <section className="okvirSajta">
        <TabelaPregled />
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

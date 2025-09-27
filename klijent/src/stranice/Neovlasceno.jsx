import React from "react";
import { Link } from "react-router-dom";
import Footer from "../komponente/Footer";

function NijePronadjeno() {
  return (
    <main>
      <section className="okvirSajta">
        <h1 style={{ marginBottom: "3rem" }}>--- GREŠKA 403 ---</h1>
        <p>
          Stranica kojoj pokušavate da pristupite zahteva vece ovlascenje nego
          sto imate trenutno!
        </p>
        <Link to="/" className="vracanjeNijePronadjenoDugme">
          Vrati se na početnu stranu
        </Link>
        <Footer />
      </section>
    </main>
  );
}

export default NijePronadjeno;

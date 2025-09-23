import React from "react";
import Header from "../komponente/Header/Header";
import { VratiSednicuPoIDu } from "../hookovi/SednicaHook";
import { useParams } from "react-router-dom";

function Sednica() {
  const { id } = useParams();
  const { sednicaPoIDu, ucitavanjePoIDu } = VratiSednicuPoIDu(id);

  if (ucitavanjePoIDu) return <p>Ucitavanje...</p>;

  const detaljiSednice = sednicaPoIDu;

  return (
    <main>
      <Header />
      <section className="okvirSajta sednica">
        {detaljiSednice ? (
          detaljiSednice.map((sednica, indeks) => (
            <div key={sednica.ID ?? indeks}>
              <h1>Naslov sednice: {sednica.Naziv}</h1>
              <div className="tackeDnevnogRedaSednica">
                <p>
                  Tacke dnevnog reda: <br />
                  <br />
                  {sednica.DnevniRed}
                </p>
              </div>
              <p>Datum sednice: {sednica.Datum}</p>
              <p>
                Status sednice:{" "}
                <span style={{ color: "red" }}>{sednica.StatusSednice}</span>
              </p>
              <div className="zapisnikSednica">
                <p>
                  Zapisnik:
                  <br />
                  {sednica.Zapisnik}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>Sednica ne postoji!</p>
        )}
      </section>
    </main>
  );
}

export default Sednica;

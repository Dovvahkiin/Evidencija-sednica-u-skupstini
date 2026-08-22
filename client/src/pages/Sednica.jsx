import React from "react";
import Header from "../komponente/Header/Header";
import { VratiSednicuPoIDu } from "../hookovi/SednicaHook";
import { useNavigate, useParams } from "react-router-dom";
import { DnevniRedHook } from "../hookovi/DnevniRedHook";
import { useAutentikacija } from "../scripts/AutentikacioniKontest";

function Sednica() {
  const { id } = useParams();
  const { sednicaPoIDu, ucitavanjePoIDu } = VratiSednicuPoIDu(id);
  const { BrisanjeDnevnogReda } = DnevniRedHook();
  const navigacija = useNavigate();
  const { korisnik } = useAutentikacija();

  const noviID = id;
  console.log(noviID);

  if (ucitavanjePoIDu) return <p>Ucitavanje...</p>;

  const detaljiSednice = sednicaPoIDu;

  const SrediKlik = async (e, id) => {
    e.preventDefault();
    await BrisanjeDnevnogReda(id);
    alert("Sednica je uspesno obrisana!");
    window.location.reload();
  };

  const srediKlikStampe = async (e) => {
    e.preventDefault();
    navigacija(`/stampa/${noviID}`);
  };

  return (
    <main>
      <Header />
      <section className="okvirSajta sednica">
        <button onClick={srediKlikStampe}>Štampaj</button>
        {detaljiSednice ? (
          detaljiSednice.map((sednica, indeks) => (
            <div key={sednica.ID ?? indeks}>
              <h1>Naslov sednice: {sednica.Naziv}</h1>
              <div className="tackeDnevnogRedaSednica">
                <p>
                  Tacke dnevnog reda:
                  {
                    // odavde admin
                    korisnik.status === "admin" ? (
                      sednica.DnevniRed === null ? (
                        <button
                          onClick={() => {
                            navigacija(`/sednica/${sednica.ID}/dodajdnevnired`);
                          }}
                          style={{ marginLeft: "10px" }}
                        >
                          Dodaj Dnevni Red
                        </button>
                      ) : (
                        <>
                          <button
                            style={{
                              backgroundColor: "yellow",
                              marginLeft: "10px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              navigacija(
                                `/sednica/${sednica.ID}/izmenidnevnired`,
                              );
                            }}
                          >
                            Izmeni Dnevni Red
                          </button>
                          <button
                            style={{
                              color: "white",
                              backgroundColor: "red",
                              marginLeft: "10px",
                              cursor: "pointer",
                            }}
                            onClick={(e) => {
                              SrediKlik(e, id);
                            }}
                          >
                            Obrisi dnevni red
                          </button>
                        </>
                      )
                    ) : (
                      <></>
                    )
                    /*do ovde admin */
                  }
                  <br />
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

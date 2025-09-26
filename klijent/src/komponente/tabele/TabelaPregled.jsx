import React from "react";
import {
  VratiSednice,
  VratiSednicuPoIDu,
  OpcijeSednice,
} from "../../hookovi/SednicaHook";
import { useNavigate } from "react-router-dom";

function TabelaPregled({ PretragaPoIDu }) {
  const { sednice, ucitavanje, greska, PostaviSednice } = VratiSednice();
  const { sednicaPoIDu, ucitavanjePoIdu, greskaPoIdu } =
    VratiSednicuPoIDu(PretragaPoIDu);
  const { BrisanjeSednice } = OpcijeSednice();

  const navigacija = useNavigate();

  const SrediKlik = async (e, id) => {
    e.preventDefault();
    await BrisanjeSednice(id);
    alert("Sednica je uspesno obrisana!");
    PostaviSednice((prethodna) =>
      prethodna.filter((sednica) => sednica.ID !== id)
    );
    window.location.reload();
  };

  if (ucitavanje || ucitavanjePoIdu) return <p>Ucitavanje...</p>;
  if (greska || greskaPoIdu)
    return <p style={{ color: "red" }}>Ni jedna sednica nije kreirana</p>;

  return (
    <>
      <h1>PREGLED SEDNICA SKUPŠTINE</h1>
      <article className="tabelaPocetna">
        <table>
          <thead>
            <tr>
              <th>ID Sednice:</th>
              <th>Naziv sednice:</th>
              <th>Datum sednice:</th>
              <th>Broj prisutnih:</th>
              <th>Status Sednice:</th>
              <th colSpan={2}>Opcije</th>
            </tr>
          </thead>
          <tbody>
            {PretragaPoIDu ? (
              sednicaPoIDu ? (
                sednicaPoIDu.map((sednica, indeks) => (
                  <tr key={sednica.ID ?? indeks}>
                    <td>{sednica.ID ?? indeks}</td>
                    <td>
                      <a href={`/sednica/${sednica.ID}`}>{sednica.Naziv}</a>
                    </td>
                    <td>{sednica.Datum}</td>
                    <td>{sednica.BrojPrisutnih}</td>
                    <td>{sednica.StatusSednice}</td>
                    <td>
                      <button
                        onClick={() => {
                          navigacija(`/sednica/${sednica.ID}/izmenisednicu`);
                        }}
                      >
                        Izmeni
                      </button>
                    </td>
                    <td>
                      <button onClick={(e) => SrediKlik(e, sednica.ID)}>
                        Obrisi
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    style={{ color: "violet", textAlign: "center" }}
                    colSpan={6}
                  >
                    Sednica koju pokusavate da pronadjete ne postoji.
                  </td>
                </tr>
              )
            ) : (
              sednice.map((sednica, indeks) => (
                <tr key={sednica.ID ?? indeks}>
                  <td>{sednica.ID ?? indeks}</td>
                  <td>
                    <a href={`/sednica/${sednica.ID}`}>
                      {sednica.NazivSednice}
                    </a>
                  </td>
                  <td>{sednica.Datum}</td>
                  <td>{sednica.BrojPrisutnih}</td>
                  <td>{sednica.StatusSednice}</td>
                  <td>
                    <button
                      onClick={() => {
                        navigacija(`/sednica/${sednica.ID}/izmenisednicu`);
                      }}
                    >
                      Izmeni
                    </button>
                  </td>
                  <td>
                    <button onClick={(e) => SrediKlik(e, sednica.ID)}>
                      Obrisi
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </article>
    </>
  );
}

export default TabelaPregled;

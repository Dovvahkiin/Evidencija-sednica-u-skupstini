import React from "react";
import Pretraga from "../Pretraga";
import { VratiSednice } from "../../hookovi/SednicaHook";

function TabelaPregled() {
  const { sednice, ucitavanje, greska } = VratiSednice();

  if (ucitavanje) return <p>Ucitavanje...</p>;
  if (greska) return <p>Greska: {greska}</p>;

  return (
    <>
      <h1>PREGLED SEDNICA SKUPŠTINE</h1>
      <Pretraga />
      <article className="tabelaPocetna">
        <table>
          <thead>
            <tr>
              <th>Naziv sednice:</th>
              <th>Datum sednice:</th>
              <th>Broj prisutnih:</th>
              <th>Status Sednice:</th>
            </tr>
          </thead>
          <tbody>
            {sednice.map((sednica) => (
              <tr key={sednica.ID}>
                <td>{sednica.NazivSednice}</td>
                <td>{sednica.Datum}</td>
                <td>{sednica.BrojPrisutnih}</td>
                <td>{sednica.StatusSednice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </>
  );
}

export default TabelaPregled;

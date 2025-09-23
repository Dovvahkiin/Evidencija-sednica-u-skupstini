import React from "react";
import Pretraga from "../Pretraga";

function TabelaPregled() {
  return (
    <>
      <h1>PREGLED SEDNICA SKUPŠTINE</h1>
      <Pretraga />
      <article className="tabelaPocetna">
        <table>
          <th>Test naslov</th>
          <th>Test naslov</th>
          <th>Test naslov</th>
          <th>Test naslov</th>
          <th>Test naslov</th>
          <tr>
            <td>test 1</td>
            <td>test 1</td>
            <td>test 1</td>
            <td>test 1</td>
            <td>test 1</td>
          </tr>{" "}
          <tr>
            <td>test 1</td>
            <td>test 1</td>
            <td>test 1</td>
            <td>test 1</td>
            <td>test 1</td>
          </tr>{" "}
          <tr>
            <td>test 1</td>
            <td>test 1</td>
            <td>test 1</td>
            <td>test 1</td>
            <td>test 1</td>
          </tr>
        </table>
      </article>
    </>
  );
}

export default TabelaPregled;

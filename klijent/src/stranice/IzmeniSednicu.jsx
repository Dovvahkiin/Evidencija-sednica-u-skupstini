import React, { useState } from "react";
import Footer from "../komponente/Footer";
import Header from "../komponente/Header/Header";
import { VratiTipoveSednice } from "../hookovi/SednicaHook";
import { brojacPrisutnih } from "../skripte/brojac";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function IzmeniSednicu() {
  const [datum, PostaviDatum] = useState(new Date());
  const { tipoviSednice } = VratiTipoveSednice();
  const [izborTipaSednice, PostaviIzbor] = useState("");
  const brojeviZaIzbor = brojacPrisutnih();
  const DodajIzbor = (e) => {
    PostaviIzbor(e.target.value);
  };

  const PromenaDatuma = (datum) => {
    PostaviDatum(datum);
  };
  return (
    <main>
      <Header />
      <form className="okvirSajta">
        <h1>KREIRANJE NOVE SEDNICE</h1>
        <div className="prijavaStranica">
          <div className="unosPolje sednica">
            <label htmlFor="imeSednice">Ime sednice:</label>
            <input type="text" name="imeSednice" />
          </div>
          <div className="unosPolje sednica">
            <label htmlFor="datumSednice">Datum sednice:</label>
            <DatePicker
              selected={datum}
              onChange={PromenaDatuma}
              dateFormat={"yyyy-MM-dd"}
            />
          </div>
          <div className="unosPolje sednica">
            <label htmlFor="brojPrisutnih">Broj Prisutnih:</label>
            <select name="brojPrisutnikIzbor" id="brojPrisutnikIzbor">
              {brojeviZaIzbor
                ? brojeviZaIzbor.map((brojevi) => (
                    <option key={brojevi} value={brojevi}>
                      {brojevi}
                    </option>
                  ))
                : true}
            </select>
          </div>
          <div className="unosPolje sednica">
            <label htmlFor="zapisnikSednice">Zapisnik sednice:</label>
            <textarea
              name="zapisnikSednice"
              id="zapisnikSednice"
              cols={20}
              rows={5}
            ></textarea>
          </div>
          <div className="unosPolje sednica">
            <label htmlFor="statusSednice">Status sednice:</label>
            <select
              onChange={DodajIzbor}
              name="statusSednice"
              id="statusSednice"
            >
              {tipoviSednice ? (
                tipoviSednice.map((tip, indeks) => (
                  <option
                    key={tip.IDStatusaSednice}
                    value={tip.IDStatusaSednice ?? indeks}
                  >
                    {tip.NazivStatusaSednice}
                  </option>
                ))
              ) : (
                <option></option>
              )}
            </select>
          </div>
          <div className="unosPolje">
            <button type="submit">Kreiraj Sednicu</button>
          </div>
        </div>
      </form>
      <Footer />
    </main>
  );
}

export default IzmeniSednicu;

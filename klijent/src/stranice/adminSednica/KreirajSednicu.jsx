import React, { useState } from "react";
import Footer from "../../komponente/Footer";
import Header from "../../komponente/Header/Header";
import { brojacPrisutnih } from "../../skripte/brojac";
import { OpcijeSednice, VratiTipoveSednice } from "../../hookovi/SednicaHook";
import { ValidacijaSednice } from "../../skripte/validacije/Validacije";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

function KreirajSednicu() {
  const [datum, PostaviDatum] = useState(new Date());
  const { tipoviSednice } = VratiTipoveSednice();
  const brojeviZaIzbor = brojacPrisutnih();

  const [novaSednica, PostaviNovuSednicu] = useState({
    NazivSednice: "",
    DatumSednice: "",
    BrojPrisutnih: "",
    StatusSedniceID: "",
    ZapisnikSednice: "",
  });

  const { KreiranjeNoveSednice, greska } = OpcijeSednice();

  const UnosVrednosti = (e) => {
    PostaviNovuSednicu({ ...novaSednica, [e.target.name]: e.target.value });
  };

  const PromenaDatuma = (datum) => {
    PostaviDatum(datum);
    const noviDatum = datum.toISOString().split("T")[0];
    PostaviNovuSednicu({ ...novaSednica, DatumSednice: noviDatum });
  };

  const navigacija = useNavigate();
  const KreirajSednicuForma = async (e) => {
    e.preventDefault();
    const rezultatValidacije = ValidacijaSednice(novaSednica);
    console.log(rezultatValidacije);
    if (rezultatValidacije) {
      return alert(rezultatValidacije);
    }
    try {
      await KreiranjeNoveSednice(novaSednica);
      PostaviNovuSednicu({
        NazivSednice: "",
        DatumSednice: "",
        BrojPrisutnih: "",
        StatusSedniceID: "",
        ZapisnikSednice: "",
      });
    } catch (greska) {
      return greska;
    } finally {
      alert("Sednica uspesno kreirana");
      navigacija("/");
    }
  };
  return (
    <main>
      <Header />
      <form className="okvirSajta" onSubmit={KreirajSednicuForma}>
        <h1>KREIRANJE NOVE SEDNICE</h1>
        <div className="prijavaStranica">
          {greska && (
            <p style={{ textAlign: "center", color: "red" }}>{greska}</p>
          )}

          <div className="unosPolje sednica">
            <label htmlFor="imeSednice">Ime sednice:</label>
            <input
              type="text"
              name="NazivSednice"
              value={novaSednica.NazivSednice}
              onChange={UnosVrednosti}
            />
          </div>
          <div className="unosPolje sednica">
            <label htmlFor="datumSednice">Datum sednice:</label>
            <DatePicker
              value={novaSednica.DatumSednice}
              selected={datum}
              onChange={PromenaDatuma}
              dateFormat={"yyyy-MM-dd"}
              name="DatumSednice"
            />
          </div>
          <div className="unosPolje sednica">
            <label htmlFor="brojPrisutnih">Broj Prisutnih:</label>
            <select
              value={novaSednica.BrojPrisutnih}
              name="BrojPrisutnih"
              id="brojPrisutnikIzbor"
              onChange={UnosVrednosti}
            >
              {brojeviZaIzbor ? (
                brojeviZaIzbor.map((brojevi) => (
                  <option key={brojevi} value={brojevi}>
                    {brojevi}
                  </option>
                ))
              ) : (
                <option key={0} value={0}>
                  0
                </option>
              )}
            </select>
          </div>
          <div className="unosPolje sednica">
            <label htmlFor="zapisnikSednice">Zapisnik sednice:</label>
            <textarea
              name="ZapisnikSednice"
              id="ZapisnikSednice"
              cols={20}
              rows={5}
              value={novaSednica.ZapisnikSednice}
              onChange={UnosVrednosti}
            ></textarea>
          </div>
          <div className="unosPolje sednica">
            <label htmlFor="statusSednice">Status sednice:</label>
            <select
              onChange={UnosVrednosti}
              name="StatusSedniceID"
              id="StatusSedniceID"
              value={novaSednica.StatusSedniceID}
            >
              <option value="" hidden disabled>
                Izaberite tip sednice
              </option>

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

export default KreirajSednicu;

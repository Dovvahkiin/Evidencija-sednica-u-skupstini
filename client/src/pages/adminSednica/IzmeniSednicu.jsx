import React, { useState } from "react";
import Footer from "../../komponente/Footer";
import Header from "../../komponente/Header/Header";
import {
  VratiTipoveSednice,
  VratiSednicuPoIDu,
  OpcijeSednice,
} from "../../hookovi/SednicaHook";
import { brojacPrisutnih } from "../../scripts/brojac";
import { ValidacijaSednice } from "../../scripts/validacije/Validacije";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function IzmeniSednicu() {
  const [datum, PostaviDatum] = useState(new Date());
  const { tipoviSednice } = VratiTipoveSednice();
  const brojeviZaIzbor = brojacPrisutnih();
  const { id } = useParams();
  const { sednicaPoIDu } = VratiSednicuPoIDu(id);
  const [novaSednica, PostaviNovuSednicu] = useState({
    NazivSednice: "",
    DatumSednice: "",
    BrojPrisutnih: "",
    StatusSedniceID: "",
    ZapisnikSednice: "",
  });
  const navigacija = useNavigate();

  const { IzmenaSednice, greska } = OpcijeSednice();

  const detaljiSednice = sednicaPoIDu?.[0];

  const UnosVrednosti = (e) => {
    PostaviNovuSednicu({ ...novaSednica, [e.target.name]: e.target.value });
  };

  const PromenaDatuma = (datum) => {
    PostaviDatum(datum);
    const noviDatum = datum.toISOString().split("T")[0];
    PostaviNovuSednicu({ ...novaSednica, DatumSednice: noviDatum });
    return noviDatum;
  };

  const IzmeniForma = async (e) => {
    e.preventDefault();
    const rezultatValidacije = ValidacijaSednice(novaSednica);
    console.log(rezultatValidacije);
    if (rezultatValidacije) {
      return alert(rezultatValidacije);
    }
    try {
      await IzmenaSednice(id, novaSednica);
    } catch (greska) {
      return greska;
    } finally {
      alert("Sednica uspesno izmenjena");
      navigacija(`/sednica/${id}`);
    }
  };

  useEffect(() => {
    if (detaljiSednice && detaljiSednice.ID !== undefined) {
      PostaviNovuSednicu({
        NazivSednice: String(detaljiSednice.Naziv),
        BrojPrisutnih: detaljiSednice.BrojPrisutnih,
        StatusSedniceID: detaljiSednice.StatusID,
        ZapisnikSednice: String(detaljiSednice.Zapisnik),
        DatumSednice: String(detaljiSednice.Datum),
      });
    }
    console.log(detaljiSednice);
  }, [detaljiSednice]);
  return (
    <main>
      <Header />
      <form className="okvirSajta" onSubmit={IzmeniForma}>
        <h1>IZMENI POSTOJEĆU SEDNICU</h1>
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
            <button type="submit">Izmeni Sednicu</button>
          </div>
        </div>
      </form>
      <Footer />
    </main>
  );
}

export default IzmeniSednicu;

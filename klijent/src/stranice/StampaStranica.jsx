import React from "react";
import "../stilovi/stampa.css";
import { danasnjiDatumSaTackama, vreme } from "../skripte/datum";
import logoPrvi from "../dodaci/slike/univer.png";
import logoDrugi from "../dodaci/slike/tfzrLogo.png";
import { useParams } from "react-router-dom";
import { VratiSednicuPoIDu } from "../hookovi/SednicaHook";

const StampaStranica = () => {
  const { id } = useParams();
  const { sednicaPoIDu, ucitavanjePoIDu } = VratiSednicuPoIDu(id);

  const detaljiSednice = sednicaPoIDu;

  console.log(detaljiSednice);

  return (
    <main>
      <section className="stampa">
        <p style={{ textAlign: "center" }}>Univerzitet u Novom Sadu</p>
        <div className="zaglavljeStampe">
          <img src={logoPrvi} alt="" />
          <h1>Tehnički fakultet "Mihajlo Pupin"</h1>
          <img src={logoDrugi} alt="" />
        </div>
        <h2>- ŠTAMPA SEDNICE -</h2>
        {detaljiSednice ? (
          detaljiSednice.map((sednica, indeks) => (
            <div key={sednica.ID ?? indeks}>
              <div className="sadrzajStampe">
                <h3>
                  Naslov sednice:
                  <span className="vrednostiStampe red">{sednica.Naziv}</span>
                </h3>
                <div>
                  <p>
                    Datum sednice:
                    <span className="vrednostiStampe red">{sednica.Datum}</span>
                  </p>
                  <p>
                    Status sednice:
                    <span className="vrednostiStampe red">
                      {sednica.StatusSednice}
                    </span>
                  </p>
                  <p>Dnevni red:</p>
                  <p className="vrednostiStampe" style={{ maxWidth: "80%" }}>
                    {sednica.DnevniRed ? (
                      <>{sednica.DnevniRed}</>
                    ) : (
                      <>Ne postoji dnevni red</>
                    )}
                  </p>
                  <p>Zapisnik sednice:</p>
                  <p className="vrednostiStampe" style={{ maxWidth: "80%" }}>
                    {sednica.Zapisnik ? (
                      <>{sednica.Zapisnik}</>
                    ) : (
                      <>Ne postoji zapisnik sednice</>
                    )}
                  </p>
                </div>
              </div>
              <p style={{ textAlign: "right" }}>
                Štampano dana:
                <span className="vrednostiStampe">
                  {danasnjiDatumSaTackama}
                </span>
              </p>
              <p style={{ textAlign: "right" }}>
                Vreme štampe:
                <span className="vrednostiStampe">{vreme}</span>
              </p>
            </div>
          ))
        ) : (
          <p>Sednica ne postoji!</p>
        )}
      </section>
    </main>
  );
};

export default StampaStranica;

/*

*/

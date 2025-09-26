/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import SedniceServis from "../servisi/SedniceServis";
import { ValidacijaSednice } from "../skripte/validacije/Validacije";

const instanceSednice = new SedniceServis();

export function VratiSednice() {
  const [sednice, PostaviSednice] = useState([]);
  const [ucitavanje, PostaviUcitavanje] = useState(true);
  const [greska, PostaviGresku] = useState(null);

  useEffect(() => {
    const preuzmiSednice = async () => {
      try {
        const podaci = await instanceSednice.UcitajSednice(); // vraca objekat u kome stoje iz backenda {akcija:..., pregledSvihSednica: [sednice]}
        PostaviSednice(podaci.pregledajSveSednice);
      } catch (greskica) {
        PostaviGresku(greskica.message || "Greska pri ucitavanje sednica");
      } finally {
        PostaviUcitavanje(false);
      }
    };
    preuzmiSednice();
  }, []);

  return { sednice, ucitavanje, greska };
}
export function VratiSednicuPoIDu(id) {
  const [sednicaPoIDu, PostaviSednice] = useState(null);
  const [ucitavanjePoIDu, PostaviUcitavanje] = useState(false);
  const [greskaPoIDu, PostaviGresku] = useState(null);

  useEffect(() => {
    if (!id) {
      PostaviGresku(null);
      PostaviUcitavanje(false);
      PostaviSednice(null);
      return;
    }

    const preuzmiSednicuPoIDu = async () => {
      PostaviUcitavanje(true);
      try {
        const podaci = await instanceSednice.UcitajSednicuPoIDu(id);
        const sednica = podaci.pregledSednicePoIDu?.[0];
        PostaviSednice([sednica]);
      } catch (greskica) {
        PostaviGresku(greskica.message || "Greska pri ucitavanje sednica");
      } finally {
        PostaviUcitavanje(false);
      }
    };
    console.log(sednicaPoIDu);
    preuzmiSednicuPoIDu();
  }, [id]);
  return { sednicaPoIDu, ucitavanjePoIDu, greskaPoIDu };
}

export function VratiTipoveSednice() {
  const [tipoviSednice, postaviTip] = useState(null);
  const [ucitavanjeTipova, PostaviUcitavanje] = useState(false);
  const [greskaTipova, postaviGresku] = useState(null);

  useEffect(() => {
    const preuzmiTipove = async () => {
      PostaviUcitavanje(true);
      try {
        const podaci = await instanceSednice.UcitajSveTipove();
        postaviTip(podaci.tipoviSednice);
      } catch (greska) {
        postaviGresku(greska);
      } finally {
        PostaviUcitavanje(false);
      }
    };
    preuzmiTipove();
  }, []);
  return { tipoviSednice, ucitavanjeTipova, greskaTipova };
}

export function KreiranjeSednice() {
  const [novaSednicaKreiranje, PostaviSednicu] = useState(null);
  const [ucitavanjeKreiranja, PostaviUcitavanje] = useState(false);
  const [greskaKreiranja, PostaviGresku] = useState(null);

  const KreiranjeNoveSednice = async (podaci) => {
    PostaviUcitavanje(true);
    PostaviGresku(null);
    try {
      const odgovor = await instanceSednice.DodajNovuSednicu(podaci);
      if (odgovor.data.Uspeh) {
        PostaviSednicu(odgovor.data.napraviNovuSednicu);
        return novaSednicaKreiranje;
      }
    } catch (greska) {
      PostaviGresku(greska.response.data.Greska); //response.data je iz axiosa ne moze biti preimenovano
      console.log(greskaKreiranja);
      return greskaKreiranja;
    } finally {
      PostaviUcitavanje(false);
    }
  };

  return {
    KreiranjeNoveSednice,
    ucitavanjeKreiranja,
    greskaKreiranja,
    novaSednicaKreiranje,
  };
}

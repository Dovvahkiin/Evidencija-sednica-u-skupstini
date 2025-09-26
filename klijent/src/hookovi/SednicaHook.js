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
        return true;
      } catch (greskica) {
        PostaviGresku(greskica.message || "Greska pri ucitavanje sednica");
      } finally {
        PostaviUcitavanje(false);
      }
    };
    preuzmiSednice();
  }, []);

  return { sednice, ucitavanje, greska, PostaviSednice };
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

export function OpcijeSednice() {
  const [sednica, PostaviSednicu] = useState([]);
  const [ucitavanje, PostaviUcitavanje] = useState(false);
  const [greska, PostaviGresku] = useState(null);

  const KreiranjeNoveSednice = async (podaci) => {
    PostaviUcitavanje(true);
    PostaviGresku(null);
    try {
      const odgovor = await instanceSednice.DodajNovuSednicu(podaci);
      if (odgovor.data.Uspeh) {
        PostaviSednicu(odgovor.data.napraviNovuSednicu);
        return sednica;
      }
    } catch (greska) {
      PostaviGresku(greska.response.data.Greska); //response.data je iz axiosa ne moze biti preimenovano
      console.log(greska);
      return greska;
    } finally {
      PostaviUcitavanje(false);
    }
  };

  const IzmenaSednice = async (id, podaci) => {
    PostaviUcitavanje(true);
    PostaviGresku(null);
    try {
      const odgovor = await instanceSednice.IzmeniPostojecuSednicu(id, podaci);
      if (odgovor.data.Uspeh) {
        PostaviSednicu(odgovor.data.rezultatIzmene);
        return sednica;
      }
    } catch (greska) {
      PostaviGresku(greska.response.data);
      console.log(greska);
      return greska;
    } finally {
      PostaviUcitavanje(false);
    }
  };

  const BrisanjeSednice = async (id) => {
    PostaviUcitavanje(true);
    PostaviGresku(null);
    try {
      const odgovor = await instanceSednice.ObrisiPostojecuSednicu(id);

      PostaviSednicu((prethodna) =>
        prethodna.filter((sednica) => sednica.ID !== id)
      );
      return odgovor.data;
    } catch (greska) {
      PostaviGresku(greska.response.data);
      return greska;
    } finally {
      PostaviUcitavanje(false);
    }
  };

  return {
    BrisanjeSednice,
    IzmenaSednice,
    KreiranjeNoveSednice,
    ucitavanje,
    greska,
    sednica,
  };
}

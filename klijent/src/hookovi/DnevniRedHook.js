import { useState } from "react";
import DnevniRedServis from "../servisi/dnevniRedServis";
import { VratiSednicuPoIDu } from "../hookovi/SednicaHook";

const instanceDnevnogReda = new DnevniRedServis();

export const DnevniRedHook = () => {
  const [dnevniRed, PostaviDnevniRed] = useState("");
  const [ucitavanje, PostaviUcitavanje] = useState(false);
  const [greska, PostaviGresku] = useState(null);

  const DodavanjeDnevnogReda = async (podaci, id) => {
    PostaviUcitavanje(true);
    PostaviGresku(null);
    try {
      const { data } = await instanceDnevnogReda.DodajDnevniRed(podaci, id);
      if (data.Uspeh) {
        PostaviDnevniRed(data.kreirajDnevniRed);
        return dnevniRed;
      }
    } catch (greska) {
      PostaviGresku(greska.response.data.greska);
      return greska;
    } finally {
      PostaviUcitavanje(false);
    }
  };

  const IzmenaDnevnogReda = async (podaci, id) => {
    PostaviUcitavanje(true);
    PostaviGresku(null);
    try {
      const { data } = await instanceDnevnogReda.IzmeniDnevnired(podaci, id);
      if (data.Uspeh) {
        PostaviDnevniRed(data.azurirajDnevniRed);
        return dnevniRed;
      }
    } catch (greska) {
      PostaviGresku(greska.response.data.greska);
      return greska;
    } finally {
      PostaviUcitavanje(false);
    }
  };

  const BrisanjeDnevnogReda = async (id) => {
    PostaviUcitavanje(true);
    PostaviGresku(null);
    try {
      const { data } = await instanceDnevnogReda.IzbrisiDnevniRed(id);

      if (data.Akcija) {
        return data;
      }
    } catch (greska) {
      PostaviGresku(greska.response);
      return greska;
    } finally {
      PostaviUcitavanje(false);
    }
  };
  return {
    dnevniRed,
    ucitavanje,
    greska,
    DodavanjeDnevnogReda,
    IzmenaDnevnogReda,
    BrisanjeDnevnogReda,
  };
};

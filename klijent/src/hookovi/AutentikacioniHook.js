import { useState } from "react";
import Autentikacija from "../servisi/autentikacioniServis";

const instancaAutentikacije = new Autentikacija();

export const PrijavaOdjavaHookvoi = () => {
  const [korisnik, PostaviKorisnika] = useState(null);
  const [greskaa, PostaviGresku] = useState(null);

  const PrijavaKorisnika = async (email, lozinka) => {
    try {
      const { data } = await instancaAutentikacije.Prijava(email, lozinka);
      if (data.Uspeh) {
        PostaviKorisnika(data);
        PostaviGresku(null);
        return data.Uspeh;
      } else {
        PostaviGresku(data.Greska);
        return data.Uspeh;
      }
    } catch (greska) {
      PostaviGresku(greska.response.data.Greska);
      return null;
    }
  };
  const OdjavaKorisnika = async () => {
    await instancaAutentikacije.Odjava();
    PostaviKorisnika(null);
  };

  return { korisnik, greskaa, PrijavaKorisnika, OdjavaKorisnika };
};

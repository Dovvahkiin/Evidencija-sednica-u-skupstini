import { useState } from "react";
import Autentikacija from "../servisi/autentikacioniServis";

const autent = new Autentikacija();

export const PrijavaOdjavaHookvoi = () => {
  const [korisnik, PostaviKorisnika] = useState(null);
  const [ucitavanje, PostaviUcitavanje] = useState(false);
  const [greskaa, PostaviGresku] = useState(null);

  const PrijavaKorisnika = async (email, lozinka) => {
    try {
      PostaviUcitavanje(true);
      PostaviGresku(null);
      const { data } = await autent.Prijava(email, lozinka);
      if (data.Uspeh) {
        PostaviKorisnika(data);
        PostaviGresku(null);
        return true;
      }
    } catch (greska) {
      PostaviGresku(greska.response.data.Greska);
      return null;
    } finally {
      PostaviUcitavanje(false);
    }
  };

  const OdjavaKorisnika = async () => {
    try {
      PostaviUcitavanje(true);
      await autent.Odjava();
      PostaviKorisnika(null);
      PostaviGresku(null);
    } catch {
      PostaviGresku("Greška pri odjavi. Pokušajte ponovo.");
    } finally {
      PostaviUcitavanje(false);
    }
  };
  return { korisnik, ucitavanje, greskaa, PrijavaKorisnika, OdjavaKorisnika };
};

import React, { useEffect, useState } from "react";
import Autentikacija from "../servisi/autentikacioniServis";
import { AutentikacioniKontekst } from "./AutentikacioniKontest";

const autent = new Autentikacija();

function AutentikacioniProvajder({ children }) {
  const [korisnik, PostaviKorisnika] = useState(null);
  const [ucitavanje, PostaviUcitavanje] = useState(true);
  const [greskaAutentikacije, PostaviGresku] = useState(null);
  const [odgovorAutentikacije, PostaviOdgovor] = useState(false);

  useEffect(() => {
    const ProveriAutentikaciju = async () => {
      PostaviUcitavanje(true);
      try {
        const poruka = await autent.ProveriAuth();
        if (poruka.Uspeh) {
          PostaviKorisnika(poruka.korisnik);
          PostaviOdgovor(true);
        }
      } catch (greska) {
        PostaviOdgovor(false);
        PostaviGresku(greska.response.data.Greska);
        PostaviKorisnika(null);
      } finally {
        PostaviUcitavanje(false);
      }
    };
    ProveriAutentikaciju();
  }, []);
  const PrijavaKorisnika = async (email, lozinka) => {
    try {
      PostaviUcitavanje(true);
      PostaviGresku(null);
      const data = await autent.Prijava(email, lozinka);
      console.log(korisnik);
      if (data.Uspeh) {
        const poruka = await autent.ProveriAuth();
        if (poruka.Uspeh) {
          PostaviKorisnika(poruka.korisnik);
          PostaviGresku(null);
          PostaviOdgovor(true);
          return true;
        }
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
      PostaviOdgovor(false);
      PostaviKorisnika(null);
      PostaviGresku(null);
    } catch {
      PostaviGresku("Greška pri odjavi. Pokušajte ponovo.");
    } finally {
      PostaviUcitavanje(false);
    }
  };

  const vrednosti = {
    korisnik,
    ucitavanje,
    odgovorAutentikacije,
    greskaAutentikacije,
    PostaviKorisnika,
    PrijavaKorisnika,
    OdjavaKorisnika,
  };

  return (
    <AutentikacioniKontekst.Provider value={vrednosti}>
      {children}
    </AutentikacioniKontekst.Provider>
  );
}

export default AutentikacioniProvajder;

import React from "react";
import Header from "../komponente/Header/Header";
import { useAutentikacija } from "../scripts/AutentikacioniKontest";

function Profil() {
  const { korisnik } = useAutentikacija();
  return (
    <main>
      <Header />
      <section className="okvirSajta">
        <h1>Korisnicki profil</h1>
        <p>Ime: {korisnik.ime}</p>
        <p>Prezime: {korisnik.prezime}</p>
        <p>Email: {korisnik.email}</p>
        <p>
          Status: <span style={{ color: "green" }}>{korisnik.status}</span>
        </p>
      </section>
    </main>
  );
}

export default Profil;

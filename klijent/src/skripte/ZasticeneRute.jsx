import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAutentikacija } from "./AutentikacioniKontest"; // Pretpostavljam da je ovo tvoj AuthContext hook

const ZasticeneRute = () => {
  const { korisnik, odgovorAutentikacije, ucitavanje } = useAutentikacija();
  const daLiJePrijavljen = odgovorAutentikacije;

  // Ako se još učitava (npr. /me zahtev u toku), prikaži loading – NE redirect-uj!
  if (ucitavanje) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>Učitavam autentifikaciju...</p>{" "}
        {/* Ili koristi spinner komponentu */}
      </div>
    );
  }

  // Ako nije ulogovan, redirect na login
  if (!daLiJePrijavljen) {
    return <Navigate to="/prijava" replace />;
  }

  // Ako je ulogovan, prikaži sadržaj (Outlet za child rute)
  return <Outlet />; // Možeš dodati <p>Dobrodošao, {korisnik?.ime}!</p> ako trebaš header
};

export default ZasticeneRute;

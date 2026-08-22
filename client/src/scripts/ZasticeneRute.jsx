import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAutentikacija } from "./AutentikacioniKontest"; // Pretpostavljam da je ovo tvoj AuthContext hook

const ZasticeneRute = () => {
  const { odgovorAutentikacije, ucitavanje } = useAutentikacija();
  const daLiJePrijavljen = odgovorAutentikacije;

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
        <p>Učitavam autentifikaciju...</p>
      </div>
    );
  }
  if (!daLiJePrijavljen) {
    return <Navigate to="/prijava" replace />;
  }

  return <Outlet />;
};

export default ZasticeneRute;

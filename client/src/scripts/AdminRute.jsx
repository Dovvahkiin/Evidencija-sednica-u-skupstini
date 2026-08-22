import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAutentikacija } from "./AutentikacioniKontest";

const AdminZasticeneRute = () => {
  const { korisnik, odgovorAutentikacije, ucitavanje } = useAutentikacija();

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
        Ucitavam...
      </div>
    );
  }

  if (!odgovorAutentikacije) {
    return <Navigate to="/prijava" replace />;
  }

  if (korisnik.status !== "admin") {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default AdminZasticeneRute;

import React from "react";
import { createBrowserRouter } from "react-router-dom";

// stranice
import Pocetna from "../stranice/Pocetna";
import Prijava from "../stranice/Prijava";
import Profil from "../stranice/Profil";
import NijePronadjeno from "../stranice/NijePronadjeno";
import Sednica from "../stranice/Sednica";
import KreirajSednicu from "../stranice/adminSednica/KreirajSednicu";
import IzmeniSednicu from "../stranice/adminSednica/IzmeniSednicu";
import DodajDnevniRed from "../stranice/adminSednica/DodajDnevniRed";
import IzmeniDnevniRed from "../stranice/adminSednica/IzmeniDnevniRed";
import ZasticeneRute from "../scripts/ZasticeneRute";
import AdminZasticeneRute from "../scripts/AdminRute";
import StampaStranica from "../stranice/StampaStranica";

//funkcija routera

const ruter = createBrowserRouter([
  {
    path: "/",
    element: <Pocetna />,
    errorElement: <NijePronadjeno />,
  },
  {
    path: "/prijava",
    element: <Prijava />,
  },
  {
    element: <ZasticeneRute />,
    children: [
      {
        path: "/profil",
        element: <Profil />,
      },
      {
        path: "/sednica/:id",
        element: <Sednica />,
      },
      {
        path: "/stampa/:id",
        element: <StampaStranica />,
      },
    ],
  },
  {
    element: <AdminZasticeneRute />,
    children: [
      {
        path: "/kreirajsednicu",
        element: <KreirajSednicu />,
      },
      {
        path: "/sednica/:id/izmenisednicu",
        element: <IzmeniSednicu />,
      },
      {
        path: "/sednica/:id/dodajdnevnired",
        element: <DodajDnevniRed />,
      },
      {
        path: "/sednica/:id/izmenidnevnired",
        element: <IzmeniDnevniRed />,
      },
    ],
  },
]);

export default ruter;

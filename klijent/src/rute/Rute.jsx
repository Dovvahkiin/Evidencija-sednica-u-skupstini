import React from "react";
import { createBrowserRouter } from "react-router-dom";

// stranice
import Pocetna from "../stranice/Pocetna";
import Prijava from "../stranice/Prijava";
import Profil from "../stranice/Profil";
import NijePronadjeno from "../stranice/NijePronadjeno";
import Sednica from "../stranice/Sednica";
import KreirajSednicu from "../stranice/KreirajSednicu";
import IzmeniSednicu from "../stranice/IzmeniSednicu";
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
    path: "/profil",
    element: <Profil />,
  },
  {
    path: "/sednica/:id",
    element: <Sednica />,
  },
  {
    path: "/kreirajsednicu",
    element: <KreirajSednicu />,
  },
  {
    path: "/izmenisednicu",
    element: <IzmeniSednicu />,
  },
]);

export default ruter;

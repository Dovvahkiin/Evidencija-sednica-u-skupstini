import React from "react";
import { createBrowserRouter } from "react-router-dom";

// stranice
import Pocetna from "../stranice/Pocetna";
import Prijava from "../stranice/Prijava";
import Profil from "../stranice/Profil";
import NijePronadjeno from "../stranice/NijePronadjeno";
import Sednica from "../stranice/Sednica";
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
    path: "/sednice/:id",
    element: <Sednica />,
  },
]);

export default ruter;

import React from "react";
import { RouterProvider, Link } from "react-router-dom";
import ruter from "./rute/Rute";
import AutentikacioniProvajder from "./skripte/AutentikacioniProvajder";

function App() {
  return (
    <AutentikacioniProvajder>
      <RouterProvider router={ruter} />
    </AutentikacioniProvajder>
  );
}

export default App;

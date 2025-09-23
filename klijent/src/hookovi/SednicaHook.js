import { useState, useEffect } from "react";
import SedniceServis from "../servisi/SedniceServis";

const instanceSednice = new SedniceServis();

export function VratiSednice() {
  const [sednice, PostaviSednice] = useState([]);
  const [ucitavanje, PostaviUcitavanje] = useState(true);
  const [greska, PostaviGresku] = useState(null);

  useEffect(() => {
    const preuzmiSednice = async () => {
      try {
        const podaci = await instanceSednice.UcitajSednice(); // vraca objekat u kome stoje iz backenda {akcija:..., pregledSvihSednica: [sednice]}
        PostaviSednice(podaci.pregledajSveSednice);
      } catch (greskica) {
        PostaviGresku(greskica.message || "Greska pri ucitavanje sednica");
      } finally {
        PostaviUcitavanje(false);
      }
    };
    preuzmiSednice();
  }, []);

  return { sednice, ucitavanje, greska };
}

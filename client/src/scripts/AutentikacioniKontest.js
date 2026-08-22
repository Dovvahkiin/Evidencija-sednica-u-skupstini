import { createContext, useContext } from "react";

export const AutentikacioniKontekst = createContext(null);

export const useAutentikacija = () => {
  return useContext(AutentikacioniKontekst);
};

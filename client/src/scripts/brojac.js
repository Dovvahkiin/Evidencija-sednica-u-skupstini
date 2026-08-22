import clanovi from "../../../server/BussinessLogic/ukupnoClanova.json";

const ukupnoClanova = clanovi.ukupanBrojClanova;
let brojac;

export function brojacPrisutnih() {
  const brojevi = [];
  for (brojac = 0; brojac <= ukupnoClanova; brojac++) {
    brojevi.push(brojac);
  }
  return brojevi;
}

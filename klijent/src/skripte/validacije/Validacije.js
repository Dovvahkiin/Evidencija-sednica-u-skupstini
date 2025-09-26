import clanovi from "../../../../server/poslovnaPravila/ukupnoClanova.json";
export const ValidacijaSednice = (podaci = {}) => {
  const greske = [];

  const { NazivSednice, DatumSednice, BrojPrisutnih, StatusSedniceID } = podaci;
  if (
    !NazivSednice ||
    NazivSednice.length === 0 ||
    NazivSednice.trim() === ""
  ) {
    greske.push("Naziv sednice ne može biti prazan\n");
  }
  if (!DatumSednice || DatumSednice.trim() === "") {
    greske.push("Datum sednice ne moze biti prazan! \n");
  }

  if (
    !BrojPrisutnih ||
    BrojPrisutnih.trim() === "" ||
    BrojPrisutnih > clanovi.ukupanBrojClanova ||
    BrojPrisutnih < 0
  ) {
    greske.push(
      "Broj prisutnih ne moze biti veci od: " +
        clanovi.ukupanBrojClanova +
        " ili manji od 0 ili prazan!\n"
    );
  }

  if (
    !StatusSedniceID ||
    StatusSedniceID > 4 ||
    StatusSedniceID < 1 ||
    StatusSedniceID.trim() === ""
  ) {
    greske.push("Status ne moze biti veci od 4 ili manji od 1 ili prazan\n");
  }

  if (greske.length > 0) return greske;
  else return false;
};

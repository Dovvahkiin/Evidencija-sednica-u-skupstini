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
    BrojPrisutnih > clanovi.ukupanBrojClanova ||
    BrojPrisutnih < 0
  ) {
    greske.push(
      "Broj prisutnih ne moze biti veci od: " +
        clanovi.ukupanBrojClanova +
        " ili manji od 0 ili prazan!\n"
    );
  }

  if (!StatusSedniceID || StatusSedniceID > 4 || StatusSedniceID < 1) {
    greske.push("Status ne moze biti veci od 4 ili manji od 1 ili prazan\n");
  }

  if (greske.length > 0) return greske;
  else return false;
};

export const ValidacijaDnevnogReda = (tekst) => {
  const greske = [];

  if (!tekst || tekst.trim() === "") {
    greske.push("Dnevni red ne moze biti prazan!\n");
  }
  if (greske.length > 0) return greske;
  else return false;
};

export const ValidacijaPrijave = (podaci = {}) => {
  const emailTest = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const { email, lozinka } = podaci;

  const greske = [];

  if (!email) {
    greske.push("Email ne moze biti prazan!\n");
  } else if (!emailTest.test(email)) {
    greske.push("Email adresa nije validna.\n");
  }

  if (!lozinka || lozinka.trim() === "") {
    greske.push("Lozinka ne moze biti prazna!\n");
  }
  if (greske.length > 0) return greske;
};

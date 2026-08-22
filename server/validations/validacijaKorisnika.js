class ValidacijaKorisnika {
  ValidirajPrijavu = async (podaciKorisnika = []) => {
    const { email, lozinka } = podaciKorisnika;
    const greske = [];

    if (!email || email.trim() === "") {
      greske.push("Greska: Email ne moze biti prazan!\n");
    }
    if (!lozinka || lozinka.trim() === "") {
      greske.push("Greska: Lozinka ne moze biti prazan!\n");
    }

    console.log("Greske:\n");
    return greske;
  };
}

module.exports = { ValidacijaKorisnika };

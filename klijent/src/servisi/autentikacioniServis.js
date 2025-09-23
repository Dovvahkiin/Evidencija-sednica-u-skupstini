import KoriscenjeAxiosa from "./APIServis";

class Autentikacija extends KoriscenjeAxiosa {
  Prijava = async (email, lozinka) => {
    const podaci = await this.api.post("/prijava", { email, lozinka });
    return podaci;
  };
}
export default Autentikacija;

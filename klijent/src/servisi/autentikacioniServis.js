import KoriscenjeAxiosa from "./APIServis";

class Autentikacija extends KoriscenjeAxiosa {
  Prijava = async (email, lozinka) => {
    const { data } = await this.api.post("/prijava", { email, lozinka });
    return data;
  };
  Odjava = async () => {
    const { data } = await this.api.post("/odjava");
    return data;
  };
  VratiProfil = async () => {
    const { data } = await this.api.get("/profil");
    return data;
  };
}
export default Autentikacija;

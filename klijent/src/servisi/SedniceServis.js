import KoriscenjeAxiosa from "./APIServis";

class SedniceServis extends KoriscenjeAxiosa {
  UcitajSednice = async () => {
    const { data } = await this.api.get("/sednice");
    return data;
  };
}

export default SedniceServis;

import KoriscenjeAxiosa from "./APIServis";

class SedniceServis extends KoriscenjeAxiosa {
  UcitajSednice = async () => {
    const { data } = await this.api.get("/sednice");
    return data;
  };

  UcitajSednicuPoIDu = async (id) => {
    const { data } = await this.api.get(`/sednica/${id}`);
    console.log(data);
    return data;
  };
}

export default SedniceServis;

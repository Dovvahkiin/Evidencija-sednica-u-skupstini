import KoriscenjeAxiosa from "./APIServis";

class SedniceServis extends KoriscenjeAxiosa {
  UcitajSednice = async () => {
    const { data } = await this.api.get("/sednice");
    return data;
  };

  UcitajSednicuPoIDu = async (id) => {
    const { data } = await this.api.get(`/sednica/${id}`);
    return data;
  };

  UcitajSveTipove = async () => {
    const { data } = await this.api.get("/tipovisednice");
    return data;
  };
  DodajNovuSednicu = async (podaciUnosa) => {
    const data = await this.api.post("/sednice", podaciUnosa);
    return { data };
  };
  IzmeniPostojecuSednicu = async (id, podaci) => {
    const { data } = await this.api.put(`/sednica/${id}`, podaci);
    console.log(data);
    return data;
  };
  ObrisiPostojecuSednicu = async (id) => {
    const { data } = await this.api.delete(`/sednica/${id}`);
    return data;
  };
}

export default SedniceServis;

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
    const odogvor = await this.api.post("/sednice", podaciUnosa);
    return odogvor.data;
  };
  IzmeniPostojecuSednicu = async (id, podaci) => {
    const odgovor = await this.api.put(`/sednica/${id}`, podaci);
    console.log(odgovor.data);
    return odgovor.data;
  };
}

export default SedniceServis;

import KoriscenjeAxiosa from "./APIServis";

class DnevniRedServis extends KoriscenjeAxiosa {
  DodajDnevniRed = async (podaci, id) => {
    const { data } = await this.api.post(`/sednica/${id}/dnevnired`, {
      TekstTacke: podaci,
    });
    return data;
  };
  IzmeniDnevnired = async (podaci, id) => {
    const { data } = await this.api.put(`/sednica/${id}/dnevnired`, {
      TekstTacke: podaci,
    });
    return data;
  };
  IzbrisiDnevniRed = async (id) => {
    const { data } = await this.api.delete(`/sednica/${id}/dnevnired`);
    return data;
  };
}

export default DnevniRedServis;

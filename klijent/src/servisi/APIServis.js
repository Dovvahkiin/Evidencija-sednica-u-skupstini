import axios from "axios";

class KoriscenjeAxiosa {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:3000",
      withCredentials: true,
    });
  }
}

export default KoriscenjeAxiosa;

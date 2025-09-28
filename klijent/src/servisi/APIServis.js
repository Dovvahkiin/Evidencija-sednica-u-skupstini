import axios from "axios";
const nodePort = import.meta.env.VITE_NODE_PORT;

class KoriscenjeAxiosa {
  constructor() {
    this.api = axios.create({
      baseURL: `http://localhost:${nodePort}`,
      withCredentials: true,
    });
  }
}

export default KoriscenjeAxiosa;

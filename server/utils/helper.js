import path from "path";
import { fileURLToPath } from "url";

// esm __dirname
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

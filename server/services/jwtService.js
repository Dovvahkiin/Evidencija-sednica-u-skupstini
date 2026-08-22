import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { REFRESH_SECRET, ACCESS_SECRET } from "../config/serverConfig";

class JwtService {
  generateAccessToken = (user) => {
    return jwt.sign(
      {
        id: user.id,
        email: user.emailKorisnika,
        role: user.statusKorisnika,
      },
      ACCESS_SECRET,
      { expiresIn: "1h" },
    ); //change after refactoring db
  };

  generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: "30d" });
  };

  verifyAccessToken = (token) => {
    return jwt.verify(token, ACCESS_SECRET);
  };

  verifyRefreshToken = (token) => {
    return jwt.verify(token, REFRESH_SECRET);
  };
}

export default JwtService;

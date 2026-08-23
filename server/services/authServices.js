import JwtService from "./jwtService.js";
import UserModel from "../models/userModel.js";

class AuthenticationService {
  static login = async (userDetails) => {
    const { email, password } = userDetails;
    const user = await UserModel.userLogin(email, password);

    if (!user) throw new Error("Invalid Credentials");

    if (password != user.password) throw new Error("Invalid Credentials");

    const newAccessToken = await JwtService.generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.status,
    });

    const newRefreshToken = await JwtService.generateRefreshToken({
      id: user.id,
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user: {
        id: user.id,
        email: user.emailKorisnika,
        role: user.statusKorisnika,
      },
    };
  };
}

export default AuthenticationService;

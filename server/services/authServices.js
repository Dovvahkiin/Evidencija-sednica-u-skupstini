import JwtService from "./jwtService.js";
import UserModel from "../models/userModel.js";

class AuthenticationService {
  static login = async (userDetails) => {
    const { email, password } = userDetails;
    const user = await UserModel.userLogin(email, password);

    if (!user) throw new Error("Invalid Credentials");
    if (password != user.UserPassword) throw new Error("Invalid Credentials");

    const newAccessToken = await JwtService.generateAccessToken(user);

    const newRefreshToken = await JwtService.generateRefreshToken(user);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user: {
        id: user.ID,
        email: user.Email,
        role: user.UserRole,
      },
    };
  };
}

export default AuthenticationService;

import JwtService from "../services/jwtService";
import { genericCatchBlock } from "../utils/constants";
import UserValidations from "../validations/userValidations";
import { setCookies, deleteCookies } from "../services/cookieServices";

class AuthenticationController {
  static login = async (req, res) => {
    try {
      const data = req.body;
      const validationResult = await UserValidations.loginValidation(data);
      if (validationResult.length > 0)
        return res.status(400).json({ errors: validationResult.errors });

      const tokens = await JwtService.login(data);
      setCookies(res, tokens);

      return res
        .status(200)
        .json({ success: true, message: "User is logged in!", tokens });
    } catch (error) {
      return genericCatchBlock(res, error);
    }
  };

  static logout = (req, res) => {
    deleteCookies();
    return res
      .status(200)
      .json({ success: true, message: "You are successfully logged out!" });
  };
}

export default AuthenticationController;

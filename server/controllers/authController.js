import JwtService from "../services/jwtService";
import { genericCatchBlock } from "../utils/constants";
import UserValidations from "../validations/userValidations";

class AuthenticationController {
  login = async (req, res) => {
    try {
      const data = req.body;
      const validationResult = await UserValidations.loginValidation(data);
    } catch (error) {
      return genericCatchBlock(res, error);
    }
  };
}

export default AuthenticationController;

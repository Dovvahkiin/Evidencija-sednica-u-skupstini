import UserServices from "../services/userServices.js";
import { genericCatchBlock } from "../utils/constants.js";

class UserController {
  static getProfile = async (req, res) => {
    try {
      const id = req.user.id;
      const profile = await UserServices.getUserById(id);

      if (!profile)
        return res.status(404).json({ message: "User does not exists." });
      return res.status(200).json({ profile: profile });
    } catch (error) {
      return genericCatchBlock(res, error);
    }
  };
}

export default UserController;

import UserServices from "../services/userServices";
import { genericCatchBlock } from "../utils/constants";

class UserController {
  getProfile = async (req, res) => {
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

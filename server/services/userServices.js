import DBModel from "../models/dbModel";
import UserModel from "../models/userModel";

class UserServices extends DBModel {
  getUserById = async (id) => {
    return UserModel.getById(id);
  };
}

export default UserServices;

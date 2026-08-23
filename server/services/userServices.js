import DBModel from "../models/dbModel.js";
import UserModel from "../models/userModel.js";

class UserServices extends DBModel {
  static getUserById = async (id) => {
    return UserModel.getById(id);
  };
}

export default UserServices;

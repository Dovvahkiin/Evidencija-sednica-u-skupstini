import DBModel from "../models/dbModel.js";
const profile = new DBModel("userprofile");

class UserServices extends DBModel {
  static getUserById = async (id) => {
    return profile.getById(id);
  };
}

export default UserServices;

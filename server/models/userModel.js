import DBModel from "./dbModel.js";

class UserModel extends DBModel {
  constructor() {
    super("userprofile");
  }

  static userLogin = async (email, password) => {
    const query =
      "SELECT * FROM meetingrecords.userprofile where Email = ? and UserPassword = ? LIMIT 1";
    const result = await this.doExecuteQuery(query, [email, password]);

    return result[0][0];
  };
}

export default UserModel;

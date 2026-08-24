import DBModel from "./dbModel.js";

class UserModel extends DBModel {
  constructor() {
    super("users");
  }

  static userLogin = async (email, password) => {
    const query =
      "SELECT * FROM meetingrecords.users where userEmail = ? and userPassword = ? LIMIT 1";
    const result = await this.doExecuteQuery(query, [email, password]);

    return result[0][0];
  };
}

export default UserModel;

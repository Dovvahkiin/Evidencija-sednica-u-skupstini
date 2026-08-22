import DBModel from "./dbModel";

class UserModel extends DBModel {
  constructor() {
    super("pregledProfilaKorisnika");
  }

  userLogin = async (email, password) => {
    const query =
      "SELECT * FROM pregledProfilaKorisnika where EmailKorisnika = ? and LozinkaKorisnika = ? LIMIT 1";
    return await this.doExecuteQuery(query, [email, password]);
  };
}

export default UserModel;

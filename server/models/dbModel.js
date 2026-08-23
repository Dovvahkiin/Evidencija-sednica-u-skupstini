import { dbData } from "../config/dbConfig.js";

class DBModel {
  constructor(tableName) {
    this.tableName = tableName;
  }

  static async doQuery(query, params = []) {
    const [result] = await dbData.query(query, params);
    return result;
  }

  static async doExecuteQuery(query, params = []) {
    const [result] = await dbData.execute(query, params);
    return result;
  }

  static async getAll() {
    const query = `select * from ${this.tableName}`;
    const result = await this.doQuery(query);
    return result;
  }

  static async getById(id) {
    const query = `select * from ${this.tableName} where ID = ?`;
    const result = await this.doExecuteQuery(query, [id]);
    return result[0]; //returns first match
  }
}

export default DBModel;

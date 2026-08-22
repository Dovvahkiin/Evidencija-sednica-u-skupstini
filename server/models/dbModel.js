import dbData from "../config/dbConfig.js";

class DBModel {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async doQuery(query, params = []) {
    const [result] = await dbData.query(query, params);
    return result;
  }

  async doExecuteQuery(query, params = []) {
    const [result] = await dbData.execute(query, params);
    return result;
  }

  async getAll() {
    const query = `select * from ${this.tableName}`;
    const result = await this.doQuery(query);
    return result;
  }

  async getById(id) {
    const query = `select * from ${this.tableName} where ID = ?`;
    const result = await this.doExecuteQuery(query, [id]);
    return result[0]; //returns first match
  }
}

export default DBModel;

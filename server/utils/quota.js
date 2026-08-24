import fs from "fs";
import path from "path";
import { __dirname } from "./helper.js";
const membersInput = path.join(__dirname, "members.json");

const quota = () => {
  const totalNumberOfMembers = MembersClass.loadNumberOfMembers();
  const result = Math.floor((totalNumberOfMembers * 50) / 100 + 1);
  return result;
};

class MembersClass {
  static loadNumberOfMembers = () => {
    const result = JSON.parse(fs.readFileSync(membersInput, "utf8"));
    return result.numberOfMembers;
  };
  static membersCheck = async (data) => {
    const isThereEnoughMembers = quota();
    if (data >= isThereEnoughMembers) return true;
    else return false;
  };
}

export default MembersClass;

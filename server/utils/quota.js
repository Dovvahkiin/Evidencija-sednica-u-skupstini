import fs from "fs";
import path from "path";
const membersInput = path.join(__dirname, "members.json");

const quota = async () => {
  const totalNumberOfMembers = await MembersClass.loadNumberOfMembers();
  const result = Math.floor((totalNumberOfMembers * 50) / 100 + 1);
  return result;
};

class MembersClass {
  loadNumberOfMembers = async () => {
    const result = JSON.parse(fs.readFileSync(membersInput, "utf8"));
    return result.numberOfMembers;
  };
  membersCheck = async (data) => {
    const isThereEnoughMembers = await quota();
    if (data >= isThereEnoughMembers) return true;
    else return false;
  };
}

export default MembersClass;

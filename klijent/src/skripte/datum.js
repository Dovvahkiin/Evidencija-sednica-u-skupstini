const danas = new Date();

const godina = danas.getFullYear();
const mesec = (danas.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
const dan = danas.getDate().toString().padStart(2, "0");

export const danasnjiDatum = `${godina}-${mesec}-${dan}`;

const danas = new Date();

const godina = danas.getFullYear();
const mesec = (danas.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
const dan = danas.getDate().toString().padStart(2, "0");

const sat = danas.getHours().toString().padStart(2, "0");
const minut = danas.getMinutes().toString().padStart(2, "0");

export const vreme = `${sat}:${minut}`;

export const danasnjiDatum = `${godina}-${mesec}-${dan}`;
export const danasnjiDatumSaTackama = `${dan}.${mesec}.${godina}`;

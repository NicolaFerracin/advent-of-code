const md5 = require("md5");
const { getRawInput } = require("./utils");

const starOne = () => {
  const roomId = getRawInput("day05");
  const pw = [];
  let i = 0;
  while (pw.length < 8) {
    while (true) {
      i++;
      const hashed = md5(`${roomId}${i}`);
      if (hashed.startsWith("00000")) {
        pw.push(hashed[5]);
        break;
      }
    }
  }
  return pw.join("");
};

const starTwo = () => {
  const roomId = getRawInput("day05");
  const pw = new Array(8).fill(-1);
  let i = 0;
  while (pw.find((x) => x === -1)) {
    while (true) {
      i++;
      const hashed = md5(`${roomId}${i}`);
      if (hashed.startsWith("00000")) {
        const pos = Number(hashed[5]);
        const val = hashed[6];
        if (pos >= 0 && pos <= 7 && pw[pos] === -1) pw[pos] = val;
        break;
      }
    }
  }
  return pw.join("");
};

console.log(starOne());
console.log(starTwo());

const generateDragonCurve = (len, str) => {
  while (str.length < len) {
    const x = str
      .split("")
      .reverse()
      .join("")
      .replaceAll("0", "x")
      .replaceAll("1", "0")
      .replaceAll("x", "1");
    str = str + "0" + x;
  }
  return str.substring(0, len);
};

const getChecksum = (str) => {
  let checksum = str;
  while (checksum.length % 2 === 0) {
    let newChecksum = "";
    for (let i = 0; i < checksum.length - 1; i += 2) {
      if (checksum[i] === checksum[i + 1]) newChecksum += "1";
      else newChecksum += "0";
    }
    checksum = newChecksum;
  }
  return checksum;
};

const starOne = () => {
  const LEN = 272;
  const INITIAL = "10010000000110000";
  const str = generateDragonCurve(LEN, INITIAL);
  const checksum = getChecksum(str);

  return checksum;
};

const starTwo = () => {
  const LEN = 35651584;
  const INITIAL = "10010000000110000";
  const str = generateDragonCurve(LEN, INITIAL);
  const checksum = getChecksum(str);

  return checksum;
};

console.log(starOne());
console.log(starTwo());

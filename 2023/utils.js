const fs = require("fs");
const { EOL } = require("os");

const getRawInput = (day) =>
  fs.readFileSync(`${__dirname}/input/${day}`, "utf-8");

const getStringArrayInput = (day) => getRawInput(day).split(EOL);

const getNumberArrayInput = (day) =>
  getStringArrayInput(day).map((_) => Number(_));

const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

const gcd = (a, b) => (b ? gcd(b, a % b) : a);

const lcm = (vals) => {
  while (vals.length > 1) {
    const a = vals.pop();
    const b = vals.pop();
    const lcm = Math.abs(a * b) / gcd(a, b);
    vals.push(lcm);
  }
  return vals[0];
};

module.exports = {
  getRawInput,
  getStringArrayInput,
  getNumberArrayInput,
  deepClone,
  lcm,
  gcd,
};

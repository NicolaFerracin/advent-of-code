const fs = require("fs");
const { EOL } = require("os");

const getRawInput = (day) =>
  fs.readFileSync(`${__dirname}/input/${day}`, "utf-8");

const getStringArrayInput = (day) => getRawInput(day).split(EOL);

const getNumberArrayInput = (day) =>
  getStringArrayInput(day).map((_) => Number(_));

const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

module.exports = {
  getRawInput,
  getStringArrayInput,
  getNumberArrayInput,
  deepClone,
};

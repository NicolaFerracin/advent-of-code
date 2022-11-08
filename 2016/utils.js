const fs = require("fs");

const getRawInput = (day) =>
  fs.readFileSync(`${__dirname}/input/${day}`, "utf-8");

const getStringArrayInput = (day) => getRawInput(day).split("\n");

const getNumberArrayInput = (day) =>
  getStringArrayInput(day).map((_) => Number(_));

module.exports = {
  getRawInput,
  getStringArrayInput,
  getNumberArrayInput,
};

const fs = require("fs");
const { EOL } = require("os");

const readInput = (day) =>
  fs.readFileSync(`${__dirname}/input/${day}`, "utf8").trim();

const splitInputByLine = (input) => input.split(EOL);

const wrapValue = (val, max) => ((val % max) + max) % max;

const print = (fn) => {
  console.time(fn.name);
  console.log(fn());
  console.timeEnd(fn.name);
};

const copy = (v) => JSON.parse(JSON.stringify(v));

module.exports = {
  readInput,
  splitInputByLine,
  wrapValue,
  print,
  copy,
};

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

const reverseStr = (str) => str.split("").reverse().join("");

const straightLineDistance = (a, b) =>
  Math.sqrt(
    Math.pow(a[0] - b[0], 2) +
      Math.pow(a[1] - b[1], 2) +
      Math.pow(a[2] - b[2], 2)
  );

module.exports = {
  readInput,
  splitInputByLine,
  wrapValue,
  print,
  copy,
  reverseStr,
  straightLineDistance,
};

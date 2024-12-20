const fs = require("fs");
const { EOL } = require("os");

const getRawInput = (day) =>
  fs.readFileSync(`${__dirname}/input/${day}`, "utf-8");

const getStringArrayInput = (day) => getRawInput(day).split(EOL);

const getNumberArrayInput = (day) =>
  getStringArrayInput(day).map((_) => Number(_));

const moveMap = {
  0: (x, y) => ({ x: x - 1, y }), // Up
  1: (x, y) => ({ x: x, y: y + 1 }), // Right
  2: (x, y) => ({ x: x + 1, y }), // Down
  3: (x, y) => ({ x: x, y: y - 1 }), // Left
};

const manhattanDist = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);

module.exports = {
  getRawInput,
  getStringArrayInput,
  getNumberArrayInput,
  moveMap,
  manhattanDist,
};

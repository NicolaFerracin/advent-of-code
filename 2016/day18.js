const { getRawInput } = require("./utils");

const exec = (rows) => {
  const firstRow = getRawInput("day18").split("");
  let totalSafe = firstRow.join("").replaceAll("^", "").length;
  let prevRow = firstRow;
  for (let i = 0; i < rows; i++) {
    const nextRow = [];

    for (let x = 0; x < prevRow.length; x++) {
      const left = x === 0 ? "." : prevRow[x - 1];
      const center = prevRow[x];
      const right = x === prevRow.length - 1 ? "." : prevRow[x + 1];

      const isTrap =
        // Its left and center tiles are traps, but its right tile is not.
        (left === center && left === "^" && left !== right) ||
        // Its center and right tiles are traps, but its left tile is not.
        (right === center && right === "^" && left !== right) ||
        // Only its left tile is a trap.
        (left === "^" && left !== right && left !== center) ||
        // Only its right tile is a trap.
        (right === "^" && right !== left && right !== center);

      nextRow.push(isTrap ? "^" : ".");
      totalSafe += isTrap ? 0 : 1;
    }
    prevRow = nextRow;
  }

  return totalSafe;
};

const starOne = () => {
  return exec(39);
};

const starTwo = () => {
  return exec(400000 - 1);
};

console.log(starOne());
console.log(starTwo());

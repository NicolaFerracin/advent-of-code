const { getRawInput, rotateMatrix } = require("./utils");
const { EOL } = require("os");

const input = getRawInput("day13")
  .split(`${EOL}${EOL}`)
  .map((x) => x.split(EOL).map((y) => y.split("")));

const getMirroredRow = (grid, targetSmudges) => {
  // for each row...
  for (let i = 0; i < grid.length - 1; i++) {
    let isSame = true;
    let smudges = 0;
    // check the smudges against the next row
    for (let x = 0; x < grid[i].length; x++) {
      if (grid[i][x] !== grid[i + 1][x]) smudges++;
    }
    // if the two rows have not too many smudges...
    if (isSame && smudges <= targetSmudges) {
      // move one row un and one row down at a time
      let delta = 1;
      while (true) {
        // out of bounds check
        if (i - delta < 0 || i + delta + 1 >= grid.length) break;
        // check again for smudges in the new rows
        for (let x = 0; x < grid[i].length; x++) {
          if (grid[i - delta][x] !== grid[i + delta + 1][x]) smudges++;
        }
        // if there are too many smudges, return
        if (smudges > targetSmudges) {
          isSame = false;
          break;
        }
        delta++;
      }
      // we are done only if the rows that have been checked are the same
      // and the number of smudges is exactly what we want it to be
      if (isSame && smudges === targetSmudges) {
        return i + 1;
      }
    }
  }
  return 0;
};

const starOne = () => {
  return input.reduce(
    (total, pattern) =>
      (total +=
        100 * getMirroredRow(pattern, 0) +
        getMirroredRow(rotateMatrix(pattern), 0)),
    0
  );
};

const starTwo = () => {
  return input.reduce(
    (total, pattern) =>
      (total +=
        100 * getMirroredRow(pattern, 1) +
        getMirroredRow(rotateMatrix(pattern), 1)),
    0
  );
};

console.log(starOne());
console.log(starTwo());

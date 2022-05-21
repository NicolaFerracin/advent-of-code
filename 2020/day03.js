const { getStringArrayInput } = require("./utils");

console.log(
  (function starOne() {
    const grid = getStringArrayInput("day03").map((line) => line.split(""));

    let row = 0;
    let col = 0;
    let trees = 0;

    while (row < grid.length) {
      if (grid[row % grid.length][col % grid[0].length] === "#") trees++;

      row += 1;
      col += 3;
    }

    return trees;
  })()
);

console.log(
  (function starTwo() {
    const grid = getStringArrayInput("day03").map((line) => line.split(""));

    return [
      [1, 1],
      [1, 3],
      [1, 5],
      [1, 7],
      [2, 1],
    ].reduce((acc, curr) => {
      let row = 0;
      let col = 0;
      let trees = 0;

      while (row < grid.length) {
        if (grid[row % grid.length][col % grid[0].length] === "#") trees++;

        row += curr[0];
        col += curr[1];
      }

      return acc * trees;
    }, 1);
  })()
);

const { getStringArrayInput } = require("./utils");

const exec = (forceCornersToOn) => {
  let grid = getStringArrayInput("day18").map((x) => x.split(""));

  const H = grid.length;
  const W = grid[0].length;

  for (let i = 0; i < 100; i++) {
    const newGrid = JSON.parse(JSON.stringify(grid));

    for (let x = 0; x < H; x++) {
      for (let y = 0; y < W; y++) {
        const cell = grid[x][y];
        let on = 0;

        // row above
        if (x > 0 && y > 0) on += grid[x - 1][y - 1] === "#";
        if (x > 0) on += grid[x - 1][y] === "#";
        if (x > 0 && y < W) on += grid[x - 1][y + 1] === "#";

        // left and right
        if (y > 0) on += grid[x][y - 1] === "#";
        if (y < W) on += grid[x][y + 1] === "#";

        // row below
        if (x < H - 1 && y > 0) on += grid[x + 1][y - 1] === "#";
        if (x < H - 1) on += grid[x + 1][y] === "#";
        if (x < H - 1 && y < W) on += grid[x + 1][y + 1] === "#";

        if (cell === "#") {
          newGrid[x][y] = on === 2 || on === 3 ? "#" : ".";
        } else {
          newGrid[x][y] = on === 3 ? "#" : ".";
        }
      }
    }

    grid = newGrid;
    if (forceCornersToOn) {
      grid[0][0] = "#";
      grid[0][W - 1] = "#";
      grid[H - 1][0] = "#";
      grid[H - 1][W - 1] = "#";
    }
  }

  return grid.reduce(
    (total, row) =>
      (total += row.reduce(
        (totalRow, cell) => (totalRow += cell === "#" ? 1 : 0),
        0
      )),
    0
  );
};

const starOne = () => {
  return exec();
};

const starTwo = () => {
  return exec(true);
};

console.log(starOne());
console.log(starTwo());

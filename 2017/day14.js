const { knotHash } = require("./day10.js");

const INPUT = "jxqlasbh";

const generateGrid = () => {
  const grid = [];
  for (let i = 0; i < 128; i++) {
    const row = [];
    const knotted = knotHash(`${INPUT}-${i}`);
    let binary = "";
    for (const char of knotted) {
      binary += `000${parseInt(char, 16).toString(2)}`.substr(-4);
    }
    for (const bit of binary) {
      row.push(+bit);
    }
    grid.push(row);
  }
  return grid;
};

const starOne = () => {
  return generateGrid().reduce(
    (total, row) =>
      (total += row.reduce((totalRow, cell) => (totalRow += cell), 0)),
    0
  );
};

const starTwo = () => {
  const dfs = (x, y) => {
    if (x < 0 || y < 0) return;
    if (x > grid.length - 1 || y > grid[0].length - 1) return;
    if (grid[x][y] === 0) return;
    if (seen.has(`${x}-${y}`)) return;

    seen.add(`${x}-${y}`);
    dfs(x + 1, y);
    dfs(x - 1, y);
    dfs(x, y + 1);
    dfs(x, y - 1);
  };

  const grid = generateGrid();
  const seen = new Set();
  let regions = 0;
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (grid[x][y] === 0) continue;
      if (seen.has(`${x}-${y}`)) continue;

      regions++;
      dfs(x, y);
    }
  }

  return regions;
};

console.log(starOne());
console.log(starTwo());

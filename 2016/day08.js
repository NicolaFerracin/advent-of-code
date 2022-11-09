const { getStringArrayInput } = require("./utils");

const H = 6;
const W = 50;

const createGrid = () => {
  const grid = [];
  for (let x = 0; x < H; x++) {
    const row = [];
    for (let y = 0; y < W; y++) {
      row.push(" ");
    }
    grid.push(row);
  }
  return grid;
};

const execute = () => {
  const grid = createGrid();
  getStringArrayInput("day08").forEach((line) => {
    const [op, ...parts] = line.split(" ");
    if (op === "rect") {
      const [w, h] = parts[0].split("x");
      for (let x = 0; x < h; x++) {
        for (let y = 0; y < w; y++) {
          grid[x][y] = "X";
        }
      }
    } else {
      const [what, indexRaw, , amount] = parts;
      const index = indexRaw.substring(2);
      if (what === "column") {
        for (let i = 0; i < amount; i++) {
          let prev = grid[H - 1][index];
          for (let x = 0; x < grid.length; x++) {
            const temp = grid[x][index];
            grid[x][index] = prev;
            prev = temp;
          }
        }
      } else {
        for (let i = 0; i < amount; i++) {
          let prev = grid[index][W - 1];
          for (let y = 0; y < grid[index].length; y++) {
            const temp = grid[index][y];
            grid[index][y] = prev;
            prev = temp;
          }
        }
      }
    }
  });
  return grid;
};

const countLeds = (total, row) =>
  (total += row.reduce((totalRow, cell) => (totalRow += cell === "X" ? 1 : 0)));

const starOne = () => {
  return execute().reduce(countLeds, 0);
};

const starTwo = () => {
  const grid = execute();

  const letters = [];
  for (let x = 0; x < H; x++) {
    for (let y = 0; y < W; y++) {
      if (x === 0 && y % 5 === 0) {
        letters.push([[], [], [], [], [], []]);
      }
      letters[Math.floor(y / 5)][x].push(grid[x][y]);
    }
  }

  return letters;
};

console.log(starOne());
console.log(starTwo());

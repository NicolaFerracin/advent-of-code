const { getStringArrayInput } = require("./utils");

const createGrid = () => {
  const grid = [];
  for (let x = 0; x < 1_000; x++) {
    const row = [];
    for (let y = 0; y < 1_000; y++) {
      row.push(0);
    }
    grid.push(row);
  }
  return grid;
};

const starOne = () => {
  const input = getStringArrayInput("day06");
  const grid = createGrid();

  for (let i = 0; i < input.length; i++) {
    const [action, ...args] = input[i].split(" ");
    if (action === "turn") {
      const [onOrOff, from, , to] = args;
      const val = onOrOff === "on" ? 1 : 0;
      const [y1, x1] = from.split(",").map((_) => Number(_));
      const [y2, x2] = to.split(",").map((_) => Number(_));
      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
          grid[x][y] = val;
        }
      }
    } else {
      const [from, , to] = args;
      const [y1, x1] = from.split(",").map((_) => Number(_));
      const [y2, x2] = to.split(",").map((_) => Number(_));
      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
          grid[x][y] = grid[x][y] === 0 ? 1 : 0;
        }
      }
    }
  }

  return grid.reduce(
    (total, row) =>
      (total += row.reduce((totalRow, light) => (totalRow += light), 0)),
    0
  );
};

const starTwo = () => {
  const input = getStringArrayInput("day06");
  const grid = createGrid();

  for (let i = 0; i < input.length; i++) {
    const [action, ...args] = input[i].split(" ");

    if (action === "turn") {
      const [onOrOff, from, , to] = args;
      const delta = onOrOff === "on" ? 1 : -1;
      const [y1, x1] = from.split(",").map((_) => Number(_));
      const [y2, x2] = to.split(",").map((_) => Number(_));
      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
          grid[x][y] = Math.max(grid[x][y] + delta, 0);
        }
      }
    } else {
      const [from, , to] = args;
      const [y1, x1] = from.split(",").map((_) => Number(_));
      const [y2, x2] = to.split(",").map((_) => Number(_));
      for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
          grid[x][y] += 2;
        }
      }
    }
  }

  return grid.reduce(
    (total, row) =>
      (total += row.reduce((totalRow, light) => (totalRow += light), 0)),
    0
  );
};

console.log(starOne());
console.log(starTwo());

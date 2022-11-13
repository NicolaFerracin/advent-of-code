const { getRawInput } = require("./utils");
require("lodash.permutations");
const _ = require("lodash");

const starOne = () => {
  const grid = getRawInput("day24")
    .split("\n")
    .map((_) => _.split(""));

  let itemsToFind = 0;
  let start = null;
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      const cell = grid[x][y];
      if (cell === "0") start = { x, y };
      if (/\d/.test(cell)) itemsToFind = Math.max(itemsToFind, Number(cell));
    }
  }

  const found = ["0"];
  let totalSteps = 0;

  // BFS to find the closest item
  while (found.length < itemsToFind + 1) {
    const queue = [{ ...start, steps: 0 }];
    let seen = new Set();
    while (queue.length) {
      const { x, y, steps } = queue.shift();
      const cell = grid[x][y];

      if (x < 0 || y < 0) continue;
      if (x > grid.length || y > grid[0].length) continue;
      if (seen.has(`${x}-${y}`)) continue;
      if (cell === "#") continue;

      seen.add(`${x}-${y}`);

      if (/\d/.test(cell) && found.indexOf(cell) < 0) {
        found.push(cell);
        totalSteps += steps;
        start = { x, y };
        break;
      }

      queue.push({ x: x - 1, y, steps: steps + 1 });
      queue.push({ x: x + 1, y, steps: steps + 1 });
      queue.push({ x, y: y - 1, steps: steps + 1 });
      queue.push({ x, y: y + 1, steps: steps + 1 });
    }
  }

  return totalSteps;
};

const starTwo = () => {
  const grid = getRawInput("day24")
    .split("\n")
    .map((_) => _.split(""));

  const itemsToFind = [];
  let zero = null;
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      const cell = grid[x][y];
      if (cell === "0") zero = { x, y };
      if (/\d/.test(cell) && cell !== "0") itemsToFind.push(Number(cell));
    }
  }

  const permutations = _.permutations(itemsToFind, itemsToFind.length).map(
    (x) => x.push(0) && x
  );

  let best = Infinity;
  // BFS over every possible permutation of items
  for (const permutation of permutations) {
    let totalSteps = 0;
    let start = zero;
    while (permutation.length) {
      const toFind = permutation.shift();
      const queue = [{ ...start, steps: 0 }];
      let seen = new Set();
      while (queue.length) {
        const { x, y, steps } = queue.shift();
        const cell = grid[x][y];

        if (steps > best) break;
        if (x < 0 || y < 0) continue;
        if (x > grid.length || y > grid[0].length) continue;
        if (seen.has(`${x}-${y}`)) continue;
        if (cell === "#") continue;

        seen.add(`${x}-${y}`);

        if (toFind === Number(cell)) {
          totalSteps += steps;
          start = { x, y };
          break;
        }

        queue.push({ x: x - 1, y, steps: steps + 1 });
        queue.push({ x: x + 1, y, steps: steps + 1 });
        queue.push({ x, y: y - 1, steps: steps + 1 });
        queue.push({ x, y: y + 1, steps: steps + 1 });
      }
    }

    best = Math.min(best, totalSteps);
  }

  return best;
};

console.log(starOne());
console.log(starTwo());

const { getStringArrayInput, deepClone } = require("./utils");

const input = getStringArrayInput("day14").map((x) => x.split(""));

// fn that can tilt in any direction
const tilt = (grid, dx, dy) => {
  for (
    let row = dx === 1 ? grid.length - 1 : 0;
    dx === 1 ? row >= 0 : row < grid.length;
    dx === 1 ? row-- : row++
  ) {
    for (
      let col = dy === 1 ? grid[row].length - 1 : 0;
      dy === 1 ? col >= 0 : col < grid[row].length;
      dy === 1 ? col-- : col++
    ) {
      const cell = grid[row][col];
      if (cell === "#" || cell === ".") continue;

      // move rock as much north as possible
      let newRow = row;
      let newCol = col;
      while (true) {
        // we are out of bounds
        const x = newRow + dx;
        const y = newCol + dy;
        if (x < 0 || y < 0 || x >= grid.length || y >= grid[newRow].length)
          break;

        // we have another rock in that direction
        if (grid[x][y] !== ".") break;

        // move above
        newRow = x;
        newCol = y;
      }

      grid[row][col] = ".";
      grid[newRow][newCol] = cell;
    }
  }
  return grid;
};

const totalLoad = (grid) =>
  grid.reduce((totalLoad, row, index) => {
    const distanceFromSouthEdge = grid.length - index;
    return (totalLoad +=
      distanceFromSouthEdge * row.filter((cell) => cell === "O").length);
  }, 0);

const starOne = () => {
  return totalLoad(tilt(deepClone(input), -1, 0));
};

const fullTilt = (grid) => {
  tilt(grid, -1, 0);
  tilt(grid, 0, -1);
  tilt(grid, 1, 0);
  tilt(grid, 0, 1);
};

const starTwo = () => {
  const grid = deepClone(input);

  const seen = new Map();
  const totalCycles = 1_000_000_000;
  let isLoop = false;

  let cycle = 0;
  while (true) {
    cycle++;
    fullTilt(grid);

    const key = grid.reduce((acc, row) => (acc += row.join("")), "");

    if (seen.has(key)) {
      if (isLoop) {
        const delta = cycle - seen.get(key);
        const toGo = (totalCycles - cycle) % delta;

        for (let i = 1; i <= toGo; i++) fullTilt(grid);

        return totalLoad(grid);
      }
      isLoop = true;
    }

    seen.set(key, cycle);
  }
};

console.log(starOne());
console.log(starTwo());

const createGrid = (h, w) => {
  const favNumber = 1358;

  const grid = [];
  for (let x = 0; x < h; x++) {
    const row = [];

    for (let y = 0; y < w; y++) {
      const val = y * y + 3 * y + 2 * y * x + x + x * x + favNumber;
      const bin = parseInt(val).toString(2);
      const ones = bin
        .split("")
        .reduce((acc, char) => (acc += char === "1" ? 1 : 0), 0);
      row.push(ones % 2 === 0 ? "." : "#");
    }
    grid.push(row);
  }
  return grid;
};

const exec = () => {
  const H = 55;
  const W = 47;
  const grid = createGrid(H, W);
  const seen = new Map();
  const targetX = 39;
  const targetY = 31;

  const possible = [];
  const dfs = (x, y, steps) => {
    if (x === targetX && y === targetY) possible.push(steps);
    if (x < 0 || y < 0) return;
    if (seen.has(`${x}-${y}`) && seen.get(`${x}-${y}`) < steps) return;
    if (grid[x][y] === "#") return;

    seen.set(`${x}-${y}`, steps);

    dfs(x - 1, y, steps + 1);
    dfs(x + 1, y, steps + 1);
    dfs(x, y + 1, steps + 1);
    dfs(x, y - 1, steps + 1);
  };

  dfs(1, 1, 0);

  return {
    minPath: Math.min(...possible),
    visitableIn50Steps: [...seen.values()].filter((s) => s <= 50).length,
  };
};

console.log(exec());

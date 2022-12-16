const { getStringArrayInput } = require("./utils");

const exec = (star) => {
  const paths = getStringArrayInput("day13").map((line) => {
    const points = line.split(" -> ");
    return points.map((point) => point.split(",").map((_) => +_));
  });

  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const path of paths) {
    for (const [y, x] of path) {
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }

  const x = maxX;
  const y = maxY - minY;
  let buffer = 0;
  let prev = null;
  // keep increasing the grid buffer until we find a size that gives the same result as the previous size
  // we know we reached the maximum size and we can return
  while (true) {
    buffer++;
    const grid = [];
    for (let a = 0; a <= x + 2; a++) {
      const row = [];
      for (let b = 0; b <= y + buffer * 2; b++) {
        if (star === 1 || a < x + 2) row.push(" ");
        else row.push("#");
      }
      grid.push(row);
    }

    for (const path of paths) {
      for (let i = 1; i < path.length; i++) {
        const [y1, x1] = path[i - 1];
        const [y2, x2] = path[i];

        if (x1 === x2) {
          for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
            grid[x1][y - minY + buffer] = "#";
          }
        } else {
          for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
            grid[x][y1 - minY + buffer] = "#";
          }
        }
      }
    }
    const sandY = 500 - minY + buffer;
    let sands = 0;
    let shouldBreak = false;
    while (!shouldBreak) {
      let x = 0;
      let y = sandY;
      while (true) {
        if (grid[x + 1]?.[y] === " ") x += 1;
        else if (grid[x + 1]?.[y - 1] === " ") {
          x += 1;
          y -= 1;
        } else if (grid[x + 1]?.[y + 1] === " ") {
          x += 1;
          y += 1;
        } else {
          if (star === 1) {
            if (x + 1 >= grid.length || y - 1 < 0 || y + 1 >= grid[0].length)
              return sands;
          } else if (x === 0 && y === sandY) {
            if (prev === sands + 1) return prev;
            prev = sands + 1;
            shouldBreak = true;
          }

          break;
        }
      }
      sands++;

      grid[x][y] = ".";
    }
  }
};

const starOne = () => {
  return exec(1);
};

const starTwo = () => {
  return exec(2);
};

console.log(starOne());
console.log(starTwo());

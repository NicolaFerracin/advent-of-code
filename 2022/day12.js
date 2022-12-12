const { getStringArrayInput } = require("./utils");

const exec = (optimizeStart) => {
  const grid = getStringArrayInput("day12").map((_) => _.split(""));

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (grid[x][y] === "E") {
        end = [x, y];
        break;
      }
    }
  }

  grid[end[0]][end[1]] = "z";

  const charCodeA = "a".charCodeAt(0);
  const queue = new Set();
  queue.add(`${end[0]}#${end[1]}`);
  const seen = new Set();
  let steps = 0;
  while (true) {
    steps++;
    let len = queue.size;
    const queueList = [...queue.values()].map((entry) => {
      const [x, y] = entry.split("#");
      return [+x, +y];
    });
    queue.clear();
    while (len > 0) {
      len--;
      const [x, y] = queueList.shift();

      const cell = grid[x][y];
      seen.add(`${x}#${y}`);
      const currElevation = cell.charCodeAt(0) - charCodeA;
      if (optimizeStart && currElevation === 0) return steps - 1;

      const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];
      for (dir of directions) {
        const newX = x + dir[0];
        const newY = y + dir[1];
        const nextCell = grid[newX]?.[newY];
        if (!nextCell) continue;

        const nextElevation = nextCell.charCodeAt(0) - charCodeA;
        if (nextCell === "S" && currElevation <= charCodeA + 1) return steps;
        if (currElevation - 1 <= nextElevation && !seen.has(`${newX}#${newY}`))
          queue.add(`${newX}#${newY}`);
      }
    }
  }
};

const starOne = () => {
  return exec(false);
};

const starTwo = () => {
  return exec(true);
};

console.log(starOne());
console.log(starTwo());

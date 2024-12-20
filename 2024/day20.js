const { getStringArrayInput, manhattanDist } = require("./utils");

const getInput = () => getStringArrayInput("day20").map((row) => row.split(""));

// RUN WITH --stack-size=2000

const solve = (cheat) => {
  const map = getInput();
  const Sx = map.findIndex((row) => row.includes("S"));
  const Sy = map[Sx].indexOf("S");
  const Ex = map.findIndex((row) => row.includes("E"));
  const Ey = map[Ex].indexOf("E");

  const walls = [];
  for (let x = 1; x < map.length - 1; x++) {
    for (let y = 1; y < map.length - 1; y++) {
      if (map[x][y] === "#") walls.push([x, y]);
    }
  }

  const seen = new Set();
  const dfs = (x, y) => {
    seen.add(`${x}-${y}`);
    if (x === Ex && y === Ey) return seen;
    const nextCell = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ].find(
      ([newX, newY]) =>
        map[newX]?.[newY] !== "#" && !seen.has(`${newX}-${newY}`)
    );

    return dfs(nextCell[0], nextCell[1]);
  };

  const path = dfs(Sx, Sy);

  // now we need to find 2 cells on the path that have a manhattan distance of CHEAT or less and see what that gives us
  const shorterPaths = [];
  const pathArr = [...path].map((p) => p.split("-").map(Number));
  for (let i = 0; i < pathArr.length - 1; i++) {
    const cellA = pathArr[i];
    for (let j = i + 1; j < pathArr.length; j++) {
      const cellB = pathArr[j];
      const manhDist = manhattanDist(cellA, cellB);
      if (manhDist <= cheat) {
        shorterPaths.push(i + pathArr.length - j + manhDist - 1);
      }
    }
  }

  return shorterPaths.filter((x) => path.size - x >= 100).length;
};

console.log(solve(2));
console.log(solve(20));

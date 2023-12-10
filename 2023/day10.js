const { getStringArrayInput } = require("./utils");

const input = getStringArrayInput("day10").map((x) => x.split(""));

const sX = input.findIndex((l) => l.indexOf("S") >= 0);
const sY = input[sX].indexOf("S");
const move = (x, y, dir) => {
  if (dir === "N") return [x - 1, y];
  if (dir === "S") return [x + 1, y];
  if (dir === "E") return [x, y + 1];
  if (dir === "W") return [x, y - 1];
};

const allowedMovesMap = {
  "|": ["N", "S"],
  "-": ["W", "E"],
  L: ["N", "E"],
  J: ["N", "W"],
  7: ["W", "S"],
  F: ["E", "S"],
  S: ["N", "E", "W", "S"],
  ".": [],
};
const allowedMovesFromMap = {
  "|": ["N", "S"],
  "-": ["W", "E"],
  L: ["S", "W"],
  J: ["S", "E"],
  7: ["E", "N"],
  F: ["W", "N"],
  S: ["N", "E", "W", "S"],
  ".": [],
};

let loop = null;
const getLoop = () => {
  if (!!loop) return loop;
  const stack = [[sX, sY, new Set()]];
  while (stack.length) {
    let len = stack.length;
    while (len-- > 0) {
      const [x, y, seen] = stack.shift();

      const newSeen = new Set(seen);
      newSeen.add(`${x}-${y}`);

      const allowedMoves = allowedMovesMap[input[x][y]];
      allowedMoves.forEach((dir) => {
        const [newX, newY] = move(x, y, dir);

        // check if valid move
        if (newX < 0 || newY < 0) return;
        if (newX > input.length || newY > input[newX].length) return;
        if (newX === sX && newY === sY && seen.has(`${newX}-${newY}`)) {
          loop = [...seen];
          return loop;
        }
        if (newSeen.has(`${newX}-${newY}`)) return;

        // check if coming from the right direction
        if (allowedMovesFromMap[input[newX][newY]].includes(dir)) {
          stack.push([newX, newY, newSeen]);
        }
      });
    }
  }

  return loop;
};

const starOne = () => {
  return Math.ceil(getLoop().length / 2);
};

const starTwo = () => {
  // get cell with boundary check + fallback value
  const getCell = (x, y) => {
    if (x < 0 || y < 0 || x > map.length || y > map[x].length) return ".";
    return map[x][y];
  };

  // count the number of adjacent walls, in all 4 directions and diagonally as well
  const getAdjacentWalls = (x, y) =>
    [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
      [1, 1],
      [-1, 1],
      [-1, -1],
      [1, -1],
    ].reduce(
      (acc, [dx, dy]) => (acc += getCell(x + dx, y + dy) !== "." ? 1 : 0),
      0
    );

  // build a map twice the size to make space for a crawler to go through
  const maxX = input.length * 2;
  const maxY = input[0].length * 2;
  const map = [];
  for (let x = 0; x < maxX; x++) {
    const row = [];
    for (let y = 0; y < maxY; y++) row.push(".");
    map.push(row);
  }

  const extendRight = ["F", "L", "-"];
  const extendDown = ["F", "7", "|"];
  const loop = getLoop();

  // this is input dependent. We need to start crawling from a point that is sure to be within the loop
  loop.push(`${sX - 1}-${sY}`);

  for (const point of loop) {
    const [x, y] = point.split("-");
    const cell = input[x][y];

    if (cell !== ".") {
      map[x * 2][y * 2] = cell;
      if (extendRight.includes(cell)) map[x * 2][y * 2 + 1] = "━";
      if (extendDown.includes(cell)) map[x * 2 + 1][y * 2] = "┃";
    }
  }

  let inside = 0;
  const seen = new Set();
  const dfs = (x, y) => {
    if ((map[x]?.[y] ?? "#") !== ".") return;
    if (seen.has(`${x}-${y}`)) return;
    seen.add(`${x}-${y}`);

    const walls = getAdjacentWalls(x, y);
    if (walls < 2) {
      if (x % 2 === 0 && y % 2 === 0) {
        inside++;
      }
    }

    dfs(x + 1, y);
    dfs(x - 1, y);
    dfs(x, y + 1);
    dfs(x, y - 1);
  };

  dfs(sX + 1, sY);

  return inside;
};

console.log(starOne());
console.log(starTwo());

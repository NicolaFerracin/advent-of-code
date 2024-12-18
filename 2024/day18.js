const { getStringArrayInput } = require("./utils");

const getInput = () =>
  getStringArrayInput("day18").map((x) => x.split(",").map(Number));

const ROWS = 71;
const COLS = 71;

const bfs = (map) => {
  const queue = [[0, 0, 0]];
  const visitedMap = new Map();
  let best = Infinity;
  while (queue.length) {
    const [x, y, steps] = queue.shift();

    if (x === ROWS - 1 && y === COLS - 1) {
      best = Math.min(steps, best);
      continue;
    }

    if (steps > best) continue;
    if (map[x]?.[y] !== ".") continue;
    if ((visitedMap.get(`${x}-${y}`) ?? Infinity) <= steps) continue;

    visitedMap.set(`${x}-${y}`, steps);
    [
      [x, y + 1],
      [x + 1, y],
      [x, y + -1],
      [x + -1, y],
    ].forEach(([newX, newY]) => queue.push([newX, newY, steps + 1]));
  }
  return best;
};

star1 = () => {
  const input = getInput().slice(0, 1024);

  const map = [];
  for (let x = 0; x < ROWS; x++) {
    const row = [];
    for (let y = 0; y < COLS; y++) row.push(".");
    map.push(row);
  }

  for (const [y, x] of input) map[x][y] = "#";

  return bfs(map);
};

star2 = () => {
  const input = getInput();
  const map = [];
  for (let x = 0; x < ROWS; x++) {
    const row = [];
    for (let y = 0; y < COLS; y++) row.push(".");
    map.push(row);
  }

  for (let i = 0; i < input.length; i++) {
    const byte = input[i];
    map[byte[0]][byte[1]] = "#";
    if (bfs(map) === Infinity) return input[i];
  }
  return best;
};

console.log(star1());
console.log(star2());

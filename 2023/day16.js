const { getStringArrayInput } = require("./utils");

const input = getStringArrayInput("day16").map((x) => x.split(""));

const move = (x, y) => ({
  R: {
    ".": [x, y + 1, "R"],
    "\\": [x + 1, y, "D"],
    "/": [x - 1, y, "U"],
    "|": [
      [x - 1, y, "U"],
      [x + 1, y, "D"],
    ],
    "-": [x, y + 1, "R"],
  },
  D: {
    ".": [x + 1, y, "D"],
    "\\": [x, y + 1, "R"],
    "/": [x, y - 1, "L"],
    "|": [x + 1, y, "D"],
    "-": [
      [x, y - 1, "L"],
      [x, y + 1, "R"],
    ],
  },
  L: {
    ".": [x, y - 1, "L"],
    "\\": [x - 1, y, "U"],
    "/": [x + 1, y, "D"],
    "|": [
      [x - 1, y, "U"],
      [x + 1, y, "D"],
    ],
    "-": [x, y - 1, "L"],
  },
  U: {
    ".": [x - 1, y, "U"],
    "\\": [x, y - 1, "L"],
    "/": [x, y + 1, "R"],
    "|": [x - 1, y, "U"],
    "-": [
      [x, y - 1, "L"],
      [x, y + 1, "R"],
    ],
  },
});

const starOne = (startX = 0, startY = 0, startDir = "R") => {
  const stack = [[startX, startY, startDir]];

  const seen = new Set();

  const energized = new Set();
  energized.add("0#0");
  let prevEnergized = new Set();

  let roundsWithSameResults = 0;
  while (true) {
    let len = stack.length;
    while (len-- > 0) {
      const [x, y, dir] = stack.shift();

      const seenKey = `${x}#${y}#${dir}`;
      if (seen.has(seenKey)) continue;
      seen.add(seenKey);

      // oob
      if (x < 0 || y < 0 || x >= input.length || y >= input[x].length) continue;

      energized.add(`${x}#${y}`);
      const cell = input[x][y];

      const moves = move(x, y)[dir][cell];
      if (moves.length === 2) stack.push(...moves);
      else stack.push(moves);
    }
    if (energized.size === prevEnergized.size) roundsWithSameResults++;
    else roundsWithSameResults = 0;
    if (roundsWithSameResults > 10) return energized.size;
    prevEnergized = new Set(energized);
  }
};

const starTwo = () => {
  let best = 0;
  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[x].length; y++) {
      const dir =
        x === 0
          ? "D"
          : x === input.length - 1
          ? "U"
          : y === 0
          ? "R"
          : y === input[x].length - 1
          ? "L"
          : null;
      if (dir) best = Math.max(best, starOne(x, y, dir));
    }
  }
  return best;
};

console.log(starOne());
console.log(starTwo());

const { getStringArrayInput } = require("./utils");

const play = () => {
  let maxX = 0;
  let maxY = 0;
  const clay = getStringArrayInput("day17").map((line) => {
    const matches = line.match(/\d+/g).map((_) => +_);

    if (line.startsWith("x")) {
      maxX = Math.max(maxX, matches[1], matches[2]);
      maxY = Math.max(maxY, matches[0]);
      return {
        y: matches.shift(),
        x: matches,
      };
    } else {
      maxX = Math.max(maxX, matches[0]);
      maxY = Math.max(maxY, matches[1], matches[2]);
      return {
        x: matches.shift(),
        y: matches,
      };
    }
  });

  const map = [];
  for (let x = 0; x <= maxX; x++) {
    const row = [];
    for (let y = 0; y <= maxY; y++) row.push(".");
    map.push(row);
  }

  // add bottom line for stopping the dripping
  map.push(new Array(map[0].length).fill("+"));

  clay.forEach(({ x: clayX, y: clayY }) => {
    // draw column
    if (Number.isInteger(clayY)) {
      for (let x = clayX[0]; x <= clayX[1]; x++) map[x][clayY] = "#";
    }
    // draw row
    else {
      for (let y = clayY[0]; y <= clayY[1]; y++) map[clayX][y] = "#";
    }
  });

  // remove first line until we find the first clay spot
  while (!map[0].find((cell) => cell === "#")) map.shift();

  const wetSpots = new Set();
  const dfs = (x, y, ops = {}) => {
    let { char = "~", override = false } = ops;
    // skip if the spot is not empty
    if (override) {
      if (map[x][y] !== "~" && map[x][y] !== ".") return true;
    } else if (map[x][y] !== ".") return true;

    // skip visited path if
    if (!override && wetSpots.has(`${x}#${y}`)) return true;
    wetSpots.add(`${x}#${y}`);

    // if we reach the bottom, return false to mark the path as eventually drying
    if (map[x + 1][y] === "+") {
      map[x][y] = "+";
      return false;
    }

    // try going down
    if (!dfs(x + 1, y)) {
      // you get false when you are on a path will eventually dry out
      // hence mark as + and return
      map[x][y] = "+";
      return false;
    }

    // try going right
    const pathRight = dfs(x, y + 1, ops);
    // as with the going-down path, we want to mark this cell if the path returns false
    // but we keep going to check left, in case we are splitting the flow
    if (!pathRight) char = "+";

    // try going left
    const pathLeft = dfs(x, y - 1, { char });
    if (!pathLeft) {
      char = "+";

      // if the path left fails, we need to override the previously drawn right path.
      // Since right comes before left, left is already correct, but right might not be
      dfs(x, y + 1, { char, override: true });
    }

    map[x][y] = char;

    return pathLeft && pathRight;
  };

  dfs(0, 500);

  return { map, wetSpots };
};

const starOne = () => {
  return play().wetSpots.size;
};

const starTwo = () => {
  return play().map.reduce(
    (total, row) =>
      (total += row.reduce(
        (totalRow, cell) => (totalRow += cell === "~" ? 1 : 0),
        0
      )),
    0
  );
};

console.log(starOne());
console.log(starTwo());

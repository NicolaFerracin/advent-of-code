const { getStringArrayInput } = require("./utils");

const starOne = () => {
  const clay = getStringArrayInput("day17").map((line) => {
    const matches = line.match(/\d+/g).map((_) => +_);

    if (line.startsWith("x")) {
      return {
        y: matches.shift(),
        x: matches,
      };
    } else {
      return {
        x: matches.shift(),
        y: matches,
      };
    }
  });

  const maxX = Math.max(
    ...clay.map(({ x }) => (Number.isInteger(x) ? x : Math.max(...x)))
  );
  const maxY = Math.max(
    ...clay.map(({ y }) => (Number.isInteger(y) ? y : Math.max(...y)))
  );
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

  // remove first lines until we find the first clay spot
  while (!map[0].find((cell) => cell === "#")) map.shift();

  const wetSpots = new Set();
  const dfs = (x, y, char = "~") => {
    // skip if the spot is not empty
    if (map[x][y] !== ".") return true;

    // skip visited path
    if (wetSpots.has(`${x}#${y}`)) return true;
    wetSpots.add(`${x}#${y}`);

    // if we reach the bottom, return false to mark the path
    if (map[x + 1][y] === "+") {
      map[x][y] = "+";
      return false;
    }

    // try going down
    if (!dfs(x + 1, y)) {
      // you get false when you are on a path that should stop propagating
      // hence mark as + and return
      map[x][y] = "+";
      return false;
    }

    // try going right
    const pathRight = dfs(x, y + 1);
    if (!pathRight) {
      // as with the going-down path, we want to mark this cell if the path returns false
      // but we keep going to check left, in case we are splitting the flow
      map[x][y] = "+";
    }

    // try going left
    const pathLeft = dfs(x, y - 1, pathRight ? char : "+");
    if (!pathLeft) {
      map[x][y] = "+";
    }

    // if either going right or left fails, the path should stop
    if (!pathLeft || !pathRight) return false;

    map[x][y] = char;

    return true;
  };

  dfs(0, 500);

  return wetSpots.size;
};

const starTwo = () => {};

console.log(starOne());
console.log(starTwo());

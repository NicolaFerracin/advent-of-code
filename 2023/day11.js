const { getStringArrayInput, deepClone } = require("./utils");

const input = getStringArrayInput("day11").map((x) => x.split(""));

const expand = (input) => {
  const xToExpand = input
    .map((line, index) => {
      if (line.indexOf("#") === -1) return index;
      return null;
    })
    .filter(Boolean);
  const yToExpand = [];
  for (let y = 0; y < input[0].length; y++) {
    let shouldExpand = true;
    for (let x = 0; x < input.length; x++) {
      if (input[x][y] === "#") shouldExpand = false;
    }
    if (shouldExpand) yToExpand.push(y);
  }

  return { xToExpand, yToExpand };
};

const sumPathsWithExpansion = (expansion) => {
  const { xToExpand, yToExpand } = expand(input);
  const galaxies = [];
  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[x].length; y++) {
      if (input[x][y] === "#") galaxies.push([x, y]);
    }
  }

  const shortestPaths = [];
  for (let i = 0; i < galaxies.length - 1; i++) {
    const [x1, y1] = galaxies[i];
    for (let j = i + 1; j < galaxies.length; j++) {
      const [x2, y2] = galaxies[j];
      // check if the path intersects any x or y that should expand
      const x3 = Math.min(x1, x2);
      const x4 = Math.max(x1, x2);
      const y3 = Math.min(y1, y2);
      const y4 = Math.max(y1, y2);
      const toExpand =
        xToExpand.filter((x) => x > x3 && x < x4).length +
        yToExpand.filter((y) => y > y3 && y < y4).length;
      const path = x4 - x3 + (y4 - y3);

      shortestPaths.push(path + toExpand * expansion);
    }
  }
  return shortestPaths.reduce((acc, c) => (acc += c), 0);
};

const starOne = () => {
  const EXPANSION = 10 - 1;
  return sumPathsWithExpansion(EXPANSION);
};

const starTwo = () => {
  const EXPANSION = 1_000_000 - 1;
  return sumPathsWithExpansion(EXPANSION);
};

console.log(starOne());
console.log(starTwo());

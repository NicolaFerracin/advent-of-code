const { getRawInput } = require("./utils");

// https://www.drking.org.uk/hexagons/misc/grid.html
const applyMove = {
  n: (n, e) => [n + 1, e],
  ne: (n, e) => [n, e + 1],
  se: (n, e) => [n - 1, e + 1],
  s: (n, e) => [n - 1, e],
  sw: (n, e) => [n, e - 1],
  nw: (n, e) => [n + 1, e - 1],
};

const findDistance = (star) => {
  const moves = getRawInput("day11").split(",");
  let north = 0;
  let east = 0;

  let furthest = 0;
  for (const move of moves) {
    [north, east] = applyMove[move](north, east);
    furthest = Math.max(furthest, north + east);
  }

  return star === 1 ? north + east : furthest;
};

const starOne = () => {
  return findDistance(1);
};

const starTwo = () => {
  return findDistance(2);
};

console.log(starOne());
console.log(starTwo());

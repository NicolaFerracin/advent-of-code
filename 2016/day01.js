const { getRawInput } = require("./utils");

const starOne = () => {
  const input = getRawInput("day01").split(", ");
  let x = 0;
  let y = 0;
  let currDir = 0;

  const moveIt = (dir, blocks) => {
    if (dir === 0) y += blocks;
    else if (dir === 1) x += blocks;
    else if (dir === 2) y -= blocks;
    else if (dir === 3) x -= blocks;
  };

  for (const move of input) {
    const [dir, ...blocks] = move.split("");
    currDir = (currDir + 4 + (dir === "R" ? 1 : -1)) % 4;
    moveIt(currDir, Number(blocks.join("")));
  }

  return Math.abs(x) + Math.abs(y);
};

const starTwo = () => {
  const input = getRawInput("day01").split(", ");
  let x = 0;
  let y = 0;
  let currDir = 0;
  const visited = new Set();

  const isVisited = () => {
    if (visited.has(`${x}-${y}`)) return true;
    visited.add(`${x}-${y}`);
  };

  const moveIt = (dir, blocks) => {
    while (blocks > 0) {
      if (dir === 0) y += 1;
      else if (dir === 1) x += 1;
      else if (dir === 2) y -= 1;
      else if (dir === 3) x -= 1;
      if (isVisited()) return true;
      blocks--;
    }
  };

  for (const move of input) {
    const [dir, ...blocks] = move.split("");
    currDir = (currDir + 4 + (dir === "R" ? 1 : -1)) % 4;
    if (moveIt(currDir, Number(blocks.join(""))))
      return Math.abs(x) + Math.abs(y);
  }
};

console.log(starOne());
console.log(starTwo());

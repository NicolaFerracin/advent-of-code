const { getRawInput } = require("./utils");

const move = {
  "^": (x, y) => ({ x: x - 1, y }),
  v: (x, y) => ({ x: x + 1, y }),
  ">": (x, y) => ({ x, y: y + 1 }),
  "<": (x, y) => ({ x, y: y - 1 }),
};

const starOne = () => {
  return getRawInput("day03")
    .split("")
    .reduce(
      ({ x, y, seen }, curr) => {
        seen.add(`${x}-${y}`);
        return { ...move[curr](x, y), seen };
      },
      {
        x: 0,
        y: 0,
        seen: new Set(),
      }
    ).seen.size;
};

const starTwo = () => {
  return getRawInput("day03")
    .split("")
    .reduce(
      ({ x1, y1, x2, y2, seen }, curr, index) => {
        seen.add(`${x1}-${y1}`);
        seen.add(`${x2}-${y2}`);
        if (index % 2 === 0) {
          const { x, y } = move[curr](x2, y2);
          return { x1, y1, x2: x, y2: y, seen };
        } else {
          const { x, y } = move[curr](x1, y1);
          return { x1: x, y1: y, x2, y2, seen };
        }
      },
      {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        seen: new Set(),
      }
    ).seen.size;
};

console.log(starOne());
console.log(starTwo());

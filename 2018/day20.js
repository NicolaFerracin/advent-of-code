const { getRawInput } = require("./utils");

const mapping = (x, y) => ({
  N: [x - 1, y],
  E: [x, y + 1],
  S: [x + 1, y],
  W: [x, y - 1],
});

const getAllDistances = () => {
  const paths = getRawInput("day20").split("").slice(1, -1);

  const positions = [];
  const distances = new Map();
  let x = 0;
  let y = 0;

  for (const char of paths) {
    if (char === "(") {
      positions.push([x, y]);
    } else if (char === "|") {
      [x, y] = positions[positions.length - 1];
    } else if (char === ")") {
      positions.pop();
    } else {
      const [newX, newY] = mapping(x, y)[char];

      const key = `${newX}#${newY}`;
      const currDistance = distances.get(key) ?? 0;

      const prevKey = `${x}#${y}`;
      const prevDistance = distances.get(prevKey) ?? 0;
      if (currDistance) {
        distances.set(key, Math.min(prevDistance + 1, currDistance));
      } else {
        distances.set(key, prevDistance + 1);
      }
      x = newX;
      y = newY;
    }
  }
  return [...distances.values()];
};

const starOne = () => {
  return Math.max(...getAllDistances());
};

const starTwo = () => {
  return getAllDistances().filter((rooms) => rooms >= 1000).length;
};

console.log(starOne());
console.log(starTwo());

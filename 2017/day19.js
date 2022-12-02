const { getStringArrayInput } = require("./utils");

const move = {
  up: (x, y) => [x - 1, y],
  down: (x, y) => [x + 1, y],
  left: (x, y) => [x, y - 1],
  right: (x, y) => [x, y + 1],
};

const exec = () => {
  const map = getStringArrayInput("day19").map((line) => line.split(""));

  let x = 0;
  let y = map[0].findIndex((cell) => cell === "|");
  let dir = [1, 0];

  const collected = [];
  let steps = 0;
  while (!/\s/.test(map[x][y])) {
    steps++;
    const prevX = x;
    const prevY = y;
    x += dir[0];
    y += dir[1];

    const cell = map[x][y];
    if (/\w+/.test(cell)) collected.push(cell);

    if (cell === "+") {
      for (const [deltaX, deltaY] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const nextX = x + deltaX;
        const nextY = y + deltaY;
        if (nextX < 0 || nextY < 0) continue;
        if (nextX === map.length || nextY === map[0].length) continue;

        const nextCell = map[nextX]?.[nextY];
        if (nextX !== prevX && nextY !== prevY && !/\s/.test(nextCell)) {
          dir = [deltaX, deltaY];
          break;
        }
      }
    }
  }

  return [collected.join(""), steps];
};

const starOne = () => {
  return exec()[0];
};

const starTwo = () => {
  return exec()[1];
};

console.log(starOne());
console.log(starTwo());

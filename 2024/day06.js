const { getStringArrayInput } = require("./utils");

const input = getStringArrayInput("day06");

const getGuardPosition = (map) => {
  for (let x = 0; x < map.length; x++) {
    const row = map[x];
    for (let y = 0; y < row.length; y++) {
      const cell = row[y];
      if (cell === "^") return { x, y };
    }
  }
};

const move = (x, y, dir) => {
  if (dir === 0) return { x: x - 1, y };
  if (dir === 1) return { x: x, y: y + 1 };
  if (dir === 2) return { x: x + 1, y };
  if (dir === 3) return { x: x, y: y - 1 };
};

const star1 = () => {
  let { x, y } = getGuardPosition(input);
  let dir = 0;
  let visited = new Set();
  while (true) {
    visited.add(`${x}-${y}`);
    const { x: newX, y: newY } = move(x, y, dir);

    // if out of bounds, return
    if (
      newX >= input.length ||
      newX < 0 ||
      newY >= input[newX].length ||
      newY < 0
    )
      return visited.size;

    // if hitting object, turn
    if (input[newX][newY] === "#") {
      dir = (dir + 1) % 4;
      continue;
    }

    x = newX;
    y = newY;
  }
};

const star2 = () => {
  const { x, y } = getGuardPosition(input);

  const isLoop = (guard, obstacle) => {
    let { x: guardX, y: guardY } = guard;
    const { x: obsX, y: obsY } = obstacle;
    let dir = 0;

    for (let turn = 0; turn < 10_000; turn++) {
      const { x: newX, y: newY } = move(guardX, guardY, dir);

      // if out of bounds, return
      if (
        newX >= input.length ||
        newX < 0 ||
        newY >= input[newX].length ||
        newY < 0
      )
        return false;

      // if hitting object, turn
      if (input[newX][newY] === "#" || (newX === obsX && newY === obsY)) {
        dir = (dir + 1) % 4;
        continue;
      }

      guardX = newX;
      guardY = newY;
    }

    return true;
  };

  let loops = 0;
  for (let a = 0; a < input.length; a++) {
    for (let b = 0; b < input[a].length; b++) {
      // ignore guard starting position
      if (a === x && b === y) continue;

      // ignore cells with obstacles
      if (input[a][b] === "#") continue;

      // attempt placing an object and create a loop
      loops += isLoop({ x, y }, { x: a, y: b }) ? 1 : 0;
    }
  }

  return loops;
};

console.log(star1());
console.log(star2());

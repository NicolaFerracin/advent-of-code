const { getStringArrayInput } = require("./utils");

const move = {
  0: (x, y) => [x - 1, y],
  1: (x, y) => [x, y + 1],
  2: (x, y) => [x + 1, y],
  3: (x, y) => [x, y - 1],
};

const getNextDir = {
  0: (currDir) => (currDir - 1 < 0 ? 3 : currDir - 1),
  1: (currDir) => currDir,
  2: (currDir) => (currDir + 1) % 4,
  3: (currDir) => (currDir + 2) % 4,
};

const starOne = () => {
  const infected = new Set();
  const input = getStringArrayInput("day22");
  input.forEach((row, rowIndex) => {
    for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
      if (row[cellIndex] === "#") infected.add(`${rowIndex}#${cellIndex}`);
    }
  });
  let x = Math.floor(input.length / 2);
  let y = Math.floor(input[0].length / 2);
  let dir = 0;

  let infectiousBursts = 0;
  for (let burst = 0; burst < 10_000; burst++) {
    const key = `${x}#${y}`;
    if (infected.has(key)) {
      dir = (dir + 1) % 4; // there are 4 directions, wrapping around
      infected.delete(key);
    } else {
      dir = dir - 1 < 0 ? 3 : dir - 1; // there are 4 directions, wrapping around
      infectiousBursts++;
      infected.add(key);
    }
    [x, y] = move[dir](x, y);
  }

  return infectiousBursts;
};

const starTwo = () => {
  const nodes = new Map();
  const input = getStringArrayInput("day22");
  input.forEach((row, rowIndex) => {
    for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
      if (row[cellIndex] === "#") nodes.set(`${rowIndex}#${cellIndex}`, 2); // 2 = infected
    }
  });
  let x = Math.floor(input.length / 2);
  let y = Math.floor(input[0].length / 2);
  let dir = 0;

  let infectiousBursts = 0;
  for (let burst = 0; burst < 10_000_000; burst++) {
    const key = `${x}#${y}`;
    const status = nodes.has(key) ? nodes.get(key) : 0;
    dir = getNextDir[status](dir);

    nodes.set(key, (status + 1) % 4); // there are 4 status, one following the other
    if (nodes.get(key) === 2) infectiousBursts++; // 2 = infected
    [x, y] = move[dir](x, y);
  }

  return infectiousBursts;
};

console.log(starOne());
console.log(starTwo());

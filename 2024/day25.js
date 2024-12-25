const { getRawInput } = require("./utils");

const getInput = () => {
  const { locks, keys } = getRawInput("day25")
    .split("\n\n")
    .map((schema) => schema.split("\n").map((row) => row.split("")))
    .reduce(
      (acc, schema) => {
        if (schema[0][0] === "#") acc.locks.push(schema);
        else acc.keys.push(schema);
        return acc;
      },
      { locks: [], keys: [] }
    );

  const locksHeights = locks.map(calculateHeights);
  const keysHeights = keys.map(calculateHeights);

  return { locks, keys, locksHeights, keysHeights };
};

const calculateHeights = (schema) => {
  const heights = [];
  for (let y = 0; y < schema[0].length; y++) {
    let height = -1; // the first/last row does not count
    for (let x = 0; x < schema.length; x++) {
      if (schema[x][y] === "#") height++;
    }
    heights.push(height);
  }
  return heights;
};

const doesKeyFit = (lock, key, HEIGHT) => {
  return lock.every((pin, index) => pin + key[index] <= HEIGHT);
};

const star1 = () => {
  const { locks, keys, locksHeights, keysHeights } = getInput();

  const MAX_HEIGHT = locks[0].length - 2;
  let fits = 0;
  for (const lock of locksHeights) {
    for (const key of keysHeights) {
      console.log({ lock, key, MAX_HEIGHT });
      fits += doesKeyFit(lock, key, MAX_HEIGHT) ? 1 : 0;
    }
  }

  return fits;
};

console.log(star1());

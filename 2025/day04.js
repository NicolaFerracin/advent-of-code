const { readInput, splitInputByLine, print, copy } = require("./utils");

const input = splitInputByLine(readInput("day04")).map((line) =>
  line.split("")
);

const ROLL = "@";
const EMPTY = ".";

const findRemovableRolls = (map) => {
  const rolls = new Set();
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
      if (map[x][y] !== ROLL) continue;

      let nearbyRolls = 0;
      for (let xx = x - 1; xx <= x + 1; xx++) {
        for (let yy = y - 1; yy <= y + 1; yy++) {
          if (xx === x && yy === y) continue;
          if (map[xx]?.[yy] === ROLL) {
            nearbyRolls++;
          }
        }
      }
      if (nearbyRolls < 4) rolls.add([x, y]);
    }
  }
  return rolls;
};

const star1 = () => {
  return findRemovableRolls(copy(input)).size;
};

const star2 = () => {
  const map = copy(input);
  let rolls = findRemovableRolls(map);

  let removed = 0;
  while (rolls.size !== 0) {
    // remove roll from map
    for (const [x, y] of [...rolls]) {
      removed++;
      map[x][y] = EMPTY;
    }

    // find new rolls
    rolls = findRemovableRolls(map);
  }

  return removed;
};

print(star1);
print(star2);

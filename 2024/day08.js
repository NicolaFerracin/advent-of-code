const { getStringArrayInput } = require("./utils");

const input = getStringArrayInput("day08");
const antennas = new Set();
for (let x = 0; x < input.length; x++) {
  for (let y = 0; y < input[x].length; y++) {
    const cell = input[x][y];
    if (cell === ".") continue;
    antennas.add(`${x}-${y}-${cell}`);
  }
}

const star1 = () => {
  const antinodes = new Set();

  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[x].length; y++) {
      // for each cell, check xDelta and yDelta to each antenna, and check if there is one other antenna of the same tipe at twice the deltas
      for (const antenna of antennas) {
        const aX = Number(antenna.split("-")[0]);
        const aY = Number(antenna.split("-")[1]);

        const deltaX = Math.abs(x - aX);
        const deltaY = Math.abs(y - aY);
        if (deltaX === 0 && deltaY === 0) continue;

        const aInRowX = x + deltaX * 2 * (x > aX ? -1 : 1);
        const aInRowY = y + deltaY * 2 * (y > aY ? -1 : 1);

        const aInRowKey = `${aInRowX}-${aInRowY}-${antenna.split("-")[2]}`;
        if (antennas.has(aInRowKey)) antinodes.add(`${x}-${y}`);
      }
    }
  }
  return antinodes.size;
};

const star2 = () => {
  const areInLine = (x1, y1, x2, y2, x3, y3) =>
    (y1 - y2) * (x1 - x3) === (y1 - y3) * (x1 - x2);

  const antinodes = new Set();

  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[x].length; y++) {
      // for each cell, check if there are 2 antennas with the same frequency on the same line
      for (const a of antennas) {
        for (const b of antennas) {
          if (a === b) continue;
          if (a.substr(-1) !== b.substr(-1)) continue;
          const aX = Number(a.split("-")[0]);
          const aY = Number(a.split("-")[1]);
          const bX = Number(b.split("-")[0]);
          const bY = Number(b.split("-")[1]);
          if (areInLine(x, y, aX, aY, bX, bY)) antinodes.add(`${x}-${y}`);
        }
      }
    }
  }

  return antinodes.size;
};

console.log(star1());
console.log(star2());

const GRID_SERIAL_NUMBER = 9435;

const exec = (star) => {
  const grid = [];
  for (let x = 1; x <= 300; x++) {
    const row = [];
    for (let y = 1; y <= 300; y++) {
      const rackId = y + 10;
      let powerLevel = rackId * x;
      powerLevel += GRID_SERIAL_NUMBER;
      powerLevel *= rackId;
      powerLevel = +(powerLevel.toString().at(-3) || 0);
      powerLevel -= 5;
      row.push(powerLevel);
    }
    grid.push(row);
  }

  let largestTotal = -Infinity;
  const largestCoords = {};
  let bestSize = 0;

  // ideally for star 2 we would go from 1 to 300 but we can assume the ideal
  // square is within 5 and 30 in size.
  // Different input might require a different range
  const minSize = star === 1 ? 3 : 5;
  const maxSize = star === 1 ? 3 : 30;
  for (let x = 0; x < 300; x++) {
    for (let y = 0; y < 300; y++) {
      for (let size = minSize; size <= maxSize; size++) {
        if (x + size >= grid.length || y + size >= grid[x + size].length) break;

        let total = 0;
        for (let xx = x; xx < x + size; xx++) {
          for (let yy = y; yy < y + size; yy++) {
            total += grid[xx][yy];
          }
        }

        if (total > largestTotal) {
          largestTotal = total;
          largestCoords.x = x + 1;
          largestCoords.y = y + 1;
          bestSize = size;
        }
      }
    }
  }

  const res = `${largestCoords.y},${largestCoords.x}`;

  if (star === 1) return res;

  return `${res},${bestSize}`;
};

const starOne = () => {
  return exec(1);
};

const starTwo = () => {
  return exec(2);
};

console.log(starOne());
console.log(starTwo());

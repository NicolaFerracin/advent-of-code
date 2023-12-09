const caveDepth = 7305;
const end = [13, 734];
const start = [0, 0];

const MAX_X = end[0] + 120;
const MAX_Y = end[1] + 120;

const map = new Map();

const getGeoIndex = (x, y) => {
  // The region at 0,0 (the mouth of the cave) has a geologic index of 0.
  if (x === start[0] && y === start[1]) return 0;
  // The region at the coordinates of the target has a geologic index of 0.
  if (x === end[0] && y === end[1]) return 0;
  // If the region's Y coordinate is 0, the geologic index is its X coordinate times 16807.
  if (y === 0) return x * 16_807;
  // If the region's X coordinate is 0, the geologic index is its Y coordinate times 48271.
  if (x === 0) return y * 48_271;
  // Otherwise, the region's geologic index is the result of multiplying the erosion levels of the regions at X-1,Y and X,Y-1
  return (
    map.get(`${x - 1}#${y}`).erosionLvl * map.get(`${x}#${y - 1}`).erosionLvl
  );
};

const getRiskLevel = () => {
  const x0 = Math.min(start[0], end[0]);
  const y0 = Math.min(start[1], end[1]);
  const x1 = Math.max(start[0], end[0]);
  const y1 = Math.max(start[1], end[1]);

  let total = 0;
  for (x = x0; x <= x1; x++) {
    for (y = y0; y <= y1; y++) {
      total += map.get(`${x}#${y}`).regionType;
    }
  }
  return total;
};

const starOne = () => {
  for (let x = 0; x <= MAX_X; x++) {
    for (let y = 0; y <= MAX_Y; y++) {
      const geoIndex = getGeoIndex(x, y);
      const erosionLvl = (geoIndex + caveDepth) % 20_183;
      const regionType = erosionLvl % 3;
      map.set(`${x}#${y}`, { geoIndex, erosionLvl, regionType });
    }
  }

  return getRiskLevel();
};

const starTwo = () => {
  // map was generated in starOne
  const invalidGearByRegionType = { 0: "n", 1: "t", 2: "c" };
  const switchGearByRegionType = {
    0: { t: "c", c: "t" },
    1: { c: "n", n: "c" },
    2: { t: "n", n: "t" },
  };
  const gearByRegionType = {
    0: "tc",
    1: "cn",
    2: "tn",
  };
  const found = [];

  // equipment type t=torch c=climbing gear n=nothing
  const stack = [[0, 0, "t", 0]];
  const visited = new Map();
  while (stack.length > 0) {
    const [x, y, gear, timeSpent] = stack.shift();

    // target reached
    if (x === end[0] && y === end[1]) {
      return gear === "t" ? timeSpent : timeSpent + 7;
    }

    const type = map.get(`${x}#${y}`).regionType;
    for (const [addTime, gearToUse] of [
      [1, gear],
      [8, switchGearByRegionType[type][gear]],
    ]) {
      for (const move of [
        [0, 1],
        [1, 0],
        [-1, 0],
        [0, -1],
      ]) {
        const newX = move[0] + x;
        const newY = move[1] + y;
        // console.log({ x, y, newX, newY, gearToUse, addTime });
        // check if we are still inside the map
        if (newX >= MAX_X || newY >= MAX_Y || newX < 0 || newY < 0) {
          continue;
        }

        // check if gear is allowed in this new region
        const newType = map.get(`${newX}#${newY}`).regionType;
        if (!gearByRegionType[newType].includes(gearToUse)) {
          continue;
        }

        // check already visited regions
        const hasVisited = visited.get(`${newX}#${newY}#${gearToUse}`);
        if (hasVisited && hasVisited <= timeSpent + addTime) {
          continue;
        }
        visited.set(`${newX}#${newY}#${gearToUse}`, timeSpent + addTime);

        stack.push([newX, newY, gearToUse, timeSpent + addTime]);
      }
    }

    stack.sort((a, b) => a[3] - b[3]);
  }
};

console.log(starOne());
console.log(starTwo());

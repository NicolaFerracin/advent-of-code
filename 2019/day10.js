const { getStringArrayInput } = require("./utils");

const getInput = () => {
  const map = getStringArrayInput("day10").map((x) => x.split(""));
  const asteroids = [];
  let index = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "#") asteroids.push([x, y, index++]);
    }
  }

  return { map, asteroids };
};

const isBetween = (a, b, c) => {
  const crossproduct =
    (c[1] - a[1]) * (b[0] - a[0]) - (c[0] - a[0]) * (b[1] - a[1]);

  if (Math.abs(crossproduct) !== 0) return false;

  const dotproduct =
    (c[0] - a[0]) * (b[0] - a[0]) + (c[1] - a[1]) * (b[1] - a[1]);
  if (dotproduct < 0) return false;

  const squaredlengthba =
    (b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]);
  if (dotproduct > squaredlengthba) return false;

  return true;
};

const areInLine = ([x1, y1], [x2, y2], [x3, y3]) => {
  const a = (y1 - y2) * (x1 - x3);
  const b = (y1 - y3) * (x1 - x2);
  return parseFloat((a - b).toFixed(4)) === 0;
};

let station;
const star1 = () => {
  const { asteroids } = getInput();
  let max = null;
  let best = null;
  for (let x = 0; x < asteroids.length; x++) {
    const station = asteroids[x];
    let inSight = 0;

    for (let y = 0; y < asteroids.length; y++) {
      if (x === y) continue;
      const asteroidA = asteroids[y];
      let isAsteroidAValid = true;

      for (let z = 0; z < asteroids.length; z++) {
        if (x === z || y === z) continue;
        const asteroidB = asteroids[z];

        // asteroidB MUST be between the station and asteroidA to be obstructing,
        // otherwise, even if on the same line, it's not obstructing as it's farther away
        // Also, the station must not be between A and B, as in that case it would have sight of both
        if (
          !isBetween(asteroidA, asteroidB, station) &&
          isBetween(station, asteroidA, asteroidB) &&
          areInLine(station, asteroidA, asteroidB)
        ) {
          isAsteroidAValid = false;
          break;
        }
      }
      if (isAsteroidAValid) inSight++;
    }
    if (inSight > max) {
      max = inSight;
      best = x;
    }
  }
  station = asteroids[best];
  return max;
};

const getAngle = ([x, y], [x1, y1]) => {
  const dx = x1 - x;
  const dy = y1 - y;
  const angle = Math.atan2(dx, -dy);
  return angle < 0 ? angle + 2 * Math.PI : angle;
};

const distance = ([x, y], [x1, y1]) => {
  return Math.abs(x - x1) + Math.abs(y - y1);
};

const star2 = () => {
  const { asteroids } = getInput();

  // find all asteroids angles
  asteroids.forEach(([x, y], index) => {
    asteroids[index].angle = getAngle(station, [x, y]);
  });

  // sort them from 0
  asteroids.sort((a, b) => a.angle - b.angle);

  // the smallest angle is 0, so we set the start to a negative number
  let currentAngle = -1;

  const destroyed = new Set(); // holds the ID of the asteroids we destroyed

  // we keep going until we destroyed all asteroids
  while (destroyed.size < asteroids.length) {
    // active asteroids
    const activeAsteroids = asteroids.filter(([, , id]) => !destroyed.has(id));
    // console.log(activeAsteroids.length);

    // find the asteroids with the angle closest to the current angle
    let closestNextAngle = Infinity;
    for (const { angle } of activeAsteroids) {
      if (angle > currentAngle && angle < closestNextAngle)
        closestNextAngle = angle;
    }

    // if we could not find an eligible closestNextAngle, it means we finished the current round and need to restart
    if (closestNextAngle === Infinity) {
      currentAngle = -1;
      continue;
    }

    const eligibleAsteroids = activeAsteroids.filter(
      ({ angle }) => angle === closestNextAngle
    );

    const toDestroy = eligibleAsteroids.sort(
      (a, b) => distance(a, station) - distance(b, station)
    )[0];

    destroyed.add(toDestroy[2]);

    if (destroyed.size === 200) {
      return toDestroy[0] * 100 + toDestroy[1];
    }

    currentAngle = toDestroy.angle;
  }
};

console.log(star1());
console.log(star2());

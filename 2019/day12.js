const { getRawInput, lcm } = require("./utils");
require("lodash.combinations");
const _ = require("lodash");

const getMoons = () =>
  getRawInput("day12")
    .split("\n")
    .map((line) => {
      const [x, y, z] = line.match(/-?\d+/g).map(Number);

      return { x, y, z, vx: 0, vy: 0, vz: 0 };
    });

const applyGravity = (moonA, moonB, axis, velocityAxis) => {
  if (moonA[axis] > moonB[axis]) {
    moonA[velocityAxis]--;
    moonB[velocityAxis]++;
  } else if (moonA[axis] < moonB[axis]) {
    moonA[velocityAxis]++;
    moonB[velocityAxis]--;
  }
};

const star1 = () => {
  const moons = getMoons();
  const pairs = _.combinations([0, 1, 2, 3], 2);

  for (let timeSteps = 1; timeSteps <= 1000; timeSteps++) {
    // update the velocity
    // consider every pair of moons
    for (const [a, b] of pairs) {
      // On each axis (x, y, and z), the velocity of each moon changes by exactly +1 or -1 to pull the moons together
      const moonA = moons[a];
      const moonB = moons[b];
      applyGravity(moonA, moonB, "x", "vx");
      applyGravity(moonA, moonB, "y", "vy");
      applyGravity(moonA, moonB, "z", "vz");
    }

    // update the position of every moon
    // apply velocity
    for (const moon of moons) {
      // simply add the velocity of each moon to its own position
      moon.x += moon.vx;
      moon.y += moon.vy;
      moon.z += moon.vz;
    }
  }

  // The total energy for a single moon is its potential energy multiplied by its kinetic energy. A moon's potential energy is the sum of the absolute values of its x, y, and z position coordinates. A moon's kinetic energy is the sum of the absolute values of its velocity coordinates
  return moons.reduce((totalEnergies, moon) => {
    const potentialEnergy =
      Math.abs(moon.x) + Math.abs(moon.y) + Math.abs(moon.z);
    const kineticEnergy =
      Math.abs(moon.vx) + Math.abs(moon.vy) + Math.abs(moon.vz);
    const totalEnergy = potentialEnergy * kineticEnergy;

    return totalEnergies + totalEnergy;
  }, 0);
};

const getState = (moons, axis) => moons.map((m) => m[axis]).join("#");

const star2 = () => {
  const allTimeSteps = [];

  // we find the cycle for each axis, until the moons get back to their initial positions and their velocity is 0
  // we then find the LCM between the 3 cycles
  for (const axis of ["x", "y", "z"]) {
    const moons = getMoons();
    const pairs = _.combinations([0, 1, 2, 3], 2);
    const initialState = getState(moons, axis);
    let timeSteps = 0;
    while (true) {
      timeSteps++;
      for (const [a, b] of pairs) {
        const moonA = moons[a];
        const moonB = moons[b];
        applyGravity(moonA, moonB, axis, `v${axis}`);
      }
      for (const moon of moons) {
        moon[axis] += moon[`v${axis}`];
      }
      if (
        getState(moons, axis) === initialState &&
        moons.every((m) => m[`v${axis}`] === 0)
      )
        break;
    }
    allTimeSteps.push(timeSteps);
  }

  return lcm(allTimeSteps);
};

console.log(star1());
console.log(star2());

const { getNumberArrayInput } = require("./utils");
require("lodash.combinations");
const _ = require("lodash");

const exec = (groups) => {
  const packs = getNumberArrayInput("day24").sort((a, b) => b - a);
  const totalSum = packs.reduce((sum, c) => (sum += c), 0);
  const groupSum = totalSum / groups;

  let best = { packages: Infinity, qe: Infinity };

  // assume the best result can't have more than 6 packages
  for (let i = 0; i <= 6; i++) {
    const combinations = _.combinations(packs, i);

    for (const combination of combinations) {
      // ensure sum
      const combSum = combination.reduce((acc, c) => (acc += c), 0);
      if (combSum !== groupSum) continue;

      // ensure amount of packages
      if (combination.length > best.packages) continue;

      // ensure quantum entanglement
      const qe = combination.reduce((acc, c) => (acc *= c), 1);
      if (qe > best.qe) continue;

      // update best result
      best.packages = combination.length;
      best.qe = qe;
    }
  }

  return best.qe;
};

const starOne = () => {
  return exec(3);
};

const starTwo = () => {
  return exec(4);
};

console.log(starOne());
console.log(starTwo());

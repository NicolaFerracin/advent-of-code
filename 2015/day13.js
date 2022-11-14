const { getStringArrayInput } = require("./utils");
require("lodash.permutations");
const _ = require("lodash");

const getPossibleArrangments = () =>
  getStringArrayInput("day13").reduce((acc, curr) => {
    const [a, , what, amount, ...rest] = curr.split(" ");
    const b = rest.pop().split(".")[0];
    if (!acc[a]) acc[a] = {};
    acc[a][b] = what === "gain" ? +amount : -amount;
    return acc;
  }, {});

const exec = (arrangements) => {
  const people = Object.keys(arrangements);
  const perms = _.permutations(people, people.length);

  let best = 0;
  for (const perm of perms) {
    let total = 0;
    for (let i = 0; i < perm.length; i++) {
      const curr = perm[i];
      const left = i === 0 ? perm[perm.length - 1] : perm[i - 1];
      const right = i === perm.length - 1 ? perm[0] : perm[i + 1];
      total += arrangements[curr][left] + arrangements[curr][right];
    }
    best = Math.max(best, total);
  }
  return best;
};

const starOne = () => {
  return exec(getPossibleArrangments());
};

const starTwo = () => {
  const arrangements = getPossibleArrangments();
  arrangements.me = {};
  for (const key of Object.keys(arrangements)) {
    if (key === "me") continue;
    arrangements[key].me = 0;
    arrangements.me[key] = 0;
  }

  return exec(arrangements);
};

console.log(starOne());
console.log(starTwo());

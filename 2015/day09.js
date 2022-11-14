const { getStringArrayInput } = require("./utils");
require("lodash.permutations");
const _ = require("lodash");

const starOne = () => {
  const input = getStringArrayInput("day09");
  const cities = new Set();
  const distances = {};

  for (const line of input) {
    const [a, , b, , dist] = line.split(" ");
    cities.add(a);
    cities.add(b);
    if (distances[a]) distances[a][b] = Number(dist);
    else distances[a] = { [b]: Number(dist) };

    if (distances[b]) distances[b][a] = Number(dist);
    else distances[b] = { [a]: Number(dist) };
  }

  const permutations = _.permutations([...cities], cities.size);

  let best = Infinity;
  let worst = 0;
  while (permutations.length) {
    const permutation = permutations.pop();
    let traveled = 0;
    for (let i = 0; i < permutation.length - 1; i++) {
      const a = permutation[i];
      const b = permutation[i + 1];
      traveled += distances[a][b];
    }
    best = Math.min(traveled, best);
    worst = Math.max(traveled, worst);
  }

  return { best, worst };
};

console.log(starOne());

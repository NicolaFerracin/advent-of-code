const {
  readInput,
  print,
  splitInputByLine,
  straightLineDistance,
} = require("./utils");

const input = splitInputByLine(readInput("day08")).map((l) =>
  l.split(",").map(Number)
);

const preComputeDistances = (lights, optionalSlice) => {
  const distances = [];
  for (let x = 0; x < lights.length - 1; x++) {
    for (let y = x + 1; y < lights.length; y++) {
      if (x === y) continue; // skip same light
      const key = `${lights[x].toString()}-${lights[y].toString()}`;
      const dist = straightLineDistance(lights[x], lights[y]);
      distances.push([key, dist]);
    }
  }
  distances.sort((a, b) => a[1] - b[1]);
  if (optionalSlice) distances.slice(optionalSlice);
  return distances;
};

const mergeCircuits = (circuits, x, y) => {
  const a = circuits.get(x);
  const b = circuits.get(y);
  [...circuits.entries()]
    .filter((m) => m[1] === b)
    .forEach((m) => circuits.set(m[0], a));
};

const star1 = () => {
  const ROUNDS = 1000;
  const circuits = new Map();
  input.forEach((l, i) => circuits.set(l.toString(), i));

  // pre-calculate distances
  const distances = preComputeDistances(input, ROUNDS);

  for (let i = 0; i < ROUNDS; i++) {
    // get next closest connection
    const [closestPair] = distances.shift();

    // merge circuits
    const [x, y] = closestPair.split("-");
    mergeCircuits(circuits, x, y);
  }

  return Object.entries(
    [...circuits.entries()].reduce((tot, curr) => {
      if (curr[1] in tot) tot[curr[1]]++;
      else tot[curr[1]] = 1;
      return tot;
    }, {})
  )
    .map((g) => g[1])
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((sum, curr) => sum * curr, 1);
};

const star2 = () => {
  const lights = [...input];
  const circuits = new Map();
  input.forEach((l, i) => circuits.set(l.toString(), i));

  // pre-calculate distances
  const distances = preComputeDistances(lights);

  while (true) {
    // get next closest connection
    const [closestPair] = distances.shift();

    // merge circuits
    const [x, y] = closestPair.split("-");
    mergeCircuits(circuits, x, y);

    // if we only have one circuit, we are done
    const totalCircuits = new Set([...circuits.values()]);
    if (totalCircuits.size === 1) {
      return Number(x.split(",").shift()) * Number(y.split(",").shift());
    }
  }
};

print(star1);
print(star2);

const { getRawInput } = require("./utils");
const { EOL } = require("os");

const getMapping = (arr) => {
  const [name, ...values] = arr;
  const [source, , destination] = name.split(" ")[0].split("-");
  return {
    destination,
    source,
    values: values.map((x) => x.split(" ").map(Number)),
  };
};

const input = getRawInput("day05")
  .split(`${EOL}${EOL}`)
  .map((x) => x.split(EOL));

const seeds = input.shift()[0].split(" ").map(Number).filter(Boolean);
const mapping = {};
while (input.length) {
  const { destination, source, values } = getMapping(input.shift());
  const key = `${source}-${destination}`;
  mapping[key] = [];
  for (const [dest, src, range] of values) {
    mapping[key].push({ dest, src, range });
  }
}
const tree = [
  "seed",
  "soil",
  "fertilizer",
  "water",
  "light",
  "temperature",
  "humidity",
  "location",
];

const starOne = () => {
  let closestLocation = Infinity;
  for (const seed of seeds) {
    let val = seed;
    for (let i = 0; i < tree.length - 1; i++) {
      const key = `${tree[i]}-${tree[i + 1]}`;
      const range = mapping[key].find(
        (x) => x.src <= val && x.src + x.range >= val
      );
      if (range) {
        val = range.dest + (val - range.src);
      }
      if (tree[i + 1] === "location") {
        closestLocation = Math.min(closestLocation, val);
      }
    }
  }
  return closestLocation;
};

const keys = [
  "seed-soil",
  "soil-fertilizer",
  "fertilizer-water",
  "water-light",
  "light-temperature",
  "temperature-humidity",
  "humidity-location",
].reverse();
const starTwo = () => {
  let location = 0;
  while (true) {
    let val = location;
    for (let key of keys) {
      const range = mapping[key].find(
        (x) =>
          x.dest <= val &&
          x.dest + x.range - 1 >= val
      );
      val = range ? range.src + (val - range.dest) : val;
    }

    for (let i = 0; i < seeds.length; i += 2) {
      if (seeds[i] <= val && seeds[i] + seeds[i + 1] - 1 >= val)
        return location;
    }

    location++;
  }
};

console.log(starOne());
console.log(starTwo());

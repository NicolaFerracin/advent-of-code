const { getStringArrayInput } = require("./utils");

const input = getStringArrayInput("day23");
const bots = input.map((line) => {
  const [x, y, z, r] = line.match(/-?\d+/g).map(Number);
  return { x, y, z, r };
});

const distance = (a, b) =>
  Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);

const starOne = () => {
  const strongest = bots.sort(({ r: a }, { r: b }) => b - a)[0];
  return bots.filter((bot) => distance(strongest, bot) <= strongest.r).length;
};

const starTwo = () => {
  const origin = { x: 0, y: 0, z: 0 };

  const nextSteps = (s, e, f) => {
    const res = [];
    for (let x = s.x; x <= e.x; x += f) {
      for (let y = s.y; y <= e.y; y += f) {
        for (let z = s.z; z <= e.z; z += f) {
          res.push({ x, y, z });
        }
      }
    }

    return res;
  };

  let factor = 10_000_000;
  let best = null;
  while (factor >= 1) {
    const curr = best ?? origin;

    const start = {
      x: curr.x - factor * 10,
      y: curr.y - factor * 10,
      z: curr.z - factor * 10,
    };
    const end = {
      x: curr.x + factor * 10,
      y: curr.y + factor * 10,
      z: curr.z + factor * 10,
    };

    // create all next steps
    const potential = nextSteps(start, end, factor)
      // add bots within range
      .map((p) => {
        return {
          ...p,
          bots: bots.filter((bot) => distance(bot, p) <= bot.r).length,
        };
      })
      // sort by the ones with most bots in range and closest to us
      .sort(
        (a, b) => b.bots - a.bots || distance(b, origin) - distance(a, origin)
      );

    // add the best option to the queue
    best = potential[0];
    factor /= 10;
  }

  return distance(best, origin);
};

console.log(starOne());
console.log(starTwo());

const { getStringArrayInput } = require("./utils");
const _ = require("lodash");

const starOne = () => {
  return getStringArrayInput("day20")
    .map((line, i) => {
      const [p, v, a] = line.match(/(?<=<)(.*?)(?=>)/g);
      return {
        i,
        p: p.split(",").map((_) => Math.abs(+_)),
        v: v.split(",").map((_) => Math.abs(+_)),
        a: a.split(",").map((_) => Math.abs(+_)),
      };
    })
    .sort((a, b) => {
      const accelarationA = a.a[0] + a.a[1] + a.a[2];
      const accelarationB = b.a[0] + b.a[1] + b.a[2];
      if (accelarationA === accelarationB) {
        const velocityA = a.v[0] + a.v[1] + a.v[2];
        const velocityB = b.v[0] + b.v[1] + b.v[2];
        return velocityA - velocityB;
      }

      return accelarationA - accelarationB;
    })
    .shift().i;
};

const starTwo = () => {
  let points = getStringArrayInput("day20").map((line, i) => {
    const [p, v, a] = line.match(/(?<=<)(.*?)(?=>)/g);
    return {
      i,
      p: p.split(",").map((_) => +_),
      v: v.split(",").map((_) => +_),
      a: a.split(",").map((_) => +_),
    };
  });

  let i = 0;
  while (true) {
    i++;
    // if there has not been a collision in 1_000 moves, we can assume we reached the end
    if (i > 1_000) return points.length;

    const positions = new Map();
    for (const point of points) {
      point.v[0] += point.a[0];
      point.v[1] += point.a[1];
      point.v[2] += point.a[2];

      point.p[0] += point.v[0];
      point.p[1] += point.v[1];
      point.p[2] += point.v[2];

      const key = `${point.p[0]}-${point.p[1]}-${point.p[2]}`;
      if (positions.has(key)) positions.get(key).push(point.i);
      else positions.set(key, [point.i]);
    }

    const toRemove = _.flatten(
      [...positions.values()].filter((colliding) => colliding.length > 1)
    );

    if (toRemove.length) {
      points = points.filter(({ i }) => toRemove.indexOf(i) === -1);
      i = 0;
    }
  }
};

console.log(starOne());
console.log(starTwo());

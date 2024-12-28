const { getStringArrayInput } = require("./utils");

const getInput = () =>
  getStringArrayInput("day25").map((line) => line.split(",").map(Number));

const distance = (a, b) =>
  Math.abs(a[0] - b[0]) +
  Math.abs(a[1] - b[1]) +
  Math.abs(a[2] - b[2]) +
  Math.abs(a[3] - b[3]);

const encode = (s) => s.join(",");
const decode = (s) => s.split(",").map(Number);

const star1 = () => {
  let stars = getInput();
  const constellations = [];

  while (stars.length) {
    const constellation = new Set();
    constellation.add(encode(stars.shift()));

    for (let x = 0; x < stars.length; x++) {
      const star1 = stars[x];
      for (const star of [...constellation.values()]) {
        const star2 = decode(star);
        if (distance(star1, star2) <= 3) {
          constellation.add(encode(star1));
          stars = stars.filter((s) => encode(s) !== encode(star1));
          x = 0;
        }
      }
    }
    constellations.push(constellation);
  }

  return constellations.length;
};

console.log(star1());

const { getStringArrayInput } = require("./utils");

const exec = (discs) => {
  let time = 0;
  while (true) {
    let found = true;
    for (let i = 0; i < discs.length; i++) {
      const disc = discs[i];
      const elapsed = time + 1 + i;
      const pos = (disc.initialPosition + elapsed) % disc.positions;
      if (pos !== 0) found = false;
    }
    if (found) break;
    time++;
  }

  return time;
};

const getDiscs = () => {
  return getStringArrayInput("day15")
    .map((line) => {
      const [, id, , positions, , , , , , , , initialPosition] =
        line.split(" ");

      return {
        id: Number(id.substring(1)),
        positions: Number(positions),
        initialPosition: Number(
          initialPosition.substring(0, initialPosition.length - 1)
        ),
      };
    })
    .sort((a, b) => a.id - b.id);
};

const starOne = () => {
  return exec(getDiscs());
};

const starTwo = () => {
  const discs = getDiscs();
  discs.push({ initialPosition: 0, positions: 11 });
  return exec(discs);
};

console.log(starOne());
console.log(starTwo());

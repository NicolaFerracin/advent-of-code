const { getStringArrayInput } = require("./utils");

const starOne = () => {
  const jumps = getStringArrayInput("day05").map((x) => +x);

  let i = 0;
  let turns = 0;
  while (true) {
    if (i > jumps.length - 1) return turns;
    const prev = jumps[i];
    jumps[i]++;
    i += prev;
    turns++;
  }
};

const starTwo = () => {
  const jumps = getStringArrayInput("day05").map((x) => +x);

  let i = 0;
  let turns = 0;
  while (true) {
    if (i > jumps.length - 1) return turns;
    const prev = jumps[i];
    jumps[i] += prev >= 3 ? -1 : 1;
    i += prev;
    turns++;
  }
};

console.log(starOne());
console.log(starTwo());

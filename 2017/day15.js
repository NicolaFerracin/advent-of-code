const { getStringArrayInput } = require("./utils");

const toBin = (str) => (`0`.repeat(32) + str.toString(2)).substr(-32);

const ONE_MILION = 1_000_000;

const starOne = () => {
  let [prevA, prevB] = getStringArrayInput("day15").map(
    (line) => +line.split(" ").pop()
  );
  const factorA = 16807;
  const factorB = 48271;

  const divisor = 2147483647;
  let matches = 0;
  const LIMIT = ONE_MILION * 40;
  for (let i = 0; i < LIMIT; i++) {
    if (i % ONE_MILION === 0)
      console.log(i / ONE_MILION, "of", LIMIT / ONE_MILION);
    prevA = (prevA * factorA) % divisor;
    prevB = (prevB * factorB) % divisor;

    const binA = toBin(prevA).substr(-16);
    const binB = toBin(prevB).substr(-16);
    if (binA === binB) matches++;
  }

  return matches;
};

const starTwo = () => {
  let [prevA, prevB] = getStringArrayInput("day15").map(
    (line) => +line.split(" ").pop()
  );
  const factorA = 16807;
  const factorB = 48271;

  const divisor = 2147483647;
  let matches = 0;
  const LIMIT = ONE_MILION * 5;
  for (let i = 0; i < LIMIT; i++) {
    if (i % ONE_MILION === 0)
      console.log(i / ONE_MILION, "of", LIMIT / ONE_MILION);
    do prevA = (prevA * factorA) % divisor;
    while (prevA % 4 !== 0);
    do prevB = (prevB * factorB) % divisor;
    while (prevB % 8 !== 0);

    const binA = toBin(prevA).substr(-16);
    const binB = toBin(prevB).substr(-16);
    if (binA === binB) matches++;
  }

  return matches;
};

console.log(starOne());
console.log(starTwo());

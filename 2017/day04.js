const { getStringArrayInput } = require("./utils");

const starOne = () => {
  return getStringArrayInput("day04").reduce((acc, line) => {
    const passphrase = line.split(" ");
    if (passphrase.length === new Set(passphrase).size) return (acc += 1);
    return acc;
  }, 0);
};

const starTwo = () => {
  return getStringArrayInput("day04").reduce((acc, line) => {
    const passphrase = line
      .split(" ")
      .map((word) => word.split("").sort().join(""));
    if (passphrase.length === new Set(passphrase).size) return (acc += 1);
    return acc;
  }, 0);
};

console.log(starOne());
console.log(starTwo());

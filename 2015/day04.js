const md5 = require("md5");

const KEY = "iwrupvqb";

const exec = (zeroes) => {
  let i = 0;
  while (true) {
    const hash = md5(`${KEY}${i}`);
    if (hash.startsWith("0".repeat(zeroes))) return i;
    i++;
  }
};

const starOne = () => {
  return exec(5);
};

const starTwo = () => {
  return exec(6);
};

console.log(starOne());
console.log(starTwo());

const { getStringArrayInput } = require("./utils");

const starOne = () => {
  return getStringArrayInput("day01")
    .map((line) => {
      const [first, ...rest] = [...line.matchAll(/\d/g)];
      const last = rest.pop();
      return +`${first}${last ?? first}`;
    })
    .reduce((sum, n) => (sum += n), 0);
};

const starTwo = () => {
  const nums = [
    "undefined",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  return getStringArrayInput("day01")
    .map((line) => {
      const allMatches = [...line.matchAll(/\d/g)];
      let { 0: firstVal, index: firstIndex } = allMatches[0];
      let { 0: lastVal, index: lastIndex } = allMatches.pop() ?? allMatches[0];
      for (const n of nums) {
        if (line.indexOf(n) >= 0 && line.indexOf(n) < firstIndex) {
          firstIndex = line.indexOf(n);
          firstVal = nums.indexOf(n);
        }
        if (line.indexOf(n) >= 0 && line.lastIndexOf(n) > lastIndex) {
          lastIndex = line.lastIndexOf(n);
          lastVal = nums.indexOf(n);
        }
      }
      return +`${firstVal}${lastVal}`;
    })
    .reduce((sum, n) => (sum += n), 0);
};

console.log(starOne());
console.log(starTwo());

const { readInput, print } = require("./utils");

const input = readInput("day02")
  .split(",")
  .map((range) => range.split("-").map(Number));

const star1 = () => {
  let sum = 0;
  for (const [start, end] of input) {
    for (let i = start; i <= end; i++) {
      const str = i.toString();
      if (str.length % 2 !== 0) continue;
      if (str.substring(0, str.length / 2) === str.substring(str.length / 2))
        sum += i;
    }
  }
  return sum;
};

const star2 = () => {
  let sum = 0;
  for (const [start, end] of input) {
    for (let i = start; i <= end; i++) {
      const str = i.toString();

      for (let subLen = 1; subLen <= Math.floor(str.length / 2); subLen++) {
        if (str.length % subLen !== 0) continue;

        const splitRegex = new RegExp(`.{1,${subLen}}`, "g");
        const partsSet = new Set(str.match(splitRegex));

        if (partsSet.size === 1) {
          sum += i;
          break;
        }
      }
    }
  }
  return sum;
};

print(star1);
print(star2);

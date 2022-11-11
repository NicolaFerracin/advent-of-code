const { getStringArrayInput } = require("./utils");

const exec = () => {
  const input = getStringArrayInput("day20")
    .map((x) => x.split("-").map((x) => Number(x)))
    .sort((a, b) => a[0] - b[0]);

  const intervals = [];
  for (let i = 0; i < input.length; i++) {
    const prev = intervals[intervals.length - 1];
    if (intervals.length && prev[1] > input[i][0]) {
      prev[1] = Math.max(prev[1], input[i][1]);
    } else {
      intervals.push(input[i]);
    }
  }

  const validIps = [];
  for (let i = 0; i < intervals.length - 1; i++) {
    const curr = intervals[i];
    const next = intervals[i + 1];
    if (curr[1] + 1 < next[0]) {
      validIps.push(curr[1] + 1);
    }
  }

  return validIps;
};

const starOne = () => {
  return exec()[0];
};

const starTwo = () => {
  return exec().length;
};

console.log(starOne());
console.log(starTwo());

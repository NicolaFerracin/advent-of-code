const { getStringArrayInput } = require("./utils");

const getPairs = () =>
  getStringArrayInput("day04").map((line) => {
    const [one, two] = line.split(",");
    return {
      one: one.split("-").map((_) => +_),
      two: two.split("-").map((_) => +_),
    };
  });

const starOne = () => {
  const pairs = getPairs();

  return pairs.filter(({ one, two }) => {
    return (
      (two[0] >= one[0] && two[1] <= one[1]) ||
      (one[0] >= two[0] && one[1] <= two[1])
    );
  }).length;
};

const starTwo = () => {
  const pairs = getPairs();

  return pairs.filter(({ one, two }) => {
    return (
      (two[1] >= one[0] && two[0] <= one[1]) ||
      (one[1] >= two[0] && one[0] <= two[1])
    );
  }).length;
};

console.log(starOne());
console.log(starTwo());

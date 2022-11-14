const { getRawInput } = require("./utils");

const starOne = () => {
  return getRawInput("day12")
    .match(/-?\d+/g)
    .reduce((total, curr) => (total += Number(curr)), 0);
};

const starTwo = () => {
  const json = JSON.parse(getRawInput("day12"));

  const hasRed = (obj) => Object.values(obj).indexOf("red") >= 0;

  const findNumbers = (item) => {
    if (typeof item === "number") return item;

    if (typeof item === "string") return 0;

    if (item.join) {
      return item.reduce((acc, subItem) => (acc += findNumbers(subItem)), 0);
    }

    return Object.values(item).reduce(
      (acc, val) => (acc += hasRed(item) ? 0 : findNumbers(val)),
      0
    );
  };

  return findNumbers(json);
};

console.log(starOne());
console.log(starTwo());

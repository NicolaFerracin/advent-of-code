const { getStringArrayInput } = require("./utils");

const getPresentsWithSortedSides = () =>
  getStringArrayInput("day02").map((x) =>
    x
      .split("x")
      .map((x) => Number(x))
      .sort((a, b) => a - b)
  );

const starOne = () => {
  return getPresentsWithSortedSides().reduce((total, curr) => {
    const [w, l, h] = curr; // w and l are guaranteed to be the smallest thanks to the sorting
    return (total += 2 * l * w + 2 * w * h + 2 * h * l + w * l);
  }, 0);
};

const starTwo = () => {
  return getPresentsWithSortedSides().reduce((total, curr) => {
    const [w, l, h] = curr; // w and l are guaranteed to be the smallest thanks to the sorting
    return (total += w * 2 + l * 2 + w * l * h);
  }, 0);
};

console.log(starOne());
console.log(starTwo());

const { getRawInput } = require("./utils");

const starOne = () => {
  return getRawInput("day01")
    .split("")
    .reduce((floor, curr) => (floor += curr === "(" ? 1 : -1), 0);
};

const starTwo = () => {
  let floor = 0;
  return (
    getRawInput("day01")
      .split("")
      .findIndex((curr) => {
        floor += curr === "(" ? 1 : -1;
        return floor === -1;
      }) + 1
  );
};

console.log(starOne());
console.log(starTwo());

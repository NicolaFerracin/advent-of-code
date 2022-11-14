const { getStringArrayInput } = require("./utils");

const target = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

const getSues = () =>
  getStringArrayInput("day16").map((line) => {
    const items = line.match(/([a-z]+)(?=:)/g);
    const amounts = line.match(/(?<=:\s)\d+/g);
    const collection = {};
    for (let i = 0; i < items.length; i++) {
      collection[items[i]] = +amounts[i];
    }
    return collection;
  });

const starOne = () => {
  return (
    getSues().findIndex((sue) => {
      for (const key of Object.keys(target)) {
        if (key in sue && target[key] !== sue[key]) return false;
      }
      return true;
    }) + 1
  );
};

const starTwo = () => {
  return (
    getSues().findIndex((sue) => {
      for (const key of Object.keys(target)) {
        if (key in sue) {
          if (key === "cats" || key === "trees") {
            if (sue[key] < target[key]) return false;
          } else if (key === "pomeranians" || key === "goldfish") {
            if (sue[key] > target[key]) return false;
          } else if (target[key] !== sue[key]) return false;
        }
      }
      return true;
    }) + 1
  );
};

console.log(starOne());
console.log(starTwo());

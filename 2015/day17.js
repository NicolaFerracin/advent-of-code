const { getStringArrayInput } = require("./utils");

const exec = () => {
  const containers = getStringArrayInput("day17")
    .map((x) => +x)
    .sort();

  const res = [];
  let min = Infinity;

  const findSum = (arr, sum, index) => {
    if (sum === 0) {
      res.push(arr.length);
      min = Math.min(min, arr.length);
      return;
    }
    for (let i = index; i < containers.length; i++) {
      if (sum - containers[i] >= 0) {
        arr.push(containers[i]);
        findSum(arr, sum - containers[i], i + 1);
        arr.pop();
      }
    }
  };

  findSum([], 150, 0);

  return { res, min };
};

const starOne = () => {
  return exec().res.length;
};

const starTwo = () => {
  const { res, min } = exec();
  return res.filter((len) => len === min).length;
};

console.log(starOne());
console.log(starTwo());

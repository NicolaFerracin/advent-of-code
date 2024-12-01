const { getStringArrayInput } = require("./utils");

const star1 = () => {
  const [list1, list2] = getStringArrayInput("day01").reduce(
    (acc, line) => {
      const [a, b] = line.match(/\d+/g).map(Number);
      acc[0].push(a);
      acc[1].push(b);
      return acc;
    },
    [[], []]
  );

  list1.sort();
  list2.sort();
  return list1.reduce(
    (acc, curr, index) => (acc += Math.abs(curr - list2[index])),
    0
  );
};

const star2 = () => {
  const [list1, list2] = getStringArrayInput("day01").reduce(
    (acc, line) => {
      const [a, b] = line.match(/\d+/g).map(Number);
      acc[0][a] = (acc[0][a] ?? 0) + 1;
      acc[1][b] = (acc[1][b] ?? 0) + 1;
      return acc;
    },
    [{}, {}]
  );

  return Object.keys(list1).reduce(
    (acc, key) => (acc += Number(key) * (list2[key] ?? 0)),
    0
  );
};

console.log(star1());
console.log(star2());

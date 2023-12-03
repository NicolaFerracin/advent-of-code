const { getStringArrayInput } = require("./utils");

const starOne = () => {
  const lines = getStringArrayInput("day03");
  let sum = 0;
  for (let row = 0; row < lines.length; row++) {
    const matches = [...lines[row].matchAll(/\d+/g)].map(
      ({ 0: num, index }) => ({
        num,
        index,
      })
    );
    for (const { num, index } of matches) {
      const start = index - 1;
      const end = index + num.length + 1;
      const isValid = [
        lines[row - 1]?.substring(start, end),
        lines[row]?.substring(start, end),
        lines[row + 1]?.substring(start, end),
      ]
        .filter(Boolean)
        .some((row) => /[^\.\d]/g.test(row));

      if (isValid) {
        sum += +num;
        continue;
      }
    }
  }

  return sum;
};

const starTwo = () => {
  const lines = getStringArrayInput("day03");
  const asterisks = {};
  for (let row = 0; row < lines.length; row++) {
    const nums = [...lines[row].matchAll(/\d+/g)].map(({ 0: num, index }) => ({
      num,
      index,
    }));
    for (const { num, index } of nums) {
      const start = index - 1;
      const end = index + num.length + 1;
      [row - 1, row, row + 1].forEach((rowId) => {
        const line = lines[rowId]?.substring(start, end);
        if (line && /\*/g.test(line)) {
          for (let x = 0; x < lines[rowId].length - 1; x++) {
            if (x < start || x >= end) continue;
            if (lines[rowId][x] === "*") {
              const key = `${rowId}-${x}`;
              if (!(key in asterisks)) asterisks[key] = [];
              asterisks[key].push(+num);
            }
          }
        }
      });
    }
  }

  return Object.entries(asterisks)
    .filter(([, nums]) => nums.length === 2)
    .map(([, nums]) => nums[0] * nums[1])
    .reduce((sum, ratio) => (sum += ratio), 0);
};

console.log(starOne());
console.log(starTwo());

const { getStringArrayInput } = require("./utils");
const PREAMBLE_LEN = 25;

function starOne() {
  const input = getStringArrayInput("day09").map((_) => Number(_));
  const preamble = input.filter((_, index) => index < PREAMBLE_LEN);
  const nums = input.filter((_, index) => index >= PREAMBLE_LEN);

  while (true) {
    const num = nums.shift();

    let found = false;
    const seen = new Set();
    for (let i = 0; i < preamble.length; i++) {
      const curr = preamble[i];
      const complement = num - curr;
      if (seen.has(complement)) {
        found = true;
        break;
      }
      seen.add(curr);
    }

    if (!found) return num;

    preamble.shift();
    preamble.push(num);
  }
}
console.log(starOne());

console.log(
  (function starTwo() {
    const target = starOne();
    const input = getStringArrayInput("day09").map((_) => Number(_));

    let set = [];
    for (let x = 0; x < input.length - 1; x++) {
      if (input[x] === target) continue;
      set = [];
      let sum = 0;
      for (let y = x; y < input.length; y++) {
        if (sum + input[y] <= target) {
          sum += input[y];
          set.push(input[y]);
        } else {
          break;
        }
      }
      if (sum === target) break;
    }
    const max = Math.max(...set);
    const min = Math.min(...set);

    return max + min;
  })()
);

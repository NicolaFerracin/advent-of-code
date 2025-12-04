const { readInput, splitInputByLine, print } = require("./utils");

const input = splitInputByLine(readInput("day03"));

const star1 = () => {
  return input.reduce((sum, bank) => {
    const batteries = bank.split("").map(Number);

    let best = 0;
    for (let left = 0; left < batteries.length - 1; left++) {
      for (let right = left + 1; right < batteries.length; right++) {
        if (right === left) continue;
        const joltage = Number(
          batteries[left].toString() + batteries[right].toString()
        );
        if (joltage > best) best = joltage;
      }
    }

    return sum + best;
  }, 0);
};

const star2 = () => {
  const bankLen = input[0].length;
  return input.reduce((sum, bank) => {
    const batteries = bank.split("").map(Number);

    let joltage = "";
    let prevIndex = -1;
    for (let i = 12; i > 0; i--) {
      // find the highest battery within range ]prevIndex, (bankLen - i)]
      let best = 0;
      for (let index = prevIndex + 1; index <= bankLen - i; index++) {
        if (batteries[index] > best) {
          best = batteries[index];
          prevIndex = index;
        }
      }
      joltage += best;
    }
    return sum + Number(joltage);
  }, 0);
};

print(star1);
print(star2);

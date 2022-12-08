const { getStringArrayInput } = require("./utils");

const getPriority = (letter) => {
  const isUpperCase = /[A-Z]/.test(letter);

  if (isUpperCase) {
    const priority = letter.charCodeAt(0) - "A".charCodeAt(0) + 27;
    return priority;
  }

  const priority = letter.charCodeAt(0) - "a".charCodeAt(0) + 1;
  return priority;
};

const starOne = () => {
  return getStringArrayInput("day03").reduce((sum, rucksack) => {
    const mid = rucksack.length / 2;
    const left = rucksack.substring(0, mid);
    const right = rucksack.substring(mid);

    for (const letter of left) {
      if (right.includes(letter)) {
        return (sum += getPriority(letter));
      }
    }
  }, 0);
};

const starTwo = () => {
  const rucksacks = getStringArrayInput("day03");

  let sum = 0;
  for (let i = 0; i < rucksacks.length - 2; i += 3) {
    const one = rucksacks[i];
    const two = rucksacks[i + 1];
    const three = rucksacks[i + 2];

    for (const letter of one) {
      if (two.includes(letter) && three.includes(letter)) {
        sum += getPriority(letter);
        break;
      }
    }
  }

  return sum;
};

console.log(starOne());
console.log(starTwo());

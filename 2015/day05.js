const { getStringArrayInput } = require("./utils");

const starOne = () => {
  return getStringArrayInput("day05").filter((str) => {
    let vowels = 0;
    const invalid = ["ab", "cd", "pq", "xy"];
    let hasSameLetterNext = false;
    let shouldInvalidate = false;

    for (let i = 0; i < str.length; i++) {
      if (/[aeiou]/.test(str[i])) vowels++;
      if (i < str.length - 1 && str[i] === str[i + 1]) hasSameLetterNext = true;
      if (i < str.length - 1 && invalid.indexOf(str[i] + str[i + 1]) >= 0)
        shouldInvalidate = true;
    }

    return vowels >= 3 && hasSameLetterNext && !shouldInvalidate;
  }).length;
};

const starTwo = () => {
  return getStringArrayInput("day05").filter((str) => {
    let hasRepeatingPair = false;
    let hasRepeatedLetterWithOneInBetween = false;
    for (let i = 0; i < str.length - 1; i++) {
      if (str.lastIndexOf(`${str[i]}${str[i + 1]}`) > i + 1)
        hasRepeatingPair = true;

      if (i < str.length - 2 && str[i] === str[i + 2])
        hasRepeatedLetterWithOneInBetween = true;
    }
    return hasRepeatingPair && hasRepeatedLetterWithOneInBetween;
  }).length;
};

console.log(starOne());
console.log(starTwo());

const { getRawInput } = require("./utils");

const exec = (countGarbage) => {
  const input = getRawInput("day09");

  let totalScore = 0;
  let garbageCount = 0;
  let currScore = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    // handle garbage
    if (char === "<") {
      let j = 1;
      while (input[i + j] !== ">") {
        if (input[i + j] === "!") j++;
        else if (j !== 0 && input[i + j] !== ">") garbageCount++;
        j++;
      }
      i += j;
    }

    if (char === "!") i++;
    else if (char === "{") currScore++;
    else if (char === "}") totalScore += currScore--;
  }

  return countGarbage ? garbageCount : totalScore;
};

const starOne = () => {
  return exec(false);
};

const starTwo = () => {
  return exec(true);
};

console.log(starOne());
console.log(starTwo());

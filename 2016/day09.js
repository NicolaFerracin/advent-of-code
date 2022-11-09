const { getStringArrayInput } = require("./utils");

const getDecompressedLen = (str, isRecursive) => {
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(") {
      let howManyChars = "";
      i++;
      while (str[i] !== "x") {
        howManyChars += str[i];
        i++;
      }
      i++;
      let repetitions = "";
      while (str[i] !== ")") {
        repetitions += str[i];
        i++;
      }
      let toRepeat = "";
      for (let x = 0; x < howManyChars; x++) {
        i++;
        toRepeat += str[i];
      }
      if (isRecursive) {
        len += repetitions * getDecompressedLen(toRepeat, true);
      } else {
        len += repetitions * howManyChars;
      }
    } else {
      len += 1;
    }
  }
  return len;
};

const starOne = () => {
  return getStringArrayInput("day09").reduce((len, line) => {
    return (len += getDecompressedLen(line, false));
  }, 0);
};

const starTwo = () => {
  return getStringArrayInput("day09").reduce((len, line) => {
    return (len += getDecompressedLen(line, true));
  }, 0);
};

console.log(starOne());
console.log(starTwo());

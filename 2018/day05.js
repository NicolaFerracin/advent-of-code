const { getRawInput } = require("./utils");

const collapsePolymer = (polymer) => {
  let newPolymer = "";
  for (let i = 0; i < polymer.length; i++) {
    if (
      i < polymer.length - 1 &&
      polymer[i] !== polymer[i + 1] &&
      polymer[i].toUpperCase() === polymer[i + 1].toUpperCase()
    ) {
      // we can skip this and the next character
      i++;
    } else {
      newPolymer += polymer[i];
    }
  }

  return newPolymer;
};

const starOne = () => {
  let polymer = getRawInput("day05");

  while (true) {
    const newPolymer = collapsePolymer(polymer);

    if (newPolymer.length === polymer.length) return newPolymer.length;

    polymer = newPolymer;
  }
};

const starTwo = () => {
  let bestResult = Infinity;
  for (
    let charCode = "a".charCodeAt(0);
    charCode <= "z".charCodeAt(0);
    charCode++
  ) {
    const currentChar = String.fromCharCode(charCode);
    let polymer = getRawInput("day05")
      .split("")
      .filter((c) => c !== currentChar && c !== currentChar.toUpperCase())
      .join("");

    let found = false;
    while (!found) {
      const newPolymer = collapsePolymer(polymer);

      if (newPolymer.length === polymer.length) {
        bestResult = Math.min(bestResult, newPolymer.length);
        found = true;
        break;
      }

      polymer = newPolymer;
    }
  }

  return bestResult;
};

console.log(starOne());
console.log(starTwo());

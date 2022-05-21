const { getStringArrayInput } = require("./utils");

console.log(
  (function starOne() {
    const input = getStringArrayInput("day02").map((entry) => {
      const [, occurrences, letter, password] = entry.match(
        /(\d+-\d+) (\w): (\w+)/
      );
      const [min, max] = occurrences.split("-");
      return { min: Number(min), max: Number(max), letter, password };
    });

    return input.reduce((acc, curr) => {
      const { min, max, letter, password } = curr;
      let count = 0;
      for (let i = 0; i < password.length; i++) {
        if (password[i] === letter) count++;
      }

      return count >= min && count <= max ? acc + 1 : acc;
    }, 0);
  })()
);

console.log(
  (function starTwo() {
    const input = getStringArrayInput("day02").map((entry) => {
      const [, positions, letter, password] = entry.match(
        /(\d+-\d+) (\w): (\w+)/
      );
      const [pos1, pos2] = positions.split("-");
      return { pos1: Number(pos1), pos2: Number(pos2), letter, password };
    });

    return input.reduce((acc, curr) => {
      const { pos1, pos2, letter, password } = curr;
      const hasPos1 = password[pos1 - 1] === letter;
      const hasPos2 = password[pos2 - 1] === letter;

      return (hasPos1 || hasPos2) && hasPos1 !== hasPos2 ? acc + 1 : acc;
    }, 0);
  })()
);

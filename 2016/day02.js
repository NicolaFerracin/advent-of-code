const { getStringArrayInput } = require("./utils");

const starOne = () => {
  const input = getStringArrayInput("day02").map((x) => x.split(""));

  const keyPad = ["123", "456", "789"];
  const pos = [1, 1];
  return input.reduce((code, line) => {
    line.forEach((move) => {
      if (move === "U") pos[0] = Math.max(pos[0] - 1, 0);
      else if (move === "R") pos[1] = Math.min(pos[1] + 1, 2);
      else if (move === "D") pos[0] = Math.min(pos[0] + 1, 2);
      else if (move === "L") pos[1] = Math.max(pos[1] - 1, 0);
    });

    code += keyPad[pos[0]][pos[1]];
    return code;
  }, "");
};

const starTwo = () => {
  const input = getStringArrayInput("day02").map((x) => x.split(""));

  const keyPad = ["  1  ", " 234 ", "56789", " ABC ", "  D  "];
  const allowedMoves = {
    U: "3678ABCD",
    R: "837B26A5",
    D: "B6782341",
    L: "637B48C9",
  };
  const pos = [2, 0];
  return input.reduce((code, line) => {
    line.forEach((move) => {
      const curr = keyPad[pos[0]][pos[1]];
      if (!allowedMoves[move].includes(curr)) return;
      if (move === "U") pos[0] -= 1;
      else if (move === "R") pos[1] += 1;
      else if (move === "D") pos[0] += 1;
      else if (move === "L") pos[1] -= 1;
    });

    code += keyPad[pos[0]][pos[1]];
    return code;
  }, "");
};

console.log(starOne());
console.log(starTwo());

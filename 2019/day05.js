const { getRawInput } = require("./utils");

const star1 = () => {
  const input = getRawInput("day05").split(",").map(Number);
  let i = 0;
  while (true) {
    const op = ("00000" + input[i].toString()).substr(-5);
    if (op.endsWith("99")) {
      break;
    }
    if (op.endsWith("1") || op.endsWith("2")) {
      const a = op[2] === "0" ? input[input[i + 1]] : input[i + 1];
      const b = op[1] === "0" ? input[input[i + 2]] : input[i + 2];
      input[input[i + 3]] = op.endsWith("1") ? a + b : a * b;
      i += 4;
    }
    if (op.endsWith("3")) {
      input[input[i + 1]] = 1;
      i += 2;
    } else if (op.endsWith("4")) {
      const value = op[2] === "0" ? input[input[i + 1]] : input[i + 1];
      console.log(value);
      i += 2;
    }
  }
};

const star2 = () => {
  const input = getRawInput("day05").split(",").map(Number);
  let i = 0;
  while (true) {
    const op = ("00000" + input[i].toString()).substr(-5);
    if (op.endsWith("99")) {
      break;
    }
    if (op.endsWith("1") || op.endsWith("2")) {
      const a = op[2] === "0" ? input[input[i + 1]] : input[i + 1];
      const b = op[1] === "0" ? input[input[i + 2]] : input[i + 2];
      input[input[i + 3]] = op.endsWith("1") ? a + b : a * b;
      i += 4;
    }
    if (op.endsWith("3")) {
      input[input[i + 1]] = 5;
      i += 2;
    } else if (op.endsWith("4")) {
      const value = op[2] === "0" ? input[input[i + 1]] : input[i + 1];
      console.log(value);
      i += 2;
    } else if (op.endsWith("5")) {
      const value = op[2] === "0" ? input[input[i + 1]] : input[i + 1];
      const pointer = op[1] === "0" ? input[input[i + 2]] : input[i + 2];
      i = value === 0 ? i + 3 : pointer;
    } else if (op.endsWith("6")) {
      const value = op[2] === "0" ? input[input[i + 1]] : input[i + 1];
      const pointer = op[1] === "0" ? input[input[i + 2]] : input[i + 2];
      i = value === 0 ? pointer : i + 3;
    } else if (op.endsWith("7")) {
      const a = op[2] === "0" ? input[input[i + 1]] : input[i + 1];
      const b = op[1] === "0" ? input[input[i + 2]] : input[i + 2];
      input[input[i + 3]] = a < b ? 1 : 0;
      i += 4;
    } else if (op.endsWith("8")) {
      const a = op[2] === "0" ? input[input[i + 1]] : input[i + 1];
      const b = op[1] === "0" ? input[input[i + 2]] : input[i + 2];
      input[input[i + 3]] = a === b ? 1 : 0;
      i += 4;
    }
  }
};

console.log(star1());
console.log("-".repeat(20));
console.log(star2());

const { getStringArrayInput } = require("./utils");

const exec = (regs) => {
  const instructions = getStringArrayInput("day23");
  for (let i = 0; i < instructions.length; i++) {
    const [op, ...rest] = instructions[i].replace(",", "").split(" ");

    if (op === "hlf") {
      regs[rest] = regs[rest[0]] / 2;
    } else if (op === "tpl") {
      regs[rest] = regs[rest[0]] * 3;
    } else if (op === "inc") {
      regs[rest[0]]++;
    } else if (op === "jmp") {
      i += Number(rest[0]) - 1;
    } else if (op === "jie") {
      const [reg, jump] = rest;
      if (regs[reg] % 2 === 0) i += Number(jump) - 1;
    } else if (op === "jio") {
      const [reg, jump] = rest;
      if (regs[reg] === 1) i += Number(jump) - 1;
    }
  }
  return regs.b;
};

const starOne = () => {
  return exec({ a: 0, b: 0 });
};

const starTwo = () => {
  return exec({ a: 1, b: 0 });
};

console.log(starOne());
console.log(starTwo());

const { getStringArrayInput } = require("./utils");

const exec = (regs) => {
  const ops = {
    cpy: (valOrReg, reg) => {
      if (isNaN(valOrReg)) regs[reg] = regs[valOrReg];
      else regs[reg] = Number(valOrReg);
      return 0;
    },
    inc: (reg) => {
      regs[reg]++;
      return 0;
    },
    dec: (reg) => {
      regs[reg]--;
      return 0;
    },
    jnz: (reg, jumps) => (regs[reg] === 0 ? 0 : Number(jumps)),
  };

  const instructions = getStringArrayInput("day12");
  for (let i = 0; i < instructions.length; i++) {
    const [op, ...args] = instructions[i].split(" ");
    const jump = ops[op](...args);
    i += jump ? jump - 1 : 0;
  }
  return regs.a;
};

const starOne = () => {
  const regs = { a: 0, b: 0, c: 0, d: 0 };
  return exec(regs);
};

const starTwo = () => {
  const regs = { a: 0, b: 0, c: 1, d: 0 };
  return exec(regs);
};

console.log(starOne());
console.log(starTwo());

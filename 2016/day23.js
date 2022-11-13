const { getStringArrayInput } = require("./utils");

const exec = (regs) => {
  const ops = {
    cpy: (valOrReg, reg) => {
      if (valOrReg in regs && reg in regs) regs[reg] = regs[valOrReg];
      else if (reg in regs) regs[reg] = Number(valOrReg);
      return 0;
    },
    inc: (reg) => {
      if (reg in regs) regs[reg]++;
      return 0;
    },
    dec: (reg) => {
      if (reg in regs) regs[reg]--;
      return 0;
    },
    jnz: (valOrReg, jumpsOrReg) => {
      const val = valOrReg in regs ? regs[valOrReg] : Number(valOrReg);
      const jumps = jumpsOrReg in regs ? regs[jumpsOrReg] : Number(jumpsOrReg);
      return val === 0 ? 0 : jumps;
    },
    tgl: (reg, curr) => {
      if (!(reg in regs)) return;
      const jump = regs[reg] + curr;
      if (jump >= instructions.length) return 0;
      const [instruction, ...args] = instructions[jump].split(" ");
      if (args.length === 1) {
        // For one-argument instructions, inc becomes dec, and all other one-argument instructions become inc.
        if (instruction === "inc") instructions[jump] = `dec ${args[0]}`;
        else instructions[jump] = `inc ${args[0]}`;
      } else {
        // For two-argument instructions, jnz becomes cpy, and all other two-instructions become jnz.
        if (instruction === "jnz") instructions[jump] = `cpy ${args.join(" ")}`;
        else instructions[jump] = `jnz ${args.join(" ")}`;
      }

      return 0;
    },
  };

  const handlePossibleMultiplication = (i) => {
    if (
      i + 5 < instructions.length &&
      instructions[i].startsWith("cpy") &&
      instructions[i + 1].startsWith("inc") &&
      instructions[i + 2].startsWith("dec") &&
      instructions[i + 3].startsWith("jnz") &&
      instructions[i + 4].startsWith("dec") &&
      instructions[i + 5].startsWith("jnz")
    ) {
      const p1 = instructions[i + 1].split(" ")[1];
      const x = instructions[i].split(" ")[1];
      const y = instructions[i + 4].split(" ")[1];
      regs[p1] += (x in regs ? regs[x] : Number(x)) * regs[y];

      regs[instructions[i + 2].split(" ")[1]] = 0;
      regs[instructions[i + 4].split(" ")[1]] = 0;

      return true;
    }
    return false;
  };

  const instructions = getStringArrayInput("day23");
  for (let i = 0; i < instructions.length; i++) {
    if (handlePossibleMultiplication(i)) {
      i += 4;
      continue;
    }
    const [op, ...args] = instructions[i].split(" ");
    const jump = ops[op](...args, i);
    i += jump ? jump - 1 : 0;
  }
  return regs;
};

const starOne = () => {
  const regs = { a: 7, b: 0, c: 0, d: 0 };
  return exec(regs).a;
};

const starTwo = () => {
  const regs = { a: 12, b: 0, c: 1, d: 0 };
  return exec(regs).a;
};

console.log(starOne());
console.log(starTwo());

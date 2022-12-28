const { EOL } = require("os");
const { getRawInput } = require("./utils");

let ops = [
  ([, a, b, c], regs) => {
    regs[c] = regs[a] + regs[b];
    return regs;
  },
  ([, a, b, c], regs) => {
    regs[c] = regs[a] + b;
    return regs;
  },
  ([, a, b, c], regs) => {
    regs[c] = regs[a] * regs[b];
    return regs;
  },
  ([, a, b, c], regs) => {
    regs[c] = regs[a] * b;
    return regs;
  },
  ([, a, b, c], regs) => {
    regs[c] = regs[a] & regs[b];
    return regs;
  },
  ([, a, b, c], regs) => {
    regs[c] = regs[a] & b;
    return regs;
  },
  ([, a, b, c], regs) => {
    regs[c] = regs[a] | regs[b];
    return regs;
  },
  ([, a, b, c], regs) => {
    regs[c] = regs[a] | b;
    return regs;
  },
  ([, a, , c], regs) => {
    regs[c] = regs[a];
    return regs;
  },
  ([, a, , c], regs) => {
    regs[c] = a;
    return regs;
  },
  ([, a, b, c], regs) => {
    regs[c] = a > regs[b] ? 1 : 0;
    return regs;
  },
  ([, a, b, c], regs) => {
    regs[c] = regs[a] > b ? 1 : 0;
    return regs;
  },
  ([, a, b, c], regs) => {
    regs[c] = regs[a] > regs[b] ? 1 : 0;
    return regs;
  },
  ([, a, b, c], regs) => {
    regs[c] = a === regs[b] ? 1 : 0;
    return regs;
  },
  ([, a, b, c], regs) => {
    regs[c] = regs[a] === b ? 1 : 0;
    return regs;
  },
  ([, a, b, c], regs) => {
    regs[c] = regs[a] === regs[b] ? 1 : 0;
    return regs;
  },
].map((fn, index) => ({
  id: index,
  fn,
}));

const starOne = () => {
  const samples = getRawInput("day16")
    .split(`${EOL}${EOL}${EOL}`)[0]
    .split(`${EOL}${EOL}`)
    .map((line) => {
      const [before, opcode, after] = line.split(EOL);
      return {
        before: eval(before.split(": ").pop()),
        opcode: opcode.split(" ").map((_) => +_),
        after: eval(after.split(": ").pop()),
      };
    })
    .filter(({ before, opcode, after }) => {
      // if current sample could correspond to three or more different opcodes, keep it
      return (
        ops.filter(
          ({ fn }) => fn(opcode, [...before]).toString() === after.toString()
        ).length >= 3
      );
    });

  return samples.length;
};

const starTwo = () => {
  const [samples, testProgram] = getRawInput("day16").split(
    `${EOL}${EOL}${EOL}`
  );

  const mapping = samples
    .split(`${EOL}${EOL}`)
    .map((line) => {
      const [before, opcode, after] = line.split(EOL);
      return {
        before: eval(before.split(": ").pop()),
        opcode: opcode.split(" ").map((_) => +_),
        after: eval(after.split(": ").pop()),
      };
    })
    .reduce((mapping, { before, opcode, after }, sampleId) => {
      const matches = ops.filter(
        ({ fn }) => fn(opcode, [...before]).toString() === after.toString()
      );

      // if the current sample can only match one op:
      if (matches.length === 1 && !mapping[opcode[0]]) {
        // - add it to the mapping list
        mapping[opcode[0]] = matches[0].fn;

        // - remove it from the available ops
        ops = ops.filter((x) => x.id !== matches[0].id);
      }

      return mapping;
    }, []);

  let regs = [0, 0, 0, 0];
  testProgram
    .trim()
    .split(EOL)
    .map((x) => x.split(" ").map((_) => +_))
    .forEach(([opId, a, b, c]) => {
      regs = mapping[opId]([opId, a, b, c], regs);
    });

  return regs[0];
};

console.log(starOne());
console.log(starTwo());

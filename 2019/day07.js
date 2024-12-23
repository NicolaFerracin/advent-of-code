const { getRawInput } = require("./utils");
require("lodash.permutations");
const _ = require("lodash");

const getInput = () => getRawInput("day07").split(",").map(Number);

class Amplifier {
  constructor(input, inputInstr, returnOnOutput = false) {
    this.output = [];
    this.input = input;
    this.inputInstr = inputInstr;
    this.i = 0;
    this.halted = false;
    this.returnOnOutput = returnOnOutput;
  }

  run() {
    while (!this.halted) {
      const opcode = ("00000" + this.input[this.i].toString()).substr(-5);
      this.executeOpcode(opcode);
      if (opcode.endsWith("4") && this.returnOnOutput)
        return this.output[this.output.length - 1];
    }

    return this.output[this.output.length - 1];
  }

  executeOpcode(opcode) {
    const input = this.input;
    const inputInstr = this.inputInstr;
    if (opcode.endsWith("99")) this.halted = true;
    else if (opcode.endsWith("1") || opcode.endsWith("2")) {
      const a =
        opcode[2] === "0" ? input[input[this.i + 1]] : input[this.i + 1];
      const b =
        opcode[1] === "0" ? input[input[this.i + 2]] : input[this.i + 2];
      input[input[this.i + 3]] = opcode.endsWith("1") ? a + b : a * b;
      this.i += 4;
    }
    if (opcode.endsWith("3")) {
      input[input[this.i + 1]] = inputInstr.shift() ?? 0;
      this.i += 2;
    } else if (opcode.endsWith("4")) {
      const value =
        opcode[2] === "0" ? input[input[this.i + 1]] : input[this.i + 1];
      this.output.push(value);
      this.i += 2;
    } else if (opcode.endsWith("5")) {
      const value =
        opcode[2] === "0" ? input[input[this.i + 1]] : input[this.i + 1];
      const pointer =
        opcode[1] === "0" ? input[input[this.i + 2]] : input[this.i + 2];
      this.i = value === 0 ? this.i + 3 : pointer;
    } else if (opcode.endsWith("6")) {
      const value =
        opcode[2] === "0" ? input[input[this.i + 1]] : input[this.i + 1];
      const pointer =
        opcode[1] === "0" ? input[input[this.i + 2]] : input[this.i + 2];
      this.i = value === 0 ? pointer : this.i + 3;
    } else if (opcode.endsWith("7")) {
      const a =
        opcode[2] === "0" ? input[input[this.i + 1]] : input[this.i + 1];
      const b =
        opcode[1] === "0" ? input[input[this.i + 2]] : input[this.i + 2];
      input[input[this.i + 3]] = a < b ? 1 : 0;
      this.i += 4;
    } else if (opcode.endsWith("8")) {
      const a =
        opcode[2] === "0" ? input[input[this.i + 1]] : input[this.i + 1];
      const b =
        opcode[1] === "0" ? input[input[this.i + 2]] : input[this.i + 2];
      input[input[this.i + 3]] = a === b ? 1 : 0;
      this.i += 4;
    }
  }
}

const star1 = () => {
  const perms = _([0, 1, 2, 3, 4]).permutations(5).value();
  let max = 0;
  perms.forEach((perm) => {
    let output = 0;
    perm.forEach((p) => {
      const a = new Amplifier(getInput(), [p, output]);
      output = a.run();
      max = Math.max(max, output);
    });
  });
  return max;
};

class Configuration {
  constructor(input, inputInstr) {
    const a = new Amplifier([...input], inputInstr[0], true);
    const b = new Amplifier([...input], inputInstr[1], true);
    const c = new Amplifier([...input], inputInstr[2], true);
    const d = new Amplifier([...input], inputInstr[3], true);
    const e = new Amplifier([...input], inputInstr[4], true);
    this.amps = [a, b, c, d, e];
  }

  run() {
    let i = 0;
    let output = 1;
    while (!this.amps[i].halted) {
      output = this.amps[i].run();
      i = (i + 1) % this.amps.length;
      this.amps[i].inputInstr.push(output);
    }
    return output;
  }
}

const star2 = () => {
  const perms = _([5, 6, 7, 8, 9]).permutations(5).value();
  let max = 0;
  perms.forEach((perm) => {
    const input = getInput();
    const config = new Configuration(input, [
      [perm[0], 0],
      [perm[1]],
      [perm[2]],
      [perm[3]],
      [perm[4]],
    ]);
    const output = config.run();
    max = Math.max(max, output);
  });
  return max;
};

console.log(star1());
console.log(star2());

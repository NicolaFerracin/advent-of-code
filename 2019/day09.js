const { getRawInput } = require("./utils");

const getInput = () => getRawInput("day09").split(",").map(BigInt);

class Computer {
  constructor(program, inputs) {
    this.outputs = [];
    this.program = program;
    this.inputs = inputs;
    this.i = 0;
    this.halted = false;
    this.relativeBase = BigInt(0);
  }

  readMemory(i, mode) {
    if (i < 0) console.log("uh oh");
    const val = this.program[i] ?? BigInt(0);

    // 0: position
    if (mode == 0) return this.readMemory(val, 1);

    // 2: relative
    if (mode == 2) return this.readMemory(this.relativeBase + BigInt(val), 1);

    // 1: literal
    return BigInt(val);
  }

  writeMemory(i, mode, value) {
    const index = this.program[i] ?? BigInt(0);

    // 2: relative mode
    if (mode == 2) {
      this.program[this.relativeBase + BigInt(index)] = BigInt(value);
    } else {
      this.program[index] = BigInt(value);
    }
  }

  run() {
    while (!this.halted) {
      this.i = Number(this.i);
      const opcode = ("00000" + this.readMemory(this.i, 1).toString()).substr(
        -5
      );
      this.executeOpcode(opcode);
    }

    return this.outputs;
  }

  executeOpcode(opcode) {
    const inputInstr = this.inputs;

    if (opcode.endsWith("99")) this.halted = true;
    else if (opcode.endsWith("1") || opcode.endsWith("2")) {
      const a = this.readMemory(this.i + 1, opcode[2]);
      const b = this.readMemory(this.i + 2, opcode[1]);
      this.writeMemory(
        this.i + 3,
        opcode[0],
        opcode.endsWith("1") ? a + b : a * b
      );
      this.i += 4;
    } else if (opcode.endsWith("3")) {
      this.writeMemory(this.i + 1, opcode[2], inputInstr.shift() ?? 0);
      this.i += 2;
    } else if (opcode.endsWith("4")) {
      const value = this.readMemory(this.i + 1, opcode[2]);
      this.outputs.push(value);
      this.i += 2;
    } else if (opcode.endsWith("5")) {
      const value = this.readMemory(this.i + 1, opcode[2]);
      const pointer = this.readMemory(this.i + 2, opcode[1]);
      this.i = value === BigInt(0) ? this.i + 3 : pointer;
    } else if (opcode.endsWith("6")) {
      const value = this.readMemory(this.i + 1, opcode[2]);
      const pointer = this.readMemory(this.i + 2, opcode[1]);
      this.i = value === BigInt(0) ? Number(pointer) : this.i + 3;
    } else if (opcode.endsWith("7")) {
      const a = this.readMemory(this.i + 1, opcode[2]);
      const b = this.readMemory(this.i + 2, opcode[1]);
      this.writeMemory(this.i + 3, opcode[0], a < b ? 1 : 0);
      this.i += 4;
    } else if (opcode.endsWith("8")) {
      const a = this.readMemory(this.i + 1, opcode[2]);
      const b = this.readMemory(this.i + 2, opcode[1]);
      this.writeMemory(this.i + 3, opcode[0], a === b ? 1 : 0);
      this.i += 4;
    } else if (opcode.endsWith("9")) {
      this.relativeBase += this.readMemory(this.i + 1, opcode[2]);
      this.i += 2;
    }
  }
}

const star1 = () => {
  return new Computer(getInput(), [1]).run().map(Number).join(",");
};

const star2 = () => {
  return new Computer(getInput(), [2]).run().map(Number).join(",");
};

console.log(star1());
console.log(star2());

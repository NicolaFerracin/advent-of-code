const reg = [24847151, 0, 0];
const program = "2,4,1,5,7,5,1,6,0,3,4,0,5,5,3,0".split(",").map(Number);

class Computer {
  constructor(program, register) {
    this.program = program;
    this.register = register;
    this.output = [];
  }

  run() {
    let i = 0;
    while (i < this.program.length) {
      const opcode = this.program[i++];
      const operand = this.program[i++];
      // console.log({ o: this.output, r: this.register });
      i = this.executeOpcode(opcode, operand, i);
    }

    return;
  }

  getComboValue(combo) {
    if (combo < 4) return combo;
    if (combo < 7) return this.register[combo - 4];
    if (combo > 7) alert("should not happen");
  }

  executeOpcode(opcode, operand, pointer) {
    if (opcode === 0) {
      const num = this.register[0];
      const den = Math.pow(2, this.getComboValue(operand));
      this.register[0] = Math.floor(num / den);
      return pointer;
    } else if (opcode === 1) {
      this.register[1] = this.register[1] ^ operand;
      return pointer;
    } else if (opcode === 2) {
      this.register[1] = this.getComboValue(operand) & 7;
      return pointer;
    } else if (opcode === 3) {
      if (this.register[0] !== 0) return operand;
      return pointer;
    } else if (opcode === 4) {
      this.register[1] = this.register[1] ^ this.register[2];
      return pointer;
    } else if (opcode === 5) {
      this.output.push(this.getComboValue(operand) & 7);
      return pointer;
    } else if (opcode === 6) {
      const num = this.register[0];
      const den = Math.pow(2, this.getComboValue(operand));
      this.register[1] = Math.floor(num / den);
      return pointer;
    } else if (opcode === 7) {
      const num = this.register[0];
      const den = Math.pow(2, this.getComboValue(operand));
      this.register[2] = Math.floor(num / den);
      return pointer;
    }
  }

  print() {
    return this.output;
  }
}

const star1 = () => {
  const c = new Computer(program, [24847151, 0, 0]);
  c.run();
  return c.print().join(",");
};

const star2 = () => {
  const queue = [{ val: 0, pos: program.length - 1 }];
  const res = [];
  while (queue.length) {
    const { val, pos } = queue.shift();
    for (let mul = 0; mul <= 7; mul++) {
      const i = val + Math.pow(8, pos) * mul;
      const c = new Computer(program, [i, 0, 0]);
      c.run();
      const output = c.print();

      if (output.join(",") === program.join(",")) return i;

      if (output.slice(pos).join(",") === program.slice(pos).join(",")) {
        queue.push({ val: i, pos: pos - 1 });
      }
    }
  }
};

console.log(star1());
console.log(star2());

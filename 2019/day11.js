const { getRawInput, IntcodeComputer } = require("./utils");

const getInput = () => getRawInput("day11").split(",").map(BigInt);

const BLACK = 0;
const WHITE = 1;
const SEPARATOR = "#";

class Computer extends IntcodeComputer {
  constructor(memory, inputs, currColor) {
    super(memory, inputs);

    this.currColor = currColor;
  }

  run() {
    while (!this.halted && this.outputs.length === 0) {
      this.i = Number(this.i);
      const opcode = ("00000" + this.readMemory(this.i, 1).toString()).substr(
        -5
      );
      this.executeOpcode(opcode);
    }

    return this.outputs;
  }
}

class Spacecraft {
  constructor(memory, input) {
    this.computer = new Computer(memory, [input]);
    this.x = 0;
    this.y = 0;
    this.dir = 0; // 0:U, 1:R, 2:D, 3:L
    this.cells = new Map(); // holds painted cells coords and their color
    this.cells.set(`0${SEPARATOR}0`, input);
  }

  turn = (rotation) => {
    if (rotation === 0) this.dir = this.dir === 0 ? 3 : this.dir - 1;
    else this.dir = (this.dir + 1) % 4;
  };

  moveForward = () => {
    if (this.dir === 0) this.y--;
    else if (this.dir === 1) this.x++;
    else if (this.dir === 2) this.y++;
    else if (this.dir === 3) this.x--;
  };

  run() {
    while (!this.computer.halted) {
      const currColor = this.cells.has(`${this.x}${SEPARATOR}${this.y}`)
        ? this.cells.get(`${this.x}${SEPARATOR}${this.y}`)
        : BLACK;
      this.computer.inputs = [currColor];

      const newColor = Number(this.computer.run().shift());
      const rotation = Number(this.computer.run().shift());
      this.cells.set(`${this.x}${SEPARATOR}${this.y}`, newColor);
      this.turn(rotation);
      this.moveForward();

      if (this.computer.halted) return this.cells;
    }
  }
}

const star1 = () => {
  return new Spacecraft(getInput(), BLACK).run().size;
};

const star2 = () => {
  const cells = new Spacecraft(getInput(), WHITE).run();
  const allCoords = [...cells.keys()].map((key) =>
    key.split(SEPARATOR).map(Number)
  );

  const minX = Math.min(...allCoords.map(([x]) => x));
  const minY = Math.min(...allCoords.map(([, y]) => y));
  const maxX = Math.max(...allCoords.map(([x]) => x));
  const maxY = Math.max(...allCoords.map(([, y]) => y));

  for (let y = minY; y <= maxY; y++) {
    const row = [];
    for (let x = minX; x <= maxX; x++) {
      if (cells.get(`${x}${SEPARATOR}${y}`) === WHITE) row.push("#");
      else row.push(" ");
    }
    console.log(row.join(""));
  }
};

console.log(star1());
console.log(star2());

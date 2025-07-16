const { getRawInput, Day9Computer } = require("./utils");

const sleep = async (ms) => await new Promise((r) => setTimeout(r, ms));

const getInput = () => getRawInput("day13").split(",").map(BigInt);

class Computer extends Day9Computer {
  constructor(memory, inputs) {
    super(memory, inputs);
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

class Arcade {
  constructor(memory, input) {
    this.computer = new Computer(memory, [input]);
    this.blocks = 0;
  }

  run() {
    while (!this.computer.halted) {
      const x = Number(this.computer.run().shift());
      const y = Number(this.computer.run().shift());
      const tileId = Number(this.computer.run().shift());
      if (tileId === 2) this.blocks++;

      if (this.computer.halted) return this.blocks;
    }
  }
}

const EMPTY = 0;
const WALL = 1;
const BLOCK = 2;
const PADDLE = 3;
const BALL = 4;
const key = (x, y) => `${x}#${y}`;

class Arcade2 {
  constructor(memory, input) {
    this.computer = new Computer(memory, [input]);
    this.blocks = 0;
    this.screen = {};
    this.ball = null;
    this.paddle = null;
    this.score = null;
  }

  // returns the joystick position based on where the paddle is relative to the ball
  getJoystickPos = () => {
    if (this.paddle.x === this.ball.x) return 0;
    if (this.paddle.x > this.ball.x) {
      return -1;
    }
    if (this.paddle.x < this.ball.x) {
      return 1;
    }
  };

  printGame = () => {
    for (let y = 0; y < 23; y++) {
      const row = [];
      for (let x = 0; x < 50; x++) {
        if (x === this.paddle.x && y === this.paddle.y) row.push("=");
        else if (x === this.ball.x && y === this.ball.y) row.push("O");
        else if (this.screen[key(x, y)] === 1) row.push("#");
        else if (this.screen[key(x, y)] === 2) row.push("+");
        else row.push(" ");
      }
      console.log(row.join(""));
    }
  };

  async run() {
    while (!this.computer.halted) {
      if (this.paddle && this.ball) {
        this.computer.inputs = [this.getJoystickPos()];
      } else {
        this.computer.inputs = [0];
      }

      const x = Number(this.computer.run().shift());
      const y = Number(this.computer.run().shift());
      const tileId = Number(this.computer.run().shift());

      if (x === -1 && y === 0) this.score = tileId;

      // empty or wall or block
      if (tileId === EMPTY || tileId === WALL || tileId === BLOCK)
        this.screen[key(x, y)] = tileId;

      if (tileId === PADDLE) this.paddle = { x, y }; // paddle
      else if (tileId === BALL) this.ball = { x, y }; // ball

      if (this.paddle && this.ball) {
        // console.clear();
        // this.printGame();
        // await sleep(1);
      }
    }
    return this.score;
  }
}

const star1 = () => {
  return new Arcade(getInput()).run();
};

const star2 = async () => {
  const memory = getInput();
  memory[0] = 2;
  const score = new Arcade2(memory).run();
  return await score.then((r) => console.log(r));
};

console.log(star1());
star2();

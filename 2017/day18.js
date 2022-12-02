const { getStringArrayInput } = require("./utils");

const starOne = () => {
  const getRegOrVal = (regOrVal) =>
    regOrVal in regs ? regs[regOrVal] : +regOrVal;

  const ops = getStringArrayInput("day18").map((line) => {
    const [op, reg, regOrVal] = line.split(" ");
    return { op, reg, regOrVal };
  });
  const regs = {};

  let lastPlayed = null;
  let i = 0;
  while (i < ops.length) {
    const { op, reg, regOrVal } = ops[i];
    if (!(reg in regs)) regs[reg] = 0;
    if (op === "snd") lastPlayed = regs[reg];
    else if (op === "set") regs[reg] = getRegOrVal(regOrVal);
    else if (op === "add") regs[reg] += getRegOrVal(regOrVal);
    else if (op === "mul") regs[reg] *= getRegOrVal(regOrVal);
    else if (op === "mod") regs[reg] %= getRegOrVal(regOrVal);
    else if (op === "rcv" && regs[reg] !== 0) return lastPlayed;
    else if (op === "jgz") {
      const condition = reg in regs ? regs[reg] : +reg;
      const jump = getRegOrVal(regOrVal);
      if (condition > 0) {
        i += jump;
        continue;
      }
    }
    i++;
  }
};

const starTwo = () => {
  const ops = getStringArrayInput("day18").map((line) => {
    const [op, reg, regOrVal] = line.split(" ");
    return { op, reg, regOrVal };
  });

  const execOp = (regs) => {
    const getRegOrVal = (regOrVal) =>
      regOrVal in regs ? regs[regOrVal] : +regOrVal;

    const other = regs.id === 0 ? two : one;
    const { op, reg, regOrVal } = ops[regs.index];
    if (!(reg in regs) && !/\d+/g.test(reg)) regs[reg] = 0;
    if (op === "snd") {
      other.queue.push(getRegOrVal(reg));
      regs.valuesSent++;
    } else if (op === "set") regs[reg] = getRegOrVal(regOrVal);
    else if (op === "add") regs[reg] += getRegOrVal(regOrVal);
    else if (op === "mul") regs[reg] *= getRegOrVal(regOrVal);
    else if (op === "mod") regs[reg] %= getRegOrVal(regOrVal);
    else if (op === "rcv") {
      if (regs.queue.length === 0) {
        regs.deadlock = true;
        return;
      } else regs[reg] = regs.queue.shift();
    } else if (op === "jgz") {
      const condition = getRegOrVal(reg);
      const jump = getRegOrVal(regOrVal);
      if (condition > 0) {
        regs.index += jump;
        return;
      }
    }
    regs.index++;
    return;
  };

  const one = {
    id: 0,
    p: 0,
    queue: [],
    index: 0,
    deadlock: false,
    valuesSent: 0,
  };
  const two = {
    id: 1,
    p: 1,
    queue: [],
    index: 0,
    deadlock: false,
    valuesSent: 0,
  };

  while (true) {
    execOp(one);
    execOp(two);

    if (one.deadlock && two.deadlock) return two.valuesSent;
  }
};

console.log(starOne());
console.log(starTwo());

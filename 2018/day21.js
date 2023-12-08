const { getStringArrayInput } = require("./utils");

const addr = ([, a, b, c], regs) => {
  regs[c] = regs[a] + regs[b];
  return regs;
};
const addi = ([, a, b, c], regs) => {
  regs[c] = regs[a] + b;
  return regs;
};
const mulr = ([, a, b, c], regs) => {
  regs[c] = regs[a] * regs[b];
  return regs;
};
const muli = ([, a, b, c], regs) => {
  regs[c] = regs[a] * b;
  return regs;
};
const banr = ([, a, b, c], regs) => {
  regs[c] = regs[a] & regs[b];
  return regs;
};
const bani = ([, a, b, c], regs) => {
  regs[c] = regs[a] & b;
  return regs;
};
const borr = ([, a, b, c], regs) => {
  regs[c] = regs[a] | regs[b];
  return regs;
};
const bori = ([, a, b, c], regs) => {
  regs[c] = regs[a] | b;
  return regs;
};
const setr = ([, a, , c], regs) => {
  regs[c] = regs[a];
  return regs;
};
const seti = ([, a, , c], regs) => {
  regs[c] = a;
  return regs;
};
const gtir = ([, a, b, c], regs) => {
  regs[c] = a > regs[b] ? 1 : 0;
  return regs;
};
const gtri = ([, a, b, c], regs) => {
  regs[c] = regs[a] > b ? 1 : 0;
  return regs;
};
const gtrr = ([, a, b, c], regs) => {
  regs[c] = regs[a] > regs[b] ? 1 : 0;
  return regs;
};
const eqir = ([, a, b, c], regs) => {
  regs[c] = a === regs[b] ? 1 : 0;
  return regs;
};
const eqri = ([, a, b, c], regs) => {
  regs[c] = regs[a] === b ? 1 : 0;
  return regs;
};
const eqrr = ([, a, b, c], regs) => {
  regs[c] = regs[a] === regs[b] ? 1 : 0;
  return regs;
};

const starOne = () => {
  let regs = [0, 0, 0, 0, 0, 0];
  const [ipRaw, ...ops] = getStringArrayInput("day21");
  const ipBoundTo = +ipRaw.split(" ").pop();
  let ip = regs[ipBoundTo];
  while (ip < ops.length) {
    if (ip === 28) return regs[3];
    regs[ipBoundTo] = ip;
    const [op, a, b, c] = ops[ip].split(" ");
    regs = eval(`${op}([null, ${+a}, ${+b}, ${+c}], regs)`);
    ip = regs[ipBoundTo];
    ip++;
  }

  return regs[0];
};

const starTwo = () => {
  const seen = new Set();
  let regs = [0, 0, 0, 0, 0, 0];
  const [ipRaw, ...ops] = getStringArrayInput("day21");
  const ipBoundTo = +ipRaw.split(" ").pop();
  let ip = regs[ipBoundTo];
  while (ip < ops.length) {
    if (ip === 28) {
      if (seen.has(regs[3])) return [...seen].slice(-3);
      seen.add(regs[3]);
    }
    regs[ipBoundTo] = ip;
    const [op, a, b, c] = ops[ip].split(" ");
    regs = eval(`${op}([null, ${+a}, ${+b}, ${+c}], regs)`);
    ip = regs[ipBoundTo];
    ip++;
  }

  return regs[0];
};

console.log(starOne());
console.log(starTwo());

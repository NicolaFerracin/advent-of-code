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
  const [ipRaw, ...ops] = getStringArrayInput("day19");
  const ipBoundTo = +ipRaw.split(" ").pop();
  let ip = regs[ipBoundTo];
  while (ip < ops.length) {
    regs[ipBoundTo] = ip;
    const [op, a, b, c] = ops[ip].split(" ");
    regs = eval(`${op}([null, ${+a}, ${+b}, ${+c}], regs)`);
    ip = regs[ipBoundTo];
    ip++;
  }

  return regs[0];
};

const starTwo = () => {
  // debugged the assembly and found out that:
  // - the 4th register was initialized to 10551306
  // - initializing it with a smaller value brought the program to completion
  // - by trying different values and checking every time the 0th register was getting updated
  //   I could find a pattern where we would go one by one and add to the 0th register
  //   every number giving regs[4] % n === 0
  const regVal = 10551306;

  let sum = 0;
  for (let i = 0; i <= regVal; i++) sum += regVal % i === 0 ? i : 0;
  return sum;
};

console.log(starOne());
console.log(starTwo());

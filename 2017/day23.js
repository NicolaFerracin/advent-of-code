const { getStringArrayInput } = require("./utils");

const starOne = () => {
  const getRegOrVal = (regOrVal) =>
    regOrVal in regs ? regs[regOrVal] : +regOrVal;

  const ops = getStringArrayInput("day23").map((line) => {
    const [op, reg, regOrVal] = line.split(" ");
    return { op, reg, regOrVal };
  });
  const regs = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
  };

  let invokedMuls = 0;
  let i = 0;
  while (i < ops.length) {
    const { op, reg, regOrVal } = ops[i];
    if (op === "set") regs[reg] = getRegOrVal(regOrVal);
    else if (op === "sub") regs[reg] -= getRegOrVal(regOrVal);
    else if (op === "mul") {
      invokedMuls++;
      regs[reg] *= getRegOrVal(regOrVal);
    } else if (op === "jnz") {
      const condition = reg in regs ? regs[reg] : +reg;
      const jump = getRegOrVal(regOrVal);
      if (condition !== 0) {
        i += jump;
        continue;
      }
    }
    i++;
  }

  return invokedMuls;
};

const isPrime = (num) => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++)
    if (num % i === 0) return false;
  return num > 1;
};

const starTwo = () => {
  // solution found by manually debugging the operations:
  // - b and c are set to an initial value
  // - b is increased by 17 at a time
  // - every time we increase b, we start a loop where d goes from 2 to b
  // - for every loop of d we also start an inner loop of e from 2 to b
  // - if the current b is not a prime number, h will be increased at the end of the loop

  // PSEUDOCODE:
  // for (let d = 2; d < b; d++) {
  //  for (let e = 2; e < b; e++) {
  //    if b is not a prime number, we will find a combination of e and d
  //    that result in e * d = b
  //    when that happens we set f to 0, allowing h to be increased at the end of the loops
  //  }
  // }

  // given the above considerations:
  // starting from b we keep adding 17 until we reach c
  // and we increase h every time b is not a prime number

  const getRegOrVal = (regOrVal) =>
    regOrVal in regs ? regs[regOrVal] : +regOrVal;

  const ops = getStringArrayInput("day23").map((line) => {
    const [op, reg, regOrVal] = line.split(" ");
    return { op, reg, regOrVal };
  });

  const regs = {
    a: 1,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
  };
  let i = 0;
  while (i < ops.length) {
    // once the initial values for b and c are set, we don't need anything else
    if (i === 9) break;

    const { op, reg, regOrVal } = ops[i];

    if (op === "set") regs[reg] = getRegOrVal(regOrVal);
    else if (op === "sub") regs[reg] -= getRegOrVal(regOrVal);
    else if (op === "mul") {
      regs[reg] *= getRegOrVal(regOrVal);
    } else if (op === "jnz") {
      const condition = reg in regs ? regs[reg] : +reg;
      const jump = getRegOrVal(regOrVal);
      if (condition !== 0) {
        i += jump;
        continue;
      }
    }

    i++;
  }

  let h = 0;
  for (let i = regs.b; i <= regs.c; i += 17) {
    if (!isPrime(i)) h++;
  }

  return h;
};

console.log(starOne());
console.log(starTwo());

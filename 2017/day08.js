const { getStringArrayInput } = require("./utils");

const exec = (star) => {
  const regs = {};
  let highest = -Infinity;
  getStringArrayInput("day08").forEach((line) => {
    const [reg, op, val, , ...condition] = line.split(" ");

    const conditionReg = condition.shift();
    if (!regs[reg]) regs[reg] = 0;
    if (!regs[conditionReg]) regs[conditionReg] = 0;

    if (eval(`regs.${conditionReg} ${condition.join(" ")}`)) {
      if (op === "inc") regs[reg] += +val;
      else regs[reg] -= +val;
    }

    highest = Math.max(highest, regs[reg]);
  });

  return star === 1
    ? Object.values(regs)
        .sort((a, b) => a - b)
        .pop()
    : highest;
};

const starOne = () => {
  return exec(1);
};

const starTwo = () => {
  return exec(2);
};

console.log(starOne());
console.log(starTwo());

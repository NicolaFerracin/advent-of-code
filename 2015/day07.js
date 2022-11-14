const { getStringArrayInput } = require("./utils");

const isNum = (x) => /^\d+$/.test(x);

const exec = (circuits) => {
  let instructions = getStringArrayInput("day07");
  const ops = {
    SIG: (x) => (isNum(x) ? Number(x) : circuits[x]),
    AND: (x, y) =>
      (isNum(x) ? Number(x) : circuits[x]) &
      (isNum(y) ? Number(y) : circuits[y]),
    OR: (x, y) =>
      (isNum(x) ? Number(x) : circuits[x]) |
      (isNum(y) ? Number(y) : circuits[y]),
    LSHIFT: (x, y) =>
      (isNum(x) ? Number(x) : circuits[x]) <<
      (isNum(y) ? Number(y) : circuits[y]),
    RSHIFT: (x, y) =>
      (isNum(x) ? Number(x) : circuits[x]) >>
      (isNum(y) ? Number(y) : circuits[y]),
    NOT: (x) => circuits[x] ^ 65535,
  };

  while (instructions.length) {
    instructions = instructions.filter((line) => {
      // if no signal for inputs, skip instruction
      const inputs = line
        .replace(/(LSHIFT|RSHIFT|AND|OR|NOT|(->.*))/g, "")
        .split(/\s/)
        .filter((x) => !!x);
      if (
        inputs.find((input) => {
          if (isNum(input)) return false;
          if (input in circuits) return false;
          return true;
        })
      ) {
        return true;
      }

      const [left, right] = line.split(" -> ").map((x) => x.split(" "));
      let output = 0;
      if (left.length === 1) output = ops.SIG(left[0]);
      else if (left.length === 2) output = ops.NOT(left[1]);
      else output = ops[left[1]](left[0], left[2]);

      if (!(right[0] in circuits)) circuits[right[0]] = output;
      return false;
    });
  }

  return circuits;
};

const starOne = () => {
  return exec({}).a;
};

const starTwo = () => {
  return exec({ b: starOne() }).a;
};

console.log(starOne());
console.log(starTwo());

const { getStringArrayInput } = require("./utils");

const exec = (rounds, divisor) => {
  const input = getStringArrayInput("day11");

  let modulo = 1;
  const monkeys = {};
  for (let i = -1; i < input.length; i++) {
    if (!input[i]) {
      const [monkey] = input[++i].match(/\d+/g);
      const items = input[++i].match(/\d+/g).map((_) => +_);
      const operationEls = input[++i].split(" ").slice(-2);

      const divisibleBy = +input[++i].split(" ").pop();
      const ifTrue = +input[++i].split(" ").pop();
      const ifFalse = +input[++i].split(" ").pop();

      const operation = (old) => {
        const op = operationEls[0];
        const el = operationEls[1];
        return eval(`${old} ${op} ${el}`);
      };

      const test = (val) => {
        const newVal = val % modulo;
        const recipient = newVal % divisibleBy === 0 ? ifTrue : ifFalse;
        monkeys[recipient].items.push(newVal);
      };

      modulo *= divisibleBy;

      monkeys[monkey] = {
        items,
        operation,
        test,
        inspected: 0,
      };
    }
  }

  for (let i = 0; i < rounds; i++) {
    for (const key of Object.keys(monkeys)) {
      const monkey = monkeys[key];
      while (monkey.items.length) {
        monkey.inspected++;
        const item = Math.floor(
          monkey.operation(monkey.items.shift()) / divisor
        );
        monkey.test(item);
      }
    }
  }

  return Object.values(monkeys)
    .sort((a, b) => b.inspected - a.inspected)
    .slice(0, 2)
    .reduce((product, curr) => (product *= curr.inspected), 1);
};

const starOne = () => {
  return exec(20, 3);
};

const starTwo = () => {
  return exec(10_000, 1);
};

console.log(starOne());
console.log(starTwo());

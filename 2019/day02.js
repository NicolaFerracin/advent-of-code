const { getRawInput } = require("./utils");

const star1 = () => {
  const input = getRawInput("day02").split(",").map(Number);
  input[1] = 2;
  input[2] = 12;
  let i = 0;
  while (true) {
    if (input[i] === 99) break;
    const op = input[i++];
    const a = input[input[i++]];
    const b = input[input[i++]];
    const store = input[i++];
    input[store] = op === 1 ? a + b : a * b;
  }

  return input[0];
};

const star2 = () => {
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      const input = getRawInput("day02").split(",").map(Number);
      input[1] = noun;
      input[2] = verb;
      let i = 0;
      while (true) {
        if (input[i] === 99) break;
        const op = input[i++];
        const a = input[input[i++]];
        const b = input[input[i++]];
        const store = input[i++];
        input[store] = op === 1 ? a + b : a * b;
      }
      if (input[0] === 19690720) return 100 * noun + verb;
    }
  }
};

console.log(star1());
console.log(star2());

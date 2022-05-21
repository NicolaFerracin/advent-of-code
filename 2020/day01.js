const { getNumberArrayInput } = require("./utils");

(function starOne() {
  const input = getNumberArrayInput("day01");

  const seen = new Set();
  for (let i = 0; i < input.length; i++) {
    const complement = 2020 - input[i];
    if (seen.has(complement)) {
      console.log(input[i] * complement);
      return;
    }

    seen.add(input[i]);
  }
})();

(function starTwo() {
  const input = getNumberArrayInput("day01");

  const seen = new Set();
  for (let i = 0; i < input.length - 1; i++) {
    for (let j = 1; j < input.length; j++) {
      const complement = 2020 - input[i] - input[j];
      if (seen.has(complement)) {
        console.log(input[i] * input[j] * complement);
        return;
      }

      seen.add(input[j]);
    }

    seen.add(input[i]);
  }
})();

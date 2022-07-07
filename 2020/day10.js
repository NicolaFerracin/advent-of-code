const { getStringArrayInput } = require("./utils");

console.log(
  (function starOne() {
    const input = getStringArrayInput("day10").map((_) => Number(_));
    let oneDiff = 0;
    let threeDiff = 1;
    let curr = 0;
    for (let i = 0; i < input.length; i++) {
      const plusOne = input.indexOf(curr + 1);
      const plusTwo = input.indexOf(curr + 2);
      const plusThree = input.indexOf(curr + 3);
      if (plusOne >= 0) {
        curr = input[plusOne];
        oneDiff++;
      } else if (plusTwo >= 0) {
        curr = input[plusTwo];
      } else {
        curr = input[plusThree];
        threeDiff++;
      }
    }
    return oneDiff * threeDiff;
  })()
);

console.log(
  (function starTwo() {
    const input = getStringArrayInput("day10")
      .map((_) => Number(_))
      .sort((a, b) => a - b);

    const counts = { 0: 1 };
    for (let i = 0; i < input.length; i++) {
      counts[input[i]] =
        (counts[input[i] - 1] || 0) +
        (counts[input[i] - 2] || 0) +
        (counts[input[i] - 3] || 0);
    }

    return counts[input.pop()];
  })()
);

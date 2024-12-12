const input = "153517-630395".split("-").map(Number);

const star1 = () => {
  let valid = 0;
  for (let i = input[0]; i < input[1]; i++) {
    const hasPair = i
      .toString()
      .split("")
      .find((val, index, arr) => val === arr[index - 1]);
    if (!hasPair) continue;
    const isIncreasing = i
      .toString()
      .split("")
      .map(Number)
      .every((val, index, arr) => index === 0 || arr[index - 1] <= val);
    if (!isIncreasing) continue;
    valid++;
  }

  return valid;
};

const star2 = () => {
  let valid = 0;
  for (let i = input[0]; i < input[1]; i++) {
    const hasPair = i
      .toString()
      .split("")
      .find(
        (val, index, arr) =>
          val === arr[index - 1] &&
          val !== arr[index - 2] &&
          val !== arr[index + 1]
      );
    if (!hasPair) continue;
    const isIncreasing = i
      .toString()
      .split("")
      .map(Number)
      .every((val, index, arr) => index === 0 || arr[index - 1] <= val);
    if (!isIncreasing) continue;
    valid++;
  }

  return valid;
};

console.log(star1());
console.log(star2());

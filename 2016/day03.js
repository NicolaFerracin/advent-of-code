const { getStringArrayInput } = require("./utils");

const starOne = () => {
  return getStringArrayInput("day03")
    .map((x) =>
      x
        .trim()
        .replace(/\s+/g, " ")
        .split(" ")
        .map((x) => Number(x))
    )
    .reduce((valid, current) => {
      const [a, b, c] = current;
      if (a + b > c && a + c > b && b + c > a) return ++valid;
      return valid;
    }, 0);
};

const starTwo = () => {
  const input = getStringArrayInput("day03").map((x) =>
    x
      .trim()
      .replace(/\s+/g, " ")
      .split(" ")
      .map((x) => Number(x))
  );
  const pivot = [];
  for (let i = 0; i < input.length; i += 3) {
    const [a1, a2, a3] = input[i];
    const [b1, b2, b3] = input[i + 1];
    const [c1, c2, c3] = input[i + 2];
    pivot.push([a1, b1, c1], [a2, b2, c2], [a3, b3, c3]);
  }
  return pivot.reduce((valid, current) => {
    const [a, b, c] = current;
    if (a + b > c && a + c > b && b + c > a) return ++valid;
    return valid;
  }, 0);
};

console.log(starOne());
console.log(starTwo());

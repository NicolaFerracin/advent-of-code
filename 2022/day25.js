const { getStringArrayInput } = require("./utils");

const snafuToDecimal = (snafu) => {
  const arr = snafu.split("");
  let decimal = 0;
  while (arr.length) {
    const currPlace = Math.pow(5, arr.length - 1);
    const num = arr.shift();
    if (/\d/g.test(num)) decimal += currPlace * +num;
    else if (num === "=") decimal -= currPlace * 2;
    else if (num === "-") decimal -= currPlace;
  }

  return decimal;
};

const decimalToSnafu = (decimal) => {
  const snafu = [];

  while (decimal !== 0) {
    const mod = decimal % 5; // modulo by the base
    const char = mod === 3 ? "=" : mod === 4 ? "-" : mod; // handle carry based on available chars 0 1 2 - =
    snafu.unshift(char); // prepend to string
    decimal -= mod === 3 ? -2 : mod === 4 ? -1 : mod; // add back any possible carry or remove what we just took away
    decimal /= 5; // divide by the base an onward we go
  }

  return snafu.join("");
};

const starOne = () => {
  return decimalToSnafu(
    getStringArrayInput("day25").reduce(
      (decimal, snafu) => (decimal += snafuToDecimal(snafu)),
      0
    )
  );
};

console.log(starOne());

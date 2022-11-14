const { getStringArrayInput } = require("./utils");

const hexToAscii = (hex) => {
  return eval(`"${hex}"`);
};

const starOne = () => {
  return getStringArrayInput("day08").reduce((total, str) => {
    const literal = str.length;
    const memory = str
      .substring(1, str.length - 1)
      .replace(/\\(x[0-9a-fA-F]{2})/g, hexToAscii)
      .replace(/\\(.{1})/g, "$1").length;

    return (total += literal - memory);
  }, 0);
};

const starTwo = () => {
  return getStringArrayInput("day08").reduce((total, str) => {
    const encoded =
      str
        .replace(/\\(x[0-9a-fA-F]{2})/g, "xx$1")
        .replace(/\\(.{1})/g, "x$1".repeat(2)).length + 4;
    const literal = str.length;

    return (total += encoded - literal);
  }, 0);
};

console.log(starOne());
console.log(starTwo());

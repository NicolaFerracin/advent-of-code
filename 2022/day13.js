const { getStringArrayInput } = require("./utils");

const compare = (a, b) => {
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    const x = a[i];
    const y = b[i];

    if (typeof x === "number" && typeof y === "number") {
      if (x > y) return false;
      if (x < y) return true;
    } else {
      let res = 0;
      if (typeof x === "number") res = compare([x], y);
      else if (typeof y === "number") res = compare(x, [y]);
      else res = compare(x, y);

      if (typeof res === "boolean") return res;
      if (res > 0) return false;
      if (res < 0) return true;
    }
  }

  if (a.length < b.length) return true;
  if (a.length > b.length) return false;
};

const starOne = () => {
  const input = getStringArrayInput("day13");
  const pairs = [];
  for (let i = -1; i < input.length; i++) {
    if (i === -1 || !input[i]) {
      const a = input[++i];
      const b = input[++i];
      pairs.push([eval(a), eval(b)]);
    }
  }

  const indices = [];
  for (let i = 0; i < pairs.length; i++) {
    const [a, b] = pairs[i];
    if (compare(a, b)) indices.push(i + 1);
  }

  return indices.reduce((sum, i) => (sum += i), 0);
};

const starTwo = () => {
  const input = getStringArrayInput("day13");
  const packets = [];
  for (let i = -1; i < input.length; i++) {
    if (i === -1 || !input[i]) {
      const a = input[++i];
      const b = input[++i];
      packets.push(eval(a), eval(b));
    }
  }
  packets.push([[2]]);
  packets.push([[6]]);
  packets.sort((a, b) => (compare(a, b) ? -1 : 1));
  return (
    (packets.findIndex((p) => JSON.stringify(p) === "[[2]]") + 1) *
    (packets.findIndex((p) => JSON.stringify(p) === "[[6]]") + 1)
  );
};

console.log(starOne());
console.log(starTwo());

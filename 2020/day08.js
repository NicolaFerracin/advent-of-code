const { getStringArrayInput } = require("./utils");

console.log(
  (function starOne() {
    const ops = getStringArrayInput("day08").map((line) => {
      const [op, arg] = line.split(" ");

      return {
        op,
        arg: Number(arg),
      };
    });

    let accumulator = 0;
    const seen = new Set();
    let i = 0;
    while (true) {
      if (seen.has(i)) return accumulator;
      seen.add(i);
      const { op, arg } = ops[i];
      if (op === "acc") {
        accumulator += arg;
        i++;
      } else if (op === "jmp") {
        i += arg;
      } else {
        i++;
      }
    }
  })()
);

console.log(
  (function starTwo() {
    const ops = getStringArrayInput("day08").map((line) => {
      const [op, arg] = line.split(" ");

      return {
        op,
        arg: Number(arg),
      };
    });

    const changeOneCommand = (ops, start) => {
      const copy = JSON.parse(JSON.stringify(ops));
      for (let i = start; i < copy.length; i++) {
        if (copy[i].op === "jmp") {
          copy[i].op = "nop";
          return [copy, i + 1];
        }
        if (copy[i].op === "nop") {
          copy[i].op = "jmp";
          return [copy, i + 1];
        }
      }
    };

    let loopkupIndex = 0;
    while (true) {
      const [changedOps, newLookupIndex] = changeOneCommand(ops, loopkupIndex);
      loopkupIndex = newLookupIndex;
      let accumulator = 0;
      const seen = new Set();
      let i = 0;
      while (true) {
        if (i >= changedOps.length) return accumulator;
        if (seen.has(i)) break;
        seen.add(i);
        const { op, arg } = changedOps[i];
        if (op === "acc") {
          accumulator += arg;
          i++;
        } else if (op === "jmp") {
          i += arg;
        } else {
          i++;
        }
      }
    }
  })()
);

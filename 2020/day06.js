const { getStringArrayInput } = require("./utils");

console.log(
  (function starOne() {
    const input = getStringArrayInput("day06");
    input.push("");

    const groups = [];
    let group = "";
    input.forEach((line) => {
      if (!line) {
        groups.push(group);
        group = "";
      } else group += line;
    });

    return groups.reduce((acc, curr) => {
      const yes = new Set();
      for (let i = 0; i < curr.length; i++) {
        yes.add(curr[i]);
      }
      acc += yes.size;
      return acc;
    }, 0);
  })()
);

console.log(
  (function starTwo() {
    const input = getStringArrayInput("day06");
    input.push("");

    const groups = [];
    let group = [];
    input.forEach((line) => {
      if (!line) {
        groups.push(group);
        group = [];
      } else group.push(line);
    });

    return groups.reduce((acc, curr) => {
      const yes = new Map();
      for (let i = 0; i < curr.length; i++) {
        const person = curr[i];
        for (let j = 0; j < person.length; j++) {
          const question = person[j];
          yes.set(question, (yes.get(question) || 0) + 1);
        }
      }
      for (const entry of yes.entries()) {
        if (entry[1] < curr.length) yes.delete(entry[0]);
      }
      acc += yes.size;
      return acc;
    }, 0);
  })()
);

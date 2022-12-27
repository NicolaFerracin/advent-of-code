const { getStringArrayInput } = require("./utils");

const starOne = () => {
  const { two, three } = getStringArrayInput("day02").reduce(
    (tally, boxId) => {
      const map = new Map();
      for (const char of boxId) {
        map.set(char, (map.get(char) || 0) + 1);
      }

      for (const occurrences of [...new Set([...map.values()])]) {
        if (occurrences === 3) tally.three++;
        else if (occurrences === 2) tally.two++;
      }

      return tally;
    },
    { two: 0, three: 0 }
  );

  return two * three;
};

const starTwo = () => {
  const boxIds = getStringArrayInput("day02");

  for (const boxId1 of boxIds) {
    for (const boxId2 of boxIds) {
      if (boxId1 === boxId2) continue;

      const diff = [];
      for (let i = 0; i < boxId1.length; i++) {
        if (boxId1[i] !== boxId2[i]) diff.push(i);
        if (diff.length > 1) break;
      }

      if (diff.length === 1) {
        return boxId1.slice(0, diff[0]) + boxId1.slice(diff[0] + 1);
      }
    }
  }
};

console.log(starOne());
console.log(starTwo());

const { getStringArrayInput } = require("./utils");

const removeDecoy = () => {
  return getStringArrayInput("day04")
    .map((x) => {
      const parts = x.match(/[(\w)|(\d)]+/g);
      const checksum = parts.pop();
      const sectorId = Number(parts.pop());
      const name = parts;

      return { checksum, sectorId, name };
    })
    .filter(({ name, checksum }) => {
      const map = new Map();
      for (const part of name) {
        for (const letter of part) {
          map.set(letter, (map.get(letter) || 0) + 1);
        }
      }

      const sorted = [...map.entries()].sort((a, b) => {
        if (a[1] === b[1]) return a[0].localeCompare(b[0]);
        return b[1] - a[1];
      });

      let isValid = true;
      for (const check of checksum) {
        const [compareTo] = sorted.shift();
        if (check !== compareTo) {
          isValid = false;
          break;
        }
      }

      return isValid;
    });
};

const starOne = () => {
  return removeDecoy().reduce((tally, { sectorId }) => (tally += sectorId), 0);
};

const starTwo = () => {
  const charCodeA = "a".charCodeAt(0);
  return removeDecoy()
    .map(({ name, sectorId }) => {
      const rotations = sectorId % 26;
      const rotated = name
        .map((part) =>
          part
            .split("")
            .map((letter) => {
              const charCode = letter.charCodeAt(0) - charCodeA;
              const newCharCode = (charCode + rotations) % 26;
              return String.fromCharCode(newCharCode + charCodeA);
            })
            .join("")
        )
        .join(" ");
      return { name: rotated, sectorId };
    })
    .find(({ name }) => name.includes("north")).sectorId;
};

console.log(starOne());
console.log(starTwo());

const { getStringArrayInput } = require("./utils");

const starOne = () => {
  const input = getStringArrayInput("day06");
  const messageLen = input[0].length;
  const maps = [];
  for (let i = 0; i < messageLen; i++) {
    maps.push({ map: new Map(), mostFrequent: { letter: "", occurrences: 0 } });
  }

  input.forEach((message) => {
    message.split("").forEach((letter, index) => {
      const { map, mostFrequent } = maps[index];
      map.set(letter, (map.get(letter) || 0) + 1);
      if (mostFrequent.occurrences < map.get(letter)) {
        mostFrequent.letter = letter;
        mostFrequent.occurrences = map.get(letter);
      }
    });
  });

  return maps.map(({ mostFrequent: { letter } }) => letter).join("");
};

const starTwo = () => {
  const input = getStringArrayInput("day06");
  const messageLen = input[0].length;
  const maps = [];
  for (let i = 0; i < messageLen; i++) {
    maps.push(new Map());
  }

  input.forEach((message) => {
    message.split("").forEach((letter, index) => {
      const map = maps[index];
      map.set(letter, (map.get(letter) || 0) + 1);
    });
  });

  return maps
    .map((map) => [...map.entries()].sort((a, b) => a[1] - b[1])[0][0])
    .join("");
};

console.log(starOne());
console.log(starTwo());

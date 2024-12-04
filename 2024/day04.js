const { getStringArrayInput } = require("./utils");

const input = getStringArrayInput("day04");

const spellsXmas = (w) => w === "XMAS" || w === "SAMX";
const spellsMas = (w) => w === "MAS" || w === "SAM";

const star1 = () => {
  const findWords = (x, y) => {
    // left-to-right
    const a = [
      input[x][y],
      input[x + 1]?.[y],
      input[x + 2]?.[y],
      input[x + 3]?.[y],
    ];

    // diagonal bottom-right
    const b = [
      input[x][y],
      input[x + 1]?.[y + 1],
      input[x + 2]?.[y + 2],
      input[x + 3]?.[y + 3],
    ];

    // diagonal bottom left
    const c = [
      input[x][y],
      input[x + 1]?.[y - 1],
      input[x + 2]?.[y - 2],
      input[x + 3]?.[y - 3],
    ];

    return [a, b, c].map((x) => x?.join(""));
  };

  let tot = 0;
  for (let x = 0; x < input.length; x++) {
    const row = input[x];
    tot += row.match(/XMAS/g)?.length ?? 0;
    tot += row.match(/SAMX/g)?.length ?? 0;
    for (let y = 0; y < row.length; y++) {
      findWords(x, y).forEach((w) => {
        if (spellsXmas(w)) {
          tot++;
        }
      });
    }
  }

  return tot;
};

const star2 = () => {
  const hasXMas = (x, y) => {
    if (input[x][y] !== "A") return false;

    const a = [input[x - 1]?.[y - 1], "A", input[x + 1]?.[y + 1]].join("");
    const b = [input[x - 1]?.[y + 1], "A", input[x + 1]?.[y - 1]].join("");

    return spellsMas(a) && spellsMas(b);
  };

  let tot = 0;
  for (let x = 1; x < input.length - 1; x++) {
    const row = input[x];
    for (let y = 1; y < row.length - 1; y++) {
      tot += hasXMas(x, y) ? 1 : 0;
    }
  }

  return tot;
};

console.log(star1());
console.log(star2());

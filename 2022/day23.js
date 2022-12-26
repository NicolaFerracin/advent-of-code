const { getStringArrayInput } = require("./utils");

const getNeighbours = (elf, elves) => {
  // 8 adjacent cells
  const deltas = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
  ];

  const [nw, n, ne, e, se, s, sw, w] = deltas.map(([deltaX, deltaY]) =>
    elves.find(({ x, y }) => elf.x + deltaX === x && elf.y + deltaY === y)
  );

  return { nw, n, ne, e, se, s, sw, w };
};

const exec = (rounds) => {
  const initialMap = getStringArrayInput("day23").map((_) => _.split(""));
  const elves = [];
  for (let x = 0; x < initialMap.length; x++) {
    for (let y = 0; y < initialMap[x].length; y++) {
      if (initialMap[x][y] === "#") elves.push({ x, y });
    }
  }

  const movesPriority = ["n", "s", "w", "e"];

  for (let round = 1; round <= rounds; round++) {
    // first part of the round is about making move proposals
    const proposals = [];
    for (let elfI = 0; elfI < elves.length; elfI++) {
      const elf = elves[elfI];
      const neighbours = getNeighbours(elf, elves);
      if (Object.keys(neighbours).every((key) => !neighbours[key])) {
        continue;
      }

      for (const move of movesPriority) {
        if (move === "s" || move === "n") {
          if (
            !neighbours[`${move}w`] &&
            !neighbours[move] &&
            !neighbours[`${move}e`]
          ) {
            proposals.push({
              elfI,
              move: { x: elf.x + (move === "s" ? 1 : -1), y: elf.y },
            });
            break;
          }
        } else {
          if (
            !neighbours[`s${move}`] &&
            !neighbours[move] &&
            !neighbours[`n${move}`]
          ) {
            proposals.push({
              elfI,
              move: { x: elf.x, y: elf.y + (move === "e" ? 1 : -1) },
            });
            break;
          }
        }
      }
    }

    // STAR 2
    round % 100 === 0 && console.log("Round:", round);
    if (proposals.length === 0) return round;

    // second part of the round is about evaluating and doing the actual moves
    for (const { elfI, move } of proposals) {
      // for each proposal by an elf, if no other elf wants to move to the same cell, move them
      if (
        !proposals.find(
          (p) => p.elfI !== elfI && p.move.x === move.x && p.move.y === move.y
        )
      ) {
        elves[elfI].x = move.x;
        elves[elfI].y = move.y;
      }
    }

    movesPriority.push(movesPriority.shift());
  }

  // STAR 1
  const minX = Math.min(...elves.map(({ x }) => x));
  const maxX = Math.max(...elves.map(({ x }) => x));
  const minY = Math.min(...elves.map(({ y }) => y));
  const maxY = Math.max(...elves.map(({ y }) => y));

  return (maxX - minX + 1) * (maxY - minY + 1) - elves.length;
};

const starOne = () => {
  return exec(10);
};

const starTwo = () => {
  return exec(Infinity);
};

console.log(starOne());
console.log(starTwo());

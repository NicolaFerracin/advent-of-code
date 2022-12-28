const PUZZLE_INPUT = 556061;

const play = (star) => {
  const MAX_LEN = 1_000;

  const getX = (elf) => Math.floor(elf / MAX_LEN);
  const getY = (elf) => elf % MAX_LEN;

  const recipes = {
    0: "37",
  };
  let currRow = 0;
  let recipesLen = 2;

  let elf1 = 0;
  let elf2 = 1;

  while (true) {
    // STAR 1
    if (star === 1 && recipesLen >= 10 + PUZZLE_INPUT) break;

    const combined =
      +recipes[getX(elf1)][getY(elf1)] + +recipes[getX(elf2)][getY(elf2)];
    for (const digit of combined.toString()) {
      recipes[currRow] += +digit;
      recipesLen++;

      if (recipes[currRow].length === MAX_LEN) {
        recipes[++currRow] = "";
      }
    }

    elf1 = (elf1 + 1 + +recipes[getX(elf1)][getY(elf1)]) % recipesLen;
    elf2 = (elf2 + 1 + +recipes[getX(elf2)][getY(elf2)]) % recipesLen;

    // STAR 2
    if (star === 2) {
      // find PUZZLE_INPUT within recipes
      const puzzleInputIndex = recipes[currRow].indexOf(
        PUZZLE_INPUT.toString()
      );
      if (puzzleInputIndex > 0) return currRow * MAX_LEN + puzzleInputIndex;
    }
  }

  // STAR 1 return
  let x = getX(PUZZLE_INPUT);
  let y = getY(PUZZLE_INPUT);
  let res = "";
  for (let i = 0; i < 10; i++) {
    res += recipes[x][y++];
    if (y >= MAX_LEN) {
      x++;
      y = 0;
    }
  }

  return res;
};

const starOne = () => {
  return play(1);
};

const starTwo = () => {
  return play(2);
};

console.log(starOne());
console.log(starTwo());

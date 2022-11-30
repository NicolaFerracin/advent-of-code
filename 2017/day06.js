const { getRawInput } = require("./utils");

const exec = (findLoop = false) => {
  const blocks = getRawInput("day06")
    .replace(/\s+/g, " ")
    .split(" ")
    .map((x) => +x);

  const seen = new Set();
  seen.add(blocks.join("-"));

  let cycles = 0;
  while (true) {
    cycles++;

    let largestBlock = Math.max(...blocks);
    const largetsBlockIndex = blocks.indexOf(largestBlock);
    blocks[largetsBlockIndex] = 0;

    let i = 1;
    while (largestBlock > 0) {
      const index = (largetsBlockIndex + i) % blocks.length;
      blocks[index]++;
      largestBlock--;
      i++;
    }

    if (seen.has(blocks.join("-"))) {
      if (!findLoop) return cycles;
      findLoop = false;
      seen.clear();
    }
    seen.add(blocks.join("-"));
  }
};

const starOne = () => {
  return exec();
};

const starTwo = () => {
  return exec(true) - exec();
};

console.log(starOne());
console.log(starTwo());

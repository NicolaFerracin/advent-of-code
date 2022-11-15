const { getStringArrayInput } = require("./utils");
const _ = require("lodash");

const getInput = () => {
  const input = getStringArrayInput("day19");

  const dna = input.pop();
  input.pop(); // remove empty line
  const replacements = input
    .map((line) => {
      const [a, b] = line.split(" => ");
      return [a, b];
    })
    .sort((a, b) => b[1].length - a[1].length);

  return { dna, replacements };
};

const starOne = () => {
  const { dna, replacements } = getInput();
  const seen = new Set();
  for (const [a, b] of replacements) {
    const re = new RegExp(a, "g");
    let r;
    while ((r = re.exec(dna))) {
      const { index } = r;
      const newDna =
        dna.substring(0, index) + b + dna.substring(index + a.length);
      seen.add(newDna);
    }
  }

  return seen.size;
};

const starTwo = () => {
  const { dna, replacements } = getInput();

  const generateAllReplacements = (str) => {
    const res = [];
    for (const [a, b] of replacements) {
      if (str.includes(b)) {
        const newDna = str.replace(b, a);
        res.push(newDna);
      }
    }
    return res;
  };

  let queue = [dna];
  let steps = 0;
  while (queue.length) {
    steps++;
    const newQueue = new Set();
    for (const item of queue) {
      for (const repl of generateAllReplacements(item)) {
        if (repl === "e") return steps;
        newQueue.add(repl);
      }
    }

    queue = [...newQueue].sort((a, b) => a.length - b.length).slice(0, 100);
  }
};

console.log(starOne());
console.log(starTwo());

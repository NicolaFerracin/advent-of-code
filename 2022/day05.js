const { getStringArrayInput } = require("./utils");

const getInput = () => {
  // get raw input
  const raw = getStringArrayInput("day05");
  const input = {
    stacks: [],
    moves: [],
  };
  let property = "stacks";
  for (const line of raw) {
    if (!line) {
      property = "moves";
      continue;
    }

    input[property].push(line.split(" "));
  }

  // pivot stacks
  const pivoted = [];
  input.stacks.pop();
  input.stacks.reverse();
  for (const stack of input.stacks) {
    let delta = 0;
    for (let i = 0; i < stack.length; i++) {
      let crate = stack[i];
      let spaces = 0;
      while (!crate && i < stack.length) {
        spaces++;
        crate = stack[++i];
      }
      if (crate) {
        delta += spaces / 4;
        if (!pivoted[delta]) pivoted[delta] = [];
        pivoted[delta++].push(crate);
      }
    }
  }
  input.stacks = pivoted;

  // parse moves
  const moves = [];
  for (const move of input.moves) {
    const [, amount, , from, , to] = move;
    moves.push({ amount: +amount, from: +from - 1, to: +to - 1 }); // 0-index based
  }
  input.moves = moves;

  return input;
};

const starOne = () => {
  const { stacks, moves } = getInput();

  for (const move of moves) {
    for (let i = 0; i < move.amount; i++) {
      const crate = stacks[move.from].pop();
      stacks[move.to].push(crate);
    }
  }

  return stacks.map((stack) => stack.pop()[1]).join("");
};

const starTwo = () => {
  const { stacks, moves } = getInput();

  for (const move of moves) {
    const toMove = [];
    for (let i = 0; i < move.amount; i++) {
      toMove.push(stacks[move.from].pop());
    }
    stacks[move.to].push(...toMove.reverse());
  }

  return stacks.map((stack) => stack.pop()[1]).join("");
};

console.log(starOne());
console.log(starTwo());

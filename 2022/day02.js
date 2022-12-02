const { getStringArrayInput } = require("./utils");

const ROCK = 1;
const PAPER = 2;
const SCISSOR = 3;

const WIN = 6;
const DRAW = 3;
const LOSE = 0;

const getShape = {
  A: "rock",
  X: "rock",
  B: "paper",
  Y: "paper",
  C: "scissor",
  Z: "scissor",
};

const playRound = {
  rock: {
    rock: DRAW + ROCK,
    paper: WIN + PAPER,
    scissor: LOSE + SCISSOR,
  },
  paper: {
    rock: LOSE + ROCK,
    paper: DRAW + PAPER,
    scissor: WIN + SCISSOR,
  },
  scissor: {
    rock: WIN + ROCK,
    paper: LOSE + PAPER,
    scissor: DRAW + SCISSOR,
  },
};

const starOne = () => {
  return getStringArrayInput("day02").reduce((total, line) => {
    const [opponent, me] = line.split(" ");

    const opponenShape = getShape[opponent];
    const myShape = getShape[me];
    return total + playRound[opponenShape][myShape];
  }, 0);
};

const chooseShape = {
  rock: {
    X: "scissor",
    Y: "rock",
    Z: "paper",
  },
  paper: {
    X: "rock",
    Y: "paper",
    Z: "scissor",
  },
  scissor: {
    X: "paper",
    Y: "scissor",
    Z: "rock",
  },
};

const starTwo = () => {
  return getStringArrayInput("day02").reduce((total, line) => {
    const [opponent, me] = line.split(" ");

    const opponenShape = getShape[opponent];
    const myShape = chooseShape[opponenShape][me];
    return total + playRound[opponenShape][myShape];
  }, 0);
};

console.log(starOne());
console.log(starTwo());

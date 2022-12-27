const { getRawInput } = require("./utils");

class Marble {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

const play = (players, lastMarble) => {
  let player = 0;
  const scores = new Array(players).fill(0);
  let curr = new Marble(0);
  curr.prev = curr;
  curr.next = curr;

  for (let marble = 1; marble <= lastMarble; marble++) {
    if (marble % 23 === 0) {
      // add current marble to the score
      scores[player] += marble;

      // add the 7th from the current marble to the score...
      for (let i = 0; i < 7; i++) curr = curr.prev;

      scores[player] += curr.val;

      // ...and remove it
      curr.prev.next = curr.next;
      curr.next.prev = curr.prev;
      curr = curr.next;
    } else {
      const newMarble = new Marble(marble);
      newMarble.prev = curr.next;
      newMarble.next = curr.next.next;

      curr.next.next.prev = newMarble;
      curr.next.next = newMarble;

      curr = newMarble;
    }

    player = (player + 1) % players;
  }

  return Math.max(...scores);
};

const starOne = () => {
  const [players, marbles] = getRawInput("day09")
    .match(/\d+/g)
    .map((_) => +_);

  return play(players, marbles);
};

const starTwo = () => {
  const [players, marbles] = getRawInput("day09")
    .match(/\d+/g)
    .map((_) => +_);

  return play(players, marbles * 100);
};

console.log(starOne());
console.log(starTwo());

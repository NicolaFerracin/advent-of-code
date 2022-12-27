const { getStringArrayInput } = require("./utils");

const starOne = () => {
  const lines = getStringArrayInput("day25");

  const initialState = lines.shift().split(" ").pop()[0];
  const steps = +lines.shift().match(/\d+/g)[0];

  const states = {};
  for (let i = 1; i < lines.length; i++) {
    const state = lines[i++].split(" ").pop()[0];
    const condVal = +lines[i++].match(/\d+/g)[0];

    const write1 = +lines[i++].match(/\d+/g)[0];
    const move1 = lines[i++].includes("right") ? 1 : -1;
    const nextState1 = lines[i++].split(" ").pop()[0];

    i++;

    const write2 = +lines[i++].match(/\d+/g)[0];
    const move2 = lines[i++].includes("right") ? 1 : -1;
    const nextState2 = lines[i++].split(" ").pop()[0];

    states[state] = (val) => {
      if (val === condVal)
        return { write: write1, move: move1, nextState: nextState1 };
      return { write: write2, move: move2, nextState: nextState2 };
    };
  }

  const tape = new Map();
  let cursor = 0;
  let currState = initialState;
  for (let i = 0; i < steps; i++) {
    const valAtCursor = tape.has(cursor) ? tape.get(cursor) : 0;
    const { write, move, nextState } = states[currState](valAtCursor);
    tape.set(cursor, write);
    cursor += move;
    currState = nextState;
  }

  return [...tape.values()].filter((val) => val === 1).length;
};

console.log(starOne());

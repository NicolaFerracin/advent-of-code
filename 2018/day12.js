const { getStringArrayInput, deepClone } = require("./utils");

const exec = (star) => {
  const [initialState, , ...notesRaw] = getStringArrayInput("day12");
  let state = initialState.split(" ").pop().split("");
  const notes = notesRaw.reduce((notes, note) => {
    const [before, after] = note.split(" => ");
    notes.set(before, after);
    return notes;
  }, new Map());

  let firstIndex = 0;
  const seen = new Map();
  let i = 0;
  while (true) {
    // STAR ONE => break after 20 generations
    if (star === 1 && i === 20) break;

    // add empty pots at the start and at the end of the state if necessary
    const wrapLeft =
      state[0] === "." && state[1] === "." ? 0 : state[0] === "." ? 1 : 2;
    const wrapRight =
      state[state.length - 1] === "." && state[state.length - 2] === "."
        ? 0
        : state[state.length - 1] === "."
        ? 1
        : 2;
    firstIndex -= wrapLeft;
    state.unshift(...".".repeat(wrapLeft).split(""));
    state.push(...".".repeat(wrapRight).split(""));

    // STAR TWO:
    // we want to keep track of seen states so that we break when we reach a loop
    const stateStr = state.join("");
    const start = stateStr.indexOf("#");
    const end = stateStr.lastIndexOf("#");
    const key = stateStr.substring(start, end);
    if (seen.has(key)) {
      // if we already saw this state
      // we can count how many iterations are left
      // and multiply them by the amount of cells that have been added from the previous time we saw this state
      firstIndex += (50_000_000_000 - i) * (state.length - seen.get(key));
      break;
    }
    seen.set(key, state.length);

    const newState = [];
    for (let plant = 0; plant < state.length; plant++) {
      // for each plant, find the combination in the notes and determine the next state
      const note = `${state[plant - 2] || "."}${state[plant - 1] || "."}${
        state[plant]
      }${state[plant + 1] || "."}${state[plant + 2] || "."}`;

      newState.push(notes.get(note) || ".");
    }

    i++;
    state = newState;
  }

  return state.reduce((total, pot, index) => {
    return (total += pot === "." ? 0 : index + firstIndex);
  }, 0);
};

const starOne = () => {
  return exec(1);
};

const starTwo = () => {
  return exec(2);
};

console.log(starOne());
console.log(starTwo());

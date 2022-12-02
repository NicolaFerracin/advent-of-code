const STEPS = 370;

const starOne = () => {
  let state = [0];
  let index = 0;
  for (let i = 1; i <= 2017; i++) {
    index = (index + STEPS) % state.length;
    state = [...state.slice(0, index + 1), i, ...state.slice(index + 1)];
    index++;
  }
  return state[index + 1];
};

const starTwo = () => {
  let stateLen = 1;
  let index = 0;
  let afterZero = null;
  for (let i = 1; i <= 50_000_000; i++) {
    index = (index + STEPS) % stateLen;
    if (index === 0) afterZero = i;
    stateLen++;
    index++;
  }

  return afterZero;
};

console.log(starOne());
console.log(starTwo());

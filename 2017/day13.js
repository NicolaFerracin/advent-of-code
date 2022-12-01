const { getStringArrayInput } = require("./utils");

const getLayers = () =>
  getStringArrayInput("day13").reduce((acc, line) => {
    const [depth, range] = line.split(": ");
    acc[depth] = +range;
    return acc;
  }, {});

const starOne = () => {
  const layers = getLayers();
  const lastLayer = Object.keys(layers).pop();

  let index = 0;
  let severity = 0;
  while (index <= lastLayer) {
    const range = layers[`${index}`];
    if (range) {
      let scannerPos = 0;
      let dir = 1;
      for (let i = 0; i < index; i++) {
        if (scannerPos === range - 1) dir = -1;
        else if (scannerPos === 0) dir = 1;
        scannerPos += dir;
      }

      if (scannerPos === 0) severity += index * range;
    }

    index++;
  }

  return severity;
};

const starTwo = () => {
  const layers = getLayers();

  let time = 0;
  while (true) {
    let found = true;
    for (const [depth, range] of Object.entries(layers)) {
      const posAtTime = (time + +depth) % (range + (range - 2));
      if (posAtTime === 0) {
        found = false;
        break;
      }
    }
    if (found) return time;
    time++;
  }
};

console.log(starOne());
console.log(starTwo());

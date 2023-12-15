const { getRawInput } = require("./utils");

const input = getRawInput("day15").split(",");

const getHash = (label) => {
  return label.split("").reduce((acc, c) => {
    acc += c.charCodeAt(0);
    acc *= 17;
    acc = acc % 256;
    return acc;
  }, 0);
};

const starOne = () => {
  return input.reduce(
    (total, instruction) => (total += getHash(instruction)),
    0
  );
};

const starTwo = () => {
  const boxes = new Map();
  const lenses = new Map();
  input.forEach((instruction) => {
    const [, label, op, focalLen] = instruction.match(/(\w+)(-|=)(\d+)?/);

    const hash = getHash(label);
    // get box
    const box = boxes.get(hash);

    if (op === "-") {
      // if the box exists and it contains the lens with given label
      if (box && box.includes(label)) {
        const i = box.indexOf(label);
        // remove lens and move all other lenses
        boxes.set(hash, [...box.slice(0, i), ...box.slice(i + 1)]);
        // remove lens from lenses map
        lenses.delete(`${hash}#${label}`);
      }
    }

    if (op === "=") {
      // if there is a lens with the same label in the box...
      if (box && box.includes(label)) {
      } else {
        const newBox = box ?? [];
        newBox.push(label);
        boxes.set(hash, newBox);
      }
      // update the focal length
      lenses.set(`${hash}#${label}`, focalLen);
    }
  });

  let focusingPower = 0;
  for (const [boxId, lensesList] of boxes) {
    focusingPower += lensesList.reduce(
      (acc, lens, index) =>
        (acc += (boxId + 1) * (index + 1) * lenses.get(`${boxId}#${lens}`)),
      0
    );
  }

  return focusingPower;
};

console.log(starOne());
console.log(starTwo());

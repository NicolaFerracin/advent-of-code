const { getStringArrayInput } = require("./utils");

const starOne = () => {
  const area = getStringArrayInput("day03").reduce((area, line) => {
    const [, fromLeft, fromTop, width, height] = line
      .match(/\d+/g)
      .map((_) => +_);

    for (let x = fromTop; x < fromTop + height; x++) {
      for (let y = fromLeft; y < fromLeft + width; y++) {
        area.set(`${x}#${y}`, (area.get(`${x}#${y}`) || 0) + 1);
      }
    }

    return area;
  }, new Map());

  return [...area.values()].filter((occupants) => occupants > 1).length;
};

const starTwo = () => {
  const area = new Map();

  return getStringArrayInput("day03")
    .map((line) => {
      const [id, fromLeft, fromTop, width, height] = line
        .match(/\d+/g)
        .map((_) => +_);

      for (let x = fromTop; x < fromTop + height; x++) {
        for (let y = fromLeft; y < fromLeft + width; y++) {
          area.set(`${x}#${y}`, (area.get(`${x}#${y}`) || 0) + 1);
        }
      }

      return { id, fromLeft, fromTop, width, height };
    })
    .find(({ fromLeft, fromTop, width, height }) => {
      let isOverlapping = false;
      for (let x = fromTop; x < fromTop + height; x++) {
        for (let y = fromLeft; y < fromLeft + width; y++) {
          if (area.get(`${x}#${y}`) > 1) isOverlapping = true;
        }
      }

      return !isOverlapping;
    }).id;
};

console.log(starOne());
console.log(starTwo());

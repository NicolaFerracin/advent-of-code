const { getStringArrayInput } = require("./utils");

const move = {
  U: ({ x, y }) => ({
    x: x + 1,
    y,
  }),
  D: ({ x, y }) => ({
    x: x - 1,
    y,
  }),
  R: ({ x, y }) => ({
    x,
    y: y + 1,
  }),
  L: ({ x, y }) => ({
    x,
    y: y - 1,
  }),
};

const exec = (knotsAmount) => {
  const seen = new Set();

  const knots = [];
  for (let i = 0; i < knotsAmount + 1; i++) {
    knots.push({ x: 0, y: 0 });
  }
  seen.add(`0#0`);

  getStringArrayInput("day09").forEach((line) => {
    const [dir, amount] = line.split(" ");

    for (let i = 0; i < +amount; i++) {
      knots[0] = move[dir](knots[0]);

      for (let knot = 1; knot < knots.length; knot++) {
        // generate previous knot neighbours
        const prevKnot = knots[knot - 1];
        const neighbours = new Set([
          `${prevKnot.x}#${prevKnot.y}`,
          `${prevKnot.x - 1}#${prevKnot.y - 1}`,
          `${prevKnot.x - 1}#${prevKnot.y}`,
          `${prevKnot.x - 1}#${prevKnot.y + 1}`,
          `${prevKnot.x}#${prevKnot.y + 1}`,
          `${prevKnot.x + 1}#${prevKnot.y + 1}`,
          `${prevKnot.x + 1}#${prevKnot.y}`,
          `${prevKnot.x + 1}#${prevKnot.y - 1}`,
          `${prevKnot.x}#${prevKnot.y - 1}`,
        ]);

        // if current knot is away from previous knot => follow
        const currKnot = knots[knot];
        if (!neighbours.has(`${currKnot.x}#${currKnot.y}`)) {
          // move horizontally
          if (prevKnot.x === currKnot.x)
            currKnot.y = Math.max(prevKnot.y, currKnot.y) - 1;
          // move vertically
          else if (prevKnot.y === currKnot.y)
            currKnot.x = Math.max(prevKnot.x, currKnot.x) - 1;
          // move diagonally
          else {
            // check which diagonal move would make the tail a neighbour
            if (neighbours.has(`${currKnot.x - 1}#${currKnot.y - 1}`)) {
              currKnot.x -= 1;
              currKnot.y -= 1;
            } else if (neighbours.has(`${currKnot.x - 1}#${currKnot.y + 1}`)) {
              currKnot.x -= 1;
              currKnot.y += 1;
            } else if (neighbours.has(`${currKnot.x + 1}#${currKnot.y - 1}`)) {
              currKnot.x += 1;
              currKnot.y -= 1;
            } else if (neighbours.has(`${currKnot.x + 1}#${currKnot.y + 1}`)) {
              currKnot.x += 1;
              currKnot.y += 1;
            }
          }
        }
      }

      seen.add(`${knots[knots.length - 1].x}#${knots[knots.length - 1].y}`);
    }
  });

  return seen.size;
};

const starOne = () => {
  return exec(1);
};

const starTwo = () => {
  return exec(9);
};

console.log(starOne());
console.log(starTwo());

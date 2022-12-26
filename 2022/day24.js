const { getStringArrayInput, deepClone } = require("./utils");

const deltas = {
  ">": [0, 1],
  v: [1, 0],
  "<": [0, -1],
  "^": [-1, 0],
};

const exec = (rounds) => {
  const valley = getStringArrayInput("day24").map((line) => line.split(""));
  const blizzards = valley.reduce((bl, row, rowI) => {
    bl.push(
      ...row.reduce((blRow, cell, colI) => {
        if (cell !== "." && cell !== "#") {
          blRow.push({ x: rowI, y: colI, delta: deltas[cell] });
        }
        return blRow;
      }, [])
    );
    return bl;
  }, []);

  const startX = 0;
  const startY = valley[startX].findIndex((cell) => cell === ".");

  const endX = valley.length - 1;
  const endY = valley[endX].findIndex((cell) => cell === ".");

  const targets = [];
  for (let i = 0; i < rounds; i++) {
    targets.push({
      x: i % 2 === 0 ? endX : startX,
      y: i % 2 === 0 ? endY : startY,
    });
  }

  const queue = [{ x: startX, y: startY }];
  let steps = 0;
  while (queue) {
    // move blizzards
    blizzards.forEach((b) => {
      const { x, y, delta } = b;
      // if new position is on a wall, wrap around
      if (valley[x + delta[0]][y + delta[1]] === "#") {
        if (delta[0] === 1) b.x = 1;
        else if (delta[0] === -1) b.x = valley.length - 2;
        else if (delta[1] === 1) b.y = 1;
        else b.y = valley[x].length - 2;
      } else {
        // else move forward by delta
        b.x += delta[0];
        b.y += delta[1];
      }
    });
    blizzards.sort((a, b) => (a.x === b.x ? a.y - b.y : a.x - b.x));

    let len = queue.length;
    // console.log(len)
    const duplicateStates = new Set();
    while (len > 0) {
      len--;
      const state = queue.shift();

      if (state.x === targets[0].x && state.y === targets[0].y) {
        targets.shift();
        if (targets.length === 0) return steps;

        while (queue.length) queue.pop();
        queue.push({ x: state.x, y: state.y });
        break;
      }

      if (duplicateStates.has(`${state.x}#${state.y}`)) continue;
      duplicateStates.add(`${state.x}#${state.y}`);

      // create new state for every possible move: stay, up, right, down, left
      [
        [state.x, state.y],
        [state.x - 1, state.y],
        [state.x, state.y + 1],
        [state.x + 1, state.y],
        [state.x, state.y - 1],
      ]
        .filter(([newX, newY]) => {
          return (
            // keep only positions within range
            newX >= 0 &&
            newY >= 0 &&
            newX < valley.length &&
            newY < valley[0].length &&
            valley[newX][newY] !== "#" &&
            // if no blizzard is on the desired new state position, we keep it
            !blizzards.find(({ x, y }) => x === newX && y === newY)
          );
        })
        .forEach(([newX, newY]) => {
          queue.push({
            x: newX,
            y: newY,
          });
        });
    }
    steps++;
  }
};

const starOne = () => {
  return exec(1);
};

const starTwo = () => {
  return exec(3);
};

console.log(starOne());
console.log(starTwo());

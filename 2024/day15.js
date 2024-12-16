const { getRawInput } = require("./utils");

const getInput = () => {
  const [map, moves] = getRawInput("day15").split("\n\n");
  return {
    map: map.split("\n").map((row) => row.split("")),
    moves: moves.split("\n").join("").split(""),
  };
};

const movesMap = {
  "^": (x, y) => ({ x: x - 1, y }),
  v: (x, y) => ({ x: x + 1, y }),
  ">": (x, y, half) => (half ? { x, y: y + 0.5 } : { x, y: y + 1 }),
  "<": (x, y, half) => (half ? { x, y: y - 0.5 } : { x, y: y - 1 }),
};

const star1 = () => {
  const { map, moves } = getInput();
  let x = map.findIndex((row) => row.includes("@"));
  let y = map[x].indexOf("@");

  for (const move of moves) {
    let curr = { x, y };
    let hitAWall = false;
    const toShift = [{ x, y }];
    // we keep going until we find an empty space or a wall
    while (true) {
      const { x: newX, y: newY } = movesMap[move](curr.x, curr.y);

      // found a wall, nothing moves
      if (map[newX][newY] === "#") {
        hitAWall = true;
        break;
      }
      // found a box, add it to the list of things to shift once we get a free space
      else if (map[newX][newY] === "O") {
        toShift.push({ x: newX, y: newY });
        curr = { x: newX, y: newY };
      }
      // else, we found an empty space. Set curr to null to exit the while
      else break;
    }

    // if we didn't hit a wall, move all the items in reverse order, so not to override anything
    if (!hitAWall) {
      for (let i = toShift.length - 1; i >= 0; i--) {
        const curr = toShift[i];
        const { x: newX, y: newY } = movesMap[move](curr.x, curr.y);
        map[newX][newY] = map[curr.x][curr.y];
        map[curr.x][curr.y] = ".";
        if (i === 0) {
          x = newX;
          y = newY;
        }
      }
    }
  }

  let gps = 0;
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
      if (map[x][y] === "O") gps += x * 100 + y;
    }
  }

  return gps;
};

const areObjectsColliding = (a, b) =>
  a.x === b.x &&
  (a.y1 === b.y1 || a.y2 === b.y1 || a.y1 === b.y2 || a.y2 === b.y2);

const star2 = () => {
  const { map: originalMap, moves } = getInput();
  const obj = [];
  for (let x = 0; x < originalMap.length; x++) {
    for (let y = 0; y < originalMap[x].length; y++) {
      const val = originalMap[x][y];
      if (val === "O" || val === "#") {
        obj.push({ x, y1: y, y2: y + 0.5, val });
      } else {
        obj.push({ x, y1: y, val });
      }
    }
  }

  // DEBUG PRINTING FUNCTION
  // const print = () => {
  //   for (let x = 0; x < originalMap.length; x++) {
  //     let row = [];
  //     for (let y = 0; y < originalMap[x].length; y += 0.5) {
  //       const found = obj.findIndex(
  //         (o) => o.val !== "." && o.x === x && (o.y1 === y || o.y2 === y)
  //       );
  //       row.push(obj[found]?.val ?? ".");
  //     }
  //     console.log(row.join(""));
  //   }
  // };

  const robotIndex = obj.findIndex((o) => o.val === "@");

  for (const move of moves) {
    const robot = obj[robotIndex];

    // list of objects to check
    const currList = [{ ...robot }];

    let hitAWall = false;

    // list of objects to move
    const toShift = new Set();
    toShift.add(robotIndex);

    while (currList.length) {
      const curr = currList.shift();

      const { x: newX, y: newY } = movesMap[move](curr.x, curr.y1, true);
      const { y: newY2 } = movesMap[move](curr.x, curr.y2, true);
      const newO = { x: newX, y1: newY, y2: newY2 };

      // found a wall, nothing moves, break
      hitAWall = obj.some((o) => o.val === "#" && areObjectsColliding(o, newO));
      if (hitAWall) break;

      // find colliding boxes, add it to the list of things to shift once we get a free space
      const boxIndexes = obj.reduce((acc, o, i) => {
        if (o.val === "O" && areObjectsColliding(o, newO)) acc.push(i);
        return acc;
      }, []);
      for (const boxIndex of boxIndexes) {
        const box = obj[boxIndex];
        if (box) {
          toShift.add(boxIndex);
          if (box.x === curr.x && box.y1 === curr.y1) continue;
          if (!currList.find((c) => c.x === box.x && c.y1 === box.y1)) {
            currList.push(box);
          }
        }
      }
    }

    // if we didn't hit a wall, move all the items
    if (!hitAWall) {
      const toShiftArr = [...toShift].map((i) => obj[i]);
      for (const o of toShiftArr) {
        const { x: newX, y: newY } = movesMap[move](o.x, o.y1, true);
        o.x = newX;
        o.y1 = newY;
        if (o.y2) o.y2 = newY + 0.5;
      }
    }
  }

  return obj.reduce((gps, curr) => {
    if (curr.val === "O") gps += curr.x * 100 + curr.y1 * 2;
    return gps;
  }, 0);
};

console.log(star1() === 1415498);
console.log(star2() === 1432898);

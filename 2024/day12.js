const { getStringArrayInput, moveMap } = require("./utils");

const map = getStringArrayInput("day12").map((line) => line.split(""));

const DIV = "#";

const getNextCells = (x, y) => [
  { x: x - 1, y, dir: 0 }, // Up
  { x, y: y + 1, dir: 1 }, // Right
  { x: x + 1, y, dir: 2 }, // Down
  { x, y: y - 1, dir: 3 }, // Left
];

const getPerimiter = (area) => {
  return [...area].reduce((perimeter, cell) => {
    const [x, y] = cell.split(DIV).map(Number);
    const nextCellsWithSameValue = getNextCells(x, y).filter((nextCell) =>
      area.has(`${nextCell.x}${DIV}${nextCell.y}`)
    ).length;
    return perimeter + 4 - nextCellsWithSameValue;
  }, 0);
};

const bfs = (x, y, visited) => {
  const queue = [{ x, y }];
  const area = new Set();
  while (queue.length) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const { x: cellX, y: cellY } = queue.shift();
      visited.add(`${cellX}${DIV}${cellY}`);
      area.add(`${cellX}${DIV}${cellY}`);
      const nextCells = getNextCells(cellX, cellY).filter(
        (cell) =>
          map[cell.x]?.[cell.y] === map[x][y] &&
          !area.has(`${cell.x}${DIV}${cell.y}`) &&
          !queue.find((q) => q.x === cell.x && q.y === cell.y)
      );
      queue.push(...nextCells);
    }
  }
  return area;
};

const getOutsidePerimeter = (area) => {
  // find area on the perimiter
  return (
    [...area]
      .map((cell) => cell.split(DIV).map(Number))
      .filter(([x, y]) => {
        // if the cell has a adj cell with a different value, it means it's on the perimiter
        return (
          getNextCells(x, y).filter(
            (nextCell) => map[nextCell.x]?.[nextCell.y] !== map[x]?.[y]
          ).length > 0
        );
      })
      // find all the cells wrapping around it
      .reduce((p, [x, y]) => {
        getNextCells(x, y)
          .filter((nextCell) => map[nextCell.x]?.[nextCell.y] !== map[x]?.[y])
          .forEach((nextCell) =>
            /**
             * NOTE: the direction should be +1 clockwise
             * Example: at 0,0 we have a cell on top (direction 0)
             * we should mark it so -1,0 is on a side moving right (direction 1)
             * */
            p.add(
              `${nextCell.x}${DIV}${nextCell.y}${DIV}${(nextCell.dir + 1) % 4}`
            )
          );
        return p;
      }, new Set())
  );
};

const getSides = (perimeter) => {
  let sides = 0;
  while (perimeter.size) {
    const queue = [[...perimeter][0]];
    sides++;
    // while we have an adjecent cell on the same side, keep going
    while (queue.length) {
      const currKey = queue.shift();
      if (!currKey) continue;
      const curr = currKey.split(DIV).map(Number);
      perimeter.delete(currKey);
      // one loop for left, one loop for right
      // going +2 to use the index to change to opposite direction
      for (let i = 0; i < 4; i += 2) {
        const [x, y, dir] = curr;
        const updatedDir = (curr[2] + i) % 4;
        const { x: nextX, y: nextY } = moveMap[updatedDir](x, y);
        const nextKey = `${nextX}${DIV}${nextY}${DIV}${dir}`;
        if (perimeter.has(nextKey)) queue.push(nextKey);
      }
    }
  }
  return sides;
};

const star1 = () => {
  const visited = new Set();
  let price = 0;

  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
      if (visited.has(`${x}${DIV}${y}`)) continue;
      const area = bfs(x, y, visited);
      const perimeter = getPerimiter(area);
      price += area.size * perimeter;
    }
  }

  return price;
};

const star2 = () => {
  const visited = new Set();
  let price = 0;

  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
      if (visited.has(`${x}${DIV}${y}`)) continue;
      const area = bfs(x, y, visited);
      const outsidePerimeter = getOutsidePerimeter(area);
      const sides = getSides(outsidePerimeter);
      price += area.size * sides;
    }
  }

  return price;
};

console.log(star1());
console.log(star2());

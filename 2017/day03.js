const INPUT = 277678;

const starOne = () => {
  let i = 1;
  let itemsPerSide = 1;
  while (i < INPUT) {
    itemsPerSide += 2;
    i += itemsPerSide * 4 - 4;
  }

  const indexInSide = (i - INPUT) % (itemsPerSide - 1);

  const midSide = Math.floor(itemsPerSide / 2);

  return (
    midSide + Math.max(indexInSide, midSide) - Math.min(indexInSide, midSide)
  );
};

const getNeighboursSum = (grid, x, y) => {
  const tl = grid[x - 1]?.[y - 1] || 0;
  const t = grid[x - 1]?.[y] || 0;
  const tr = grid[x - 1]?.[y + 1] || 0;
  const r = grid[x]?.[y + 1] || 0;
  const br = grid[x + 1]?.[y + 1] || 0;
  const b = grid[x + 1]?.[y] || 0;
  const bl = grid[x + 1]?.[y - 1] || 0;
  const l = grid[x]?.[y - 1] || 0;

  return tl + t + tr + r + br + b + bl + l;
};

const starTwo = () => {
  let i = 1;
  let itemsPerSide = 1;
  while (i < INPUT) {
    itemsPerSide += 2;
    i += itemsPerSide * 4 - 4;
  }

  let grid = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  let x = 1;
  let y = 1;
  grid[x][y] = 1;

  y++;
  let dir = "up";
  itemsPerSide = 3;

  while (true) {
    const neighbours = getNeighboursSum(grid, x, y);
    if (neighbours > INPUT) return neighbours;
    grid[x][y] = neighbours;

    if (dir === "up" && x === 0) {
      dir = "left";
      y--;
    } else if (dir === "left" && y === 0) {
      dir = "down";
      x++;
    } else if (dir === "down" && x === grid.length - 1) {
      dir = "right";
      y++;
    } else if (dir === "right" && y === grid.length - 1) {
      // reached end of current spiral
      itemsPerSide += 2;
      grid = [
        new Array(itemsPerSide).fill(0),
        ...grid.map((line) => [0, ...line, 0]),
        new Array(itemsPerSide).fill(0),
      ];
      dir = "up";
      x++;
      y += 2;
    } else {
      if (dir === "up") x--;
      else if (dir === "left") y--;
      else if (dir === "down") x++;
      else y++;
    }
  }
};

console.log(starOne());
console.log(starTwo());

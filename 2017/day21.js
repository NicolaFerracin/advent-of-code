const { getStringArrayInput, getRawInput } = require("./utils");

const startingGrid = [
  [".", "#", "."],
  [".", ".", "#"],
  ["#", "#", "#"],
];

const getPossibleMoves = () => {
  return getStringArrayInput("day21").map((line) => {
    const [input, output] = line.split(" => ");

    const set = new Set();
    const original = input.split("/").map((_) => _.split(""));

    for (let i = 0; i < 4; i++) {
      const copy = copyGrid(original);
      const len = copy.length - 1;

      // rotate 4 times
      for (let rotations = 0; rotations <= i; rotations++) {
        const temp = copy[0][0];
        copy[0][0] = copy[0][len];
        copy[0][len] = copy[len][len];
        copy[len][len] = copy[len][0];
        copy[len][0] = temp;

        if (copy.length === 3) {
          const temp = copy[0][1];
          copy[0][1] = copy[1][len];
          copy[1][len] = copy[len][1];
          copy[len][1] = copy[1][0];
          copy[1][0] = temp;
        }
      }
      set.add(copy.map((row) => row.join("")).join("/"));

      // after rotating, flip vertically and horizontally
      set.add(
        copyGrid(copy)
          .reverse()
          .map((_) => _.join(""))
          .join("/")
      );
      set.add(copy.map((row) => row.reverse().join("")).join("/"));
    }

    return { input: set, output };
  });
};

const copyGrid = (grid) => JSON.parse(JSON.stringify(grid));
const gridToKey = (grid) => grid.map((_) => _.join("")).join("/");
const findMatch = (grids, key) => {
  for (const { input, output } of grids) {
    if (input.has(key)) {
      return output.split("/").map((row) => row.split(""));
    }
  }
};

const exec = (loops) => {
  let myGrid = copyGrid(startingGrid);

  const grids = getPossibleMoves();

  let steps = 0;
  while (steps < loops) {
    steps++;
    const cols =
      myGrid.length % 2 === 0 ? myGrid.length / 2 : myGrid.length / 3;
    const dimension = myGrid.length % 2 === 0 ? 2 : 3;
    const matches = [];
    for (let x = 0; x < myGrid.length; x += dimension) {
      for (let y = 0; y < myGrid.length; y += dimension) {
        const key = gridToKey(
          myGrid
            .slice(x, x + dimension)
            .map((row) => row.filter((_, i) => i >= y && i < y + dimension))
        );
        const match = findMatch(grids, key);
        matches.push(match);
      }
    }

    const newGrid = [];
    let x = 0;
    let y = 0;
    let row = 0;
    while (x < matches.length && y < matches[x].length) {
      if (!newGrid[row]) newGrid.push([]);
      newGrid[row].push(...matches[x][y]);
      x++;
      if (x % cols === 0) {
        row++;
        x -= cols;
        y++;
        if (y === matches[x].length) {
          y = 0;
          x += cols;
        }
      }
    }

    myGrid = newGrid;
  }

  return myGrid.reduce(
    (lights, row) =>
      (lights += row.reduce((acc, light) => (acc += light === "#" ? 1 : 0), 0)),
    0
  );
};

const starOne = () => {
  return exec(5);
};

const starTwo = () => {
  return exec(18);
};

console.log(starOne());
console.log(starTwo());

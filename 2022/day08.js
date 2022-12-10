const { getStringArrayInput } = require("./utils");

const starOne = () => {
  const trees = getStringArrayInput("day08").map((_) =>
    _.split("").map((_) => +_)
  );

  let visible = trees.length * 2 + trees[0].length * 2 - 4;

  for (let x = 1; x < trees.length - 1; x++) {
    for (let y = 1; y < trees[x].length - 1; y++) {
      const tree = trees[x][y];

      const directions = [[], [], [], []];
      for (let north = x - 1; north >= 0; north--)
        directions[0].push(trees[north][y]);

      for (let south = x + 1; south < trees.length; south++)
        directions[1].push(trees[south][y]);

      for (let west = y - 1; west >= 0; west--)
        directions[2].push(trees[x][west]);

      for (let east = y + 1; east < trees[x].length; east++)
        directions[3].push(trees[x][east]);

      if (directions.find((direction) => direction.every((t) => t < tree)))
        visible++;
    }
  }

  return visible;
};

const starTwo = () => {
  const trees = getStringArrayInput("day08").map((_) =>
    _.split("").map((_) => +_)
  );

  let bestScore = 0;
  for (let x = 1; x < trees.length - 1; x++) {
    for (let y = 1; y < trees[x].length - 1; y++) {
      let tree = trees[x][y];

      let visibleNorth = 0;
      for (let north = x - 1; north >= 0; north--) {
        visibleNorth++;
        if (trees[north][y] >= tree) break;
      }

      let visibleSouth = 0;
      for (let south = x + 1; south < trees.length; south++) {
        visibleSouth++;
        if (trees[south][y] >= tree) break;
      }

      let visibleWest = 0;
      for (let west = y - 1; west >= 0; west--) {
        visibleWest++;
        if (trees[x][west] >= tree) break;
      }

      let visibleEast = 0;
      for (let east = y + 1; east < trees[x].length; east++) {
        visibleEast++;
        if (trees[x][east] >= tree) break;
      }

      const score = visibleNorth * visibleSouth * visibleWest * visibleEast;
      bestScore = Math.max(bestScore, score);
    }
  }

  return bestScore;
};

console.log(starOne());
console.log(starTwo());

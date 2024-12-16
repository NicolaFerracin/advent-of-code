const { getStringArrayInput } = require("./utils");

const getInput = () => getStringArrayInput("day16").map((l) => l.split(""));

const movesMap = {
  0: (x, y) => [x - 1, y], //N
  1: (x, y) => [x, y + 1], // E
  2: (x, y) => [x + 1, y], // S
  3: (x, y) => [x, y - 1], // W
};

(() => {
  console.time('day16')
  const map = getInput();
  const x = map.findIndex((row) => row.includes("S"));
  const y = map[x].indexOf("S");

  let best = Infinity;
  const visitedCells = new Map();

  const queue = [[x, y, 1, 0, []]];
  const cellScoreMap = new Map();
  while (queue.length) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const [x, y, dir, score, visited] = queue.shift();
      if (map[x][y] === "E") {
        if (!visitedCells.has(score)) visitedCells.set(score, new Set());
        visitedCells.set(
          score,
          new Set([...(visitedCells.get(score) ?? new Set()), ...visited])
        );
        best = Math.min(score, best);
        continue;
      }
      if (map[x][y] === "#") continue;

      if (cellScoreMap.get(`${x}-${y}`) < score - 1000) continue;
      cellScoreMap.set(`${x}-${y}`, score);

      // straight
      queue.push([
        ...movesMap[dir](x, y),
        dir,
        score + 1,
        [...visited, `${x}-${y}`],
      ]);

      // anti clockwise
      const leftDir = dir - 1 < 0 ? 3 : dir - 1;
      queue.push([
        ...movesMap[leftDir](x, y),
        leftDir,
        score + 1001,
        [...visited, `${x}-${y}`],
      ]);

      // clockwise
      const rightDir = (dir + 1) % 4;
      queue.push([
        ...movesMap[rightDir](x, y),
        rightDir,
        score + 1001,
        [...visited, `${x}-${y}`],
      ]);
    }
    queue.sort((a, b) => a[3] - b[3]);
  }

  console.log({ star1: best, star2: visitedCells.get(best).size + 1 });
  console.timeEnd("day16");
})();

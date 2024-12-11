const { getStringArrayInput } = require("./utils");

const map = getStringArrayInput("day10").map((l) => l.split("").map(Number));

const getAdjCells = (x, y) => [
  [x - 1, y],
  [x, y + 1],
  [x + 1, y],
  [x, y - 1],
];

const trailheads = map.reduce((acc, row, x) => {
  for (let y = 0; y < row.length; y++) {
    if (row[y] === 0) acc.push([x, y]);
  }
  return acc;
}, []);

const solve = () => {
  const score = new Map();
  const rating = new Map();
  const dfs = (start, [x, y], nextLevel, path) => {
    const nextCells = getAdjCells(x, y).filter(
      (coords) => map[coords[0]]?.[coords[1]] === nextLevel
    );
    nextCells.forEach((c) => {
      if (nextLevel === 9) {
        const ratingKey = `${start[0]}-${start[1]}#${c[0]}-${c[1]}`;
        if (!rating.has(ratingKey)) rating.set(ratingKey, new Set());
        rating.get(ratingKey).add(path);

        score.get(`${start[0]}-${start[1]}`).add(`${c[0]}-${c[1]}`);
      } else dfs(start, c, nextLevel + 1, path + `#${c[0]}-${c[1]}`);
    });
  };

  trailheads.forEach((s) => {
    const key = `${s[0]}-${s[1]}`;
    score.set(key, new Set());
    dfs(s, s, 1, `${s[0]}-${s[1]}`);
  });

  return {
    score: [...score.values()].reduce((tot, s) => tot + s.size, 0),
    rating: [...rating.values()].reduce((tot, s) => tot + s.size, 0),
  };
};

const star1 = () => {
  return solve().score;
};

const star2 = () => {
  return solve().rating;
};

console.log(star1());
console.log(star2());

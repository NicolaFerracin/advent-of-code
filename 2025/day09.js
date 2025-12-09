const { readInput, print, splitInputByLine } = require("./utils");

const input = splitInputByLine(readInput("day09")).map((l) =>
  l.split(",").map(Number)
);

const getCorners = ([ax, ay], [bx, by]) => ({
  tl: Math.min(ax, bx),
  tr: Math.max(ax, bx),
  bl: Math.min(ay, by),
  br: Math.max(ay, by),
});

const getArea = (a, b) => {
  const { tl, tr, bl, br } = getCorners(a, b);
  return (tr - tl + 1) * (br - bl + 1);
};

const star1 = () => {
  let largest = 0;
  for (let x = 0; x < input.length - 1; x++) {
    for (let y = x + 1; y < input.length; y++) {
      largest = Math.max(largest, getArea(input[x], input[y]));
    }
  }

  return largest;
};

const star2 = () => {
  const redTiles = [...input];

  // join all red tiles to place the green tiles
  const greenTiles = [];
  for (let i = 0; i < redTiles.length; i++) {
    const a = redTiles[i];
    const b = redTiles[i === redTiles.length - 1 ? 0 : i + 1];
    let start = a[0] === b[0] ? Math.min(a[1], b[1]) : Math.min(a[0], b[0]);
    let end = a[0] === b[0] ? Math.max(a[1], b[1]) : Math.max(a[0], b[0]);
    for (let l = start + 1; l < end; l++) {
      if (a[0] === b[0]) greenTiles.push([a[0], l]);
      else greenTiles.push([l, a[1]]);
    }
  }

  // find those 2 points creating a rectangle without any red or green tile inside
  const allTiles = [...redTiles, ...greenTiles];
  let largest = 0;
  for (let x = 0; x < redTiles.length - 1; x++) {
    for (let y = x + 1; y < redTiles.length; y++) {
      const { tl, tr, bl, br } = getCorners(input[x], input[y]);
      let isValid = true;
      for (const [tileX, tileY] of allTiles) {
        if (tileX > tl && tileX < tr && tileY > bl && tileY < br) {
          isValid = false;
          break;
        }
      }

      if (isValid) largest = Math.max(largest, getArea(input[x], input[y]));
    }
  }

  return largest;
};

print(star1);
print(star2);

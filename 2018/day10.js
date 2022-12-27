const { getStringArrayInput } = require("./utils");

const bothStars = () => {
  const points = getStringArrayInput("day10").map((line) => {
    const [y, x, deltaY, deltaX] = line.match(/-?\d+/g).map((_) => +_);

    return { x, y, deltaX, deltaY };
  });

  for (let i = 1; i < 1000000; i++) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = 0;
    let maxY = 0;
    // apply move to points
    points.forEach((p) => {
      p.x += p.deltaX;
      p.y += p.deltaY;

      minX = Math.min(minX, p.x);
      minY = Math.min(minY, p.y);
      maxX = Math.max(maxX, p.x);
      maxY = Math.max(maxY, p.y);
    });

    // if the points are vertically within 10 cells between each other, check if a message appears
    if (maxX - minX <= 10) {
      // create grid
      const grid = [];
      for (let x = minX; x <= maxX; x++) {
        const row = [];
        for (let y = minY; y <= maxY; y++) {
          row.push(" ");
        }
        grid.push(row);
      }

      // draw points on grid
      points.forEach((p) => {
        grid[p.x - minX][p.y - minY] = "#";
      });

      grid.forEach((r) => console.log(r.join("")));
      return i;
    }
  }
};

console.log(bothStars());

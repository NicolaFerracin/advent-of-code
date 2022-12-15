const { getStringArrayInput } = require("./utils");

const getItems = () =>
  getStringArrayInput("day15").map((line) => {
    const [y1, x1, y2, x2] = line.match(/-?\d+/g);
    return {
      sensor: [+x1, +y1],
      beacon: [+x2, +y2],
    };
  });

const starOne = () => {
  const mark = (x, y, distLeft) => {
    // go up or down until we reach the LINE
    let yLeft = y - distLeft;
    let yRight = y + distLeft;
    const delta = x < LINE ? 1 : -1;
    for (let i = 0; i < distLeft; i++) {
      if (x === LINE) break;
      x += delta;
      yLeft++;
      yRight--;
    }

    // now that we sit on the line, let's mark all cells between yLeft and yRight as #
    for (let y = yLeft; y <= yRight; y++) {
      if (!cells.has(y)) cells.set(y, "#");
    }
  };

  const LINE = 2_000_000;
  const items = getItems();

  const cells = new Map();
  for (const { sensor, beacon } of items) {
    if (sensor[0] === LINE) cells.set(sensor[1], "S");
    if (beacon[0] === LINE) cells.set(beacon[1], "B");
    const manhattanDist =
      Math.abs(sensor[0] - beacon[0]) + Math.abs(sensor[1] - beacon[1]);
    mark(sensor[0], sensor[1], manhattanDist);
  }

  return [...cells.values()].reduce(
    (total, cell) => (total += cell === "#" ? 1 : 0),
    0
  );
};

const mergeIntervals = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const res = [];

  let curr = intervals[0];
  for (let i = 1; i < intervals.length; i++) {
    const interval = intervals[i];
    if (interval[0] <= curr[1] + 1) {
      curr[1] = Math.max(curr[1], interval[1]);
    } else {
      res.push(curr);
      curr = interval;
    }
  }

  res.push(curr);
  return res;
};

const starTwo = () => {
  const lines = {};
  const LIMIT = 4_000_000;

  const generateIntervals = (x, y, distLeft) => {
    // from the sensor move up and down and mark the intervals for each line, from yLeft to yRight
    // if the line is below 0 or above LIMIT we skip it
    let yLeft = y - distLeft;
    let yRight = y + distLeft;
    let xUp = x;
    let xDown = x;
    for (let i = 0; i < distLeft; i++) {
      if (xUp >= 0) {
        if (!lines[xUp]) lines[xUp] = [];
        lines[xUp].push([yLeft, yRight]);
      }
      if (xDown <= LIMIT) {
        if (!lines[xDown]) lines[xDown] = [];
        lines[xDown].push([yLeft, yRight]);
      }
      xUp -= 1;
      xDown += 1;
      yLeft++;
      yRight--;
    }
  };

  const items = getItems();

  for (const { sensor, beacon } of items) {
    const manhattanDist =
      Math.abs(sensor[0] - beacon[0]) + Math.abs(sensor[1] - beacon[1]);
    generateIntervals(sensor[0], sensor[1], manhattanDist);
  }

  for (const [line, intervals] of Object.entries(lines)) {
    const mergedIntervals = mergeIntervals(intervals);
    if (mergedIntervals.length === 2) {
      return (mergedIntervals[0][1] + 1) * LIMIT + +line;
    }
  }
};

console.log(starOne());
console.log(starTwo());

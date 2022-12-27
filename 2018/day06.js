const { getStringArrayInput } = require("./utils");

const starOne = () => {
  const points = getStringArrayInput("day06").map((line) => {
    const [y, x] = line.split(",");
    return { x: +x, y: +y };
  });

  const areas = points
    .map((target) => {
      const seen = new Set();
      const queue = [target];

      while (queue.length) {
        let len = queue.length;
        // if the area goes above a certain threshold we can assume it's infinite and we skip it
        if (seen.size > 10_000) return Infinity;
        while (len > 0) {
          len--;

          const point = queue.shift();

          // skip already visited points
          if (seen.has(`${point.x}#${point.y}`)) continue;

          // if the given point is closer to some other than the target, return size of seen
          const manhattanDistFromTarget =
            Math.abs(point.x - target.x) + Math.abs(point.y - target.y);
          let closestOtherPoint = Infinity;
          for (const otherPoint of points) {
            if (otherPoint.x === target.x && otherPoint.y === target.y)
              continue;
            const manhattanDistFromPoint =
              Math.abs(point.x - otherPoint.x) +
              Math.abs(point.y - otherPoint.y);
            closestOtherPoint = Math.min(
              closestOtherPoint,
              manhattanDistFromPoint
            );
          }
          if (closestOtherPoint <= manhattanDistFromTarget) continue;

          seen.add(`${point.x}#${point.y}`);

          // move in all 4 directions
          queue.push({ x: point.x - 1, y: point.y });
          queue.push({ x: point.x + 1, y: point.y });
          queue.push({ x: point.x, y: point.y - 1 });
          queue.push({ x: point.x, y: point.y + 1 });
        }
      }

      return seen.size;
    })
    .filter((area) => area < Infinity)
    .sort((a, b) => a - b);

  return areas.pop();
};

const starTwo = () => {
  const points = getStringArrayInput("day06").map((line) => {
    const [y, x] = line.split(",");
    return { x: +x, y: +y };
  });

  const MAX = 10_000;

  const areas = points
    .map((start) => {
      const seen = new Set();
      const queue = [start];

      while (queue.length) {
        let len = queue.length;
        while (len > 0) {
          len--;

          const point = queue.shift();

          // skip already visited points
          if (seen.has(`${point.x}#${point.y}`)) continue;

          // if the given point further away than the max from any other point, we stop
          let totalDistances = 0;
          for (const otherPoint of points) {
            const manhattanDistFromPoint =
              Math.abs(point.x - otherPoint.x) +
              Math.abs(point.y - otherPoint.y);
            totalDistances += manhattanDistFromPoint;
          }
          if (totalDistances >= MAX) continue;

          seen.add(`${point.x}#${point.y}`);

          // move in all 4 directions
          queue.push({ x: point.x - 1, y: point.y });
          queue.push({ x: point.x + 1, y: point.y });
          queue.push({ x: point.x, y: point.y - 1 });
          queue.push({ x: point.x, y: point.y + 1 });
        }
      }

      return seen.size;
    })
    .sort((a, b) => a - b);

  return areas.pop();
};

console.log(starOne());
console.log(starTwo());

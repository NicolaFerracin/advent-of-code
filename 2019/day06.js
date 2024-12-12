const { getStringArrayInput } = require("./utils");

const input = getStringArrayInput("day06").map((l) => l.split(")"));

const star1 = () => {
  let orbits = 0;
  for (const obj of input) {
    const queue = [obj];
    while (queue.length) {
      const curr = queue.shift();
      orbits++;
      queue.push(...input.filter((el) => el[0] === curr[1]));
    }
  }
  return orbits;
};

const star2 = () => {
  const start = input.filter((el) => el[1] === "YOU");
  const end = input.filter((el) => el[1] === "SAN");
  const jumps = [0, 0];
  const queues = [start, end];
  const visited = [new Map(), new Map()];
  while (true) {
    for (let path = 0; path < 2; path++) {
      jumps[path]++;
      const len = queues[path].length;
      for (let i = 0; i < len; i++) {
        const curr = queues[path].shift();
        const key = `${curr[0]}-${curr[1]}`;

        const otherPath = (path + 1) % 2;
        if (visited[otherPath].has(key))
          return jumps[path] + visited[otherPath].get(key) - 4;

        visited[path].set(key, jumps[path]);

        queues[path].push(
          ...input.filter(
            (el) => el[1] === curr[0] && !visited[path].has(`${el[0]}-${el[1]}`)
          )
        );
      }
    }
  }
};

console.log(star1());
console.log(star2());

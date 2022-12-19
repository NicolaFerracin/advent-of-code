const { getStringArrayInput } = require("./utils");
require("lodash.combinations");
const _ = require("lodash");

const calculateShortestPaths = (allValves, validValves) => {
  const paths = {};
  // for each valid valve and AA included...
  for (const valve of ["AA", ...validValves]) {
    if (!paths[valve]) paths[valve] = {};
    // find shortest path to other validValves
    for (const otherValve of validValves) {
      if (!paths[otherValve]) paths[otherValve] = {};
      // skip if same valve
      if (otherValve === valve) continue;
      // skip if we already know the shortest path
      if (paths[valve][otherValve]) continue;

      // find shortest path
      const queueLeft = [valve];
      let steps = 0;
      while (!paths[valve][otherValve]) {
        let len = queueLeft.length;
        while (len > 0) {
          len--;
          const currValve = queueLeft.shift();
          if (currValve === otherValve) {
            paths[valve][otherValve] = steps;
            paths[otherValve][valve] = steps;
            break;
          }

          const { nextValves } = allValves[currValve];
          for (const nextValve of nextValves) {
            if (!queueLeft.includes(nextValve)) queueLeft.push(nextValve);
          }
        }
        steps++;
      }
    }
  }

  return paths;
};
const exec = (players, totalTime) => {
  const { allValves, validValves } = getStringArrayInput("day16").reduce(
    ({ allValves, validValves }, line) => {
      const [valve, flow, ...nextValves] = line.match(/([A-Z]{2}|\d+)/g);
      allValves[valve] = { flow: +flow, nextValves };
      if (+flow > 0) validValves.push(valve);
      return { allValves, validValves };
    },
    { allValves: {}, validValves: [] }
  );

  const paths = calculateShortestPaths(allValves, validValves);

  // here we assume that both us and the elephant will open the same amount of valves, half each
  const half = Math.floor(validValves.length / players);
  const combs = [];
  const left = _.combinations(validValves, half);
  const right = left.map((l) => validValves.filter((v) => !l.includes(v)));
  for (let x = 0; x < left.length; x++) combs.push([left[x], right[x]]);

  let max = 0;
  for (let i = 0; i < combs.length; i++) {
    const [maxLeft, maxRight] = combs[i].map((available) => {
      const queue = [
        {
          valve: "AA",
          time: totalTime,
          score: 0,
          visited: [],
        },
      ];
      let maxScore = 0;
      while (queue.length) {
        let len = queue.length;
        while (len > 0) {
          len--;
          const { valve, time, score, visited } = queue.shift();
          const options = available.filter((v) => !visited.includes(v));
          if (options.length === 0) {
            maxScore = Math.max(maxScore, score);
            continue;
          }
          for (const option of options) {
            const optionTime = time - paths[valve][option] - 1;
            if (optionTime <= 0) {
              maxScore = Math.max(maxScore, score);
              continue;
            }
            queue.push({
              valve: option,
              time: optionTime,
              score: score + allValves[option].flow * optionTime,
              visited: [...visited, option],
            });
          }
        }
      }
      return maxScore;
    });
    max = Math.max(max, maxLeft + maxRight);
  }

  return max;
};

const starOne = () => {
  return exec(1, 30);
};

const starTwo = () => {
  return exec(2, 26);
};

console.log(starOne());
console.log(starTwo());

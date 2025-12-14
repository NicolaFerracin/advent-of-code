const { readInput, print, splitInputByLine } = require("./utils");

const input = splitInputByLine(readInput("day11")).map((l) =>
  l.match(/(\w+)/g)
);

// let paths = 0;
// const dfs = (curr, target, seen, hasMetDac, hasMetFft) => {
//   if (curr === target) {
//     console.log("path", paths, hasMetDac && hasMetFft);
//     if (hasMetDac && hasMetFft) paths++;
//     return;
//   }
//   seen.add(curr);
//   const [, ...next] = input.find((l) => l[0] === curr);
//   for (const n of next) {
//     if (!seen.has(n)) {
//       // if (!seen.has(n) && n !== "out") {
//       dfs(
//         n,
//         target,
//         new Set([...seen]),
//         hasMetDac || curr === "dac",
//         hasMetFft || curr === "fft"
//       );
//     }
//   }
// };

const dfs1 = (curr, seen, paths) => {
  if (curr === "out") return paths + 1;
  seen.add(curr);
  return input
    .find((l) => l[0] === curr)
    .reduce(
      (sum, n) => sum + (seen.has(n) ? 0 : dfs1(n, new Set([...seen]), paths)),
      0
    );
};

const star1 = () => dfs1("you", new Set(), 0);

const star2 = () => {
  // return dfs("svr", new Set(), 0, false, false);
  // return dfs("svr", new Set(), 0, false, false);
  paths = 0;
  // dfs("svr", "out", new Set(), false, false);
  // return paths;
  const stack = input.find((l) => l[0] === "srv");
  let paths = 0;
  const map = new Map();
  while (stack.length) {
    let len = stack.length;
    while (len > 0) {
      len--;
      const curr = stack.shift();
      if (curr === "out") {
        paths++;
        continue;
      }
      const next = input.find((l) => l[0] === curr);
      
    }
  }
};

print(star1);
// print(star2);

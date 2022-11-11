const md5 = require("md5");

const getPaths = (pass) => {
  const paths = [];
  const dfs = (x, y, pass, steps) => {
    if (x < 0 || y < 0) return;
    if (x > 3 || y > 3) return;
    if (x === 3 && y === 3) {
      paths.push({ steps, path: pass });
      return;
    }

    const [up, down, left, right] = md5(pass).substring(0, 4);

    if (!/[a0-9]/g.test(up)) dfs(x - 1, y, pass + "U", steps + 1);
    if (!/[a0-9]/g.test(down)) dfs(x + 1, y, pass + "D", steps + 1);
    if (!/[a0-9]/g.test(left)) dfs(x, y - 1, pass + "L", steps + 1);
    if (!/[a0-9]/g.test(right)) dfs(x, y + 1, pass + "R", steps + 1);
  };

  dfs(0, 0, pass, 0);

  return paths;
};

const starOne = () => {
  const PASS = "rrrbmfta";

  return getPaths(PASS)
    .sort((a, b) => a.steps - b.steps)
    .shift()
    .path.replace(PASS, "");
};

const starTwo = () => {
  const PASS = "rrrbmfta";

  return getPaths(PASS)
    .sort((a, b) => a.steps - b.steps)
    .pop()
    .path.replace(PASS, "").length;
};

console.log(starOne());
console.log(starTwo());

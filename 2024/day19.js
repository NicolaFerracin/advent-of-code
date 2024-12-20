const { getRawInput } = require("./utils");

const getInput = () => {
  const [towels, designs] = getRawInput("day19").split("\n\n");

  return {
    towels: towels.split(", "),
    designs: designs.split("\n"),
  };
};

const solve = () => {
  const { towels, designs } = getInput();

  const dfs = (curr, target, seen) => {
    if (curr === target) return 1;
    if (seen.has(curr)) return seen.get(curr);
    const count = towels
      .filter((t) => target.startsWith(curr + t))
      .reduce((sum, t) => sum + dfs(curr + t, target, seen), 0);
    seen.set(curr, count);
    return count;
  };

  let star1 = 0;
  const star2 = designs.reduce((tot, d) => {
    const count = dfs("", d, new Map());
    const isDesignValid = count !== 0;
    star1 += isDesignValid ? 1 : 0;
    return tot + count;
  }, 0);

  return { star1, star2 };
};

console.log(solve());

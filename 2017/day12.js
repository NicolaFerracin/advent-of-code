const { getStringArrayInput } = require("./utils");

const starOne = () => {
  const nodes = getStringArrayInput("day12").reduce((acc, line) => {
    const [a, ...b] = line.match(/\d+/g);

    acc.set(a, b);
    return acc;
  }, new Map());

  const dfs = (id) => {
    if (seen.has(id)) return;
    seen.add(id);

    const children = nodes.get(id);
    for (const child of children) dfs(child);
  };
  const seen = new Set();
  dfs("0");

  return seen.size;
};

const starTwo = () => {
  const nodes = getStringArrayInput("day12").reduce((acc, line) => {
    const [a, ...b] = line.match(/\d+/g);

    acc.set(a, b);
    return acc;
  }, new Map());

  let groups = 0;
  while (nodes.size > 0) {
    groups++;

    const dfs = (id) => {
      if (seen.has(id)) return;
      seen.add(id);

      const children = nodes.get(id);
      for (const child of children) dfs(child, seen);
      nodes.delete(id);
    };

    const seen = new Set();
    dfs([...nodes.keys()][0]);
  }

  return groups;
};

console.log(starOne());
console.log(starTwo());

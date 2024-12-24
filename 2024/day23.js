const { getStringArrayInput } = require("./utils");

const parseInput = () => {
  const pairs = getStringArrayInput("day23").map((x) => x.split("-"));

  const mapping = {};
  const triplets = new Set();
  for (const [a, b] of pairs) {
    mapping[a] ||= [];
    mapping[b] ||= [];

    // if a and b both map to something else, they become a triplet
    if (
      mapping[a]
        .filter((c) => mapping[b].includes(c))
        .forEach((c) => triplets.add([a, b, c].sort()))
    );

    mapping[a].push(b);
    mapping[b].push(a);
  }

  return { triplets, mapping };
};

const star1 = () => {
  const { triplets } = parseInput();

  return [...triplets].filter((triplet) =>
    triplet.some((computer) => computer[0] === "t")
  ).length;
};

const star2 = () => {
  const { mapping } = parseInput();

  let bestCount = 0;
  let best = [];
  const seen = new Set();
  const dfs = (lan, potential) => {
    if (lan.length > bestCount) {
      bestCount = lan.length;
      best = lan;
    }
    seen.add(lan.sort().join(""));
    if (potential.length === 0) return lan;

    potential
      // each new addition has to be connected to the computers currently in the lan
      .filter((p) => lan.every((c) => mapping[c].includes(p)))
      // each new lan should not have been visited already
      .filter((p) => !seen.has([...lan, p].sort().join("")))
      // add each valid computer to the lan, one by one, and dfs your way to the next
      .map((p) =>
        dfs(
          [...lan, p],
          potential.filter((s) => s !== p)
        )
      );
  };

  const computers = Object.keys(mapping);
  for (const computer of computers) {
    // dfs your way to find the most computers connected to this one, that are also inter-connected
    dfs([computer], mapping[computer]);
  }

  return best.sort().join(",");
};

console.log(star1());
console.log(star2());

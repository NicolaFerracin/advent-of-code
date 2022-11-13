const { getStringArrayInput } = require("./utils");

const getNodes = () => {
  const [, , ...df] = getStringArrayInput("day22");

  return df.map((line) => {
    const [name, size, used, avail, usePc] = line
      .replace(/\s+|T/g, " ") // all sizes are in the same unit => strip it
      .replace(/\s+/g, " ")
      .split(" ");
    const [, x, y] = name.split("-");
    return {
      x: Number(x.substring(1)),
      y: Number(y.substring(1)),
      size: Number(size),
      used: Number(used),
      avail: Number(avail),
      usePc,
    };
  });
};

const starOne = () => {
  const nodes = getNodes();
  let viablePairs = 0;
  for (let x = 0; x < nodes.length; x++) {
    for (let y = 0; y < nodes.length; y++) {
      if (x === y) continue;

      const a = nodes[x];
      const b = nodes[y];

      // Node A is not empty (its Used is not zero).
      // The data on node A (its Used) would fit on node B (its Avail).
      if (a.used > 0 && a.used <= b.avail) viablePairs++;
    }
  }
  return viablePairs;
};

const starTwo = () => {
  const nodes = getNodes();
  let h = 0;
  let w = 0;
  for (const node of nodes) {
    h = Math.max(node.x, h);
    w = Math.max(node.y, w);
    if (node.used === 0) zero = node;
  }

  return (
    zero.x + // bring empty to top row
    (w - zero.y) + // bring empty to last column
    (w - 2) * 5 + // bring target next to origin. One move takes one step (bring empty into position and move target to empty)
    1 // final move
  );
};

console.log(starOne());
console.log(starTwo());

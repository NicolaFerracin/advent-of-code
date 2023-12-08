const { getStringArrayInput, lcm } = require("./utils");

class Node {
  constructor(val, left, right) {
    this.val = val;
    this.L = left;
    this.R = right;
  }
}

const input = getStringArrayInput("day08");
const dirs = input[0].split("");
const nodes = input.slice(2).reduce((acc, line) => {
  const [val, left, right] = [...line.matchAll(/\w+/g)].map((x) => x[0]);
  const node = new Node(val, left, right);
  acc[val] = node;
  return acc;
}, {});

const solvePath = (startNode, isLastNode) => {
  let currNode = startNode;
  let dir = 0;
  let steps = 0;
  while (!isLastNode(currNode)) {
    currNode = nodes[currNode][dirs[dir]];
    dir = (dir + 1) % dirs.length;
    steps++;
  }
  return steps;
};

const starOne = () => {
  return solvePath("AAA", (node) => node === "ZZZ");
};

const starTwo = () => {
  const startNodes = Object.keys(nodes).filter((nodeName) =>
    nodeName.endsWith("A")
  );
  const cycles = startNodes.reduce((acc, node) => {
    acc.push(solvePath(node, (node) => node.endsWith("Z")));
    return acc;
  }, []);

  return lcm(cycles);
};

console.log(starOne());
console.log(starTwo());

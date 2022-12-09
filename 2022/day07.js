const { getStringArrayInput } = require("./utils");

class Node {
  constructor(name, size, prev) {
    this.name = name;
    this.size = size;
    this.children = [];
    this.prev = prev;
  }
}

const createTree = () => {
  const input = getStringArrayInput("day07");

  const home = new Node("home", 0, null);

  let curr = home;

  for (const line of input) {
    if (line.startsWith("$")) {
      if (line.includes("cd ..")) {
        curr = curr.prev;
      } else if (line.includes("cd /")) {
        curr = home;
      } else if (line.includes("cd ")) {
        const target = line.split(" ").pop();
        const newDir = new Node(target, 0, curr);
        curr.children.push(newDir);
        curr = newDir;
      }
    } else {
      // result of LS
      if (!line.startsWith("dir")) {
        const [size] = line.split(" ");
        curr.size += +size;
      }
    }
  }

  // sum all sizes up
  const dfsSum = (node) => {
    if (!node.children.length) return node.size;

    for (const child of node.children) node.size += dfsSum(child);

    return node.size;
  };
  dfsSum(home);

  return home;
};

const starOne = () => {
  const home = createTree();

  // find all directories with at most 100_000 in size
  const res = [];
  const dfsFind = (node) => {
    if (node.size <= 100_000) res.push(node);

    if (!node.children.length) return;

    for (const child of node.children) dfsFind(child);
  };
  dfsFind(home);

  return res.reduce((sum, dir) => (sum += dir.size), 0);
};

const starTwo = () => {
  const home = createTree();

  const TOTAL_SIZE = 70000000;
  const TARGET = 30000000;
  const used = home.size;
  const unused = TOTAL_SIZE - used;
  const needed = TARGET - unused;

  let smallest = Infinity;
  const dfsFind = (node) => {
    if (node.size > needed) smallest = Math.min(smallest, node.size);

    if (!node.children.length) return;

    for (const child of node.children) dfsFind(child);
  };
  dfsFind(home);

  return smallest;
};

console.log(starOne());
console.log(starTwo());

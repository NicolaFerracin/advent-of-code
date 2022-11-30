const { getStringArrayInput } = require("./utils");

class Node {
  constructor(name, weight) {
    this.name = name;
    this.weight = weight;
    this.children = [];
  }
}

const getNodesMap = () => {
  const nodes = getStringArrayInput("day07").map((line) => {
    const [name, weight, ...children] = line.match(/(\w+)/g);
    return { name, weight: +weight, children };
  });

  const nodesMap = new Map();
  while (nodes.length) {
    const { name, weight, children } = nodes.shift();
    // this node has all the children already defined, let's add it to our map
    if (!children.find((child) => !nodesMap.has(child))) {
      const node = new Node(name, weight);
      for (const child of children) {
        node.children.push(nodesMap.get(child));
      }
      nodesMap.set(name, node);
    } else {
      nodes.push({ name, weight, children });
    }
  }

  return nodesMap;
};

const starOne = () => {
  return [...getNodesMap().keys()].pop();
};

const starTwo = () => {
  const map = getNodesMap();
  const root = [...map.keys()].pop();

  let found = false;
  const dfs = (name) => {
    const node = map.get(name);
    if (!node.children.length) return node.weight;

    const weights = node.children.map((child) => dfs(child.name));
    const weightsSet = new Set(weights);
    // if the tower was balanced, all weights would be equal, making the set a one-item set
    if (weightsSet.size > 1) {
      // find outlier
      for (let i = 0; i < weights.length; i++) {
        const prev = i === 0 ? weights.length - 1 : i - 1;
        const next = i === weights.length - 1 ? 0 : i + 1;
        if (weights[i] !== weights[prev] && weights[i] !== weights[next]) {
          const wrongChild = node.children[i];
          if (!found)
            console.log(wrongChild.weight + weights[prev] - weights[i]);
          found = true;
        }
      }
    }

    return node.weight + weights.reduce((acc, val) => (acc += val), 0);
  };

  dfs(root);
};

console.log(starOne());
console.log(starTwo());

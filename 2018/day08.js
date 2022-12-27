const { getRawInput } = require("./utils");

class Node {
  constructor(childrenCount, metadataCount) {
    this.childrenCount = childrenCount;
    this.metadataCount = metadataCount;
    this.metadata = [];
    this.children = [];
    this.val = 0;
  }
}

const createTree = () => {
  const file = getRawInput("day08")
    .split(" ")
    .map((_) => +_);

  const tree = [];
  const createNode = () => {
    const node = new Node(file.shift(), file.shift());

    while (node.childrenCount > node.children.length) {
      node.children.push(createNode());
    }
    while (node.metadataCount > node.metadata.length) {
      node.metadata.push(file.shift());
    }

    if (node.children.length === 0) {
      node.val += node.metadata.reduce((total, curr) => (total += curr), 0);
    } else {
      for (const childI of node.metadata) {
        if (node.children[childI - 1]) {
          node.val += node.children[childI - 1].val;
        }
      }
    }

    tree.push(node);

    return node;
  };

  createNode();

  return tree;
};

const starOne = () => {
  return createTree().reduce(
    (total, node) =>
      (total += node.metadata.reduce(
        (currMetadata, meta) => (currMetadata += meta),
        0
      )),
    0
  );
};

const starTwo = () => {
  return createTree().pop().val;
};

console.log(starOne());
console.log(starTwo());

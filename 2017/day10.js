const { getRawInput } = require("./utils");

const knotList = (list, lens, offset, index) => {
  for (const len of lens) {
    const sublist = [];
    for (let i = 0; i < len; i++) sublist.push(list[(index + i) % list.length]);
    sublist.reverse();
    for (let i = 0; i < len; i++) list[(index + i) % list.length] = sublist[i];
    index = (index + len + offset) % list.length;
    offset++;
  }
  return { list, offset, index };
};

const knotHash = (word) => {
  const lens = word.split("").map((char) => char.charCodeAt(0));
  lens.push(17, 31, 73, 47, 23);

  const size = 256;
  let list = [];
  for (let i = 0; i < size; i++) list.push(i);

  let offset = 0;
  let index = 0;
  let rounds = 64;
  while (rounds > 0) {
    const {
      offset: newOffset,
      index: newIndex,
      list: newList,
    } = knotList(list, lens, offset, index);
    offset = newOffset;
    index = newIndex;
    list = newList;
    rounds--;
  }

  const denseHash = [];
  let curr = list.shift();
  while (list.length) {
    curr ^= list.shift();
    if (list.length % 16 === 0) {
      denseHash.push(curr);
      curr = list.shift();
    }
  }

  const hexHash = denseHash
    .map((ascii) => `0${ascii.toString(16)}`.substr(-2))
    .join("");

  return hexHash;
};

const starOne = () => {
  const lens = getRawInput("day10")
    .split(",")
    .map((x) => +x);

  const size = 256;
  const list = [];
  for (let i = 0; i < size; i++) list.push(i);

  let offset = 0;
  let index = 0;
  const { list: knottedList } = knotList(list, lens, offset, index);

  return knottedList[0] * knottedList[1];
};

const starTwo = () => {
  return knotHash(getRawInput("day10"));
};

if (require.main === module) {
  console.log(starOne());
  console.log(starTwo());
}

exports.knotHash = knotHash;

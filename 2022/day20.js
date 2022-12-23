const { getStringArrayInput } = require("./utils");

const getNewPos = (pos, delta, len) => {
  let newPos = (pos + delta) % (len - 1);

  if (newPos < 0) newPos += len - 1;

  return newPos;
};

const exec = (list, mixingRounds) => {
  for (let round = 0; round < mixingRounds; round++) {
    for (let i = 0; i < list.length; i++) {
      const item = list.find((item) => item.originalPos === i % list.length);
      const oldPos = item.pos;
      const newPos = getNewPos(item.pos, item.val, list.length);

      // move all items between the old and the new position
      for (
        let j = Math.min(oldPos, newPos);
        j <= Math.max(oldPos, newPos);
        j++
      ) {
        list[j].pos = getNewPos(
          list[j].pos,
          newPos > oldPos ? -1 : 1,
          list.length + 1
        );
      }

      // finally move the item to its rightful place
      list[oldPos].pos = newPos;
      // sort by the new order so that we can access the items in the for loops
      list.sort((a, b) => a.pos - b.pos);
    }
  }

  const sortedValues = list.sort((a, b) => a.pos - b.pos).map(({ val }) => val);
  const indexOfZero = sortedValues.indexOf(0);
  return [1000, 2000, 3000].reduce((total, i) => {
    return (total += sortedValues[(indexOfZero + i) % sortedValues.length]);
  }, 0);
};

const starOne = () => {
  const list = getStringArrayInput("day20").map((val, index) => ({
    pos: index,
    originalPos: index,
    val: +val,
  }));

  return exec(list, 1);
};

const starTwo = () => {
  const DECRYPTION_KEY = 811589153;
  const list = getStringArrayInput("day20").map((val, index) => ({
    pos: index,
    originalPos: index,
    val: +val * DECRYPTION_KEY,
  }));

  return exec(list, 10);
};

console.log(starOne());
console.log(starTwo());

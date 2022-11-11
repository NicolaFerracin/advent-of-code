const { getRawInput } = require("./utils");

class Elf {
  constructor(id, presents) {
    this.id = id;
    this.presents = presents;
    this.next = null;
    this.prev = null;
  }
}

const starOne = () => {
  const elvesCount = 3014387;
  let currElf = null;
  let firstElf = null;
  for (let i = 0; i < elvesCount; i++) {
    const newElf = new Elf(i, 1);
    if (currElf) currElf.next = newElf;
    else firstElf = newElf;
    currElf = newElf;
  }
  currElf.next = firstElf;

  currElf = firstElf;
  while (currElf.next.id !== currElf.id) {
    currElf.presents += currElf.next.presents;
    currElf.next = currElf.next.next;
    currElf = currElf.next;
  }

  return currElf.id + 1;
};

const starTwo = () => {
  let elvesCount = 3014387;
  let currElf = null;
  let firstElf = null;
  for (let i = 0; i < elvesCount; i++) {
    const newElf = new Elf(i, 1);
    if (currElf) {
      currElf.next = newElf;
      newElf.prev = currElf;
    } else firstElf = newElf;
    currElf = newElf;
  }
  currElf.next = firstElf;
  firstElf.prev = currElf;

  currElf = firstElf;

  const opposite = Math.floor(elvesCount / 2) % elvesCount;
  let giver = currElf;
  for (let i = 0; i < opposite; i++) {
    giver = giver.next;
  }

  i = 0;
  while (currElf.next.id !== currElf.id || currElf.prev.id !== currElf.id) {
    const taker = currElf;
    taker.presents += giver.presents;

    // link prev to next of giver - effectively removing giver from the circle
    giver.prev.next = giver.next;
    giver.next.prev = giver.prev;
    currElf = currElf.next;

    i++;
    elvesCount--;
    // move to next giver
    giver = giver.next;
    // every other, move one more
    if (i % 2 === 1) giver = giver.next;
  }

  return currElf.id + 1;
};

console.log(starOne());
console.log(starTwo());

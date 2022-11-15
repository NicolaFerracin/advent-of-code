const input = 34000000;

const starOne = () => {
  let presents = [];
  for (let elf = 1; elf < input / 10; elf++) {
    for (let i = elf; i < input / 10; i += elf) {
      presents[i] = presents[i] ? presents[i] + elf * 10 : 10;
    }
  }
  return presents.findIndex((house) => house >= input);
};

const starTwo = () => {
  let presents = [];
  for (let elf = 1; elf < input / 10; elf++) {
    let visits = 0;
    for (let i = elf; i < input / 10; i += elf) {
      if (visits > 50) break;
      visits++;
      presents[i] = presents[i] ? presents[i] + elf * 11 : 11;
    }
  }
  return presents.findIndex((house) => house >= input);
};

console.log(starOne());
console.log(starTwo());

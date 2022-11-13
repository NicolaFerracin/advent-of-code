const findNumber = () => {
  // the assembly takes the register A, adds 2532 and then:
  // - outputs 1 or 0 based on if the number is odd or even
  // - divides the number by 2 and repeats
  // - resets the number to its initial value when reaching 0
  // =======
  // given the above we need to find a number that when added to 2532
  // switches from even to odd every time we divide it in half

  let i = 0;
  while (true) {
    let number = i + 2532;
    let prev = number % 2;
    while (number !== 0) {
      number = Math.floor(number / 2);

      if (number % 2 === prev) break;
      if (number === 0) return i;

      prev = number % 2;
    }
    i += 2;
  }
};

const starOne = () => {
  return findNumber();
};

console.log(starOne());

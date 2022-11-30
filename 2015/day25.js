const starOne = () => {
  const px = 2978 - 1; // 0-based
  const py = 3083 - 1; // 0-based

  let lastRow = 1;
  let x = 1;
  let y = 0;
  let prev = 20151125;

  while (true) {
    const value = (prev * 252533) % 33554393;

    if (x === px && y === py) return value;

    prev = value;
    x--;
    y++;
    if (x < 0) {
      lastRow++;
      x = lastRow;
      y = 0;
    }
  }
};

console.log(starOne());

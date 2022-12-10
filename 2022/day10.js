const { getStringArrayInput } = require("./utils");

const starOne = () => {
  let regX = 1;
  let cycles = 0;
  let sum = 0;

  const updateSum = () => {
    if (cycles === 20 || (cycles - 20) % 40 === 0) sum += cycles * regX;
  };

  getStringArrayInput("day10")
    .map((line) => {
      const [op, amount] = line.split(" ");

      return { op, amount: +amount || 0 };
    })
    .forEach(({ op, amount }) => {
      for (let i = 0; i < (op === "addx" ? 2 : 1); i++) {
        cycles++;
        updateSum();
      }

      regX += amount;
    });

  return sum;
};

const starTwo = () => {
  const CRT = [];
  for (let x = 0; x < 6; x++) {
    const row = [];
    for (let y = 0; y < 40; y++) {
      row.push(" ");
    }
    CRT.push(row);
  }

  const setPixel = () => {
    const x = Math.floor(cycles / 40);
    const y = cycles % 40;
    if (y >= regX - 1 && y <= regX + 1) CRT[x][y] = "#";
  };

  let regX = 1;
  let cycles = 0;
  getStringArrayInput("day10")
    .map((line) => {
      const [op, amount] = line.split(" ");

      return { op, amount: +amount || 0 };
    })
    .forEach(({ op, amount }) => {
      for (let i = 0; i < (op === "addx" ? 2 : 1); i++) {
        setPixel();
        cycles++;
      }

      regX += amount;
    });

  CRT.forEach((x) => console.log(x.join("")));
};

console.log(starOne());
console.log(starTwo());

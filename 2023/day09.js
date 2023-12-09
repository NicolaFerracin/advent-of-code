const { getStringArrayInput } = require("./utils");

const input = getStringArrayInput("day09").map((x) => x.split(" ").map(Number));

const allStars = () => {
  let totRight = 0;
  let totLeft = 0;

  for (const line of input) {
    let prev = [[...line]];
    while (true) {
      const lastLine = prev[prev.length - 1];
      const diff = lastLine.reduce((acc, _, i) => {
        if (i < lastLine.length - 1) acc.push(lastLine[i + 1] - lastLine[i]);
        return acc;
      }, []);
      const setDiff = new Set(diff);
      if (setDiff.size === 1 && setDiff.has(0)) {
        let newValRight = 0;
        let newValLeft = 0;
        while (prev.length > 0) {
          const prevLine = prev.pop();
          newValRight += prevLine.pop();
          newValLeft = prevLine.shift() - newValLeft;
        }
        totRight += newValRight;
        totLeft += newValLeft;
        break;
      }
      prev.push(diff);
    }
  }

  return { starOne: totRight, starTwo: totLeft };
};

console.log(allStars());

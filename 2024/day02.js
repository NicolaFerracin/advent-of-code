const { getStringArrayInput } = require("./utils");

const isSafe = (report) => {
  const isIncreasing = report[0] < report[report.length - 1];
  for (let i = 1; i < report.length; i++) {
    const a = report[i - 1];
    const b = report[i];
    if (isIncreasing && b <= a) return false;
    if (!isIncreasing && a <= b) return false;
    const diff = Math.abs(a - b);
    if (diff < 1 || diff > 3) return false;
  }

  return true;
};

const star1 = () => {
  return getStringArrayInput("day02").reduce((acc, line) => {
    const report = line.split(" ").map(Number);
    return acc + (isSafe(report) ? 1 : 0);
  }, 0);
};

const star2 = () => {
  return getStringArrayInput("day02").reduce((acc, line) => {
    const report = line.split(" ").map(Number);
    if (isSafe(report)) return acc + 1;

    for (let i = 0; i < report.length; i++) {
      const reportMinusOne = [...report.slice(0, i), ...report.slice(i + 1)];
      if (isSafe(reportMinusOne)) return acc + 1;
    }
    return acc;
  }, 0);
};

console.log(star1());
console.log(star2());

const { readInput, splitInputByLine, print, reverseStr } = require("./utils");

const rawInput = splitInputByLine(readInput("day06"));
const input = rawInput.map((line) =>
  line
    .trim()
    .split(/\s+/g)
    .map((el) => (Number.isInteger(Number(el)) ? Number(el) : el))
);

const star1 = () => {
  let sum = 0;

  for (let problem = 0; problem < input[0].length; problem++) {
    const numbers = input.map((line) => line[problem]);
    sum += eval(numbers.join(numbers.pop()));
  }

  return sum;
};

const star2 = () => {
  const ops = rawInput.pop().trim().split(/\s+/g);

  const spaces = rawInput.map((l) =>
    [...l.matchAll(/\s/g)].map((match) => match.index)
  );
  const matchingSpaces = [];
  for (const s of spaces[0]) {
    if (spaces.every((ss) => ss.includes(s))) matchingSpaces.push(s);
  }

  const numbers = rawInput.reduce((acc, line) => {
    const curr = [];
    let prev = 0;
    for (const s of [...matchingSpaces, line.length]) {
      curr.push(line.substring(prev, s).replaceAll(" ", "#"));
      prev = s + 1;
    }
    acc.push(curr);
    return acc;
  }, []);

  return ops.reduce((sum, op, problem) => {
    // pivot numbers from columns to row, and reverse the single numbers,
    // to simulate reading right-to-left
    const pivoted = numbers.map((num) => reverseStr(num[problem]));
    const columns = pivoted[0].length;
    const evalOperation = [];
    // parse the numbers by column, adding each digit to the evalOperation
    for (let col = 0; col < columns; col++) {
      for (let num = 0; num < pivoted.length; num++)
        evalOperation.push(pivoted[num][col].replace("#", ""));
      // add operation sign between numbers
      evalOperation.push(op);
    }
    // pop last operation sign which was added after the last number
    evalOperation.pop();

    return sum + eval(evalOperation.join(""));
  }, 0);
};

print(star1);
print(star2);

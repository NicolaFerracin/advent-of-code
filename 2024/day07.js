const { getStringArrayInput } = require("./utils");

let starFlag = "one";

const getInput = () =>
  getStringArrayInput("day07").map((equation) => {
    const [value, ...operands] = equation.match(/\d+/g).map(Number);
    return { value, operands };
  });

const isValidEquation = (target, currValue, operands) => {
  if (currValue > target) return false;
  if (currValue === target) return true;
  if (!operands || operands.length === 0) return false;

  const nextOperand = operands.shift();
  const star1Condition =
    isValidEquation(target, currValue + nextOperand, [...operands]) ||
    isValidEquation(target, currValue * nextOperand, [...operands]);
  const star2Condition =
    star1Condition ||
    isValidEquation(target, Number(`${currValue}${nextOperand}`), [
      ...operands,
    ]);

  return starFlag === "one" ? star1Condition : star2Condition;
};

const star1 = () => {
  return getInput()
    .filter(({ value, operands }) =>
      isValidEquation(value, operands.shift(), operands)
    )
    .reduce((acc, eq) => (acc += eq.value), 0);
};

const star2 = () => {
  starFlag = "two";
  return getInput()
    .filter(({ value, operands }) =>
      isValidEquation(value, operands.shift(), operands)
    )
    .reduce((acc, eq) => (acc += eq.value), 0);
};

console.log(star1());
console.log(star2());

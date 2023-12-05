const { getStringArrayInput } = require("./utils");

const input = getStringArrayInput("day04");

const starOne = () => {
  return input.reduce((total, line) => {
    const [card, vals] = line.split(" | ");
    const [, ...winning] = [...card.matchAll(/\d+/g)].map(([val]) => +val);
    const values = [...vals.matchAll(/\d+/g)].map(([val]) => +val);

    const winningValues = values.filter((v) => winning.includes(v));
    let gameScore = 0;
    for (const v of winningValues) {
      if (gameScore === 0) gameScore = 1;
      else gameScore *= 2;
    }
    return (total += gameScore);
  }, 0);
};

const starTwo = () => {
  const cards = input.map((line) => {
    const [card, vals] = line.split(" | ");
    const [id, ...winning] = [...card.matchAll(/\d+/g)].map(([val]) => +val);
    const values = [...vals.matchAll(/\d+/g)].map(([val]) => +val);
    const winningValues = values.filter((v) => winning.includes(v)).length;
    return {
      id,
      winning: winningValues,
      amount: 1,
    };
  });
  cards.forEach(({ id, winning, amount }) => {
    for (let i = id; i < id + winning; i++) cards[i].amount += amount;
  });
  return cards.reduce((total, card) => (total += card.amount), 0);
};

console.log(starOne());
console.log(starTwo());

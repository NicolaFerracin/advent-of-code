const { getNumberArrayInput } = require("./utils");

const getInput = () => getNumberArrayInput("day22");

const solve = (initialVal, turns) => {
  let secret = BigInt(initialVal);
  const secrets = [secret];

  const mix = (num) => {
    secret = num ^ secret;
    return secret;
  };
  const prune = () => {
    secret = secret % BigInt(16777216);
  };

  for (let i = 0; i < turns; i++) {
    mix(secret * BigInt(64));
    prune();

    mix(secret / BigInt(32));
    prune();

    mix(secret * BigInt(2048));
    prune();

    secrets.push(secret);
  }

  return secrets;
};

const star1 = () => {
  return getInput()
    .map((num) => solve(num, 2_000).pop())
    .reduce((tot, curr) => tot + curr, BigInt(0));
};

const map = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  0: 0,
  "-1": "A",
  "-2": "B",
  "-3": "C",
  "-4": "D",
  "-5": "E",
  "-6": "F",
  "-7": "G",
  "-8": "H",
  "-9": "I",
};
const star2 = () => {
  const buyers = getInput().map((num) => {
    const prices = solve(num, 2000).map((num) =>
      Number(Number(num).toString().substr(-1))
    );
    const deltas = [];
    for (let i = 1; i < prices.length; i++)
      deltas.push(map[prices[i] - prices[i - 1]]);

    return { deltas: deltas.join(""), prices };
  });

  const allSequences = new Map();
  for (const { deltas, prices } of buyers) {
    const buyerSeq = new Map();
    for (let i = 0; i < deltas.length - 4; i++) {
      const seq = deltas.substring(i, i + 4);
      if (!buyerSeq.has(seq)) buyerSeq.set(seq, prices[i + 4]);
    }

    for (const [seq, price] of buyerSeq.entries()) {
      allSequences.set(seq, (allSequences.get(seq) ?? 0) + price);
    }
  }

  return [...allSequences.values()].sort((a, b) => b - a)[0];
};

console.log(star1());
console.log(star2());

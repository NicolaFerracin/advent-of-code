const { getStringArrayInput } = require("./utils");

const input = getStringArrayInput("day07")
  .map((l) => l.split(" "))
  .map(([a, b]) => [a, +b]);

const unpackHand = (hand, handleJoker = false) => {
  const unpackedHand = hand.split("").reduce((cards, card) => {
    if (!(card in cards)) cards[card] = 0;
    cards[card]++;
    return cards;
  }, {});

  // move any joker to the card with most occurrences
  if (handleJoker) {
    if ("J" in unpackedHand) {
      const mostOccurrences = Object.entries(unpackedHand)
        .filter(([card]) => card !== "J") // ignore J
        .sort(([, a], [, b]) => a - b) // sort by cards with most occurrences
        .pop()
        ?.shift();
      unpackedHand[mostOccurrences] += unpackedHand.J;
      delete unpackedHand.J;
    }
  }

  return unpackedHand;
};

const rateHand = (hand, handleJoker = false) => {
  const unpacked = unpackHand(hand, handleJoker);
  const ofAKind = Object.values(unpacked).sort((a, b) => b - a);

  if (ofAKind.length === 1) return 5;
  else if (ofAKind.length === 2 && ofAKind[0] === 4) return 4;
  else if (ofAKind.length === 2 && ofAKind[0] === 3) return 3.5;
  else if (ofAKind.length === 3 && ofAKind[0] === 3) return 3;
  else if (ofAKind.length === 3 && ofAKind[0] === 2) return 2;
  else if (ofAKind.length === 4) return 1;
  else return 0.5;
};

const getTotalScore = (score, [, bid], index) => (score += (index + 1) * bid);

const baseMapping = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
]
  .reverse()
  .reduce((acc, curr, index) => {
    acc[curr] = index + 1;
    return acc;
  }, {});

const sortHands = (handleJoker = false) => {
  const mapping = baseMapping;
  if (handleJoker) mapping.J = 0;
  return ([a], [b]) => {
    const rateA = rateHand(a, handleJoker);
    const rateB = rateHand(b, handleJoker);
    if (rateA === rateB) {
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return mapping[a[i]] - mapping[b[i]];
      }
    }
    return rateA - rateB;
  };
};

const starOne = () => {
  return input.sort(sortHands()).reduce(getTotalScore, 0);
};

const starTwo = () => {
  return input.sort(sortHands(true)).reduce(getTotalScore, 0);
};

console.log(starOne());
console.log(starTwo());

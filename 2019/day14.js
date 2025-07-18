const { getStringArrayInput } = require("./utils");

const getInput = () =>
  getStringArrayInput("day14").reduce((acc, line) => {
    const qty = line.match(/\d+/g).map(Number);
    const names = line.match(/[A-Z]+/g);

    acc[names.pop()] = {
      qty: qty.pop(),
      inputs: names.map((n, i) => ({ name: n, qty: qty[i] })),
    };
    return acc;
  }, {});

const solveForFuel = (fuelRequired) => {
  const reactions = getInput();
  let ore = 0; // keeps track of how much ore we need
  const remainders = {}; // keeps track of the stock of excess material resulting from reactions
  const queue = [["FUEL", fuelRequired]]; // our BFS queue
  while (queue.length) {
    const [name, qty] = queue.shift();
    if (name === "ORE") {
      // we reached the end!!!
      ore += qty;
      continue;
    }
    const reaction = reactions[name]; // find the reaction that creates the current element
    const remainder = remainders[name] ?? 0; // do we have any remaining stock?
    const newNeeded = Math.max(0, qty - remainder); // remove the remaining stock amount from the amount we need
    const reactionRunCount = Math.ceil(newNeeded / reaction.qty); // how many times do we need to run the reaction to reach the desired amount of material
    const reactionOutput = reactionRunCount * reaction.qty; // this is what the reaction will generate, with potential excess material
    const newRemainder = reactionOutput - newNeeded; // the excess material from the reaction
    remainders[name] =
      Math.max(0, (remainders[name] ?? 0) - (qty - newNeeded)) + newRemainder; // remove from the stock the amount we took and add back the excess amount

    reaction.inputs.map((n) => {
      // Add the input element we need to create the current element
      const neededInputMaterial = reactionRunCount * n.qty;
      queue.push([n.name, neededInputMaterial]);
    });
  }
  return ore;
};

const star1 = () => {
  return solveForFuel(1);
};

const star2 = () => {
  const goal = 1_000_000_000_000;

  // we can naively increment FUEL until we find an amount of fuel that requires more tha 1 trillion ORE
  // we can be approximate and go by 10_000 FUEL increments at a time
  const FUEL_INCREMENT = 1_000;
  let fuel = FUEL_INCREMENT;
  while (solveForFuel(fuel) < goal) fuel += FUEL_INCREMENT;

  // We now know that to generate $fuel we need more than 1 trillion.
  // We now need to go back a little bit until we find the first amount FUEL that requires less than 1 trillion ORE
  while (fuel--) if (solveForFuel(fuel) <= goal) return fuel;
};

console.log(star1());
console.log(star2());

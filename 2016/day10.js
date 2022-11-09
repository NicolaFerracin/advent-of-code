const { getStringArrayInput } = require("./utils");

const giveToBot = (value, bot) => {
  if (!bot.length || value > bot[0]) {
    bot.push(value);
  } else {
    bot.unshift(value);
  }
};

const exec = () => {
  let { values, moves } = getStringArrayInput("day10").reduce(
    (instructions, line) => {
      if (line.startsWith("value")) instructions.values.push(line);
      else instructions.moves.push(line);

      return instructions;
    },
    { values: [], moves: [] }
  );
  const bots = new Map();
  const outputs = new Map();

  values.forEach((line) => {
    const [, value, , , , botId] = line.split(" ");

    if (!bots.get(botId)) bots.set(botId, []);

    giveToBot(Number(value), bots.get(botId));
  });

  while (moves.length) {
    moves = moves.filter((line) => {
      const [, botId, , , , lowTo, lowId, , , , highTo, highId] =
        line.split(" ");

      const bot = bots.get(botId);

      if (!bot || !bot[0] || !bot[1]) return true;

      const [lowVal, highVal] = bot;

      if (lowVal === 17 && highVal === 61) console.log(botId);

      if (!bots.has(lowId)) bots.set(lowId, []);
      if (!bots.has(highId)) bots.set(highId, []);
      if (!outputs.has(lowId)) outputs.set(lowId, []);
      if (!outputs.has(highId)) outputs.set(highId, []);

      if (lowTo === "bot") giveToBot(lowVal, bots.get(lowId));
      else outputs.get(lowId).push(lowVal);
      if (highTo === "bot") giveToBot(highVal, bots.get(highId));
      else outputs.get(highId).push(highVal);

      bots.set(botId, []);

      return false;
    });
  }

  return { bots, outputs };
};

const starOne = () => {
  exec();
};

const starTwo = () => {
  const { outputs } = exec();

  return outputs.get("0") * outputs.get("1") * outputs.get("2");
};

console.log(starOne());
console.log(starTwo());

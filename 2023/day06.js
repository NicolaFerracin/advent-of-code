const { getStringArrayInput } = require("./utils");

const [times, distances] = getStringArrayInput("day06").map((x) =>
  [...x.matchAll(/\d+/g)].map(Number)
);
const races = [];
for (let i = 0; i < times.length; i++) {
  races.push({ t: times[i], d: distances[i] });
}

const getWaysToWinRace = (race) => {
  let waysToWin = 0;
  for (let time = race.t; time > 0; time--) {
    const speed = time;
    const timeLeft = race.t - time;
    const distance = timeLeft * speed;
    if (distance > race.d) waysToWin++;
  }
  return waysToWin;
};

const starOne = () => {
  let total = 1;
  for (const race of races) {
    const waysToWinRace = getWaysToWinRace(race);
    total *= waysToWinRace !== 0 ? waysToWinRace : 1;
  }
  return total;
};

const starTwo = () => {
  const race = races.reduce(
    (acc, cur) => {
      acc.t += `${cur.t}`;
      acc.d += `${cur.d}`;
      return acc;
    },
    { t: "", d: "" }
  );
  return getWaysToWinRace(race);
};

console.log(starOne());
console.log(starTwo());

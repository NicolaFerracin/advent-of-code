const { getStringArrayInput } = require("./utils");

const getReindeers = () =>
  getStringArrayInput("day14").map((line) => {
    const [name, , , speed, , , time, , , , , , , rest] = line.split(" ");
    return {
      name,
      speed: +speed,
      time: +time,
      rest: +rest,
      dist: 0,
      left: +time,
      points: 0,
      isMoving: true,
    };
  });

const playSecond = (reindeers) => {
  for (const reindeer of reindeers) {
    if (reindeer.isMoving) reindeer.dist += reindeer.speed;

    reindeer.left--;

    if (reindeer.left === 0) {
      reindeer.left = reindeer.isMoving ? reindeer.rest : reindeer.time;
      reindeer.isMoving = !reindeer.isMoving;
    }
  }
};

const starOne = () => {
  const reindeers = getReindeers();
  for (let i = 0; i < 2503; i++) {
    playSecond(reindeers);
  }

  return reindeers.sort((a, b) => b.dist - a.dist)[0].dist;
};

const starTwo = () => {
  const reindeers = getReindeers();
  for (let i = 0; i < 2503; i++) {
    playSecond(reindeers);
    reindeers.sort((a, b) => b.dist - a.dist);
    for (let i = 0; i < reindeers.length; i++) {
      if (i === 0 || reindeers[i - 1].dist === reindeers[i].dist)
        reindeers[i].points++;
      else break;
    }
  }

  return reindeers.sort((a, b) => b.points - a.points)[0].points;
};

console.log(starOne());
console.log(starTwo());

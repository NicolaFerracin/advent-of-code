const { getStringArrayInput } = require("./utils");
const fs = require("fs");

const getInput = () =>
  getStringArrayInput("day14")
    .map((l) => l.trim().match(/-?\d+/g).map(Number))
    .map(([y, x, vy, vx]) => ({ x, y, vx, vy }));

const mod = (num, len) => ((num % len) + len) % len;

const star1 = () => {
  const MAX_X = 103;
  const MAX_Y = 101;

  const robots = getInput();
  for (let i = 0; i < 100; i++) {
    for (const robot of robots) {
      robot.x = mod(robot.x + robot.vx, MAX_X);
      robot.y = mod(robot.y + robot.vy, MAX_Y);
    }
  }
  const midX = Math.floor(MAX_X / 2);
  const midY = Math.floor(MAX_Y / 2);
  const quads = [0, 0, 0, 0];
  for (const robot of robots) {
    const quad =
      robot.x < midX && robot.y < midY
        ? 0
        : robot.x < midX && robot.y > midY
        ? 1
        : robot.x > midX && robot.y < midY
        ? 2
        : robot.x > midX && robot.y > midY
        ? 3
        : -1;
    if (quad === -1) continue;
    quads[quad]++;
  }

  return quads.reduce((tot, robots) => tot * robots);
};

const star2 = () => {
  const MAX_X = 103;
  const MAX_Y = 101;

  const print = (robots, i) => {
    let map = `\n${i + 1} \n`;
    for (let x = 0; x < MAX_X; x++) {
      let row = "";
      for (let y = 0; y < MAX_Y; y++) {
        const hasRobot = robots.find((robot) => robot.x === x && robot.y === y);
        row += hasRobot ? "#" : " ";
      }
      map += row;
      map += "\n";
    }
    map += "=".repeat(100);
    fs.appendFileSync("./2024/day14.output", map);
  };

  const robots = getInput();
  for (let i = 0; i < 10_000; i++) {
    for (const robot of robots) {
      robot.x = mod(robot.x + robot.vx, MAX_X);
      robot.y = mod(robot.y + robot.vy, MAX_Y);
    }
    // print every iteration and manually check to notice that every from 101 and 103 rounds
    // there is a vertical and horizontal concentration of robots.
    // Finding when the 2 concentrations happen, is the solution
    (i - 27) % 101 === 0 && (i - 85) % 103 === 0 && print(robots, i);
  }
};

console.log(star1());
console.log(star2());

const { getRawInput } = require("./utils");

const claws = getRawInput("day13")
  .trim()
  .split("\n\n")
  .map((claw) => {
    const [a, b, prize] = claw
      .split("\n")
      .map((l) => l.match(/\d+/g).map(Number));
    return { a, b, prize };
  });

const MAX = 100;
const star1 = () => {
  let tot = 0;
  for (const claw of claws) {
    let found = false;
    for (let a = 0; a < MAX; a++) {
      if (found) break;
      for (let b = 0; b < MAX; b++) {
        const x = claw.a[0] * a + claw.b[0] * b;
        const y = claw.a[1] * a + claw.b[1] * b;
        if (claw.prize[0] === x && claw.prize[1] === y) {
          tot += a * 3 + b;
          found = true;

          break;
        }
      }
    }
  }

  return tot;
};

const star2 = () => {
  let tot = 0;
  for (const claw of claws) {
    claw.prize[0] += 10_000_000_000_000;
    claw.prize[1] += 10_000_000_000_000;

    const [ax, ay] = claw.a;
    const [bx, by] = claw.b;
    const [x, y] = claw.prize;

    /**
     * solve system of equations
     * Example:
     * Button A: X+63, Y+14
     * Button B: X+12, Y+37
     * Prize: X=5921, Y=10432
     * ax=63 ay=14 bx=12 by=37 x=5921 y=10432 ta=AButtonPresses tb=BButtonPresses
     * ax * ta + bx * tb = x && ay * ta + by * tb = y
     * solve by ta => ta = (x - bx * tb) / ax ======> TA
     * ay * (x - bx * tb) / ax + by * tb = y
     * solve by tb => (ay * x) - (bx * tb * ay) + by * tb * ax = y * ax
     * => ay * x - bx * tb * ay = y * ax - by * tb * ax
     * => by * tb * ax - bx * tb * ay = y * ax - ay * x
     * => tb * (by * ax - bx * ay) = y * ax - ay * x
     * => tb = (y * ax - ay * x) / (by * ax - bx * ay) ======> TB
     *  */
    const tb = Math.floor((ax * y - ay * x) / (ax * by - ay * bx));
    const ta = Math.floor((x - bx * tb) / ax);

    if (ta * ax + tb * bx === x && ta * ay + tb * by === y) tot += ta * 3 + tb;
  }

  return tot;
};

console.log(star1());
console.log(star2());

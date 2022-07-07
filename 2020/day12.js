const { getStringArrayInput } = require("./utils");

const getInput = () =>
  getStringArrayInput("day12").map((line) => ({
    dir: line[0],
    val: Number(line.substring(1)),
  }));

console.log(
  (function starOne() {
    const input = getInput();

    let direction = "E";
    let x = 0;
    let y = 0;

    const mapping = {
      N: (diff) => (y += diff),
      E: (diff) => (x += diff),
      S: (diff) => (y -= diff),
      W: (diff) => (x -= diff),
      L: (degrees) =>
        (direction = "NWSE".charAt(
          ("NWSE".indexOf(direction) + degrees / 90) % 4
        )),
      R: (degrees) =>
        (direction = "NESW".charAt(
          ("NESW".indexOf(direction) + degrees / 90) % 4
        )),
    };

    input.forEach(({ dir, val }) => {
      if (dir === "F") mapping[direction](val);
      else mapping[dir](val);
    });

    return Math.abs(x) + Math.abs(y);
  })()
);

console.log(
  (function starTwo() {
    const input = getInput();

    const ship = { x: 0, y: 0 };
    const waypoint = { x: 10, y: 1 };

    const mapping = {
      N: (diff) => (waypoint.y += diff),
      E: (diff) => (waypoint.x += diff),
      S: (diff) => (waypoint.y -= diff),
      W: (diff) => (waypoint.x -= diff),
      L: (degrees) => {
        const rotations = (degrees / 90) % 4;
        for (let i = 0; i < rotations; i++) {
          const temp = waypoint.x;
          waypoint.x = waypoint.y * -1;
          waypoint.y = temp;
        }
      },
      R: (degrees) => {
        const rotations = (degrees / 90) % 4;
        for (let i = 0; i < rotations; i++) {
          const temp = waypoint.x;
          waypoint.x = waypoint.y;
          waypoint.y = temp * -1;
        }
      },
      F: (times) => {
        ship.x += waypoint.x * times;
        ship.y += waypoint.y * times;
      },
    };

    input.forEach(({ dir, val }) => mapping[dir](val));

    return Math.abs(ship.x) + Math.abs(ship.y);
  })()
);

const { getRawInput } = require("./utils");

const rocks = [
  ["####"],
  [".#.", "###", ".#."],
  ["..#", "..#", "###"],
  ["#", "#", "#", "#"],
  ["##", "##"],
];

const canMoveRock = (chamber, rock, [x, y]) => {
  if (
    x + rock.length > chamber.length ||
    y < 0 ||
    y + rock[0].length > chamber[0].length
  )
    return false;

  for (let a = 0; a < rock.length; a++) {
    for (let b = 0; b < rock[a].length; b++) {
      const rockCell = rock[a][b];
      const chamberCell = chamber[x + a][y + b];
      if (rockCell === "#" && chamberCell === "#") return false;
    }
  }

  return true;
};

const findStartingX = (chamber, rock) => {
  let bottom = chamber.findIndex((row) => row.some((cell) => cell === "#"));
  if (bottom < 0) bottom = chamber.length;
  return bottom - 3 - rock.length;
};

const drawRock = (chamber, rock, [x, y]) => {
  for (let a = 0; a < rock.length; a++) {
    for (let b = 0; b < rock[a].length; b++) {
      if (rock[a][b] === "#") chamber[x + a][y + b] = rock[a][b];
    }
  }

  return chamber;
};

const exec = (totalRocks) => {
  const jets = getRawInput("day17");
  const CHAMBER_WIDTH = 7;
  const CHAMBER_HEIGHT = 4 * 2022; // we expect to find a cycle within this many rows
  let chamber = [];
  for (let x = 0; x < CHAMBER_HEIGHT; x++) {
    const row = [];
    for (let y = 0; y < CHAMBER_WIDTH; y++) row.push(".");
    chamber.push(row);
  }

  const seen = new Map();
  let currJet = 0;
  for (let i = 0; i < totalRocks; i++) {
    const rock = rocks[i % rocks.length];
    let x = findStartingX(chamber, rock);
    let y = 2;

    while (true) {
      // apply jet of air
      const jet = jets[currJet] === "<" ? -1 : 1;
      currJet = (currJet + 1) % jets.length;
      if (canMoveRock(chamber, rock, [x, y + jet], i)) {
        y += jet;
      }

      // move down
      if (canMoveRock(chamber, rock, [x + 1, y])) {
        x += 1;
      } else {
        // if collision is detected while moving down, stop
        break;
      }
    }

    // tower height before the current rock comes to a stop
    const prevHeight =
      CHAMBER_HEIGHT -
      chamber.findIndex((row) => row.some((cell) => cell === "#"));

    // update the chamber with the latest rock
    chamber = drawRock(chamber, rock, [x, y]);

    // here we start checking if we detected a cycle
    // start by creating a list of the highest cells by column
    const columns = [];
    for (let y = 0; y < chamber[0].length; y++) {
      for (let x = 0; x < chamber.length; x++) {
        if (chamber[x][y] === "#") {
          columns.push(x);
          break;
        }
      }
    }
    const minX = Math.min(...columns);
    const adjustedColumns = columns.map((cell) => cell - minX); // normalize the list of heights from 0
    // create the key using the rock, the jet and the current heights to see if we detected a cycle
    const key = `${i % rocks.length}-${currJet}-${adjustedColumns.join("#")}`;

    // if we already saw the same combination, we just detected a cycle
    // there is an initial buffer from 0 to x. From x to y we have the cycle and the formula is:
    // bufferHeight + cycleHeight * cycleRepetitions
    if (seen.has(key)) {
      const { bufferRocks, bufferHeight } = seen.get(key);
      if ((totalRocks - bufferRocks) % (i - bufferRocks) === 0) {
        const cycleHeight = prevHeight - bufferHeight;
        const cycleRepetitions = (totalRocks - bufferRocks) / (i - bufferRocks);

        return bufferHeight + cycleHeight * cycleRepetitions;
      }
    } else {
      seen.set(key, {
        bufferRocks: i,
        bufferHeight: prevHeight,
      });
    }
  }

  // if a cycle is not detected within the totalRocks, return normally
  return (
    CHAMBER_HEIGHT -
    chamber.findIndex((row) => row.some((cell) => cell === "#"))
  );
};

const starOne = () => {
  return exec(2022);
};

const starTwo = () => {
  return exec(1000000000000);
};

console.log(starOne());

console.log(starTwo());

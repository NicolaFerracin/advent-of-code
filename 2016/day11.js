const { getStringArrayInput } = require("./utils");
require("lodash.combinations");
const _ = require("lodash");

const generateKeyFromState = ([, currFloor, floors]) => {
  // generate key in the form of `{curr_floor}m{m_count}g{g_count}`
  return floors.reduce((key, floor) => {
    const { microchip, generator } = floor.reduce(
      (acc, item) => {
        const type = item.split(" ").pop();
        acc[type]++;
        return acc;
      },
      { microchip: 0, generator: 0 }
    );
    key += `${microchip}m${generator}g-`;
    return key;
  }, `${currFloor}`);
};

const generateNextStates = ([moves, currFloor, floors]) => {
  const possibleMoves = [
    ..._.combinations(floors[currFloor], 1),
    ..._.combinations(floors[currFloor], 2),
  ];

  return possibleMoves.reduce((acc, move) => {
    for (let i = -1; i <= 1; i += 2) {
      if (currFloor + i < 0) continue;
      if (currFloor + i > 3) continue;

      const newFloors = JSON.parse(JSON.stringify(floors));
      newFloors[currFloor] = newFloors[currFloor].filter(
        (item) => move.indexOf(item) < 0
      ); // remove moving items from previous floor
      newFloors[currFloor + i].push(...move); // add moving items to new floor

      acc.push([moves + 1, currFloor + i, newFloors]);
    }
    return acc;
  }, []);
};

const isInvalidState = ([, , floors]) => {
  // a state is invalid if a microchip is on a floor without its generator AND with a different generator
  const isInvalid = floors.some((floor) => {
    const hasChipWithNoGenerator = floor.some((item) => {
      if (!item.endsWith("chip")) return false;
      const [name] = item.split(" ");
      return !floor.some((item) => item === `${name} generator`);
    });
    const hasOtherGenerator = floor.some((item) => item.endsWith("generator"));

    return hasChipWithNoGenerator && hasOtherGenerator;
  });

  return isInvalid;
};

const bfs = (initialFloors) => {
  const seen = new Set();
  const queue = [[0, 0, initialFloors]];

  while (queue.length) {
    const state = queue.shift();
    const [moves, , floors] = state;

    // if last floor is the only one with item, we are done
    if (floors.findIndex((floor) => floor.length > 0) === 3) {
      return moves;
    }

    // generate all possible next states...
    const nextStates = generateNextStates(state).filter((newState) => {
      // ... and remove invalid states
      if (isInvalidState(newState)) return false;

      // ... and remove already seen states
      const key = generateKeyFromState(newState);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    queue.push(...nextStates);
  }
};

const getInitialFloors = () => {
  return getStringArrayInput("day11").map((line) => {
    if (line.indexOf(" nothing ") >= 0) return [];
    const matches = line.match(/(\w+)(?:-compatible)? (microchip|generator)/g);
    return matches.map((x) => x.replace("-compatible", ""));
  });
};

const starOne = () => {
  return bfs(getInitialFloors());
};

const starTwo = () => {
  const floors = getInitialFloors();
  floors[0].push("elerium generator");
  floors[0].push("elerium microchip");
  floors[0].push("dilithium generator");
  floors[0].push("dilithium microchip");

  return bfs(floors);
};

console.log(starOne());
console.log(starTwo());

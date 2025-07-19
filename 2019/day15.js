const { getRawInput, IntcodeComputer, getRandomArrayItem } = require("./utils");

const getInput = () => getRawInput("day15").split(",").map(BigInt);

const getKey = (x, y) => `${x}#${y}`;

const WALL = "#";
const OXYGEN = "O";
const EMPTY = ".";

class RemoteControl {
  constructor(repairDroid) {
    this.repairDroid = repairDroid;
    this.map = {};
    this.dir = 1; // 1N - 2S - 3W - 4E
    this.x = 0;
    this.y = 0;
  }

  // based on the current map, decide what the next move should be
  // using a naive random walk approach
  getNextMove() {
    // get 4 possible options
    const N = this.map[getKey(...this.move({ dryRun: true, dir: 1 }))];
    const E = this.map[getKey(...this.move({ dryRun: true, dir: 4 }))];
    const S = this.map[getKey(...this.move({ dryRun: true, dir: 2 }))];
    const W = this.map[getKey(...this.move({ dryRun: true, dir: 3 }))];

    const nonVisited = [];
    if (N === undefined) nonVisited.push(1);
    if (E === undefined) nonVisited.push(4);
    if (S === undefined) nonVisited.push(2);
    if (W === undefined) nonVisited.push(3);
    if (nonVisited.length > 0) return getRandomArrayItem(nonVisited);

    const empty = [];
    if (N === EMPTY) empty.push(1);
    if (E === EMPTY) empty.push(4);
    if (S === EMPTY) empty.push(2);
    if (W === EMPTY) empty.push(3);
    return getRandomArrayItem(empty);
  }

  // allow to perform a dry run to be able to tell potential next positions, without really moving
  move({ dryRun = false, dir = this.dir } = {}) {
    if (dir === 1) {
      // N
      if (dryRun) return [this.x, this.y - 1];
      this.y -= 1;
    }
    if (dir === 2) {
      // S
      if (dryRun) return [this.x, this.y + 1];
      this.y += 1;
    }
    if (dir === 3) {
      // W
      if (dryRun) return [this.x - 1, this.y];
      this.x -= 1;
    }
    if (dir === 4) {
      // E
      if (dryRun) return [this.x + 1, this.y];
      this.x += 1;
    }
  }

  // we perform a random walk around the maze and we assume that 500_000 rounds
  // are enough to discover the whole maze. In the worst case the solution needs
  // to be run multiple times
  start() {
    let i = 500_000;
    while (true) {
      // get next move to attempt
      this.dir = this.getNextMove();

      // get back a status code
      let status = Number(this.repairDroid.run(this.dir).shift());

      if (i-- % 100_000 === 0) printMap(this.map);
      if (i === 0) return { map: this.map, oxygen: this.oxygen };

      // found the location of the oxygen
      if (status === 2) {
        this.move();
        this.map[getKey(this.x, this.y)] = OXYGEN;
        this.oxygen = { x: this.x, y: this.y };
      }

      // hit a wall
      if (status === 0) {
        this.map[getKey(...this.move({ dryRun: true }))] = WALL;
      }

      // found a free space, move forward
      if (status === 1) {
        this.move();
        this.map[getKey(this.x, this.y)] = EMPTY;
      }
    }
  }
}

class RepairDroid extends IntcodeComputer {
  constructor(program) {
    super(program, []);
  }

  run(input) {
    this.inputs = [input];
    this.halted = false;
    this.i = 0;
    return super.run();
  }
}

const printMap = (map) => {
  const boundary = 25;
  console.clear();
  for (let y = boundary * -1; y < boundary; y++) {
    const row = [];
    for (let x = boundary * -1; x < boundary; x++) {
      const cell = map[getKey(x, y)];
      if (x === 0 && y === 0) row.push("S");
      else if (cell === undefined) row.push(" ");
      else row.push(cell);
    }
    console.log(row.join(""));
  }
};

// keep them global so they can be reused for both stars
const repairDroid = new RepairDroid(getInput());
const remoteControl = new RemoteControl(repairDroid);

const star1 = () => {
  const { map, oxygen } = remoteControl.start();

  // now we got the map and the position of the oxygen
  // we "just" need to find the shortes path
  // we can use either a BFS or a DFS
  const queue = [[0, 0]]; // our starting point
  let steps = 0;
  const seen = new Set();
  let stop = false;
  while (!stop) {
    let len = queue.length;
    while (len-- > 0) {
      const [x, y] = queue.shift();
      if (x === oxygen.x && y === oxygen.y) return steps;

      seen.add(getKey(x, y));

      // get the 4 options
      const next = [
        [x, y - 1],
        [x, y + 1],
        [x - 1, y],
        [x + 1, y],
      ]
        // check they were not seen yet
        // and check they are not a wall
        .filter((coords) => {
          const key = getKey(coords[0], coords[1]);
          return map[key] !== WALL && !seen.has(key);
        });

      // add them to the queue
      queue.push(...next);
    }
    steps++;
  }
};

const isFilledWithOxygen = (map) => {
  return Object.values(map).some((cell) => cell === EMPTY);
};

const star2 = () => {
  const map = remoteControl.map;
  const oxygen = remoteControl.oxygen;

  // use BFS
  // start from the oxygen coordinates
  const queue = [[oxygen.x, oxygen.y]];
  let minutes = 0;
  // at every cycle, check if there are any empty cell left
  while (isFilledWithOxygen(map)) {
    minutes++;
    let len = queue.length;
    while (len-- > 0) {
      const [x, y] = queue.shift();
      // and fill all adjacent cells
      const next = [
        [x, y - 1],
        [x, y + 1],
        [x - 1, y],
        [x + 1, y],
      ]
        // check they are empty
        .filter((coords) => map[getKey(coords[0], coords[1])] === EMPTY);

      // mark the next cells as filled
      next.forEach((coords) => (map[getKey(coords[0], coords[1])] = OXYGEN));

      queue.push(...next);
    }
  }

  // once there are no more empty cells, we are done
  return minutes;
};

console.log("Star 1", star1());
console.log("Star 2", star2());

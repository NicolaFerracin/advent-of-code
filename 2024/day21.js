const { getStringArrayInput } = require("./utils");

const getInput = () => getStringArrayInput("day21");

// +---+---+---+
// | 7 | 8 | 9 |
// +---+---+---+
// | 4 | 5 | 6 |
// +---+---+---+
// | 1 | 2 | 3 |
// +---+---+---+
//     | 0 | A |
//     +---+---+

//     +---+---+
//     | ^ | A |
// +---+---+---+
// | < | v | > |
// +---+---+---+

const numKeypad = ["789", "456", "123", "x0A"];
const dirKeypad = ["x^A", "<v>"];

const map = {
  "<": (x, y) => [x, y - 1],
  ">": (x, y) => [x, y + 1],
  "^": (x, y) => [x - 1, y],
  v: (x, y) => [x + 1, y],
};

const crossesX = (path, char, pad) => {
  let x = pad.findIndex((row) => row.includes(char));
  let y = pad[x].indexOf(char);
  for (const step of path.slice(0, path.length - 1)) {
    const [nextX, nextY] = map[step](x, y);
    if (pad[nextX][nextY] === "x") return true;
    x = nextX;
    y = nextY;
  }
  return false;
};
const codes = getInput();

// Couldn't have made it without reddit, where I found some tips
// this contains the first trick: give precedence to certain directions
const bfs = (start, end, pad) => {
  let sx = pad.findIndex((row) => row.includes(start));
  let sy = pad[sx].indexOf(start);
  const ex = pad.findIndex((row) => row.includes(end));
  const ey = pad[ex].indexOf(end);
  const path = [];

  // prefer left -> top -> bottom -> right
  while (sy > ey) {
    path.push("<");
    sy--;
  }
  while (sx < ex) {
    path.push("v");
    sx++;
  }
  while (sx > ex) {
    path.push("^");
    sx--;
  }
  while (sy < ey) {
    path.push(">");
    sy++;
  }

  // if we are on the same button or we move by just one, we don't have any reverse path to check
  if (path.length < 1) return [...path, "A"];

  const res = [];
  const reversedPath = [...path].reverse();
  path.push("A"); // add A at the end as every time we move to a button, we press it
  reversedPath.push("A");

  // check if either the direct path or the reversed path cross the X button and exclude them
  if (!crossesX(path, start, pad)) res.push(path);
  if (!crossesX(reversedPath, start, pad)) res.push(reversedPath);

  // keep only the first path
  return res[0];
};

// map all possible paths between values
const numpadChars = "0123456789A";
const numpadPaths = {};
for (let x = 0; x < numpadChars.length; x++) {
  const start = numpadChars[x];
  for (let y = 0; y < numpadChars.length; y++) {
    const end = numpadChars[y];
    const paths = bfs(start, end, numKeypad);
    numpadPaths[`${start}${end}`] = paths;
  }
}

// map all possible paths between values
const dirpadChars = "^A<v>";
const dirpadPaths = {};
for (let x = 0; x < dirpadChars.length; x++) {
  const start = dirpadChars[x];
  for (let y = 0; y < dirpadChars.length; y++) {
    const end = dirpadChars[y];
    const paths = bfs(start, end, dirKeypad);
    dirpadPaths[`${start}${end}`] = paths;
  }
}

// keeps track of all the movement and their count.
// Building the string of all steps quickly runs out of memory
const pathFinder = (code, mapping) => {
  let paths = {};

  // if it's the first code, then we need some custom handling
  if (typeof code === "string") {
    let curr = "A";
    for (const next of code) {
      // for each value in the code, find the path...
      const path = mapping[`${curr}${next}`].join("");

      // ...unwrap the path into single pair of movements
      // i.e. code 032
      // starting from A we go <A ^>A <A
      // so the pairs of movements are A< <A A^ ^> >A A< <A
      let a = "A";
      for (let x = 0; x < path.length; x++) {
        b = path[x];
        paths[`${a}${b}`] ||= 0;
        paths[`${a}${b}`]++;
        a = b;
      }

      curr = next;
    }
    return paths;
  }

  for (const [steps, count] of Object.entries(code)) {
    // very similar to the above, with the difference that we don't have to map the code to a movement
    const path = mapping[steps].join("");
    let a = "A";
    for (let x = 0; x < path.length; x++) {
      b = path[x];
      paths[`${a}${b}`] ||= 0;
      paths[`${a}${b}`] += count;
      a = b;
    }
  }

  return paths;
};

const reduceTotal = (tot, length, index) => {
  const numValue = Number([...codes[index].match(/\d+/g)][0]);
  return tot + numValue * length;
};

const solve = (rounds) => {
  const res = [];
  for (const code of codes) {
    let paths = pathFinder(code, numpadPaths);

    for (let i = 0; i < rounds; i++) paths = pathFinder(paths, dirpadPaths);

    res.push(Object.values(paths).reduce((tot, c) => tot + c, 0));
  }
  return res.reduce(reduceTotal, 0);
};

const star1 = () => {
  return solve(2);
};
const star2 = () => {
  return solve(25);
};

console.log(star1());
console.log(star2());

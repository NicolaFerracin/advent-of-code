const { getRawInput, manhattanDist } = require("./utils");

const getInput = () =>
  getRawInput("day03")
    .split("\n")
    .map((line) => {
      return line.split(",").map((l) => ({
        dir: l[0],
        val: Number(l.substring(1)),
      }));
    });

const star1 = () => {
  const input = getInput();
  const map = new Map(); // <string, [A, B]>
  for (let wire = 0; wire < input.length; wire++) {
    let x = 0;
    let y = 0;
    for (const { dir, val } of input[wire]) {
      for (let i = 0; i < val; i++) {
        x += dir === "U" ? -1 : dir === "D" ? 1 : 0;
        y += dir === "L" ? -1 : dir === "R" ? 1 : 0;
        const key = `${x}#${y}`;
        if (!map.has(key)) map.set(key, new Set());
        map.get(key).add(wire);
      }
    }
  }

  // find intersections
  const intersections = [...map.entries()]
    .filter(([, wires]) => wires.size === 2)
    .map(([point]) => point.split("#").map(Number));

  return intersections
    .sort((a, b) => manhattanDist([0, 0], a) - manhattanDist([0, 0], b))[0]
    .reduce((tot, curr) => tot + Math.abs(curr), 0);
};

const star2 = () => {
  const input = getInput();

  const map = new Map(); // <string, Map<A|B, Steps>>
  for (let wire = 0; wire < input.length; wire++) {
    let x = 0;
    let y = 0;
    let steps = 0;
    for (const { dir, val } of input[wire]) {
      for (let i = 0; i < val; i++) {
        steps++;
        x += dir === "U" ? -1 : dir === "D" ? 1 : 0;
        y += dir === "L" ? -1 : dir === "R" ? 1 : 0;
        const key = `${x}#${y}`;
        if (!map.has(key)) map.set(key, new Map());
        if (!map.get(key).has(wire)) map.get(key).set(wire, steps);
      }
    }
  }

  // find intersections
  const intersections = [...map.entries()]
    .filter(([, wires]) => wires.size === 2)
    .map(([, wires]) =>
      [...wires.values()].reduce((tot, curr) => tot + curr, 0)
    );

  return intersections.sort((a, b) => a - b)[0];
};

console.log(star1());
console.log(star2());

const { readInput, print, splitInputByLine } = require("./utils");

const input = splitInputByLine(readInput("day10")).map((l) => {
  const [, diagram, joltage] = /\[([\.#]+)\]\s.+{([\d,]+)}/g.exec(l);
  const buttons = l.match(/\(([\d,]+)\)/gm);
  return {
    diagram,
    joltage: joltage.split(",").map(Number),
    buttons: buttons.map((b) =>
      b
        .substr(1, b.length - 2)
        .split(",")
        .map(Number)
    ),
  };
});

const star1 = () => {
  let sum = 0;
  for (const { diagram, buttons } of input) {
    const toGo = [...buttons];
    let rounds = 0;
    let found = false;
    const seen = new Set();
    while (!found) {
      rounds++;
      let len = toGo.length;
      while (--len >= 0) {
        const initial = new Array(diagram.length).fill(".");
        const curr = toGo.shift();
        curr.forEach((b) => (initial[b] = initial[b] === "#" ? "." : "#"));
        if (initial.join("") === diagram) found = rounds;
        if (seen.has(initial.join(""))) continue;
        seen.add(initial.join(""));
        buttons.forEach((b) => toGo.push([...curr, ...b]));
      }
    }
    if (found) sum += found;
  }

  return sum;
};

const star2 = () => {
  let sum = 0;
  for (const { buttons, joltage } of input) {
    const toGo = [...buttons];
    let rounds = 0;
    let found = false;
    const seen = new Set();
    while (!found) {
      rounds++;
      let len = toGo.length;
      while (--len >= 0) {
        const initial = new Array(joltage.length).fill(0);
        const curr = toGo.shift();
        curr.forEach((b) => initial[b]++);
        if (initial.some((b, i) => joltage[i] < b)) continue;
        if (seen.has(initial.join(""))) continue;
        seen.add(initial.join(""));

        if (initial.join(",") === joltage.join(",")) {
          found = rounds;
          console.log(initial, joltage, curr.join(","));
        }
        buttons.forEach((b) => toGo.push([...curr, ...b]));
      }
    }
    if (found) {
      console.log("found");
      sum += found;
      return;
    }
  }

  return sum;
};

print(star1);
print(star2);

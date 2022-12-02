const { getRawInput } = require("./utils");

const letsDance = (programs, instructions) => {
  instructions.forEach((op) => {
    if (op.startsWith("s")) {
      const [slice] = op.match(/\d+/g);
      programs = [...programs.slice(-slice), ...programs.slice(0, -slice)];
    } else if (op.startsWith("x")) {
      const [a, b] = op.match(/\d+/g);
      const temp = programs[a];
      programs[a] = programs[b];
      programs[b] = temp;
    } else {
      const [a, b] = op.substring(1).match(/\w+/g);
      const indexA = programs.indexOf(a);
      const indexB = programs.indexOf(b);
      const temp = programs[indexA];
      programs[indexA] = programs[indexB];
      programs[indexB] = temp;
    }
  });
  return programs;
};

const starOne = () => {
  const programs = new Array(16)
    .fill(0)
    .map((_, i) => String.fromCharCode("a".charCodeAt(0) + i));

  const instructions = getRawInput("day16").split(",");

  return letsDance(programs, instructions).join("");
};

const starTwo = () => {
  let programs = new Array(16)
    .fill(0)
    .map((_, i) => String.fromCharCode("a".charCodeAt(0) + i));

  const instructions = getRawInput("day16").split(",");

  const seen = new Set();
  let dance = 0;
  while (true) {
    if (seen.has(programs.join(""))) {
      // cycle found
      const times = 1_000_000_000 % dance;
      for (let i = 0; i < times; i++)
        programs = letsDance(programs, instructions);
      return programs.join("");
    }

    seen.add(programs.join(""));
    programs = letsDance(programs, instructions);
    dance++;
  }
};

console.log(starOne());
console.log(starTwo());

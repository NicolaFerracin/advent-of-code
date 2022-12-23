const { getStringArrayInput } = require("./utils");
const algebra = require("algebra.js");

const starOne = () => {
  const monkeys = getStringArrayInput("day21").reduce((monkeys, line) => {
    const [monkey, job] = line.split(":");
    monkeys.set(monkey, /\d+/.test(job) ? +job : job.trim());
    return monkeys;
  }, new Map());

  let monkeysToCheck = [...monkeys.keys()].filter(
    (monkey) => !/\d+/.test(monkeys.get(monkey))
  );

  while (monkeysToCheck.includes("root")) {
    for (const monkey of monkeysToCheck) {
      const job = monkeys.get(monkey);
      const [m1, op, m2] = job.split(" ");
      if (/\d+/.test(monkeys.get(m1)) && /\d+/.test(monkeys.get(m2))) {
        const val = eval(`${monkeys.get(m1)} ${op} ${monkeys.get(m2)}`);
        monkeys.set(monkey, val);
      }
    }
    monkeysToCheck = monkeysToCheck.filter(
      (monkey) => !/\d+/.test(monkeys.get(monkey))
    );
  }

  return monkeys.get("root");
};

const starTwo = () => {
  const monkeys = getStringArrayInput("day21").reduce((monkeys, line) => {
    const [monkey, job] = line.split(":");
    if (monkey === "humn") {
      monkeys.set(monkey, "x");
    } else if (monkey === "root") {
      const [m1, , m2] = job.trim().split(" ");
      monkeys.set(monkey, `${m1} = ${m2}`);
    } else {
      monkeys.set(monkey, /\d+/.test(job) ? +job : job.trim());
    }

    return monkeys;
  }, new Map());

  const [m1, , m2] = monkeys.get("root").split(" ");
  // find connection between humn and m1 or m2
  const dfs = (monkey, path) => {
    if (monkey === "humn") return path;

    const job = monkeys.get(monkey);
    if (!/\d+/.test(job)) {
      const [m1, , m2] = job.split(" ");
      const path1 = dfs(m1, [...path, monkey]);
      const path2 = dfs(m2, [...path, monkey]);
      return [...path1, ...path2];
    }

    return [];
  };

  const path1 = dfs(m1, []);
  const path2 = dfs(m2, []);

  // the path to humn is our variable, but we can solve the other side of the equation
  const solveFor = path1.length === 0 ? m1 : m2;
  let monkeysToCheck = [...monkeys.keys()].filter(
    (monkey) => !/\d+/.test(monkeys.get(monkey))
  );
  while (!/\d+/.test(monkeys.get(solveFor))) {
    for (const monkey of monkeysToCheck) {
      const job = monkeys.get(monkey);
      const [m1, op, m2] = job.split(" ");
      if (/\d+/.test(monkeys.get(m1)) && /\d+/.test(monkeys.get(m2))) {
        const val = eval(`${monkeys.get(m1)} ${op} ${monkeys.get(m2)}`);
        monkeys.set(monkey, val);
      }
    }
    monkeysToCheck = monkeysToCheck.filter(
      (monkey) => !/\d+/.test(monkeys.get(monkey))
    );
  }

  // given one side of the equation is solved, we need to generate the rest of the equation
  const pathToSolve = (path1.length === 0 ? path2 : path1).reverse();

  for (const monkey of pathToSolve) {
    const job = monkeys.get(monkey);
    const [m1, op, m2] = job.split(" ");
    monkeys.set(monkey, `(${monkeys.get(m1)} ${op} ${monkeys.get(m2)})`);
  }

  const x1 = algebra.parse(monkeys.get(m1));
  const x2 = algebra.parse(`${monkeys.get(m2)}`);
  const eq = new algebra.Equation(x1, x2);

  return +eq.solveFor("x").toString();
};

console.log(starOne());
console.log(starTwo());

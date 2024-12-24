const { getRawInput } = require("./utils");
require("lodash.permutations");
const _ = require("lodash");

const getInput = () => {
  const [startValues, connections] = getRawInput("day24")
    .trim()
    .split("\n\n")
    .map((l) => l.split("\n"));

  return {
    startValues: startValues.map((x) => {
      const [wire, val] = x.split(": ");
      return { wire, val: Number(val) };
    }),
    connections: connections.map((x, id) => {
      const [a, op, b, , c] = x.split(" ");
      return { a, op, b, c, id };
    }),
  };
};

const OPS = {
  AND: (a, b) => a & b,
  XOR: (a, b) => a ^ b,
  OR: (a, b) => a || b,
};

const solve = (swap = []) => {
  const { startValues, connections } = getInput();

  // apply swaps
  if (swap.length) {
    for (let i = 0; i < swap.length; i += 2) {
      // swap each pair of gates outputs
      connections.find((c) => c.id === swap[i].id).c = swap[i + 1].c;
      connections.find((c) => c.id === swap[i + 1].id).c = swap[i].c;
    }
  }

  const hasVal = (wire) => wires[wire] != null;

  // populate initial values
  const wires = {};
  for (const { wire, val } of startValues) wires[wire] = val;

  // populate z wires for output
  const zWires = new Set();
  for (const { c } of connections) c.startsWith("z") && zWires.add(c);

  // while all z wires haven't received an input...
  // we add a failsafe that returns if we go over the 200 rounds
  let round = 0;
  const MAX_ROUNDS = 200;
  const doneConnections = new Set();
  while ([...zWires].some((zWire) => !hasVal(zWire))) {
    if (round++ > MAX_ROUNDS) break;
    // weak comparison for null and undefined
    for (const { id, a, op, b, c } of connections.filter(
      (c) => !doneConnections.has(c.id)
    )) {
      if (hasVal(a) && hasVal(b)) {
        wires[c] = OPS[op](wires[a], wires[b]);
        doneConnections.add(id);
      }
    }
  }

  // sort z wires from 0 to x, get their bit values, joined them to create the final binary number and turn it into an integer
  const binaryOutput = [...zWires].sort().map((wire) => wires[wire]);

  return { binaryOutput, wires };
};

const isXYGate = (gate) =>
  (gate.a.startsWith("x") && gate.b.startsWith("y")) ||
  (gate.b.startsWith("x") && gate.a.startsWith("y"));

// we try to automate the manual check by finding those sums that do not produce the right output.
// this is flaky as a wrong sum causes following sums to be wrong until the carry resets
// so we filter out those sums that are right after an error
// i.e. errors at 10,11,12,16 should filter out 11 and 12 as they are right after 10, and should only keep 10 and 16
const getWrongSums = (xWires, yWires, binaryOutput) => {
  const wrongSums = [];
  let carry = 0;
  for (let pos = 0; pos < xWires.length; pos++) {
    const a = xWires[pos];
    const b = yWires[pos];
    const c = binaryOutput[pos];
    const sum = Number(a) + Number(b) + carry;
    // sum can either be 0,1,2,3
    // int to bin
    // 0 -> 0
    // 1 -> 1
    // 2 -> 10
    // 3 -> 11
    if (sum === 0 && c != 0) wrongSums.push(pos);
    else if (sum === 1 && c != 1) wrongSums.push(pos);
    else if (sum === 2 && c != 0) wrongSums.push(pos);
    else if (sum === 3 && c != 1) wrongSums.push(pos);
    carry = sum > 1 ? 1 : 0;
  }

  // filter out wrong sums that follow in a row and keep only the first, as described above
  // also map the position to the z gate name
  const faulty = [];
  for (let i = 0; i < wrongSums.length; i++) {
    while (wrongSums[i] !== wrongSums[i - 1] + 1) {
      if (i >= wrongSums.length - 1) break;
      faulty.push(`z${`0${wrongSums[i]}`.substr(-2)}`);
      i++;
    }
  }
  return faulty;
};

const star1 = () => {
  return parseInt(solve().binaryOutput.reverse().join(""), 2);
};

const star2 = () => {
  const { connections } = getInput();
  const { wires, binaryOutput } = solve();

  const xWires = Object.keys(wires)
    .filter((w) => w.startsWith("x"))
    .sort()
    .map((w) => wires[w]);
  const yWires = Object.keys(wires)
    .filter((w) => w.startsWith("y"))
    .sort()
    .map((w) => wires[w]);

  console.log("0" + [...xWires].reverse().join(""));
  console.log("0" + [...yWires].reverse().join(""));
  console.log("-".repeat(binaryOutput.length));
  console.log([...binaryOutput].reverse().join(""));

  // MANUAL CHECK
  // 4444443333333333222222222211111111110000000000 tens
  // 5432109876543210987654321098765432109876543210 units
  //       x  xx                xx      x           errors
  // 1         111111     111       111         11  carry
  // 0101101010111101101000111000000010110000000011 x
  // 0100011100111110100010111100110001110000011011 y
  // ----------------------------------------------
  // 1001111111011100001011110101010100010000011110 z

  // errors on
  // z10 z17 z35 z39 (z18 and z36 are wrong as a result of a wrong carry from z17 and z35 respectively)

  const faulty = getWrongSums(xWires, yWires, binaryOutput);
  console.log("Faulty z outputs at positions:", faulty);

  // now we need to find how to swap things around to make the of x and y return z
  // by looking at hints on reddit, it looks like every z output must be the result of a XOR between x and y at the same position
  // we now have the 4 z that need fixing, we need to find in their tree what to change
  // we sort as we need to solve the lowest z first
  const pathsA = faulty.sort().map((z) => {
    const path = [connections.find((c) => c.c === z)];
    const len = path.length;
    for (let i = 0; i < len; i++) {
      const gate = path[i];
      if (isXYGate(gate)) break;
      const aGate = connections.find((c) => c.c === gate.a);
      const bGate = connections.find((c) => c.c === gate.b);
      if (!path.find((p) => p.id === aGate.id)) path.push(aGate);
      if (!path.find((p) => p.id === bGate.id)) path.push(bGate);
    }
    return path.map((p) => ({ ...p, original: z }));
  });

  // by looking at the results, we either are NOT XORing the x and y or we are not XORing the last gate that outputs to z
  // so we now need to find the exact operations that we need to swap
  const toSwapA = pathsA.map((path) => {
    // check the x/y operation
    const xy = path.find((gate) => isXYGate(gate));
    const zOut = path.find((gate) => gate.c.startsWith("z"));
    if (zOut.op !== "XOR") return zOut;
    if (xy.op !== "XOR") return xy;
  });

  // we now have one side of the swaps, start from the first and try to solve it by swapping with anything else until it works
  const toSwapB = [];
  for (let i = 0; i < toSwapA.length; i++) {
    const swap = toSwapA[i];
    // try swapping it with any other
    const possibleSwaps = [];
    for (const connection of connections) {
      // we consider only XOR operations
      if (swap.id === connection.id || connection.op !== "XOR") continue;
      const { binaryOutput } = solve([...toSwapB, swap, connection]);

      // we consider only those swap that make the first error become the one next in line
      // i.e. if there are errors at z10 z20 and z30, we solved z10 when the first error is z20
      const wrong = getWrongSums(xWires, yWires, binaryOutput);
      if (wrong[0] === faulty[i + 1]) possibleSwaps.push(connection);
    }
    const swapB = possibleSwaps
      .filter((c) => {
        // we can't choose some gate with x/y on a different position
        if (c.a.startsWith("x") || faulty[i].startsWith("y"))
          return c.a.substr(-2) === swap.c.substr(-2);
        return true;
      })
      .pop();
    swapB && toSwapB.push(swap, swapB);
  }
  return toSwapB
    .map((c) => c.c)
    .sort()
    .join(",");
};

console.log(star1());
console.log(star2());

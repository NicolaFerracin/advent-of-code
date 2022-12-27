const { getStringArrayInput } = require("./utils");

const starOne = () => {
  const allSteps = new Set();
  const prerequesites = getStringArrayInput("day07").reduce((steps, line) => {
    const [, stepA, , , , , , stepB] = line.split(" ");
    if (!(stepB in steps)) steps[stepB] = [];

    steps[stepB].push(stepA);

    allSteps.add(stepA);
    allSteps.add(stepB);

    return steps;
  }, {});

  const orderedSteps = [];
  while (allSteps.size) {
    // order remaining steps alphabetically
    const sorted = [...allSteps].sort((a, b) => a.localeCompare(b));

    // find the first available step that does not have any prerequisite
    for (const step of sorted) {
      if (!(step in prerequesites) || prerequesites[step].length === 0) {
        // add the current step in the list of ordered steps
        orderedSteps.push(step);

        // remove the current step as a prerequisite from other steps
        Object.keys(prerequesites).forEach((k) => {
          prerequesites[k] = prerequesites[k].filter((s) => s !== step);
        });

        // remove the current step from available steps
        allSteps.delete(step);

        break;
      }
    }
  }

  return orderedSteps.join("");
};

const starTwo = () => {
  const allSteps = new Set();
  const prerequesites = getStringArrayInput("day07").reduce((steps, line) => {
    const [, stepA, , , , , , stepB] = line.split(" ");
    if (!(stepB in steps)) steps[stepB] = [];

    steps[stepB].push(stepA);

    allSteps.add(stepA);
    allSteps.add(stepB);

    return steps;
  }, {});

  const workers = 5;
  const time = 60;
  let timeElapsed = 0;
  const pendingSteps = new Map();

  while (allSteps.size) {
    // process pending steps
    [...pendingSteps.keys()].forEach((k) => {
      // decrease remaining time
      pendingSteps.set(k, pendingSteps.get(k) - 1);

      // once we reach zero...
      if (pendingSteps.get(k) <= 0) {
        // clear from the pending list
        pendingSteps.delete(k);

        // remove as a prerequisite from other steps
        Object.keys(prerequesites).forEach((key) => {
          prerequesites[key] = prerequesites[key].filter((s) => s !== k);
        });

        // remove the current step from available steps
        allSteps.delete(k);
      }
    });

    if (allSteps.size === 0) return timeElapsed;

    // order remaining steps alphabetically
    const sorted = [...allSteps].sort((a, b) => a.localeCompare(b));

    // keep adding steps without prerequisites to the pending list, as long as we have free workers
    for (const step of sorted) {
      if (pendingSteps.has(step) || pendingSteps.size === workers) continue;
      if (!(step in prerequesites) || prerequesites[step].length === 0) {
        pendingSteps.set(
          step,
          time + step.charCodeAt(0) - "A".charCodeAt(0) + 1
        );
      }
    }

    timeElapsed++;
  }
};

console.log(starOne());
console.log(starTwo());

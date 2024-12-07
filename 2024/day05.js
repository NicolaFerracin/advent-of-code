const { getRawInput } = require("./utils");

const [rulesRaw, updatesRaw] = getRawInput("day05").split("\n\n");
const rules = rulesRaw.split("\n").map((x) => x.split("|").map(Number));
const updates = updatesRaw.split("\n").map((x) => x.split(",").map(Number));

const isUpdateInOrder = (update) =>
  rules.every(
    ([page1, page2]) =>
      !update.includes(page1) ||
      !update.includes(page2) ||
      update.indexOf(page1) < update.indexOf(page2)
  );

const sumMiddlePages = (acc, curr) =>
  (acc += curr[Math.floor(curr.length / 2)]);

const star1 = () => {
  return updates
    .filter((update) => isUpdateInOrder(update))
    .reduce(sumMiddlePages, 0);
};

const star2 = () => {
  return updates
    .filter((update) => !isUpdateInOrder(update))
    .map((update) => {
      const newUpdate = [];
      // find the number in the update that does not have a rule placing it after another number from the update
      for (let i = 0; i < update.length; i++) {
        const page = update[i];
        if (
          rules.every(([page1, page2]) => {
            // if current page is after another page in the same update, FALSE
            if (page2 === page && update.includes(page1)) {
              return false;
            }
            return true;
          })
        ) {
          // place page in the ordered update
          newUpdate.push(page);

          // remove page from the unordered update and decrease i
          update.splice(i, 1);
          i = -1;
        }
      }
      return newUpdate;
    })
    .reduce(sumMiddlePages, 0);
};

console.log(star1());
console.log(star2());

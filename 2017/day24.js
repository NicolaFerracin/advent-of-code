const { getStringArrayInput, deepClone } = require("./utils");

const bothStars = () => {
  const bridges = getStringArrayInput("day24").reduce((bridges, curr) => {
    const [a, b] = curr.split("/").map((_) => +_);

    if (!(a in bridges)) bridges[a] = [];
    if (!(b in bridges)) bridges[b] = [];
    bridges[a].push(b);
    bridges[b].push(a);

    return bridges;
  }, {});

  let starOneMaxScore = 0;
  let starTwoMaxScore = 0;
  let starTwoMaxLength = 0;
  const dfs = (currentPin, score, availableBridges, seen) => {
    // if there is no option available for the current pin, wrap it up
    if (availableBridges[currentPin].length === 0) {
      // STAR ONE
      starOneMaxScore = Math.max(starOneMaxScore, score);

      // STAR TWO
      if (seen.length >= starTwoMaxLength) {
        starTwoMaxScore =
          seen.length > starTwoMaxLength
            ? score
            : Math.max(starTwoMaxScore, score);
        starTwoMaxLength = seen.length;
      }

      return;
    }

    // try all different connections
    availableBridges[currentPin].forEach((b) => {
      const newBridges = deepClone(availableBridges);
      newBridges[currentPin] = newBridges[currentPin].filter((x) => x !== b);
      newBridges[b] = newBridges[b].filter((x) => x !== currentPin);

      dfs(b, score + b + currentPin, newBridges, [...seen, b]);
    });
  };

  dfs(0, 0, deepClone(bridges), [0]);

  return { starOne: starOneMaxScore, starTwo: starTwoMaxScore };
};

console.log(bothStars());

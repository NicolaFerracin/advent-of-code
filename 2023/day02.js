const { getStringArrayInput } = require("./utils");

const allStars = () => {
  const cubes = {
    red: 12,
    green: 13,
    blue: 14,
  };
  return getStringArrayInput("day02").reduce(
    (acc, l) => {
      const [part1, part2] = l.split(":");
      const id = +part1.split(" ").pop();
      const subsets = part2
        .split(";")
        .map((s) => s.split(",").map((x) => x.trim()));
      const minCubes = {
        red: 0,
        green: 0,
        blue: 0,
      };
      let isGameValid = true;
      subsets.forEach((s) =>
        s.forEach((pair) => {
          const [amount, color] = pair.split(" ");
          minCubes[color] = Math.max(+amount, minCubes[color]);
          if (isGameValid) isGameValid = +amount <= cubes[color];
        })
      );

      if (isGameValid) acc.star1 += id;
      acc.star2 += minCubes.red * minCubes.blue * minCubes.green;

      return acc;
    },
    { star1: 0, star2: 0 }
  );
};

console.log(allStars());

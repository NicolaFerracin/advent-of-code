const { getStringArrayInput } = require("./utils");

const exec = (star, time) => {
  const blueprints = getStringArrayInput("day19").map((line) => {
    const amounts = line.match(/\d+/g).map((_) => +_);

    return {
      id: amounts.shift(),
      oreRobotCost: {
        ore: amounts.shift(),
      },
      clayRobotCost: {
        ore: amounts.shift(),
      },
      obsidianRobotCost: {
        ore: amounts.shift(),
        clay: amounts.shift(),
      },
      geodeRobotCost: {
        ore: amounts.shift(),
        obsidian: amounts.shift(),
      },
    };
  });

  const qualityLevels = blueprints
    .filter((_, i) => {
      if (star === "one") return true;
      if (star === "two") return i <= 2;
    })
    .map((b) => {
      let maxGeode = 0;

      let queue = [
        {
          blueprint: b,
          resources: { ore: 0, clay: 0, obsidian: 0, geode: 0 },
          robots: { ore: 1, clay: 0, obsidian: 0, geode: 0 },
          time,
        },
      ];

      while (queue.length) {
        let len = queue.length;

        while (len > 0) {
          len--;

          const { blueprint, resources, robots, time } = queue.shift();

          // time is over
          if (time === 0) {
            maxGeode = Math.max(maxGeode, resources.geode);
            continue;
          }

          // GEODE ROBOT
          if (
            resources.ore >= blueprint.geodeRobotCost.ore &&
            resources.obsidian >= blueprint.geodeRobotCost.obsidian
          ) {
            queue.push({
              blueprint,
              resources: {
                ore: resources.ore - blueprint.geodeRobotCost.ore + robots.ore,
                clay: resources.clay + robots.clay,
                obsidian:
                  resources.obsidian -
                  blueprint.geodeRobotCost.obsidian +
                  robots.obsidian,
                geode: resources.geode + robots.geode,
              },
              robots: {
                ...robots,
                geode: robots.geode + 1,
              },
              time: time - 1,
            });
          } else {
            // OBSIDIAN ROBOT
            const hasEnoughObsidianRobots =
              robots.obsidian >= blueprint.geodeRobotCost.obsidian;
            if (
              !hasEnoughObsidianRobots &&
              resources.ore >= blueprint.obsidianRobotCost.ore &&
              resources.clay >= blueprint.obsidianRobotCost.clay
            ) {
              queue.push({
                blueprint,
                resources: {
                  ore:
                    resources.ore -
                    blueprint.obsidianRobotCost.ore +
                    robots.ore,
                  clay:
                    resources.clay -
                    blueprint.obsidianRobotCost.clay +
                    robots.clay,
                  obsidian: resources.obsidian + robots.obsidian,
                  geode: resources.geode + robots.geode,
                },
                robots: {
                  ...robots,
                  obsidian: robots.obsidian + 1,
                },
                time: time - 1,
              });
            }

            // CLAY ROBOT
            const hasEnoughClayRobots =
              robots.clay >= blueprint.obsidianRobotCost.clay;
            if (
              !hasEnoughClayRobots &&
              resources.ore >= blueprint.clayRobotCost.ore
            ) {
              queue.push({
                blueprint,
                resources: {
                  ore: resources.ore - blueprint.clayRobotCost.ore + robots.ore,
                  clay: resources.clay + robots.clay,
                  obsidian: resources.obsidian + robots.obsidian,
                  geode: resources.geode + robots.geode,
                },
                robots: {
                  ...robots,
                  clay: robots.clay + 1,
                },
                time: time - 1,
              });
            }

            // ORE ROBOT
            const hasEnoughOreRobots =
              robots.ore >=
              blueprint.oreRobotCost.ore +
                blueprint.clayRobotCost.ore +
                blueprint.obsidianRobotCost.ore +
                blueprint.geodeRobotCost.ore;
            if (
              !hasEnoughOreRobots &&
              resources.ore >= blueprint.oreRobotCost.ore
            ) {
              queue.push({
                blueprint,
                resources: {
                  ore: resources.ore - blueprint.oreRobotCost.ore + robots.ore,
                  clay: resources.clay + robots.clay,
                  obsidian: resources.obsidian + robots.obsidian,
                  geode: resources.geode + robots.geode,
                },
                robots: {
                  ...robots,
                  ore: robots.ore + 1,
                },
                time: time - 1,
              });
            }
          }

          // do not build any robot, just collect resources
          queue.push({
            blueprint,
            resources: {
              ore: resources.ore + robots.ore,
              clay: resources.clay + robots.clay,
              obsidian: resources.obsidian + robots.obsidian,
              geode: resources.geode + robots.geode,
            },
            robots: { ...robots },
            time: time - 1,
          });
        }

        // apply a score to each state based on the importance of the resource
        queue.forEach((state) => {
          const geodeScore =
            (state.resources.geode + state.time * state.robots.geode) * 1000;
          const obsidianScore = state.robots.obsidian * 100;
          const clayScore = state.robots.clay * 10;
          const oreScore = state.robots.ore * 10;

          state.score = geodeScore + obsidianScore + clayScore + oreScore;
        });

        // keep only the states with higher score
        queue = queue.sort((a, b) => b.score - a.score).slice(0, 4_000);
      }

      return star === "one" ? maxGeode * b.id : maxGeode;
    });

  if (star === "one") {
    return qualityLevels.reduce(
      (total, qualityLevel) => (total += qualityLevel),
      0
    );
  }

  if (star === "two") {
    return qualityLevels.reduce(
      (total, qualityLevel) => (total *= qualityLevel),
      1
    );
  }
};

const starOne = () => {
  return exec("one", 24);
};

const starTwo = () => {
  return exec("two", 32);
};

console.log(starOne());
console.log(starTwo());

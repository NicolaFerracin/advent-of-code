const { getStringArrayInput } = require("./utils");

const exec = (countCalories) => {
  const ingredients = getStringArrayInput("day15").map((line) => {
    const [name, capacity, durability, flavor, texture, calories] =
      line.match(/^([a-z]+)|-?\d+/gi);

    return {
      name,
      capacity: +capacity,
      durability: +durability,
      flavor: +flavor,
      texture: +texture,
      calories: +calories,
    };
  });

  let best = 0;
  for (let a = 1; a < 100; a++) {
    const A = ingredients[0];

    for (let b = 1; b < 100; b++) {
      if (a + b > 100) continue;
      const B = ingredients[1];

      for (let c = 1; c < 100; c++) {
        if (a + b + c > 100) continue;
        const C = ingredients[2];

        for (let d = 1; d < 100; d++) {
          if (a + b + c + d !== 100) continue;
          const D = ingredients[3];

          const [capacity, durability, flavor, texture, calories] = [
            "capacity",
            "durability",
            "flavor",
            "texture",
            "calories",
          ].map((key) =>
            Math.max(0, a * A[key] + b * B[key] + c * C[key] + d * D[key])
          );

          if (countCalories && calories !== 500) continue;

          best = Math.max(best, capacity * durability * flavor * texture);
        }
      }
    }
  }
  return best;
};

const starOne = () => {
  return exec(false);
};

const starTwo = () => {
  return exec(true);
};

console.log(starOne());
console.log(starTwo());

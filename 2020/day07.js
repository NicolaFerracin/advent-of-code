const { getStringArrayInput } = require("./utils");

console.log(
  (function starOne() {
    const input = getStringArrayInput("day07");

    const colors = {};
    for (let i = 0; i < input.length; i++) {
      const [color, containsRaw] = input[i].split(" bags contain ");
      const contains = containsRaw.match(/(?<=\d ).*?(?=[.,])/g)?.map((c) => {
        const parts = c.split(" ");
        parts.pop();
        return parts.join(" ");
      });
      colors[color] = contains;
    }

    const dfs = (color) => {
      if (!colors[color]) return false;
      if (colors[color].indexOf("shiny gold") >= 0) return true;

      return colors[color].find((color) => dfs(color)) ? 1 : 0;
    };

    return Object.keys(colors).filter((color) => dfs(color)).length;
  })()
);

console.log(
  (function starTwo() {
    const input = getStringArrayInput("day07");

    const colors = {};
    for (let i = 0; i < input.length; i++) {
      const [color, containsRaw] = input[i].split(" bags contain ");
      const contains = containsRaw.match(/(\d+.*?)(?=[.,])/g)?.map((c) => {
        const parts = c.split(" ");
        parts.pop();
        const count = Number(parts.shift());
        return { count, bag: parts.join(" ") };
      });
      colors[color] = contains;
    }

    let count = 0;
    const dfs = (color, multiplier) => {
      if (!colors[color]) return;
      colors[color].forEach((c) => {
        count += c.count * multiplier;

        dfs(c.bag, c.count * multiplier);
      });
    };

    dfs("shiny gold", 1);
    return count;
  })()
);

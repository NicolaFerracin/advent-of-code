const { getStringArrayInput } = require("./utils");

const hasAbba = (ip) => {
  if (ip.length < 4) return false;
  for (let i = 0; i < ip.length - 3; i++) {
    if (ip[i] !== ip[i + 1] && ip[i] === ip[i + 3] && ip[i + 1] === ip[i + 2]) {
      return true;
    }
  }
  return false;
};

const findAba = (aba, ip) => {
  for (let i = 0; i < ip.length - 2; i++) {
    if (ip[i] === ip[i + 2] && ip[i] !== ip[i + 1]) {
      aba.push(ip.substring(i, i + 3));
    }
  }
  return aba;
};

const findBab = (aba, ip) => {
  for (let i = 0; i < ip.length - 2; i++) {
    if (ip[i] === ip[i + 2] && ip[i] !== ip[i + 1]) {
      if (aba.includes(`${ip[i + 1]}${ip[i]}${ip[i + 1]}`)) return true;
    }
  }
  return false;
};

const starOne = () => {
  return getStringArrayInput("day07")
    .map((x) => {
      const outside = x.replace(/(\[.*?\])/g, "-").split("-");
      const inside = x
        .match(/(\[.*?\])/g)
        .map((x) => x.substring(1, x.length - 1));

      return { outside, inside };
    })
    .reduce((tls, { outside, inside }) => {
      const hasAbbaOutside = !!outside.find(hasAbba);
      const hasAbbaInside = !!inside.find(hasAbba);
      return hasAbbaOutside && !hasAbbaInside ? ++tls : tls;
    }, 0);
};

const starTwo = () => {
  return getStringArrayInput("day07")
    .map((x) => {
      const outside = x.replace(/(\[.*?\])/g, "-").split("-");
      const inside = x
        .match(/(\[.*?\])/g)
        .map((x) => x.substring(1, x.length - 1));

      return { outside, inside };
    })
    .reduce((ssl, { outside, inside }) => {
      const aba = outside.reduce(findAba, []);
      const bab = !!inside.find((_) => findBab(aba, _));
      return bab ? ++ssl : ssl;
    }, 0);
};

console.log(starOne());
console.log(starTwo());

const { getStringArrayInput } = require("./utils");
require("lodash.permutations");
const _ = require("lodash");

const ops = {
  swap: (str, what, item, target) => {
    if (what === "letter") {
      item = str.indexOf(item);
      target = str.indexOf(target);
    }
    const temp = str[item];
    str[item] = str[target];
    str[target] = temp;
    return str;
  },

  reverse: (str, _, item, target) => {
    return [
      ...str.slice(0, item),
      ...str.slice(item, target + 1).reverse(),
      ...str.slice(target + 1),
    ];
  },

  rotate: (str, what, item, target) => {
    if (what === "based") {
      what = "right";
      item = str.indexOf(target) + 1;
      if (item >= 5) item++;
    }
    for (let i = 0; i < Number(item); i++) {
      if (what === "left") str.push(str.shift());
      else str.unshift(str.pop());
    }
    return str;
  },

  move: (str, _, item, target) => {
    if (item < target) {
      return [
        ...str.slice(0, item),
        ...str.slice(item + 1, target + 1),
        str[item],
        ...str.slice(target + 1),
      ];
    } else {
      return [
        ...str.slice(0, target),
        str[item],
        ...str.slice(target, item),
        ...str.slice(item + 1),
      ];
    }
  },
};

const exec = (initial) => {
  return getStringArrayInput("day21")
    .reduce((str, line) => {
      let [action, what, item, ...rest] = line.split(" ");
      let target = rest.pop();
      if (/\d/.test(item)) item = Number(item);
      if (/\d/.test(target)) target = Number(target);
      return ops[action](str, what, item, target);
    }, initial.split(""))
    .join("");
};

const starOne = () => {
  return exec("abcdefgh");
};

const starTwo = () => {
  const STR = "fbgdceah";
  const permutations = _.permutations(STR, STR.length);

  for (const permutation of permutations) {
    const final = exec(permutation.join(""));
    if (final === STR) return permutation.join("");
  }
};

console.log(starOne());
console.log(starTwo());

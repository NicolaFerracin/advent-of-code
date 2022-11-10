const md5 = require("md5");

const exec = (hashGenerator) => {
  const salt = "ahsbgdzn";

  const three = new Map();
  const list = [];
  let i = 0;

  while (list.length < 64) {
    const hash = hashGenerator(md5(`${salt}${i}`));
    for (let x = 4; x < hash.length; x++) {
      if (
        hash[x] === hash[x - 1] &&
        hash[x] === hash[x - 2] &&
        hash[x] === hash[x - 3] &&
        hash[x] === hash[x - 4]
      ) {
        if (three.has(hash[x])) {
          const matches = three.get(hash[x]);
          while (matches.length) {
            const index = matches.shift();
            if (i - index < 1000 && list.length < 64) list.push(index);
          }
        }
      }
    }

    for (let x = 2; x < hash.length; x++) {
      if (hash[x] === hash[x - 1] && hash[x] === hash[x - 2]) {
        if (!three.has(hash[x])) three.set(hash[x], []);
        three.get(hash[x]).push(i);
        break;
      }
    }

    i += 1;
  }
  return list.pop();
};

const starOne = () => {
  return exec((x) => x);
};

const starTwo = () => {
  const generateHash = (hash, timesLeft) => {
    if (timesLeft === 0) return hash;
    return generateHash(md5(hash), timesLeft - 1);
  };

  return exec((hash) => generateHash(hash, 2016));
};

console.log(starOne());
console.log(starTwo());

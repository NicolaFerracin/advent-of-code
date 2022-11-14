const input = "1113122113";

const exec = (times) => {
  let str = input;
  for (let i = 0; i < times; i++) {
    let prev = str[0];
    let counter = 1;
    let newStr = "";
    for (let x = 1; x <= str.length; x++) {
      if (prev === str[x] && x < str.length) counter++;
      else {
        newStr += `${counter}${prev}`;
        counter = 1;
        prev = str[x];
      }
    }

    str = newStr;
  }
  return str.length;
};

const starOne = () => {
  return exec(40);
};

const starTwo = () => {
  return exec(50);
};

console.log(starOne());
console.log(starTwo());

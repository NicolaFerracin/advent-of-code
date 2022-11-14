const INITIAL = "hxbxwxba";

const isValid = (pw) => {
  const containsConfusingLetters = /[iol]/g.test(pw);
  if (containsConfusingLetters) return false;

  let pairs = 0;
  let hasThreeIncreasing = false;
  for (let i = 1; i < pw.length; i++) {
    if (pw[i - 1] === pw[i] && pw[i - 2] !== pw[i]) pairs++;

    if (i > 1) {
      const a = pw[i - 2].charCodeAt(0);
      const b = pw[i - 1].charCodeAt(0);
      const c = pw[i].charCodeAt(0);
      if (a + 1 === b && a + 2 === c) hasThreeIncreasing = true;
    }
  }
  return pairs >= 2 && hasThreeIncreasing;
};

const A_CHAR_CODE = "a".charCodeAt(0);

const generateNext = (old) => {
  let newPw = old.split("");
  let i = newPw.length - 1;
  let wasLastZ = true;
  while (wasLastZ) {
    const curr = newPw[i];
    const newCharCode =
      ((curr.charCodeAt(0) - A_CHAR_CODE + 1 + 26) % 26) + A_CHAR_CODE;
    newPw[i] = String.fromCharCode(newCharCode);
    wasLastZ = curr === "z";
    i--;
  }
  return newPw.join("");
};

const starOne = () => {
  let pw = INITIAL;
  while (!isValid(pw)) pw = generateNext(pw);
  return pw;
};

const starTwo = () => {
  let pw = generateNext(starOne());
  while (!isValid(pw)) pw = generateNext(pw);
  return pw;
};

console.log(starOne());
console.log(starTwo());

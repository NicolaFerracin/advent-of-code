const input = "77 515 6779622 6 91370 959685 0 9861".split(" ").map(Number);

// If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
// If the stone is engraved with a number that has an even number of digits, it is replaced by two stones. The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone. (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
// If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone.

const blink = (stonesMap) => {
  for (const [stone, times] of [...stonesMap]) {
    stonesMap.set(stone, stonesMap.get(stone) - times);
    if (stonesMap.get(stone) === 0) stonesMap.delete(stone);

    const strStone = stone.toString();

    if (stone === 0) stonesMap.set(1, (stonesMap.get(1) ?? 0) + times);
    else if (strStone.length % 2 === 0) {
      const left = Number(strStone.substring(0, strStone.length / 2));
      stonesMap.set(left, (stonesMap.get(left) ?? 0) + times);

      const right = Number(strStone.substring(strStone.length / 2));
      stonesMap.set(right, (stonesMap.get(right) ?? 0) + times);
    } else
      stonesMap.set(stone * 2024, (stonesMap.get(stone * 2024) ?? 0) + times);
  }
};

const star1 = () => {
  const stonesMap = [...input].reduce(
    (map, curr) => map.set(curr, (map.get(curr) ?? 0) + 1),
    new Map()
  );
  const BLINKS = 25;
  for (let i = 0; i < BLINKS; i++) stones = blink(stonesMap);
  return [...stonesMap].reduce((tot, stone) => tot + stone[1], 0);
};

const star2 = () => {
  const stonesMap = [...input].reduce(
    (map, curr) => map.set(curr, (map.get(curr) ?? 0) + 1),
    new Map()
  );
  const BLINKS = 75;
  for (let i = 0; i < BLINKS; i++) blink(stonesMap);
  return [...stonesMap].reduce((tot, stone) => tot + stone[1], 0);
};

console.log(star1());
console.log(star2());

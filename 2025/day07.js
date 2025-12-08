const { readInput, splitIntoMatrix, print } = require("./utils");

const input = splitIntoMatrix(readInput("day07"));

const star1 = () => {
  const start = input[0].indexOf("S");
  input[1][start] = "|"; // needed for part 2
  const beams = [start];
  let split = 0;
  for (let lineI = 2; lineI < input.length; lineI += 2) {
    const line = input[lineI];
    let len = beams.length;
    while (len >= 0) {
      const beam = beams.shift();
      len--;
      if (line[beam] === "^") {
        split++;
        if (beams.indexOf(beam - 1) < 0) {
          beams.push(beam - 1);
        }
        if (beams.indexOf(beam + 1) < 0) {
          beams.push(beam + 1);
        }
      } else {
        beams.push(beam);
      }
    }
    // this is going to be used in part 2
    beams.forEach((b) => {
      input[lineI][b] = "|";
      input[lineI + 1][b] = "|";
    });
  }
  return split;
};

const star2 = () => {
  const start = input[0].indexOf("S");
  const tMapping = new Map();
  const LAST_ROW = input.length - 1;

  for (let rowI = input.length - 2; rowI > 0; rowI -= 2) {
    const row = input[rowI];
    for (let colI = 0; colI < row.length; colI++) {
      if (row[colI] !== "^") continue; // not a splitter, continue
      if (input[rowI - 1][colI] !== "|") continue; // no beam coming from above, continue
      const key = `${rowI}-${colI}`;
      if (rowI === input.length - 2)
        tMapping.set(key, 2); // initial row (last row)
      else {
        // follow the beam left and right until we hit a splitter we previously mapped
        // use the previously calculated value to determine how many timelines the current splitter generates
        let timelinesTally = tMapping.get(key) ?? 0;
        [-1, +1].forEach((delta) => {
          let rowLeft = rowI;
          const colLeft = colI + delta;
          while (input[rowLeft][colLeft] === "|" && rowLeft < LAST_ROW)
            rowLeft++;
          timelinesTally += tMapping.get(`${rowLeft}-${colLeft}`) ?? 1;
        });

        tMapping.set(key, timelinesTally);
      }
    }
  }

  // get the timelines of the splitter right below the starting point
  return tMapping.get(`2-${start}`);
};

print(star1);
print(star2);

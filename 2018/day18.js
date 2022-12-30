const { getStringArrayInput, deepClone } = require("./utils");

const getAreaByType = (area, type) => {
  return area.reduce(
    (total, row) =>
      (total += row.reduce((totalRow, cell) => (totalRow += cell === type), 0)),
    0
  );
};

const getNextCell = (x, y, area) => {
  const neighbours = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
  ].reduce(
    (acc, delta) => {
      if (
        x + delta[0] < 0 ||
        y + delta[1] < 0 ||
        x + delta[0] === area.length ||
        y + delta[1] === area[x].length
      )
        return acc;
      acc[area[x + delta[0]][y + delta[1]]]++;
      return acc;
    },
    { "|": 0, ".": 0, "#": 0 }
  );
  if (area[x][y] === ".") {
    return neighbours["|"] >= 3 ? "|" : ".";
  } else if (area[x][y] === "|") {
    return neighbours["#"] >= 3 ? "#" : "|";
  } else if (area[x][y] === "#") {
    return neighbours["|"] >= 1 && neighbours["#"] >= 1 ? "#" : ".";
  }
};

const play = (minutes) => {
  let area = getStringArrayInput("day18").map((row) => row.split(""));

  const seenStates = new Map();
  let foundLoop = false;
  let targetMinute = 0;
  for (let minute = 1; minute <= minutes; minute++) {
    const newArea = deepClone(area);
    for (let x = 0; x < area.length; x++) {
      for (let y = 0; y < area[x].length; y++) {
        newArea[x][y] = getNextCell(x, y, area);
      }
    }
    const areaKey = newArea.map((row) => row.join("")).join("");

    // there is an initial buffer before we start looping over the same states infintely
    // the initial buffer is given by the minute at which we saw the current repeating state (the start of the loop)
    // we need to find how many minutes to wait so that we are in a state that will repeat itself at x minutes
    // currentMinute + ((targetMinutes - buffer) )
    if (!foundLoop && seenStates.has(areaKey)) {
      const initialBuffer = seenStates.get(areaKey);
      const loopSize = minute - initialBuffer;
      targetMinute = minute + ((minutes - initialBuffer) % loopSize);
      foundLoop = true;
    }
    seenStates.set(areaKey, minute);

    area = newArea;

    if (foundLoop && targetMinute === minute) break;
  }

  return getAreaByType(area, "|") * getAreaByType(area, "#");
};

const starOne = () => {
  return play(10);
};

const starTwo = () => {
  return play(1000000000);
};

console.log(starOne());
console.log(starTwo());

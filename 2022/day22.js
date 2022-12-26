const { EOL } = require("os");
const { getRawInput } = require("./utils");

const getNextTileOne = (map, x, y, dir) => {
  const delta = deltaByDir[dir];

  // 3 options:
  // - next tile is free => move
  // - next tile is wall => stay
  // - next tile needs to wrap => wrap and check

  if (
    x + delta[0] < 0 ||
    x + delta[0] >= map.length ||
    y + delta[1] < 0 ||
    y + delta[1] >= map[0].length ||
    map[x + delta[0]][y + delta[1]] === " "
  ) {
    const left =
      dir === 0 || dir === 1 ? 0 : dir === 0 ? map.length : map[0].length;
    const right =
      dir === 2 || dir === 3 ? 0 : dir === 2 ? map.length : map[0].length;
    const delta = dir === 0 || dir === 1 ? 1 : -1;
    if (left < right) {
      for (let i = left; i < right; i += delta) {
        const currX = dir === 0 || dir === 2 ? x : i;
        const currY = dir === 1 || dir === 3 ? y : i;
        // if empty " ", continue
        if (map[currX][currY] === " ") continue;
        // if free ".", we found a valid next tile
        if (map[currX][currY] === ".") return [currX, currY];
        // if wall "#", we can't wrap
        if (map[currX][currY] === "#") return [x, y];
      }
    } else {
      for (let i = left; i > right; i += delta) {
        const currX = dir === 0 || dir === 2 ? x : i;
        const currY = dir === 1 || dir === 3 ? y : i;
        // if empty " ", continue
        if (map[currX][currY] === " ") continue;
        // if free ".", we found a valid next tile
        if (map[currX][currY] === ".") return [currX, currY];
        // if wall "#", we can't wrap
        if (map[currX][currY] === "#") return [x, y];
      }
    }
  }

  if (map[x + delta[0]][y + delta[1]] === ".") {
    return [x + delta[0], y + delta[1]];
  }

  if (map[x + delta[0]][y + delta[1]] === "#") {
    return [x, y];
  }
};

const deltaByDir = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const starOne = () => {
  const [mapRaw, pathRaw] = getRawInput("day22").split(`${EOL}${EOL}`);

  const map = mapRaw.split(EOL).map((row) => row.split(""));
  // fill in empty spaces
  const maxY = Math.max(...map.map((row) => row.length));
  map.forEach((row) => {
    while (row.length < maxY) row.push(" ");
  });

  const path = pathRaw.match(/(^\d+|[RLUD]\d+)/g).map((step, index) => {
    if (index === 0)
      return {
        steps: +step,
      };
    return {
      rotation: step[0],
      steps: +step.substring(1),
    };
  });

  let myX;
  let myY;
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
      if (map[x][y] === ".") {
        myX = x;
        myY = y;
        x = Infinity; // to break both for loops
        break;
      }
    }
  }

  let dir = 0; // 0:R, 1:D, 2:L, 3:U
  for (let i = 0; i < path.length; i++) {
    const { rotation, steps } = path[i];

    // turn
    if (rotation) {
      dir += rotation === "R" ? 1 : -1;
      if (dir === -1) dir = 3;
      if (dir === 4) dir = 0;
    }

    // move
    for (let step = 0; step < steps; step++) {
      const [newX, newY] = getNextTileOne(map, myX, myY, dir);
      if (newX === myX && newY === myY) break; // we hit a wall
      myX = newX;
      myY = newY;
    }
  }

  return 1000 * (myX + 1) + 4 * (myY + 1) + dir;
};

const getNextTileTwo = (faces, currFace, x, y, dir) => {
  const delta = deltaByDir[dir];

  const newX = x + delta[0];
  const newY = y + delta[1];

  const maxLen = faces[currFace].length - 1;
  // if newX or newY are out of bounds, we need to move to a new face and possibly change direction
  if (newX < 0 || newX > maxLen || newY < 0 || newY > maxLen) {
    if (newX > maxLen) {
      if (currFace === 0) return [0, newY, 2, dir];
      if (currFace === 1) return [newY, maxLen, 2, 2];
      if (currFace === 2) return [0, newY, 4, dir];
      if (currFace === 3) return [0, newY, 5, dir];
      if (currFace === 4) return [newY, maxLen, 5, 2];
      if (currFace === 5) return [0, newY, 1, dir];
    } else if (newY > maxLen) {
      if (currFace === 0) return [newX, 0, 1, dir];
      if (currFace === 1) return [maxLen - newX, maxLen, 4, 2];
      if (currFace === 2) return [maxLen, newX, 1, 3];
      if (currFace === 3) return [newX, 0, 4, dir];
      if (currFace === 4) return [maxLen - newX, maxLen, 1, 2];
      if (currFace === 5) return [maxLen, newX, 4, 3];
    } else if (newX < 0) {
      if (currFace === 0) return [newY, 0, 5, 0];
      if (currFace === 1) return [maxLen, newY, 5, dir];
      if (currFace === 2) return [maxLen, newY, 0, dir];
      if (currFace === 3) return [newY, 0, 2, 0];
      if (currFace === 4) return [maxLen, newY, 2, dir];
      if (currFace === 5) return [maxLen, newY, 3, dir];
    } else if (newY < 0) {
      if (currFace === 0) return [maxLen - newX, 0, 3, 0];
      if (currFace === 1) return [newX, maxLen, 0, dir];
      if (currFace === 2) return [0, newX, 3, 1];
      if (currFace === 3) return [maxLen - newX, 0, 0, 0];
      if (currFace === 4) return [newX, maxLen, 3, dir];
      if (currFace === 5) return [0, newX, 0, 1];
    }
  }

  if (faces[currFace][newX][newY] === ".") {
    // valid free cell, move forward
    return [newX, newY, currFace, dir];
  }

  if (faces[currFace][newX][newY] === "#") {
    // invalid wall, stay where you are
    return [x, y, currFace, dir];
  }
};

const starTwo = () => {
  const [mapRaw, pathRaw] = getRawInput("day22").split(`${EOL}${EOL}`);

  const map = mapRaw.split(EOL).map((row) => row.split(""));
  const facesConfig = [
    {
      from: [0, 50],
      to: [50, 100],
    },
    {
      from: [0, 100],
      to: [50, 150],
    },
    {
      from: [50, 50],
      to: [100, 100],
    },
    {
      from: [100, 0],
      to: [150, 50],
    },
    {
      from: [100, 50],
      to: [150, 100],
    },
    {
      from: [150, 0],
      to: [200, 50],
    },
  ];
  const faces = facesConfig.map(({ from, to }) => {
    const face = [];
    for (let x = from[0]; x < to[0]; x++) {
      const row = [];
      for (let y = from[1]; y < to[1]; y++) {
        row.push(map[x][y]);
      }
      face.push(row);
    }
    return face;
  });

  const path = pathRaw.match(/(^\d+|[RLUD]\d+)/g).map((step, index) => {
    if (index === 0)
      return {
        steps: +step,
      };
    return {
      rotation: step[0],
      steps: +step.substring(1),
    };
  });

  let myX = 0;
  let myY = 0;
  let currFace = 0;
  let dir = 0; // 0:R, 1:D, 2:L, 3:U
  for (let i = 0; i < path.length; i++) {
    const { rotation, steps } = path[i];

    // turn
    if (rotation) {
      dir += rotation === "R" ? 1 : -1;
      if (dir === -1) dir = 3;
      if (dir === 4) dir = 0;
    }

    // move
    for (let step = 0; step < steps; step++) {
      const [newX, newY, newFace, newDir] = getNextTileTwo(
        faces,
        currFace,
        myX,
        myY,
        dir
      );
      if (newX === myX && newY === myY) break; // we hit a wall
      if (faces[newFace][newX][newY] === "#") break; // we hit a wall
      myX = newX;
      myY = newY;
      currFace = newFace;
      dir = newDir;
    }
  }

  const [faceX, faceY] = facesConfig[currFace].from;
  return 1000 * (faceX + myX + 1) + 4 * (faceY + myY + 1) + dir;
};

console.log(starOne());
console.log(starTwo());

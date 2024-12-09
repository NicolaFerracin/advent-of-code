const { getRawInput } = require("./utils");

const input = getRawInput("day09");

const getDisk = (diskMap) => {
  let id = 0;
  let disk = [];
  for (let i = 0; i < diskMap.length; i++) {
    const isFileBlock = i % 2 === 0;
    const amount = Number(diskMap[i]);
    for (let slot = 0; slot < amount; slot++) {
      disk.push(isFileBlock ? id : ".");
    }
    if (isFileBlock) id++;
  }

  return disk;
};

const checkSum = (disk) => {
  return disk.reduce((cs, curr, index) => {
    if (curr === ".") return cs;
    return cs + Number(curr) * index;
  }, 0);
};

const star1 = () => {
  const moveFiles = (disk) => {
    let newDisk = [];
    let left = 0;
    let right = disk.length - 1;
    while (true) {
      if (left === right) {
        newDisk.push(disk[right]);
        return newDisk;
      }
      if (disk[left] !== ".") {
        newDisk.push(disk[left]);
        left++;
        continue;
      }
      if (disk[right] === ".") {
        right--;
        continue;
      }
      if (disk[right] !== ".") {
        newDisk.push(disk[right]);
        left++;
        right--;
        continue;
      }
    }
  };

  return checkSum(moveFiles(getDisk(input)));
};

const star2 = () => {
  const moveFiles = (disk) => {
    const getNextFile = (r) => {
      while (disk[r] === ".") r--;
      const id = disk[r];
      let len = 0;
      while (disk[r] === id) {
        len++;
        r--;
      }
      return { id, len, r: r + 1 };
    };

    const getEmpty = (file, limit) => {
      let l = 0;
      while (l <= limit) {
        while (disk[l] !== ".") {
          l++;
          if (l > limit) return null;
        }
        let len = 0;
        while (disk[l] === ".") {
          len++;
          l++;
          if (len === file.len) return { start: l - len, end: l - 1, len };
          if (l > limit) return null;
        }
      }
      return null;
    };

    let r = disk.length - 1;
    const moved = new Set();
    while (true) {
      if (r < 0) return disk;
      const file = getNextFile(r);
      r = file.r - 1;
      const empty = getEmpty(file, r);
      if (empty && !moved.has(file.id)) {
        for (let slot = 0; slot < file.len; slot++) {
          moved.add(file.id);
          disk[empty.start + slot] = file.id;
          disk[r + file.len - slot] = ".";
        }
      }
    }
  };

  return checkSum(moveFiles(getDisk(input)));
};

console.log(star1());
console.log(star2());

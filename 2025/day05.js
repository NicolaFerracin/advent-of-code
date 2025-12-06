const { readInput, splitInputByLine, print, copy } = require("./utils");
const { EOL } = require("os");

const input = readInput("day05").split(`${EOL}${EOL}`).map(splitInputByLine);

const star1 = () => {
  const [ranges, ids] = input;
  let fresh = 0;
  for (const id of ids) {
    for (const range of ranges) {
      const [start, end] = range.split("-").map(Number);

      if (Number(id) >= start && Number(id) <= end) {
        fresh++;
        break;
      }
    }
  }
  return fresh;
};

const mergeRanges = (ranges) => {
  const merged = [];
  for (const [start, end] of ranges) {
    // if start or end are within any range in merged, modify that range
    const overlap = merged.findIndex((m) => {
      return (
        (start >= m[0] && start <= m[1]) ||
        (end >= m[0] && end <= m[1]) ||
        (start <= m[0] && end >= m[1])
      );
    });
    if (overlap >= 0) {
      merged[overlap] = [
        Math.min(start, merged[overlap][0]),
        Math.max(end, merged[overlap][1]),
      ];
    } else {
      merged.push([start, end]);
    }
  }
  return merged;
};

const star2 = () => {
  const [rawRanges] = input;
  let ranges = rawRanges.map((range) => range.split("-").map(Number));

  let prevLen = ranges.length;
  // keep merging until no more merges are performed
  while (true) {
    ranges = mergeRanges(ranges);
    if (prevLen === ranges.length) break;
    prevLen = ranges.length;
  }

  return ranges.reduce((sum, range) => sum + (range[1] - range[0]) + 1, 0);
};

print(star1);
print(star2);

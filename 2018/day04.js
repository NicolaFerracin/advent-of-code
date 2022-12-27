const { getStringArrayInput } = require("./utils");

const playTimeline = () => {
  const lines = getStringArrayInput("day04").sort((a, b) => {
    const [yearA, monthA, dayA, hourA, minuteA] = a
      .match(/\d+/g)
      .map((_) => +_);
    const [yearB, monthB, dayB, hourB, minuteB] = b
      .match(/\d+/g)
      .map((_) => +_);

    return (
      new Date(yearA, monthA - 1, dayA, hourA, minuteA) -
      new Date(yearB, monthB - 1, dayB, hourB, minuteB)
    );
  });

  const guards = {};
  let guard = +lines[0].match(/\d+/g).pop();
  guards[guard] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.indexOf("Guard #") > 0) {
      guard = +lines[i].match(/\d+/g).pop();
      if (!(guard in guards)) guards[guard] = [];
    } else {
      const [year, month, day, hour, minute] = line
        .match(/\d+/g)
        .map((_) => +_);
      if (line.includes("asleep")) {
        guards[guard].push([[year, month - 1, day, hour, minute]]);
      } else {
        guards[guard][guards[guard].length - 1].push([
          year,
          month - 1,
          day,
          hour,
          minute,
        ]);
      }
    }
  }

  for (const key of Object.keys(guards)) {
    const intervals = guards[key];
    let asleepMinutes = 0;
    const minutesMap = new Map();
    for (const [start, end] of intervals) {
      const startDate = new Date(...start);
      const endDate = new Date(...end);
      let elapsed = 0;
      while (startDate < endDate) {
        const currMinute = startDate.getMinutes();
        minutesMap.set(currMinute, (minutesMap.get(currMinute) || 0) + 1);
        startDate.setMinutes(currMinute + 1);
        elapsed++;
      }
      asleepMinutes += elapsed;
    }
    guards[key].asleepMinutes = asleepMinutes;
    guards[key].minutesMap = minutesMap;
  }

  return guards;
};

const starOne = () => {
  const guards = playTimeline();

  // sort the guards by asleep time and get the one who slept most
  const guardId = Object.keys(guards)
    .sort((a, b) => guards[a].asleepMinutes - guards[b].asleepMinutes)
    .pop();

  // find the minute most frequently used for sleeping and multiply it by the guard ID
  return (
    [...guards[guardId].minutesMap].sort((a, b) => a[1] - b[1]).pop()[0] *
    guardId
  );
};

const starTwo = () => {
  const guards = playTimeline();

  // find the guard who spent sleeping the most time on a single minute
  const sortMinutesMap = (a, b) => b[1] - a[1];
  const guardId = Object.keys(guards)
    .filter((key) => guards[key].minutesMap.size > 0)
    .sort((a, b) => {
      const timesA = [...guards[a].minutesMap].sort(sortMinutesMap)[0][1];
      const timesB = [...guards[b].minutesMap].sort(sortMinutesMap)[0][1];
      return timesA - timesB;
    })
    .pop();

  // find the minute most frequently used for sleeping and multiply it by the guard ID
  return [...guards[guardId].minutesMap].sort(sortMinutesMap)[0][0] * guardId;
};

console.log(starOne());
console.log(starTwo());

const { getStringArrayInput } = require("./utils");

console.log(
  (function starOne() {
    let seats = getStringArrayInput("day11").map((_) => _.split(""));

    const didSeatsChange = (oldSeats, newSeats) => {
      for (let x = 0; x < oldSeats.length; x++) {
        for (let y = 0; y < oldSeats[x].length; y++) {
          if (oldSeats[x][y] !== newSeats[x][y]) return true;
        }
      }
      return false;
    };

    const getOccupiedAdjSeats = (seats, x, y) => {
      let occupied = 0;
      if (x > 0 && y > 0) {
        if (seats[x - 1][y - 1] === "#") occupied++;
      }
      if (x > 0) {
        if (seats[x - 1][y] === "#") occupied++;
      }
      if (x > 0 && y < seats[x].length - 1) {
        if (seats[x - 1][y + 1] === "#") occupied++;
      }

      if (y > 0) {
        if (seats[x][y - 1] === "#") occupied++;
      }
      if (y < seats[x].length - 1) {
        if (seats[x][y + 1] === "#") occupied++;
      }

      if (x < seats.length - 1 && y > 0) {
        if (seats[x + 1][y - 1] === "#") occupied++;
      }
      if (x < seats.length - 1) {
        if (seats[x + 1][y] === "#") occupied++;
      }
      if (x < seats.length - 1 && y < seats[x].length - 1) {
        if (seats[x + 1][y + 1] === "#") occupied++;
      }

      return occupied;
    };

    while (true) {
      const copy = JSON.parse(JSON.stringify(seats));
      for (let x = 0; x < seats.length; x++) {
        for (let y = 0; y < seats[x].length; y++) {
          const occupiedAdjSeats = getOccupiedAdjSeats(seats, x, y);
          if (seats[x][y] === "L" && occupiedAdjSeats === 0) copy[x][y] = "#";
          else if (seats[x][y] === "#" && occupiedAdjSeats >= 4)
            copy[x][y] = "L";
        }
      }

      if (!didSeatsChange(seats, copy)) break;
      seats = copy;
    }

    let occupied = 0;
    for (let x = 0; x < seats.length; x++) {
      for (let y = 0; y < seats[x].length; y++) {
        if (seats[x][y] === "#") occupied++;
      }
    }
    return occupied;
  })()
);

console.log(
  (function starTwo() {
    let seats = getStringArrayInput("day11").map((_) => _.split(""));

    const didSeatsChange = (oldSeats, newSeats) => {
      for (let x = 0; x < oldSeats.length; x++) {
        for (let y = 0; y < oldSeats[x].length; y++) {
          if (oldSeats[x][y] !== newSeats[x][y]) return true;
        }
      }
      return false;
    };

    const getOccupiedAdjSeats = (seats, x, y) => {
      const getFirstSeatInDirection = (x, y, deltaX, deltaY) => {
        let newX = x + deltaX;
        let newY = y + deltaY;
        while (
          newX >= 0 &&
          newX < seats.length &&
          newY >= 0 &&
          newY < seats[newX].length
        ) {
          if (seats[newX][newY] === "#") return 1;
          else if (seats[newX][newY] === "L") return 0;
          newX += deltaX;
          newY += deltaY;
        }
        return 0;
      };

      return (
        getFirstSeatInDirection(x, y, -1, -1) +
        getFirstSeatInDirection(x, y, 1, 1) +
        getFirstSeatInDirection(x, y, 0, 1) +
        getFirstSeatInDirection(x, y, 0, -1) +
        getFirstSeatInDirection(x, y, 1, 0) +
        getFirstSeatInDirection(x, y, -1, 0) +
        getFirstSeatInDirection(x, y, -1, 1) +
        getFirstSeatInDirection(x, y, 1, -1)
      );
    };

    while (true) {
      const copy = JSON.parse(JSON.stringify(seats));
      for (let x = 0; x < seats.length; x++) {
        for (let y = 0; y < seats[x].length; y++) {
          const occupiedAdjSeats = getOccupiedAdjSeats(seats, x, y);
          if (seats[x][y] === "L" && occupiedAdjSeats === 0) copy[x][y] = "#";
          else if (seats[x][y] === "#" && occupiedAdjSeats >= 5)
            copy[x][y] = "L";
        }
      }

      if (!didSeatsChange(seats, copy)) break;
      seats = copy;
    }

    let occupied = 0;
    for (let x = 0; x < seats.length; x++) {
      for (let y = 0; y < seats[x].length; y++) {
        if (seats[x][y] === "#") occupied++;
      }
    }
    return occupied;
  })()
);

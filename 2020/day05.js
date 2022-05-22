const { getStringArrayInput } = require("./utils");

console.log(
  (function starOne() {
    const input = getStringArrayInput("day05");

    let max = 0;
    input.forEach((ticket) => {
      let minRow = 0;
      let maxRow = 127;
      for (let i = 0; i < 7; i++) {
        if (ticket[i] === "F")
          maxRow = maxRow - Math.ceil((maxRow - minRow) / 2);
        else minRow = minRow + Math.ceil((maxRow - minRow) / 2);
      }

      let minCol = 0;
      let maxCol = 7;
      for (let i = 7; i < ticket.length; i++) {
        if (ticket[i] === "L")
          maxCol = maxCol - Math.ceil((maxCol - minCol) / 2);
        else minCol = minCol + Math.ceil((maxCol - minCol) / 2);
      }

      max = Math.max(max, minRow * 8 + minCol);
    });

    return max;
  })()
);

console.log(
  (function starTwo() {
    const input = getStringArrayInput("day05");
    const seats = new Array(128);
    for (let x = 0; x < seats.length; x++) {
      seats[x] = [0, 0, 0, 0, 0, 0, 0, 0];
    }

    input.forEach((ticket) => {
      let minRow = 0;
      let maxRow = 127;
      for (let i = 0; i < 7; i++) {
        if (ticket[i] === "F")
          maxRow = maxRow - Math.ceil((maxRow - minRow) / 2);
        else minRow = minRow + Math.ceil((maxRow - minRow) / 2);
      }

      let minCol = 0;
      let maxCol = 7;
      for (let i = 7; i < ticket.length; i++) {
        if (ticket[i] === "L")
          maxCol = maxCol - Math.ceil((maxCol - minCol) / 2);
        else minCol = minCol + Math.ceil((maxCol - minCol) / 2);
      }

      seats[minRow][minCol] = 1;
    });

    const rowsWithEmptySeats = [];
    for (let x = 0; x < seats.length; x++) {
      for (let y = 0; y < seats[x].length; y++) {
        if (seats[x][y] === 0) {
          rowsWithEmptySeats.push(x);
          break;
        }
      }
    }
    const myRow = rowsWithEmptySeats.find(
      (row, index) =>
        row + 1 !== rowsWithEmptySeats[index + 1] &&
        row - 1 !== rowsWithEmptySeats[index - 1]
    );
    const myCol = seats[myRow].findIndex((col) => !col);

    return myRow * 8 + myCol;
  })()
);

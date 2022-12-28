const { getStringArrayInput, deepClone } = require("./utils");

const play = (elfDamage) => {
  const getEnemyInRange = (unit, enemies) => {
    const adjacentCells = new Set();
    adjacentCells.add(`${unit.x + 1}#${unit.y}`);
    adjacentCells.add(`${unit.x - 1}#${unit.y}`);
    adjacentCells.add(`${unit.x}#${unit.y + 1}`);
    adjacentCells.add(`${unit.x}#${unit.y - 1}`);

    // find all enemies in range
    const enemiesInRange = [];
    for (const enemy of enemies) {
      if (adjacentCells.has(`${enemy.x}#${enemy.y}`))
        enemiesInRange.push(enemy);
    }

    // we want the enemy with lowest HP. If more than one, return the one coming first by position
    return enemiesInRange
      .sort((a, b) =>
        a.hp === b.hp ? (a.x === b.x ? a.y - b.y : a.x - b.x) : a.hp - b.hp
      )
      .shift();
  };

  const findPathToTarget = (unit, target, otherUnits) => {
    const queue = [{ x: unit.x, y: unit.y, path: [] }];
    const seen = new Set();
    while (queue.length) {
      let len = queue.length;
      while (len > 0) {
        len--;
        const cell = queue.shift();
        // if we reached the target, we return the amount of steps and the path
        if (cell.x === target.x && cell.y === target.y) {
          cell.path.push([cell.x, cell.y]);
          return cell.path;
        }

        // handle walls
        if (map[cell.x][cell.y] === "#") continue;
        // handle other units
        if (otherUnits.find(({ x, y }) => cell.x === x && cell.y === y))
          continue;
        // handle visited cells
        if (seen.has(`${cell.x}#${cell.y}`)) continue;
        seen.add(`${cell.x}#${cell.y}`);
        // if (cell.path.find((step) => cell.x === step[0] && cell.y === step[1]))
        //   continue;

        // we try to move in all 4 directions
        const path = [...deepClone(cell.path), [cell.x, cell.y]];
        queue.push({ x: cell.x - 1, y: cell.y, path: deepClone(path) });
        queue.push({ x: cell.x, y: cell.y - 1, path: deepClone(path) });
        queue.push({ x: cell.x, y: cell.y + 1, path: deepClone(path) });
        queue.push({ x: cell.x + 1, y: cell.y, path: deepClone(path) });
      }
    }
  };

  const units = [];
  const map = getStringArrayInput("day15").map((row, rowI) => {
    return row.split("").map((cell, colI) => {
      if (cell === "G" || cell === "E") {
        units.push({
          id: units.length,
          type: cell,
          x: rowI,
          y: colI,
          hp: 200,
          damage: cell === "E" ? elfDamage : 3,
        });
        return ".";
      }
      return cell;
    });
  });

  let round = 0;
  while (true) {
    // sort units by position
    const unitsAlive = units.sort((a, b) =>
      a.x === b.x ? a.y - b.y : a.x - b.x
    );

    // each unit takes a turn
    for (const unit of unitsAlive) {
      // if the unit died during the current round, skip it
      if (unit.hp <= 0) continue;

      const otherUnits = unitsAlive.filter((u) => u.hp > 0 && u.id !== unit.id);
      const enemyUnits = otherUnits.filter((u) => u.type !== unit.type);

      // if no target, the game is over
      if (enemyUnits.length === 0) {
        return (
          round *
          units
            .filter(({ hp }) => hp > 0)
            .reduce((total, unit) => (total += unit.hp), 0)
        );
      }

      // try to move it not in range of an enemy
      if (!getEnemyInRange(unit, enemyUnits)) {
        const openSquares = [];
        for (const enemy of enemyUnits) {
          [
            [-1, 0],
            [0, -1],
            [0, 1],
            [1, 0],
          ].forEach((delta) => {
            const openSquareX = enemy.x + delta[0];
            const openSquareY = enemy.y + delta[1];
            // if not a wall...
            if (map[openSquareX][openSquareY] === ".") {
              // ...and no other unit on it...
              if (
                !otherUnits.find(
                  (otherUnit) =>
                    otherUnit.x === openSquareX && otherUnit.y === openSquareY
                )
              )
                // ...we can consider this a viable open square
                openSquares.push([openSquareX, openSquareY]);
            }
          });
        }

        // if no open square to move toward to, end turn
        if (openSquares.length === 0) continue;

        // start with all the open squares
        const bestPath = openSquares
          .map((openSquare) => ({
            x: openSquare[0],
            y: openSquare[1],
            // find the potential path to the open square
            path: findPathToTarget(
              unit,
              { x: openSquare[0], y: openSquare[1] },
              otherUnits
            ),
          }))
          // filter out those open squares with no access
          .filter(({ path }) => !!path)
          // sort the valid open squares by path length and position
          .sort((a, b) =>
            a.path.length === b.path.length
              ? a.x === b.x
                ? a.y - b.y
                : a.x - b.x
              : a.path.length - b.path.length
          )
          // get the best path to the best open square
          .shift()?.path;

        if (bestPath) {
          // we get the second item in the path because the first item is the unit starting point
          unit.x = bestPath[1][0];
          unit.y = bestPath[1][1];
        }
      }

      // attack if in range of an enemy
      const enemyInRange = getEnemyInRange(unit, enemyUnits);
      if (enemyInRange) {
        // deal damage
        enemyInRange.hp -= unit.damage;
        if (enemyInRange.type === "E" && enemyInRange.hp <= 0) return false;
      }
    }
    round++;
  }
};

const starOne = () => {
  return play(3);
};

const starTwo = () => {
  let damage = 4;
  while (true) {
    const score = play(damage);
    if (score) return score;
    damage++;
  }
};

console.log("it takes a while...");
console.log(starOne());
console.log(starTwo());

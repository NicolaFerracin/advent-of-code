const { getStringArrayInput } = require("./utils");

const getDropletsAdjacency = (d1, d2) => {
  if (d1.x === d2.x && d1.y === d2.y && Math.abs(d1.z - d2.z) === 1) {
    return "z";
  }
  if (d1.x === d2.x && d1.z === d2.z && Math.abs(d1.y - d2.y) === 1) {
    return "y";
  }
  if (d1.y === d2.y && d1.z === d2.z && Math.abs(d1.x - d2.x) === 1) {
    return "x";
  }

  return false;
};

const getAdjacentSide = (adjacency, d1, d2) => {
  if (adjacency === "x") {
    return d1.x > d2.x ? 0 : 1;
  }
  if (adjacency === "y") {
    return d1.y > d2.y ? 2 : 3;
  }
  if (adjacency === "z") {
    return d1.z > d2.z ? 4 : 5;
  }
};

const starOne = () => {
  const droplets = getStringArrayInput("day18").map((droplet) => {
    const [x, y, z] = droplet.split(",");
    return { x: +x, y: +y, z: +z };
  });

  let sides = 0;
  for (let d1 = 0; d1 < droplets.length; d1++) {
    const exposedSides = [1, 1, 1, 1, 1, 1];
    for (let d2 = 0; d2 < droplets.length; d2++) {
      if (d1 === d2) continue;
      const adjacency = getDropletsAdjacency(droplets[d1], droplets[d2]);
      if (adjacency) {
        const side = getAdjacentSide(adjacency, droplets[d1], droplets[d2]);
        exposedSides[side] = 0;
      }
    }

    sides += exposedSides.reduce((total, side) => (total += side), 0);
  }

  return sides;
};

const starTwo = () => {
  const droplets = getStringArrayInput("day18").map((droplet) => {
    const [x, y, z] = droplet.split(",");
    return { x: +x, y: +y, z: +z };
  });

  const min = {
    x: Math.min(...droplets.map(({ x }) => x)),
    y: Math.min(...droplets.map(({ y }) => y)),
    z: Math.min(...droplets.map(({ z }) => z)),
  };
  const max = {
    x: Math.max(...droplets.map(({ x }) => x)),
    y: Math.max(...droplets.map(({ y }) => y)),
    z: Math.max(...droplets.map(({ z }) => z)),
  };

  const hasOutsideAccess = (x, y, z, seen) => {
    // already seen
    if (seen.has(`${x}-${y}-${z}`)) return false;

    // out of bound
    if (x < min.x || y < min.y || z < min.z) return true;
    if (x > max.x || y > max.y || z > max.z) return true;

    // if there is a droplet at this coordinates
    if (droplets.find((d) => d.x === x && d.y === y && d.z === z)) {
      return false;
    }

    // add to seen
    seen.add(`${x}-${y}-${z}`);

    // move in all 6 directions
    return (
      hasOutsideAccess(x - 1, y, z, seen) ||
      hasOutsideAccess(x + 1, y, z, seen) ||
      hasOutsideAccess(x, y - 1, z, seen) ||
      hasOutsideAccess(x, y + 1, z, seen) ||
      hasOutsideAccess(x, y, z - 1, seen) ||
      hasOutsideAccess(x, y, z + 1, seen)
    );
  };

  const potentialAirPockets = [];
  for (let x = min.x + 1; x < max.x; x++) {
    for (let y = min.y + 1; y < max.y; y++) {
      for (let z = min.z + 1; z < max.z; z++) {
        if (!droplets.find((d) => d.x === x && d.y === y && d.z === z))
          potentialAirPockets.push({ x, y, z });
      }
    }
  }

  const airPockets = potentialAirPockets.filter((airPocket) => {
    // dfs your way from the potential air pocket to the outside
    return !hasOutsideAccess(airPocket.x, airPocket.y, airPocket.z, new Set());
  });

  let sides = 0;
  for (let air1 = 0; air1 < airPockets.length; air1++) {
    const exposedSides = [1, 1, 1, 1, 1, 1];
    for (let air2 = 0; air2 < airPockets.length; air2++) {
      if (air1 === air2) continue;
      const adjacency = getDropletsAdjacency(
        airPockets[air1],
        airPockets[air2]
      );
      if (adjacency) {
        const side = getAdjacentSide(
          adjacency,
          airPockets[air1],
          airPockets[air2]
        );
        exposedSides[side] = 0;
      }
    }

    sides += exposedSides.reduce((total, side) => (total += side), 0);
  }

  return starOne() - sides;
};

console.log(starOne());
console.log(starTwo());

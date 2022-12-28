const { getStringArrayInput, rangeModulo } = require("./utils");

const deltaByCart = {
  ">": [0, 1],
  "<": [0, -1],
  "^": [-1, 0],
  v: [1, 0],
};

const turnCurve = {
  ">": {
    "/": "^",
    "\\": "v",
  },
  "<": {
    "/": "v",
    "\\": "^",
  },
  "^": {
    "/": ">",
    "\\": "<",
  },
  v: {
    "/": "<",
    "\\": ">",
  },
};

const cartDirs = "^>v<";

const play = (star) => {
  const map = getStringArrayInput("day13").map((row) => row.split(""));

  let carts = [];
  // remove carts from map and put them away
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
      const cell = map[x][y];
      if ("^>v<".includes(cell)) {
        carts.push({
          id: carts.length,
          x,
          y,
          cart: cell,
          turn: -1,
          hasCrashed: false,
        });
        map[x][y] = "<>".includes(cell) ? "-" : "|";
      }
    }
  }

  while (true) {
    // move each cart
    for (const cart of carts) {
      // if (cart.hasCrashed) continue;

      // move forward
      const delta = deltaByCart[cart.cart];
      cart.x += delta[0];
      cart.y += delta[1];

      // optionally turn curve
      if ("\\/".includes(map[cart.x][cart.y])) {
        cart.cart = turnCurve[cart.cart][map[cart.x][cart.y]];
      }

      // check intersection
      else if (map[cart.x][cart.y] === "+") {
        // turn
        cart.cart =
          cartDirs[rangeModulo(cartDirs.indexOf(cart.cart) + cart.turn, 0, 4)];

        // update turn counter
        cart.turn = cart.turn === 1 ? -1 : cart.turn + 1;
      }

      // check collisions
      for (const cart2 of carts) {
        if (cart.id === cart2.id) continue;
        if (cart.x === cart2.x && cart.y === cart2.y) {
          if (star === 1) return `${cart.y},${cart.x}`;

          carts = carts.filter((c) => c.id !== cart.id && c.id !== cart2.id);
        }
      }
    }

    carts.sort((a, b) => (a.x === b.x ? a.y - b.y : a.x - b.x));

    if (carts.length === 1) return `${carts[0].y},${carts[0].x}`;
  }
};

const starOne = () => {
  return play(1);
};

const starTwo = () => {
  return play(2);
};

console.log(starOne());
console.log(starTwo());

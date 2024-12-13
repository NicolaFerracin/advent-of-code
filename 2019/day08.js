const { getRawInput } = require("./utils");

const getInput = () => getRawInput("day08").split("").map(Number);

const star1 = () => {
  const pixels = getInput();
  const layers = [];
  while (pixels.length) {
    const map = new Map();
    for (let x = 0; x < 6; x++) {
      const row = [];
      for (let y = 0; y < 25; y++) {
        const pixel = pixels.shift();
        map.set(pixel, (map.get(pixel) ?? 0) + 1);
        row.push(pixel);
      }
    }
    layers.push(map);
  }
  const res = layers.sort((a, b) => a.get(0) - b.get(0))[0];
  return res.get(1) * res.get(2);
};

const star2 = () => {
  const pixels = getInput();
  const layers = [];
  while (pixels.length) {
    const layer = [];
    for (let x = 0; x < 6; x++) {
      const row = [];
      for (let y = 0; y < 25; y++) {
        row.push(pixels.shift());
      }
      layer.push(row);
    }
    layers.push(layer);
  }

  const final = [];
  for (let x = 0; x < layers[0].length; x++) {
    const row = [];
    for (let y = 0; y < layers[0][0].length; y++) {
      let layer = 0;
      // for each pixel...
      // ... as long as the current layer has 2, move to the next layer
      while (layers[layer][x][y] === 2) layer++;
      // now that the pixel is not transparent, push the pixel
      // # for black ----- ' ' for white
      row.push(layers[layer][x][y] === 1 ? "#" : " ");
    }
    final.push(row);
  }

  return final.map((line) => line.join(""));
};

console.log(star1());
console.log(star2());

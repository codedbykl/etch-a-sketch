const sketchPad = document.querySelector('.sketch-pad');

function createGrid(sideSquares) {
  const allSquares = sideSquares ** 2;
  const square = `<div class="square"></div>`;

  sketchPad.style.gridTemplateColumns = `repeat(${sideSquares}, 1fr)`;

  sketchPad.insertAdjacentHTML('afterbegin', square.repeat(allSquares));
}

createGrid(16);

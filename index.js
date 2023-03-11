const sketchPad = document.querySelector('.sketch-pad');
const buttons = document.querySelectorAll('[data-action]');
const formSize = document.querySelector('.form-size');
const colorPicker = document.querySelector('.input-color');

const squares = sketchPad.childNodes;
let selectedColor = colorPicker.value;
let rgbModeActived = false;

function createGrid(sideSquares) {
  const allSquares = sideSquares ** 2;
  const square = `<div class="square"></div>`;

  sketchPad.style.gridTemplateColumns = `repeat(${sideSquares}, 1fr)`;
  sketchPad.style.gridTemplateRows = `repeat(${sideSquares}, 1fr)`;

  sketchPad.textContent = '';
  sketchPad.insertAdjacentHTML('afterbegin', square.repeat(allSquares));
}

function handleOpenPopup(event) {
  const popup = event.target.nextElementSibling;
  popup.classList.remove('hide');
}

function handleClosePopup(event) {
  const popup = event.currentTarget.parentNode;
  popup.classList.add('hide');
}

function handleGridSize(event) {
  event.preventDefault();
  const input = event.target.children[0];
  const popup = document.querySelector('.popup');

  createGrid(input.value);
  input.value = '';

  popup.classList.add('hide');
}

function handleColorSelection(event) {
  const pickedColor = event.target.value;

  if (rgbModeActived) {
    selectedColor = pickedColor;
    rgbModeActived = false;
  }
}

function handlePaint(event) {
  const square = event.target;
  const rightMouseButtonPressed = event.buttons === 2;
  const leftMouseButtonPressed = event.buttons === 1;

  if (leftMouseButtonPressed && rgbModeActived) {
    selectedColor = generateRgbColor();
  } else {
    selectedColor = colorPicker.value;
  }

  if (rightMouseButtonPressed) {
    selectedColor = '#fff';
  }

  square.style.backgroundColor = selectedColor;
}

function generateRgbColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return `rgb(${red}, ${green}, ${blue})`;
}

function handleRgbMode() {
  rgbModeActived = true;
}

function checkButtonAction(button) {
  const buttonAction = button.dataset.action;

  if (buttonAction === 'open') {
    return handleOpenPopup;
  } else if (buttonAction === 'close') {
    return handleClosePopup;
  } else {
    return handleRgbMode;
  }
}

function paint(square) {
  square.addEventListener('mousedown', handlePaint);

  square.addEventListener('mouseover', event => {
    if (event.buttons) {
      handlePaint(event);
    }
  });
}

buttons.forEach(button => {
  const listener = checkButtonAction(button);
  button.addEventListener('click', event => listener(event));
});

createGrid(16);

squares.forEach(square => paint(square));

formSize.addEventListener('submit', handleGridSize);
colorPicker.addEventListener('input', handleColorSelection);

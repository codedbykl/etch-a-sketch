const sketchPad = document.querySelector('.sketch-pad');
const buttons = document.querySelectorAll('[data-action]');

function createGrid(sideSquares) {
  const allSquares = sideSquares ** 2;
  const square = `<div class="square"></div>`;

  sketchPad.style.gridTemplateColumns = `repeat(${sideSquares}, 1fr)`;

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

function checkButtonAction(button) {
  const buttonAction = button.dataset.action;

  if (buttonAction === 'open') {
    return handleOpenPopup;
  } else if (buttonAction === 'close') {
    return handleClosePopup;
  }
}

buttons.forEach(button => {
  const listener = checkButtonAction(button);
  button.addEventListener('click', event => listener(event));
});

createGrid(16);

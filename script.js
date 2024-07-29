const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
const messageElement = document.getElementById('message');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(clickedCell, clickedCellIndex) {
  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  clickedCell.classList.add('disabled');

  if (checkWin()) {
    messageElement.textContent = `Player ${currentPlayer} has won!`;
    gameActive = false;
    return;
  }

  if (gameState.includes('') === false) {
    messageElement.textContent = `Game ended in a draw!`;
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  messageElement.textContent = `It's ${currentPlayer}'s turn`;
}

function checkWin() {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return true;
    }
  }
  return false;
}

function resetGame() {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  messageElement.textContent = `It's ${currentPlayer}'s turn`;
  board.innerHTML = '';
  createBoard();
}

function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.addEventListener('click', () => handleCellClick(cell, i));
    board.appendChild(cell);
  }
}

resetButton.addEventListener('click', resetGame);

createBoard();
messageElement.textContent = `It's ${currentPlayer}'s turn`;

const board = document.getElementById('board');
const winnerDisplay = document.getElementById('winner');
const resetButton = document.getElementById('reset');
const turnDisplay = document.getElementById('turn');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            gameActive = false;
            return gameState[a];
        }
    }
    if (!gameState.includes('')) return 'Draw';
    return null;
}

function handleCellClick(e) {
    const cellIndex = e.target.getAttribute('data-index');

    if (gameState[cellIndex] || !gameActive) return;

    gameState[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add('taken');

    const winner = checkWinner();

    if (winner) {
        winnerDisplay.textContent = winner === 'Draw' ? 'It ended in a tie!' : `The winner is ${winner}!`;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnDisplay.textContent = `Current turn: ${currentPlayer}`;
}

function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    winnerDisplay.textContent = '';
    turnDisplay.textContent = `Current turn: ${currentPlayer}`;
    board.innerHTML = '';
    createBoard();
}

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

resetButton.addEventListener('click', resetGame);
createBoard();

// Configuración del juego
const COLS = 10;
const ROWS = 20;
const EMPTY = 0;
const ACTIVE = 1;
const FILLED = 2;
const DEAD = 3;

// Define las piezas y sus posiciones iniciales
const PIECES = [
	[
		[1, 1, 1, 1]
	],
	[
		[1, 1],
		[1, 1]
	],
	[
		[1, 0, 0],
		[1, 1, 1]
	],
	[
		[0, 0, 1],
		[1, 1, 1]
	],
	[
		[1, 1, 1],
		[0, 0, 1]
	],
	[
		[1, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 1, 1],
		[1, 1, 0]
	]
];

// Variables globales
let board = [];
let currentPiece = {x: 0, y: 0, blocks: []};
let score = 0;
let gameOver = false;

// Inicializa el tablero de juego
function init() {
	for (let row = 0; row < ROWS; row++) {
		board[row] = [];
		for (let col = 0; col < COLS; col++) {
			board[row][col] = EMPTY;
		}
	}
}

// Dibuja el tablero en el DOM
function drawBoard() {
	const tetrisGrid = document.getElementById('tetris-grid');
	tetrisGrid.innerHTML = '';

	for (let row = 0; row < ROWS; row++) {
		for (let col = 0; col < COLS; col++) {
			const cell = document.createElement('div');
			cell.className = 'cell';
			if (board[row][col] === ACTIVE) {
				cell.classList.add('active');
			} else if (board[row][col] === FILLED) {
				cell.classList.add('filled');
			} else if (board[row][col] === DEAD) {
				cell.classList.add('dead');
			}
			tetrisGrid.appendChild(cell);
		}
	}
}

// Crea una nueva pieza en una posición aleatoria
function createPiece() {
	const piece = Math.floor(Math.random() * PIECES.length);
	currentPiece.x = Math.floor(COLS / 2) - Math.floor(PIECES[piece][0].length / 2);
	currentPiece.y = 0;
	currentPiece.blocks = PIECES[piece];
}

// Comprueba si una pieza colisiona con el tablero o con otras piezas
function checkCollision() {
	for (let row = 0; row < currentPiece.blocks.length; row++) {
		for (let col = 0; col < currentPiece.blocks[row].length; col++) {
			if (currentPiece.blocks[row][col] && (board[currentPiece.y + row] && board[currentPiece.y + row][currentPiece.x + col]) !== EMPTY) {
				return true;
			}
		}
	}
	return false;
}

// Mueve la pieza hacia abajo
function moveDown() {
	currentPiece.y++;

	if (checkCollision()) {
		currentPiece.y--;
		setPieceAsFilled();
		createPiece();
		if (checkCollision()) {
			gameOver = true;
			displayGameOver();
		}
		checkLines();
	}
}

// Mueve la pieza hacia la izquierda
function moveLeft() {
	currentPiece.x--;

	if (checkCollision()) {
		currentPiece.x++;
	}
}

// Mueve la pieza hacia la derecha
function moveRight() {
	currentPiece.x++;

	if (checkCollision()) {
		currentPiece.x--;
	}
}

// Rota la pieza
function rotatePiece() {
	const blocks = currentPiece.blocks;
	const previousBlocks = blocks.slice();

	for (let y = 0; y < blocks.length; y++) {
		for (let x = 0; x < y; x++) {
			[blocks[x][y], blocks[y][x]] = [blocks[y][x], blocks[x][y]];
		}
	}

	blocks.forEach(row => row.reverse());

	if (checkCollision()) {
		currentPiece.blocks = previousBlocks;
	}
}

// Establece la pieza como llena y fija en el tablero
function setPieceAsFilled() {
	for (let row = 0; row < currentPiece.blocks.length; row++) {
		for (let col = 0; col < currentPiece.blocks[row].length; col++) {
			if (currentPiece.blocks[row][col]) {
				board[currentPiece.y + row][currentPiece.x + col] = FILLED;
			}
		}
	}
}

// Comprueba si hay líneas completas y las elimina
function checkLines() {
	for (let row = ROWS - 1; row >= 0; row--) {
		if (board[row].every(cell => cell === FILLED)) {
			board.splice(row, 1);
			board.unshift(Array(COLS).fill(EMPTY));
			score++;
			updateScore();
		}
	}
}

// Actualiza la puntuación en el DOM
function updateScore() {
	document.getElementById('score').textContent = `Score: ${score}`;
}

// Muestra el mensaje de "Game Over" en el DOM
function displayGameOver() {
	document.getElementById('game-over').style.display = 'block';
}

// Inicia el juego
function start() {
	init();
	createPiece();
	update();

	// Escucha los eventos de entrada táctil
	const tetris = document.getElementById('tetris');
	const hammer = new Hammer(tetris);
	hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

	hammer.on('swipeup', moveDown);
	hammer.on('swipeleft', moveLeft);
	hammer.on('swiperight', moveRight);
	hammer.on('swipedown', rotatePiece);

	// Ciclo de juego
	function update() {
		if (!gameOver) {
			moveDown();
			drawBoard();
			setTimeout(update, 200);
		}
	}
}

// Inicia el juego al cargar la página
window.addEventListener('load', start);

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
	// TODO: set "board" to empty HEIGHT x WIDTH matrix array
	for (let y = 0; y < HEIGHT; y++) {
		board.push(Array.from({ length: WIDTH }));
	}
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
	// TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
	const htmlBoard = document.querySelector('#board');
	// TODO: add comment for this code
	const top = document.createElement('tr'); //create a table row element for playing game pieces
	top.setAttribute('id', 'column-top'); //give it an id of column-top
	top.addEventListener('click', handleClick); //add an event listener to play a game piece

	//iterate over the width variable to c
	for (let x = 0; x < WIDTH; x++) {
		const headCell = document.createElement('td'); //each time through the loop, create a cell element for playing game pieces
		headCell.setAttribute('id', x); //give each newly created cell an id of x's value
		top.append(headCell); //append the cell to the top row where game pieces are played
	}
	htmlBoard.append(top); //append the top row to the game board

	// TODO: add comment for this code
	// iterate over the HEIGHT variable
	for (let y = 0; y < HEIGHT; y++) {
		const row = document.createElement('tr'); // create a row for the game board each time through the loop

		// iterate over the WIDTH variable
		for (let x = 0; x < WIDTH; x++) {
			const cell = document.createElement('td'); // create a board space each time through the loop
			cell.setAttribute('id', `${y}-${x}`); // give each new board space an id of its' position on the axis (y-x)
			row.append(cell); //append the board space to the given row
		}
		htmlBoard.append(row); //append each newly created row (w/ board spaces) to the game board
	}
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
	// TODO: write the real version of this, rather than always returning 0

	//iterate over the column selected for dropping a game piece
	for (let y = 5; y >= 0; y--) {
		if (!board[y][x]) {
			return y; //if there is no piece placed in the lowest available space of the selected column, place it there
		}
	}
	return null; //otherwise if the column is filled, ignore and return null
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
	// TODO: make a div and insert into correct table cell
	const piece = document.createElement('div'); //create the game piece
	piece.classList.add('piece'); //give it the class of 'piece'
	piece.classList.add(`player${currPlayer}`); //assign the game piece to the player currently making a move

	let chosenSpace = document.getElementById(`${y}-${x}`); //retrieve the space where the current player would like to place a game piece
	chosenSpace.append(piece); //append the game piece to the space selected by the current player
}

/** endGame: announce game end */

function endGame(msg) {
	// TODO: pop up alert message
	alert(`Player ${currPlayer} won!`);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
	// get x from ID of clicked cell
	const x = +evt.target.id;

	// get next spot in column (if none, ignore click)
	const y = findSpotForCol(x);
	if (y === null) {
		return;
	}

	// place piece in board and add to HTML table
	// TODO: add line to update in-memory board
	board[y][x] = currPlayer;
	placeInTable(y, x);

	// check for win
	if (checkForWin()) {
		return endGame(`Congrats ${currPlayer}! You win!`); //if the checkForWin function returns true, end the game
	}

	// check for tie
	// TODO: check if all cells in board are filled; if so, call endGame
	if (board.every((row) => row.every((cell) => cell))) {
		return endGame('You tied! Refresh to play again!');
	}
	// switch players
	// TODO: switch currPlayer 1 <-> 2
	currPlayer = currPlayer === 1 ? 2 : 1; //current player switches to 2 if player 1 plays a gamePiece,
	//otherwise switch to player 1
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
	function _win(cells) {
		// Check four cells to see if they're all color of current player
		//  - cells: list of four (y, x) cells
		//  - returns true if all are legal coordinates & all match currPlayer

		return cells.every(([ y, x ]) => y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH && board[y][x] === currPlayer);
	}

	// TODO: read and understand this code. Add comments to help you.
	//iterate over the board
	for (let y = 0; y < HEIGHT; y++) {
		for (let x = 0; x < WIDTH; x++) {
			let horiz = [ [ y, x ], [ y, x + 1 ], [ y, x + 2 ], [ y, x + 3 ] ]; //horizontal win
			let vert = [ [ y, x ], [ y + 1, x ], [ y + 2, x ], [ y + 3, x ] ]; //vertical win
			let diagDR = [ [ y, x ], [ y + 1, x + 1 ], [ y + 2, x + 2 ], [ y + 3, x + 3 ] ]; //diagonal right win
			let diagDL = [ [ y, x ], [ y + 1, x - 1 ], [ y + 2, x - 2 ], [ y + 3, x - 3 ] ]; //diagonal left win

			if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
				//if any of the possible wins are present, return true
				return true;
			}
		}
	}
}

makeBoard();
makeHtmlBoard();

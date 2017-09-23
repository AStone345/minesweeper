export class Board {
	constructor(numberOfRows, numberOfColumns, numberOfBombs) {
		this._numberOfBombs = numberOfBombs;
		this._numberOfTiles = numberOfRows * numberOfColumns;
		this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
		this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
	}

	get playerBoard() {
		return this._playerBoard;
	}

	// let user "flip" a tile
	flipTile(rowIndex, columnIndex) {
		if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
			console.log('This tile has already been flipped.');
			return;
		} else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
			this._playerBoard[rowIndex][columnIndex] = 'B';
		} else {
			this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighboringBombs(rowIndex, columnIndex);
		}
		this._numberOfTiles--;
	}

	// show number of nearby bombs
	getNumberOfNeighboringBombs(rowIndex, columnIndex) {
		const neighborOffsets = [
			[-1, -1],
			[-1, 0],
			[-1, 1],
			[0, -1],
			[0, 1],
			[1, -1],
			[1, 0],
			[1, 1]
		];
		const numberOfRows = this._bombBoard.length;
		const numberOfColumns = this._bombBoard[0].length;

		let numberOfBombs = 0;

		neighborOffsets.forEach(offset => {
			const neighborRowIndex = rowIndex + offset[0];
			const neighborColumnIndex = columnIndex + offset[1];
			if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
				if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
					numberOfBombs++;
				}
			}
		});
		return numberOfBombs;
	}

	hasSafeTiles() {
		return this._numberOfTiles !== this._numberOfBombs;
	}

	// function to format the game board
	print() {
		console.log(this._playerBoard.map(function (row) {
			return row.join(' | ');
		}).join('\n'));
	}

	static generatePlayerBoard(numberOfRows, numberOfColumns) {
		let board = [];      // represents overall game board
		for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
			let row = [];    // represents single row to add to game board
			for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
				row.push(' ');
			};
			board.push(row);
		}
		return board;
	}

	static generateBombBoard (numberOfRows, numberOfColumns, numberOfBombs) {
		let board = [];      // represents overall bomb board

		for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
			let row = [];    // represents single row to add to bomb board
			for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
				row.push(null);
			}
			board.push(row);
		}

		let numberOfBombsPlaced = 0;           // bomb counter

		while (numberOfBombsPlaced  < numberOfBombs) {
			let randomRowIndex = Math.floor(Math.random() * numberOfRows);
			let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
			if(board[randomRowIndex][randomColumnIndex] !== 'B') {
				board[randomRowIndex][randomColumnIndex] = 'B';
				numberOfBombsPlaced ++;
			}
		}

		return board;
	}
}


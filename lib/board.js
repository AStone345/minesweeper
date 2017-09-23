'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
	function Board(numberOfRows, numberOfColumns, numberOfBombs) {
		_classCallCheck(this, Board);

		this._numberOfBombs = numberOfBombs;
		this._numberOfTiles = numberOfRows * numberOfColumns;
		this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
		this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
	}

	_createClass(Board, [{
		key: 'flipTile',


		// let user "flip" a tile
		value: function flipTile(rowIndex, columnIndex) {
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

	}, {
		key: 'getNumberOfNeighboringBombs',
		value: function getNumberOfNeighboringBombs(rowIndex, columnIndex) {
			var _this = this;

			var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
			var numberOfRows = this._bombBoard.length;
			var numberOfColumns = this._bombBoard[0].length;

			var numberOfBombs = 0;

			neighborOffsets.forEach(function (offset) {
				var neighborRowIndex = rowIndex + offset[0];
				var neighborColumnIndex = columnIndex + offset[1];
				if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
					if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
						numberOfBombs++;
					}
				}
			});
			return numberOfBombs;
		}
	}, {
		key: 'hasSafeTiles',
		value: function hasSafeTiles() {
			return this._numberOfTiles !== this._numberOfBombs;
		}

		// function to format the game board

	}, {
		key: 'print',
		value: function print() {
			console.log(this._playerBoard.map(function (row) {
				return row.join(' | ');
			}).join('\n'));
		}
	}, {
		key: 'playerBoard',
		get: function get() {
			return this._playerBoard;
		}
	}], [{
		key: 'generatePlayerBoard',
		value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
			var board = []; // represents overall game board
			for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
				var row = []; // represents single row to add to game board
				for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
					row.push(' ');
				};
				board.push(row);
			}
			return board;
		}
	}, {
		key: 'generateBombBoard',
		value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
			var board = []; // represents overall bomb board

			for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
				var row = []; // represents single row to add to bomb board
				for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
					row.push(null);
				}
				board.push(row);
			}

			var numberOfBombsPlaced = 0; // bomb counter

			while (numberOfBombsPlaced < numberOfBombs) {
				var randomRowIndex = Math.floor(Math.random() * numberOfRows);
				var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
				if (board[randomRowIndex][randomColumnIndex] !== 'B') {
					board[randomRowIndex][randomColumnIndex] = 'B';
					numberOfBombsPlaced++;
				}
			}

			return board;
		}
	}]);

	return Board;
}();

exports.default = Board;
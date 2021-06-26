/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

// const WIDTH = 7;
// const HEIGHT = 6;

class Game {
  constructor(height,width,p1,p2) {
    this.HEIGHT = height;
    this.WIDTH = width;
    this.currPlayer = p1;
    this.board = [];
    this.makeBoard();
    this.makeHtmlBoard();
    this.gameIsRunning = true;
    this.p1 = p1;
    this.p2 = p2;
  }
  
  //makeBoard: create in-JS board structure: array of rows, each row is array of cells  (board[y][x])
  //*******************************************************************
  makeBoard() { 
    for (let y = 0; y < this.HEIGHT; y++) {
        const newRow = [];
        newRow.length = this.WIDTH;
        newRow.fill(null);
        this.board[y] = newRow; 
      }
  }

  //makeHtmlBoard: create html board structure
  //*******************************************************************
  makeHtmlBoard() { 
    const boardHTML = document.getElementById('board');
    boardHTML.innerHTML = ''; // clear "an old" game HTML table
    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', this.handleClick.bind(this));
    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }
  
    boardHTML.append(top);
  
    // make main part of board
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement('tr');
      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }
      boardHTML.append(row);
    }
  }

  //findSpotForCol: given column x, return top empty y (null if filled)
  //*******************************************************************
  findSpotForCol(x) { 
    for (let y = this.HEIGHT-1; y >= 0; y--) {
      if (this.board[y][x] === null) {
        return y;
      }
    }
    return null;
  }
  
  //placeInTable: update DOM to place piece into HTML table of board 
  //*******************************************************************
  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.backgroundColor = this.currPlayer.color; 
    piece.style.top = -50 * (y + 2);
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  //endGame: announce game end
  //*******************************************************************
  endGame(msg) {
    this.gameIsRunning = false;
    alert(msg);
  }
  //*******************************************************************
  // switch players
  switchPlayers() {
    this.currPlayer = this.currPlayer === this.p1 ? this.p2 : this.p1;
  }

  //function to check for tie: if there is a null in a top row, if not - return true
   //*******************************************************************
  checkForTie() {
    return this.board[0].every((x) => x!==null);
  } 

  // handleClick: handle click of column top to play piece
  //*******************************************************************
  handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;
    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }
    // place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);
    // check for win
    if (this.checkForWin()) {
      if (this.currPlayer === this.p1) return this.endGame(`Player 1 won!`); 
      else return this.endGame(`Player 2 won!`); 
    }
    // check for tie
    if (this.checkForTie()) {
      return this.endGame('Tie!');
    }
    this.switchPlayers();
  }

  //checkForWin: check board cell-by-cell for "does a win start here?"
  //*******************************************************************
  checkForWin() {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer
      const _win = (cells) =>       
        (cells.every(
            ([y, x]) =>
              y >= 0 &&
              y < this.HEIGHT &&
              x >= 0 &&
              x < this.WIDTH &&
              this.board[y][x] === this.currPlayer
          )); 

    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
}

class Player {
  constructor(color) {
    this.color = color;
  }
}


const startBtn = document.querySelector("#startBtn");
startBtn.addEventListener("click", function () {
  const playerOneColor = document.querySelector("#player1").value; // color-string for Player1
  const playerTwoColor = document.querySelector("#player2").value; //color-string for Player2

  const p1 = new Player(playerOneColor); // reference to an object Player1
  const p2 = new Player(playerTwoColor); // reference to an object Player2
  p1.color = playerOneColor;
  p2.color = playerTwoColor;

  new Game(6,7,p1,p2);
});



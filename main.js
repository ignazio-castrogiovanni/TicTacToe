(function() {

  var level = 1;



    // (1) Initialize every cell with an event listener
    // (2) Create a function that put a 'O' class on that cell,
    // (3) Create a function that remove that function from the event listening
    // (4) Attach function on (2) to the event listener
    // (5) Remove the function when the event is triggered
    // (6) Create a function that put a 'X' class on a cell
    // (7) Create a function that remove that function from event listening
    // (8)
    var board = [];
    var cells = document.getElementsByClassName('cell');
    var table = document.getElementById('tttTable');
    initGame();

    function addOClass(e) {
      var cell = e.target;
      console.log(e.target);
      //console.log(this);
      if (cell.getAttribute('data-symbol') === '-') {
        cell.setAttribute('data-symbol', 'o');
        var cellNum = cell.getAttribute('id');
        board[cellNum] = 'O';
        // What am I doing??? It's impossible for humans to win! Buhauhauhauh! :o

        var boardStatus = checkBoardStatus();


        if(boardStatus === 'tie') {
          initGame();
          return;
        }

        //var winningO = checkWinningMove('O', Number(cellNum), board);
        if (boardStatus === 'O') {
          alert("Player O won!");
          //stopGame();
          level += 1;
          initGame();
          //refresh game
        } else {
          moveX();
        }

      }
    }

    function stopGame() {
      var allMinusCell = document.getElementsByClassName('cell');
      // Disable all the free cell
      board.forEach(function(item, index) {
        if (item === '-') {
          allMinusCell[index].setAttribute('data-symbol', '*');
        }
      });
    }

    table.addEventListener("click", addOClass);

function initGame() {
  // Set a grid for tic tac toe and initialise it
  board = [];
  for (var i = 0; i < 9; ++i) {
    board.push('-');
  }
  for (var cIt = 0; cIt < cells.length; cIt++) {
    cells[cIt].setAttribute('data-symbol', '-');
  }
  var levElem = document.getElementById('depth');
  levElem.innerHTML = level;
}


    // -------------    GAME LOGIC    -------------- //
    // Define a function to check a winner on a move

    // Check board status
    function checkBoardStatus() {

      // Return the winning player, 'tie' if the game is a tie, false is the game is still going

      var cIter;
      // Check horizontal Winning
      for (cIter = 0; cIter < 9; cIter += 3) {
        if ((board[cIter] !== '-') && (board[cIter] === board[cIter + 1]) && (board[cIter] === board[cIter + 2])) {
          return board[cIter];
        }
      }

      // Check vertical Winning
      for (cIter = 0; cIter < 3; ++cIter) {
        if ((board[cIter] !== '-') && (board[cIter] === board[cIter + 3]) && (board[cIter] === board[cIter + 6])) {
          return board[cIter];
        }
      }

      // Check for diagonal Winning
      if ((board[0] !== '-') && (board[0] === board[4]) && (board[4] === board[8])) {
        return board[0];
      }
      if ((board[2] !== '-') && (board[2] === board[4]) && (board[4] === board[6])) {
        return board[2];
      }
      var gameStillGoing = board.some(function(item) {
        return (item === '-');
      });

      if (gameStillGoing) {
        return false;
      }
      // If none of these condition it's a tie
      return 'tie';
    }

    // -------------- ARTIFICIAL INTELLIGENCE ENGINE --------------- //
    function chooseMove(player, depth) {
      // Algorhitm minmax
      // X max, O min
      var iterator, bestResult;
      var boardStatus = checkBoardStatus();
      if (boardStatus === 'O') {
        return -99980 - depth;
      } else if (boardStatus === 'X') {
        return 99980 + depth;
      } else if ((boardStatus === 'tie') || (depth === 0)) {
        return 0;
      }

      // Guessing human move
      if (player === 'O') {
        bestResult = 100000;
        for (iterator = 0; iterator < 9; iterator++) {
          if(board[iterator] === '-') {
            board[iterator] = 'O';
            bestResult = Math.min(bestResult, chooseMove('X', depth - 1));
            board[iterator] = '-';
          }
        }
      }
      // Our (computer) move
      else {
        bestResult = -100000;
        for (iterator = 0; iterator < 9; iterator++) {
          if(board[iterator] === '-') {
            board[iterator] = 'X';
            bestResult = Math.max(bestResult, chooseMove('O', depth - 1));
            board[iterator] = '-';
          }
        }
      }
      return bestResult;
    }

    function moveX() {
      var cellIt, newMoveScore;
      var bestMove = 4;
      var bestScore = -100000;
      var decBoard = [-100000, -100000, -100000, -100000, -100000, -100000, -100000, -100000, -100000];
      for (cellIt = 0; cellIt < 9; cellIt++) {
        if (board[cellIt] === '-') {
          board[cellIt] = 'X';
          newMoveScore = chooseMove('O', level);
          decBoard[cellIt] = newMoveScore;
          if (newMoveScore > bestScore) {
            bestScore = newMoveScore;
            bestMove = cellIt;
          }
          board[cellIt] = '-';
        }
      }
      console.log("decision board: " + decBoard);
      console.log("best move: " + bestMove);
      updateBoardWithXMove(bestMove);
}
      function updateBoardWithXMove(move) {
        if(board[move] !== '-') {
          return;
        }

        var Xcell = document.getElementById('' + move);
        Xcell.setAttribute('data-symbol', 'x');


        board[move] = 'X';
        var boardStatus = checkBoardStatus();

        if(boardStatus === 'tie') {
          initGame();
        }

        if (boardStatus === 'X') {
          alert('Player X won');
          if(level !== 1) {
            level -= 1;
            initGame();
          }
        }
      }

    })();

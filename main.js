(function() {
  'use strict'
  // Initial level
  var level = 1;

  // Setting the board
  var board = [];
  var cells = document.getElementsByClassName('cell');
  var table = document.getElementById('tttTable');
  initGame();

  // Add event listener to tic tac toe table
  table.addEventListener("click", moveO);

  // Set a grid for tic tac toe and initialise it
  function initGame() {
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

  function moveO(e) {
    var currentCell = e.target;
    if (currentCell.getAttribute('data-symbol') === '-') {
      currentCell.setAttribute('data-symbol', 'o');
      var cellNum = currentCell.getAttribute('id');
      board[cellNum] = 'O';

      var boardFinalStatus = checkBoardStatus();
      if (boardFinalStatus) {
        closeAndRestartGame(boardFinalStatus);
      } else {
        moveX();
      }
    }
  }

  function moveX() {
    var cellIt, newMoveScore;
    var bestMove = 4;
    var bestScore = -100000;
    board.forEach(function(item, index) {
      if(item === '-') {
        board[index] = 'X';
        newMoveScore = chooseMove('O', level);
        if (newMoveScore > bestScore) {
          bestScore = newMoveScore;
          bestMove = index;
        }
        board[index] = '-';

      }
    });
    // for (cellIt = 0; cellIt < 9; cellIt++) {
    //   if (board[cellIt] === '-') {
    //     board[cellIt] = 'X';
    //     newMoveScore = chooseMove('O', level);
    //     if (newMoveScore > bestScore) {
    //       bestScore = newMoveScore;
    //       bestMove = cellIt;
    //     }
    //     board[cellIt] = '-';
    //   }
    // }
    updateBoardWithXMove(bestMove);
  }

  function updateBoardWithXMove(move) {

    var Xcell = document.getElementById('' + move);
    Xcell.setAttribute('data-symbol', 'x');

    board[move] = 'X';

    var boardFinalStatus = checkBoardStatus();
    if (boardFinalStatus) {
      closeAndRestartGame(boardFinalStatus);
    }
  }

  function closeAndRestartGame(boardStatus) {
    if (boardStatus === 'tie') {
      alert("Game is a 'tie'");
      initGame();
      return;
    }

    if (boardStatus === 'O') {
      alert("Player O won!");
      level += 1;
      initGame();
      return;
    }

    if (boardStatus === 'X') {
      alert('Player X won');
      if (level !== 1) {
        level -= 1;
        initGame();
        return;
      }
    }
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
    var bestResult;
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
      board.forEach(function(item, index) {
        if (item === '-') {
          board[index] = 'O';
          bestResult = Math.min(bestResult, chooseMove('X', depth - 1));
          board[index] = '-';
        }
      });
    }
    // Our (computer) move
    else {
      bestResult = -100000;
      board.forEach(function(item, index) {
        if (item === '-') {
          board[index] = 'X';
          bestResult = Math.max(bestResult, chooseMove('O', depth - 1));
          board[index] = '-';
        }
      });
    }
    return bestResult;
  }

})();

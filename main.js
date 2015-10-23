(function() {

  // Set a grid for tic tac toe and initialise it
  var board = [];
  var AIMove = null;
  for (var i = 0; i < 9; ++i) {
    board.push('-');
  }

  // (1) Initialize every cell with an event listener
  // (2) Create a function that put a 'O' class on that cell,
  // (3) Create a function that remove that function from the event listening
  // (4) Attach function on (2) to the event listener
  // (5) Remove the function when the event is triggered
  // (6) Create a function that put a 'X' class on a cell
  // (7) Create a function that remove that function from event listening
  // (8)
  var cells = document.getElementsByClassName('cell');

  function addOClass() {
    console.log(this);
    if(this.getAttribute('data-symbol') === '-')
    {
      this.setAttribute('data-symbol', 'o');
      var cellNum = this.getAttribute('id');
      board[cellNum] = 'O';
      moveX();
    }
  }

  for (var i = 0; i < cells.length; ++i) {
    console.log(cells[i]);
    cells[i].addEventListener("click", addOClass);
  }

  // -------------    GAME LOGIC    -------------- //
  // Define a function to check a winner on a move
  function checkWinningMove(player, move, board) {
    switch (move) {
      case 0:
        {
          if (((board[1] == player) && (board[2] == player)) ||
            ((board[3] == player) && (board[6] == player)) ||
            ((board[4] == player) && (board[8] == player))) {
            return true;
          }
          return false;
        }
        break;
      case 1:
        {
          if (((board[0] == player) && (board[2] == player)) ||
            ((board[4] == player) && (board[7] == player))) {
            return true;
          }
          return false;
        }
        break;
      case 2:
        {
          if (((board[0] == player) && (board[1] == player)) ||
            ((board[5] == player) && (board[8] == player)) ||
            ((board[4] == player) && (board[6] == player))) {
            return true;
          }
          return false;
        }
        break;
      case 3:
        {
          if (((board[0] == player) && (board[6] == player)) ||
            ((board[4] == player) && (board[5] == player))) {
            return true;
          }
          return false;
        }
        break;
      case 4:
        {
          if (((board[0] == player) && (board[8] == player)) ||
            ((board[1] == player) && (board[7] == player)) ||
            ((board[2] == player) && (board[6] == player)) ||
            ((board[3] == player) && (board[5] == player))
          ) {
            return true;
          }
          return false;
        }
        break;
      case 5:
        {
          if (((board[2] == player) && (board[8] == player)) ||
            ((board[3] == player) && (board[4] == player))) {
            return true;
          }
          return false;
        }
        break;
      case 6:
        {
          if (((board[0] == player) && (board[3] == player)) ||
            ((board[2] == player) && (board[4] == player)) ||
            ((board[7] == player) && (board[8] == player))) {
            return true;
          }
          return false;
        }
        break;
      case 7:
        {
          if (((board[1] == player) && (board[4] == player)) ||
            ((board[6] == player) && (board[8] == player))) {
            return true;
          }
          return false;
        }
        break;
      case 8:
        {
          if (((board[0] == player) && (board[4] == player)) ||
            ((board[2] == player) && (board[5] == player)) ||
            ((board[6] == player) && (board[7] == player))) {
            return true;
          }
          return false;
        }
        break;
      default:
        break;
    }
  }

  // Define a function to check a tie
  function isMoveATie(move, board, player) {
    // Let's give the main responsability to the checkWinningMove function,
    // so if it hasn't find a win the tie consists just of checking the board is full!

    var tmpBoard = board.slice();
    tmpBoard[move] = player;

    return !tmpBoard.some(function(item, index) {
      return (item === '-' && item != index);
    });
  }



  // -------------- ARTIFICIAL INTELLIGENCE ENGINE --------------- //
  function chooseMove(player, board, move) {
    AIMove = move;
    // Algorhitm minmax
    // X max, O min
    var bestScore, bestMove, newBoard;
    if (player === 'X') {
      //console.log("Player X move")
      if (checkWinningMove(player, move, board)) {
        //console.log("Winning move");
        return 10;
      } else if (isMoveATie(move, board, player)) {
        //console.log("Move is a tie");
        return 0;
      } else {
        bestScore = -1000;
        bestMove = null;
        newBoard = board.slice();
        newBoard[move] = 'X';
        newBoard.forEach(function(item, index) {
          if (item === '-') {
            var newMoveScore = chooseMove('O', newBoard, index);
            if (newMoveScore > bestScore) {
              //console.log("X says " + bestMove + "worth " + bestScore);
              bestScore = newMoveScore;
              AIMove = index;
            }
          }
        });
        return bestScore;
      }
    } else { // Player is O
      if (checkWinningMove(player, move, board)) {
        return -10;
      } else if (isMoveATie(move, board, player)) {
        return 0;
      } else {
        bestScore = 1000;
        bestMove = null;
        newBoard = board.slice();
        newBoard[move] = 'O';
        newBoard.forEach(function(item, index) {
          //console.log(index);
          if (item === '-') {
            var newMoveScore = chooseMove('X', newBoard, index);
            if (newMoveScore < bestScore) {
              //console.log("O says " + bestMove + "worth " + bestScore);
              bestScore = newMoveScore;
              //AIMove = index;
            }
          }
        });
        return bestScore;
      }
    }
  }

  function moveX() {
    var bestScore = -1000;
    var decBoard = [-1000,-1000,-1000,-1000,-1000,-1000,-1000,-1000,-1000];
    board.forEach(function(item, index) {
      if (item === '-') {
        var newMoveScore = chooseMove('X', board, index);
        decBoard[index] = newMoveScore;
        if (newMoveScore > bestScore) {
          //console.log("X says " + bestMove + "worth " + bestScore);
          bestScore = newMoveScore;
        }
      }
    });

    var maxNum = decBoard.reduce(function(prev, current, index, array){
      if(prev > current) {
        return prev;
      }
      return current;
    });
    if(maxNum === -1000) {
      return;
    }
    AIMove =  decBoard.indexOf(maxNum);
    console.log('Best Score: ' + bestScore);
    console.log('AIMove = ' + AIMove);
    console.log('Decision board: ' + decBoard);
    updateBoardWithXMove(AIMove);
  }

  function updateBoardWithXMove(move) {
    var Xcell = document.getElementById(''+move);
    Xcell.setAttribute('data-symbol', 'x');

    board[move] = 'X';
  }

})();

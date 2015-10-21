(function() {
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
    this.setAttribute('data-symbol', 'o');
    //singleCell.className = singleCell.className + ' O';
  }

  for (var i = 0; i < cells.length; ++i) {
    console.log(cells[i]);
    //cells[i].addEventListener("click", addOClass);
    //cells[i].addEventListener("click", addOClass(cells[i]));
    cells[i].addEventListener("click", addOClass);
  }
})();

var w;
var columns;
var rows;
var board;
var next;

var COLOR_0;
var COLOR_1;
var COLOR_2;
var COLOR_3;
var COLOR_4;

function setup() {

  COLOR_0 = color(255, 255, 255);
  COLOR_1 = color(116, 255, 255);
  COLOR_2 = color(147, 207, 255);
  COLOR_3 = color(198, 146, 226);
  COLOR_4 = color(153, 136, 236);

  let canvas = createCanvas(800, 800);
  canvas.parent("canvas-container");
  
  w = 5;

  // Calculate columns and rows
  columns = floor(width/w);
  rows = floor(height/w);

  // Wacky way to make a 2D array is JS

  board = new Array(columns);
  for (var i = 0; i < columns; i++) {
    board[i] = new Array(rows);
  }

  // Going to use multiple 2D arrays and swap them

  next = new Array(columns);
  for (i = 0; i < columns; i++) {
    next[i] = new Array(rows);
  }
  init();
}

function draw() {
  background(255);
  generate();
  for ( var i = 0; i < columns;i++) {
    for ( var j = 0; j < rows;j++) {

      switch (board[i][j]) {

        case 1:
          fill(COLOR_1);
          break;

        case 2:
          fill(COLOR_2);
          break;

        case 3:
          fill(COLOR_3);
          break;

        case 4:
          fill(COLOR_0);
          break;

        default:
          fill(COLOR_0);
      }
      //stroke(220);
      noStroke();
      rect(i*w, j*w, w-1, w-1);
    }
  }

}

// reset board when mouse is pressed
function mousePressed() {
  init();
}

// Fill board randomly
function init() {

  for (var i = 0; i < columns; i++) {
    for (var j = 0; j < rows; j++) {

      // Lining the edges with 0s
      if (
        i <= 1 || j <= 1 || i >= columns-2 || j >= rows-2
      ){
        board[i][j] = 0;

      }else{
        // Filling the rest randomly
         board[i][j] = floor(random(5));
      }

      next[i][j] = 0;
    }
  }
}

// The process of creating the new generation
function generate() {

  // Loop through every spot in our 2D array and check spots neighbors
  for (var x = 2; x < columns - 2; x++) {
    for (var y = 2; y < rows - 2; y++) {

      var currentState = board[x][y];
      var nextState = nextNumber(board[x][y]);

      // Add up all the states in a 3x3 surrounding grid
      var neighbors = 0;
      for (var i = -2; i <= 2; i++) {
        for (var j = -2; j <= 2; j++) {

          if(board[x+i][y+j] == nextState){
            neighbors++;
          }
        }
      }

      // Rules of Life
      if(neighbors >= 4){
        next[x][y] = nextState;
      }
    }
  }

  // Swap!
  var temp = board;
  board = next;
  next = temp;
}

function nextNumber(n){

  if(n >= 4){

    return 0;

  }else{

    return n + 1;
  }
}

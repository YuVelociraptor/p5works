var step = 0.01;
var yo;
var x;
var y;
var t = 0;

function setup() {
  createCanvas(1200, 800);
  background(255);

  yo = new Array(width);
  y = new Array(width);
  x = new Array(width);

  for (var i = 0; i < y.length; i++) {
    x[i] = i * step;

    if (
      (i >= 0 && i < 100) ||
      (i >= 200 && i < 300) ||
      (i >= 400 && i < 500) ||
      (i >= 600 && i < 700) ||
      (i >= 800 && i < 900) ||
      (i >= 1000 && i < 1100) ||
      (i >= 1200 && i < 1300)
    ) {
      yo[i] = 1;
    } else {
      yo[i] = -1;
    }
  }

  drawArray(x, yo);
}

function draw() {
  if (t == 0) {
    var a0 = yo.reduce((arg1, arg2) => arg1 + arg2) / width;

    for (var i = 0; i < y.length; i++) {
      y[i] = a0;
    }
  } else {
    var an = 0;
    var bn = 0;

    for (var i = 0; i < y.length; i++) {
      an +=
        (yo[i] * cos((2 * PI * t * x[i]) / (width * step)) * 2) /
        (width * step);
      bn +=
        (yo[i] * sin((2 * PI * t * x[i]) / (width * step)) * 2) /
        (width * step);
    }

    for (var i = 0; i < y.length; i++) {
      y[i] +=
        an * cos((2 * PI * t * x[i]) / (width * step)) +
        bn * sin((2 * PI * t * x[i]) / (width * step));
    }
  }

  drawArray(x, y);
  t++;
}

function drawArray(xArray, yArray) {
  for (var i = 0; i < xArray.length; i++) {
    pp(xArray[i], yArray[i]);
  }
}

function pp(x, y) {
  point(cx(x), cy(y));
}

function cx(x) {
  // return x + width / 2;
  return x / step;
}

function cy(y) {
  return height / 2 - y / step;
}

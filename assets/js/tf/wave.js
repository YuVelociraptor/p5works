function setup() {

  createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {

  background(240, 255, 255);

  for(let t = 0; t < width; t += 0.1){

    let x1 = t - width / 2;
    let y1 = height / 4 * sin(x1 * 100);

    let y2 = height / 4 * sin(x1 * 101);

    let y3 = y1 + y2;

    // plotGraph(x1, y1);
    // plotGraph(x1, y2);
    plotGraph(x1, y3);
  }
}

function plotGraph(x, y){
  point(plotedX(x), plotedY(y));
}

function lineGraph(x1, y1, x2, y2){
  line(plotedX(x1), plotedY(y1), plotedX(x2), plotedY(y2));
}

function plotedX(x){

  return x + width / 2;
}

function plotedY(y){

  return (-y) + height / 2;
}

function wavePosition(t, w, l, d){

  return exp(-d * t) * sin(t * w + l);
}

function switchLinePlot() {
  lineFlg = !lineFlg;
}
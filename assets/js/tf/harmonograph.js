const s = 200;
let wSliders = new Array(4);
let lSliders = new Array(4);
let dSliders = new Array(4);
let button;
let lineFlg = false;
let center;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(255);

  center = min(width, height) / 2;

  for(let c = 0; c < wSliders.length; c++){
    wSliders[c] = createSlider(0, 100, 10, 1);
    wSliders[c].position(1000, 100 * (c + 1));
    wSliders[c].style('width', '100px');
  }

  for(let c = 0; c < lSliders.length; c++){
    lSliders[c] = createSlider(0, 360, 0, 1);
    lSliders[c].position(1100, 100 * (c + 1));
    lSliders[c].style('width', '100px');
  }

  button = createButton('switch');
  button.position(1000, 700);
  button.mousePressed(switchLinePlot);
}

function draw() {

  background(255, 200, 200);

  let xb;
  let yb;

  for(let t = 0; t < 1000; t += 0.01){

    stroke(cos(t) * 255, cos(t + 2 * PI / 3) * 255, cos(t + 4 * PI / 3) * 255);

    let ws = new Array(wSliders.length);
    for(let c = 0; c < wSliders.length; c++){

      ws[c] = wSliders[c].value();
    }

    let ls = new Array(lSliders.length);
    for(let c = 0; c < lSliders.length; c++){

      ls[c] = lSliders[c].value() * 2 * PI / 360;
    }

    var x = wavePosition(t, ws[0], ls[0], 0) + wavePosition(t, ws[1], ls[1], 0);
    var y = wavePosition(t, ws[2], ls[2], 0) + wavePosition(t, ws[3], ls[3], 0);

    if(lineFlg){

      if(t > 0){
        lineGraph(xb, yb, x, y);

        xb = x;
        yb = y;
      }

    }else{
      plotGraph(x, y);
    }
  }
}

function plotGraph(x, y){
  point(plotedX(x), plotedY(y));
}

function lineGraph(x1, y1, x2, y2){
  line(plotedX(x1), plotedY(y1), plotedX(x2), plotedY(y2));
}

function plotedX(x){

  return s * x + center;
}

function plotedY(y){

  return s * (-y) + center;
}

function wavePosition(t, w, l, d){

  return exp(-d * t) * sin(t * w + l);
}

function switchLinePlot() {
  lineFlg = !lineFlg;
}
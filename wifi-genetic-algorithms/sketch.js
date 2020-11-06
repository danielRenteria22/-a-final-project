let walls;
let initialWallPoint;

function setup() {
  // put setup code here
  walls = new Walls();
  createCanvas(800, 550);
  initialWallPoint = null;
}

function draw() {
    // put drawing code here
    walls.draw();
    drawMousePosition();
    drawCurrentLine();
}

function drawMousePosition(){
  stroke('red'); 
  strokeWeight(10); 
  point(mouseX, mouseY);
}

function drawCurrentLine(){
  if(initialWallPoint != null){
    stroke('red'); 
    strokeWeight(10); 
    point(initialWallPoint.x, initialWallPoint.y);
    stroke('black'); 
    strokeWeight(3); 
    line(initialWallPoint.x,initialWallPoint.y,mouseX,mouseY);
  }
}

function mousePressed(){
  initialWallPoint = createVector(mouseX,mouseY);
}

function mouseReleased(){
  let finalPoint = createVector(mouseX,mouseY);
  walls.addWall(initialWallPoint,finalPoint);
  initialWallPoint = null;
}

functiuon
let walls;
let initialWallPoint;
let modem;

function setup() {
  createCanvas(800, 550);
  walls = new Walls();
  // adding border walls
  const uppperLeft = createVector(0,0);
  const upperRight = createVector(width,0);
  const downLeft = createVector(0,height);
  const downRight = createVector(width,height);
  walls.addWall(upperRight,uppperLeft);
  walls.addWall(upperRight,downRight);
  walls.addWall(downRight,downLeft);
  walls.addWall(downLeft,uppperLeft);
  
  initialWallPoint = null;
  modem = new Modem(400,275);
}

function draw() {
    // put drawing code here
    walls.draw();
    modem.draw();
    modem.drawRays(walls.walls);
    drawMousePosition();
    drawCurrentLine();
}

function drawMousePosition(){
  stroke('red'); 
  strokeWeight(10);
  let nearPoint = getNearWallPoint() ;
  point(nearPoint.x,nearPoint.y);
}

function getNearWallPoint(){
  let nearPoint = createVector(mouseX,mouseY);
  let offset = 25;
  for (let wall of walls.walls){
    let distance = dist(wall.p1.x,wall.p1.y,mouseX,mouseY);
    if(distance < offset){
      nearPoint = createVector(wall.p1.x,wall.p1.y);
      break;
    }

    distance = dist(wall.p2.x,wall.p2.y,mouseX,mouseY);
    if (distance < offset){
      nearPoint = createVector(wall.p2.x,wall.p2.y);
      break;
    }

    
  }

  if(initialWallPoint != null){
    let dx = abs(nearPoint.x - initialWallPoint.x);
    let dy = abs(nearPoint.y - initialWallPoint.y);
    if(dy < dx){
      nearPoint.y = initialWallPoint.y;
    } else{
      nearPoint.x = initialWallPoint.x;
    }
  }

  return nearPoint;
}

function drawCurrentLine(){
  if(initialWallPoint != null){
    stroke('red'); 
    strokeWeight(10); 
    point(initialWallPoint.x, initialWallPoint.y);
    stroke('black'); 
    strokeWeight(3); 

    let finalPoint = getNearWallPoint();
    line(initialWallPoint.x,initialWallPoint.y,finalPoint.x,finalPoint.y);
  }
}

function mousePressed(){
  initialWallPoint = getNearWallPoint();
}

function mouseReleased(){
  let finalPoint = getNearWallPoint();
  let initPoint = createVector(initialWallPoint.x,initialWallPoint.y);
  let finishPoint = createVector(finalPoint.x,finalPoint.y);
  walls.addWall(initPoint,finishPoint);
  initialWallPoint = null;
}

function keyPressed() {
  if (key == ' '){
    console.log("Space pressed");
  }
}
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

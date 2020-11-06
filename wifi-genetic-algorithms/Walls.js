class Walls{
    
    constructor() {
        this.walls = [];
    } 

    addWall(p1,p2){
        this.walls.push(new Wall(p1,p2));
    }

    draw() {
        background(155);
        for (let wall of this.walls){
            wall.draw();
        }
    }
}
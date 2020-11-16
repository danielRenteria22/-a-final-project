const theta = 5;

class Modem{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.rays = [];
        this.generateRays();
    }

    generateRays(){
        const origin = createVector(this.x,this.y)
        for(let i = 0; i < 360; i+= theta){
            const newRay = new Ray(origin, i)
            this.rays.push(newRay)
        }
    }

    draw(){
        stroke('blue'); 
        strokeWeight(10);
        point(this.x,this.y);
    }

    drawRays(walls){
        strokeWeight(2);
        for(let ray of this.rays){
            const intersection = ray.intersection(walls);
            if(intersection){
                stroke('orange'); 
                line(this.x,this.y,intersection.x,intersection.y)
            }

            const triangle = ray.castedTriangle(walls);
            triangle.draw();
        }
    }
}

class Ray{
    constructor(o,angle){
        this.o = o;
        this.angle = angle;
        this.direction = p5.Vector.fromAngle(radians(angle))
    }

    castedTriangle(walls){
        const beam1 = new Ray(this.o,this.angle + theta /2);
        const beam2 = new Ray(this.o,this.angle - theta /2);


        const q1 = beam1.intersection(walls);
        const q2 = beam2.intersection(walls);
        const triangle = new CastTriangle(this.o,this.intersection(walls),q1,q2);
        return triangle;
    }

    intersection(walls){
        let minDistance = null;
        let intersection = null;
        for(let wall of walls){
            const point = this.cast(wall);
            if(point){
                const distance = dist(this.o.x,this.o.y,point.x,point.y);
                if(distance < minDistance || minDistance  == null){
                    intersection = point;
                    minDistance = distance;
                }
            }
        }

        return intersection;
    }

    cast(wall) {
        const x1 = wall.p1.x;
        const y1 = wall.p1.y;
        const x2 = wall.p2.x;
        const y2 = wall.p2.y;
    
        const x3 = this.o.x;
        const y3 = this.o.y;
        const x4 = this.o.x + this.direction.x;
        const y4 = this.o.y + this.direction.y;
    
        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den == 0) {
          return;
        }
    
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
        if (t > 0 && t < 1 && u > 0) {
          const pt = createVector();
          pt.x = x1 + t * (x2 - x1);
          pt.y = y1 + t * (y2 - y1);
          return pt;
        } else {
          return;
        }
    }
}

class CastTriangle{
    constructor(o,p,q1,q2){
        this.o = o;
        this.q1 = q1;
        this.q2 = q2;
        this.p = p;
    }

    getArea(){
        return (dist(q1.x,q1.y,q2.x,q2.y) * dist(o.x,o.y,p.x,p.y)) / 2
    }

    draw(){
        let c = color('rgba(0, 0, 255, 0.3)');
        fill(c);
        noStroke();
        triangle(
            this.o.x,
            this.o.y,
            this.q1.x,
            this.q1.y,
            this.q2.x,
            this.q2.y
        )
    }    
}
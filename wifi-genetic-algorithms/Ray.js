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
        const pointDistances = []
        for(let wall of walls){
            const point = this.cast(wall);
            if(point){
                const distance = dist(this.o.x,this.o.y,point.x,point.y);
                if(distance <= maxDistance){
                    let pointDistance = {
                        point,
                        distance
                    };
                    pointDistances.push(pointDistance)
                }
            }
        }

        pointDistances.sort(function(a, b){return a.distance - b.distance}); 
        let secondIntersection = null;
        if(pointDistances.length > 1){
            return pointDistances[1].point
        }

        if(pointDistances.length == 1) {
            secondIntersection =  pointDistances[0]
        }

        if(secondIntersection == null || (secondIntersection.distance > maxDistance)){
            secondIntersection = {}
            secondIntersection.point = createVector(this.direction.x,this.direction.y)
            secondIntersection.point.setMag(maxDistance)
            secondIntersection.point.x += this.o.x
            secondIntersection.point.y += this.o.y
        }


        return secondIntersection.point;
        
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
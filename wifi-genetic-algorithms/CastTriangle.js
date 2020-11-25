class CastTriangle{
    constructor(o,p,q1,q2){
        this.o = o;
        this.q1 = q1;
        this.q2 = q2;
        this.p = p;
    }

    getArea(){
        const side1 = dist(this.o.x,this.o.y,this.q1.x,this.q1.y)
        const side2 = dist(this.o.x,this.o.y,this.q2.x,this.q2.y)

        let side3 = dist(this.q1.x,this.q1.y,this.q2.x,this.q2.y);
        var s = (side1 + side2 + side3)/2;
        return Math.sqrt(s*((s-side1)*(s-side2)*(s-side3)));
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
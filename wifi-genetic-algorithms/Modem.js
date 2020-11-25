const theta = 3;
const maxDistance = 350;
const minFitness = 0.05;
const maxFitness = 0.95;
const mutationRate = 0.01;

class Modem{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.rays = [];
        this.generateRays();
    }

    generateRays(){
        const origin = createVector(this.x,this.y)
        this.rays = [];
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

    calculateArea(walls){
        this.area = 0;
        this.generateRays()
        for(let ray of this.rays){
            const triangle = ray.castedTriangle(walls);
            const a = triangle.getArea();
            // console.log(a)
            this.area += a
        }
    }

    calculateFitness(){
        const maxArea = 3.1416 * maxDistance * maxDistance;
        this.fitness = map(this.area,0,maxArea,minFitness,maxFitness)
    }

    combine(parent2) {
        let newX = this.findMiddleValue(this.x,parent2.x);
        let newY = this.findMiddleValue(this.y,parent2.y);
        // if(Math.random() >= mutationRate){
        //     newX += map(Math.random(),0,1,-10,-10);
        // }
        // if(Math.random() >= mutationRate){
        //     newY += map(Math.random(),0,1,-10,-10);
        // }

        newX = this.normalizaValue(newX,width)
        newY = this.normalizaValue(newY,height)
        
        return new Modem(newX,newY);
    }

    normalizaValue(value,max){
        if(value <= 0) return 50;
        if(value >= max) return max - 50;
        return value;
    }

    findMiddleValue(v1,v2){
        return (v1 + v2) / 2
    }

    canBeat(oddToBeat){
        return this.fitness >= oddToBeat;
    }
}

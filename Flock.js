class Flock{
    constructor(boids) {
        this.boids = boids;
        this.avoidFactor = 0.05;
        this.protectedRange = 20;
        this.visibleRange = 500;
        this.matchingFactor = 0.5;
        this.centeringFactor = 0.0006;
        this.turnFactor = 0.2;
    }

    separation(){
        this.boids.forEach(boid => {
            let closeDx = 0;
            let closeDy = 0;
            const otherBoids = this.boids.filter(otherBoid => otherBoid != boid)
            otherBoids.forEach(otherBoid => {
                const distance = Math.sqrt((boid.x - otherBoid.x) * (boid.x - otherBoid.x) + (boid.y - otherBoid.y) * (boid.y - otherBoid.y));
                if (distance <= this.protectedRange){
                    closeDx += boid.x - otherBoid.x;
                    closeDy += boid.y - otherBoid.y;
                }
            })
            boid.vx += closeDx * this.avoidFactor;
            boid.vy += closeDy * this.avoidFactor;
        });
    }

    alignment(){
        this.boids.forEach(boid => {
            let xvelAvg = 0;
            let yvelAvg = 0;
            let neighbouringBoids = 0;
            const otherBoids = this.boids.filter(otherBoid => otherBoid != boid)
            otherBoids.forEach(otherBoid => {
                const distance = Math.sqrt((boid.x - otherBoid.x) * (boid.x - otherBoid.x) + (boid.y - otherBoid.y) * (boid.y - otherBoid.y));
                if (distance <= this.visibleRange){
                    xvelAvg += otherBoid.vx;
                    yvelAvg += otherBoid.vy;
                    neighbouringBoids++;
                }
            })
            if(neighbouringBoids > 0){
                xvelAvg = xvelAvg / neighbouringBoids;
                yvelAvg = yvelAvg / neighbouringBoids;
            }
            boid.vx += (xvelAvg - boid.vx) * this.matchingFactor;
            boid.vy += (yvelAvg - boid.vy) * this.matchingFactor;
        });
    }

    cohesion(){
        this.boids.forEach(boid => {
            let xposAvg = 0;
            let yposAvg = 0;
            let neighbouringBoids = 0;
            const otherBoids = this.boids.filter(otherBoid => otherBoid != boid)
            otherBoids.forEach(otherBoid => {
                const distance = Math.sqrt((boid.x - otherBoid.x) * (boid.x - otherBoid.x) + (boid.y - otherBoid.y) * (boid.y - otherBoid.y));
                if (distance <= this.visibleRange){
                    xposAvg += otherBoid.x;
                    yposAvg += otherBoid.y;
                    neighbouringBoids++;
                }
            })
            if(neighbouringBoids > 0){
                xposAvg = xposAvg / neighbouringBoids;
                yposAvg = yposAvg / neighbouringBoids;
            }
            boid.vx += (xposAvg - boid.x) * this.centeringFactor;
            boid.vy += (yposAvg - boid.y) * this.centeringFactor;
        });
    }

    algorithm(){
        
        this.boids.forEach(boid => {
            let closeDx = 0;
            let closeDy = 0;
            let xposAvg = 0;
            let yposAvg = 0;
            let xvelAvg = 0;
            let yvelAvg = 0;
            let neighbouringBoids = 0;
            const otherBoids = this.boids.filter(otherBoid => otherBoid != boid)
            otherBoids.forEach(otherBoid => {
                let dx = boid.x - otherBoid.x;
                let dy = boid.y - otherBoid.y;
                if (Math.abs(dx) < this.protectedRange && Math.abs(dy) < this.protectedRange){
                    const distance = dx * dx + dy * dy;
                    if (distance < this.protectedRange * this.protectedRange){
                        closeDx += boid.x - otherBoid.x;
                        closeDy += boid.y - otherBoid.y;
                    }
                    else if (distance < this.visibleRange * this.visibleRange){
                        xposAvg += otherBoid.x;
                        yposAvg += otherBoid.y;
                        xvelAvg += otherBoid.vx;
                        yvelAvg += otherBoid.vy;
                        neighbouringBoids++;
                    }
                }
            })
            if (neighbouringBoids > 0){
                xposAvg = xposAvg / neighbouringBoids;
                yposAvg = yposAvg / neighbouringBoids;
                xvelAvg = xvelAvg / neighbouringBoids;
                yvelAvg = yvelAvg / neighbouringBoids;

                boid.vx = (boid.vx +
                        (xposAvg - boid.x)*this.centeringFactor +
                        (xvelAvg - boid.vx)*this.matchingFactor)
                
                boid.vy = (boid.vy +
                        (yposAvg - boid.y)*this.centeringFactor +
                        (yvelAvg - boid.vy)*this.matchingFactor)
            }

            boid.vx += (closeDx * this.avoidFactor);
            boid.vy += (closeDy * this.avoidFactor);

            if (boid.y < 100){
                boid.vy += this.turnFactor;
            }
            if (boid.x > window.innerWidth - 100){
                boid.vx -= this.turnFactor;
            }
            if (boid.x < 100){
                boid.vx += this.turnFactor;
            }
            if (boid.y > window.innerHeight - 100){
                boid.vy -= this.turnFactor;
            }
        })
    }
    move(){
        this.algorithm()
        this.boids.forEach(boid => {
            boid.move()
        });
    }
}

export default Flock
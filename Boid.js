class Boid {
    constructor(x, y, dx, dy, ctx) {
        this.x = x;
        this.y = y;
        this.vx = dx;
        this.vy = dy;
        this.ctx = ctx;
        this.trail = [];
        this.maxTrail = 50;
        this.maxSpeed = 1;
        this.minSpeed = 1;
    }

    draw() {
        for (let i = 0; i < this.trail.length - 1; i=i+3) {
            const x = this.trail[i].x;
            const y = this.trail[i].y;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 7, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${0.1 * (i / this.maxTrail)})`;
            this.ctx.fill();
        }
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        const angle = Math.atan2(this.vy, this.vx);
        this.ctx.rotate(angle);
        this.ctx.beginPath();
        this.ctx.moveTo(10, 0);
        this.ctx.lineTo(-15, 10);
        this.ctx.lineTo(-10, 0);
        this.ctx.lineTo(-15, -10);
        this.ctx.closePath();
        this.ctx.fillStyle = "#fff";
        this.ctx.fill();
        this.ctx.restore();
    }

    move(){
        const offset = 15;
        const norm = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const trailX = this.x - (this.vx / norm) * offset;
        const trailY = this.y - (this.vy / norm) * offset;
        this.trail.push({ x: trailX, y: trailY });
        if (this.trail.length > this.maxTrail) this.trail.shift();

        const speed = Math.sqrt(this.vx*this.vx + this.vy*this.vy)

        if(speed < this.minSpeed){
            this.vx = (this.vx/speed)*this.minSpeed
            this.vy = (this.vy/speed)*this.minSpeed
        }
        if(speed > this.maxSpeed){
            this.vx = (this.vx/speed)*this.maxSpeed
            this.vy = (this.vy/speed)*this.maxSpeed
        }
        
        this.x += this.vx;
        this.y += this.vy;

        // if(this.x > window.innerWidth){
        //     this.x = 0;
        // }

        // if(this.x < 0){
        //     this.x = window.innerWidth;
        // }

        // if(this.y > window.innerHeight){
        //     this.y = 0;
        // }

        // if(this.y < 0){
        //     this.y = window.innerHeight;
        // }

        this.draw();
    }
}

export default Boid
class Boid {
    constructor(x, y, dx, dy, ctx) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.ctx = ctx;
        this.trail = [];
        this.maxTrail = 70;
    }

    draw() {
        for (let i = 0; i < this.trail.length - 1; i=i+7) {
            const x = this.trail[i].x;
            const y = this.trail[i].y;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 7, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${0.5 * (i / this.maxTrail)})`;
            this.ctx.fill();
        }
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        const angle = Math.atan2(this.dy, this.dx);
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
        const norm = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        const trailX = this.x - (this.dx / norm) * offset;
        const trailY = this.y - (this.dy / norm) * offset;
        this.trail.push({ x: trailX, y: trailY });
        if (this.trail.length > this.maxTrail) this.trail.shift();

        const speed = Math.sqrt(this.dx*this.dx + this.dy*this.dy)

        if(speed < 1){
            this.dx = (this.dx/speed)*1
            this.dy = (this.dy/speed)*1
        }
        if(speed > 1){
            this.dx = (this.dx/speed)*1
            this.dy = (this.dy/speed)*1
        }
        
        this.x += this.dx;
        this.y += this.dy;

        if(this.x > window.innerWidth){
            this.x = 0;
        }

        if(this.x < 0){
            this.x = window.innerWidth;
        }

        if(this.y > window.innerHeight){
            this.y = 0;
        }

        if(this.y < 0){
            this.y = window.innerHeight;
        }

        this.draw();
    }
}

export default Boid
class Boid {
    constructor(x, y, dx, dy, ctx) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.ctx = ctx;
        this.trail = [];
        this.maxTrail = 30;
    }

    draw() {
        // for (let i = 0; i < this.trail.length - 1; i++) {
        //     this.ctx.save();
        //     const x = this.trail[i].x;
        //     const y = this.trail[i].y;
        //     this.ctx.translate(x, y);
        //     this.ctx.beginPath();
        //     this.ctx.arc(this.trail[i].x, this.trail[i].y, 20, 0, 2 * Math.PI, false);
        //     const alpha = 0.01
        //     this.ctx.fillStyle = `rgba(255, 255, 255, 1)`;
        //     this.ctx.fill();
        //     this.ctx.restore();
        // }
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.translate(12.5, 10);
        const angle = Math.atan2(this.dy, this.dx);
        this.ctx.rotate(angle);
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(25, 10);
        this.ctx.lineTo(0, 20);
        this.ctx.lineTo(5, 10);
        this.ctx.fillStyle = "#fff";
        this.ctx.shadowColor = "#fff";
        this.ctx.shadowBlur = 4;
        this.ctx.fill();
        this.ctx.restore();

    }

    move(){
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.maxTrail) this.trail.shift();

        this.x += this.dx;
        this.y += this.dy;

        const speed = Math.sqrt(this.dx*this.dx + this.dy*this.dy)

        if(speed < 1){
            this.dx = (this.dx/speed)*1
            this.dy = (this.dy/speed)*1
        }
        if(speed > 1){
            this.dx = (this.dx/speed)*1
            this.dy = (this.dy/speed)*1
        }

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
import Boid from "./Boid.js";

const canvas = document.getElementById("boids-canvas");
const innerWidth = window.innerWidth;
const innerHeight = window.innerHeight;
canvas.width = innerWidth;
canvas.height = innerHeight;
const ctx = canvas.getContext("2d", { alpha: false });
const off = document.createElement("canvas");
off.width = innerWidth;
off.height = innerHeight;
const offCtx = off.getContext("2d", { alpha: false });
const numBoids = 100;
const boids = [];
for (let i = 0; i < numBoids; i++) {
    boids.push(new Boid(Math.random() * innerWidth, Math.random() * innerHeight, Math.random() - 0.5, Math.random() - 0.5, offCtx));
}

function animate() {
    offCtx.clearRect(0, 0, innerWidth, innerHeight);
    boids.forEach(boid => {
        boid.move();
    });
    
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.drawImage(off, 0, 0);
    requestAnimationFrame(animate);
}
animate();
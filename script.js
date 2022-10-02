import { Particle } from "./particle.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let hue = 0;

function createParticles(ctx, x, y) {
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle(ctx, x, y, `hsl(${hue}, 60%, 50%)`));
  }
}

function drawLine(x1, y1, x2, y2, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.2;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}

function connectParticles(startIndex) {
  for (let j = startIndex; j < particles.length; j++) {
    const dx = particles[startIndex].x - particles[j].x;
    const dy = particles[startIndex].y - particles[j].y;
    const distance = dx ** 2 + dy ** 2;

    if (distance < 10000) {
      drawLine(particles[startIndex].x, particles[startIndex].y, particles[j].x, particles[j].y, particles[startIndex].color);
    }
  }
}

function handleParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    connectParticles(i);
  }


  particles = particles.filter(particle => particle.size > 0.3);
}

canvas.addEventListener('pointermove', (event) => {
  event.preventDefault();
});

canvas.addEventListener('mousemove', (event) => {
  createParticles(ctx, event.x, event.y);
});

canvas.addEventListener('touchmove', (event) => {
  event.preventDefault();
  createParticles(ctx, event.touches[0].clientX, event.touches[0].clientY);
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  hue += 5;
  requestAnimationFrame(animate);
}

animate();
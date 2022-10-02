export class Particle {
  constructor(ctx, x, y, color = 'white') {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = Math.random() * 10 + 1;
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 4 - 2;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.size > 0.3) {
      this.size -= 0.2;
    }
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
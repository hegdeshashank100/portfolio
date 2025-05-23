document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.createElement('canvas');
    canvas.classList.add('particles-canvas');
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');

    let particles = [];
    const num = 40; // Further reduced for better mobile performance

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 0.6; // Reduced to 60% to avoid overlapping content
        canvas.style.position = 'absolute';
        canvas.style.top = '60px'; // Start below navbar
        canvas.style.left = '0';
        canvas.style.zIndex = '0';
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height + 60; // Offset for navbar
            this.vx = (Math.random() - 0.5) * 1;
            this.vy = (Math.random() - 0.5) * 1;
            this.radius = Math.random() * 2 + 1;
            this.alpha = Math.random();
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 255, ${this.alpha})`;
            ctx.fill();
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width || this.y < 60 || this.y > canvas.height + 60) {
                this.reset();
            }
        }
    }

    for (let i = 0; i < num; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
});

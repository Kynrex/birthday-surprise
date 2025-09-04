// Fireworks Animation
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
    constructor(x, y, colors) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.colors = colors;
        this.createParticles();
    }

    createParticles() {
        const count = 90; // more particles per firework for bigger look
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = Math.random() * 5 + 2.5;
            this.particles.push({
                x: this.x,
                y: this.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                size: Math.random() * 3 + 2,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            });
        }
    }

    update() {
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.98; 
            p.vy *= 0.98;
            p.alpha -= 0.015;
        });
        this.particles = this.particles.filter(p => p.alpha > 0);
    }

    draw(ctx) {
        this.particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
            ctx.shadowBlur = 30;
            ctx.shadowColor = `rgb(${p.color})`;
            ctx.fill();
        });
    }
}

let fireworks = [];

function animate() {
    requestAnimationFrame(animate);

    // Trail effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((fw, index) => {
        fw.update();
        fw.draw(ctx);
        if (fw.particles.length === 0) fireworks.splice(index, 1);
    });
}

function launchFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * (canvas.height / 2);
    const colors = [
        "255,0,0", "0,255,0", "0,0,255",
        "255,255,0", "255,0,255", "0,255,255",
        "255,128,0", "128,0,255"
    ];
    fireworks.push(new Firework(x, y, colors));
}

// 🌟 Grand opening burst when page loads
function grandOpeningBurst() {
    for (let i = 0; i < 12; i++) { // 12 fireworks at once
        launchFirework();
    }
}

// Normal ongoing bursts
setInterval(() => {
    for (let i = 0; i < 3; i++) { // 3 fireworks at once
        launchFirework();
    }
}, 1200);

// Start animation
animate();
grandOpeningBurst();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
function nextPage(url) {
  window.location.href = url;
}
// Floating hearts
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (3 + Math.random() * 5) + "s";
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 7000);
}
setInterval(createHeart, 800);
// Show button after 2s
window.onload = function() {
  setTimeout(() => {
    document.getElementById("magicBtn").classList.remove("hidden");
  }, 2000);

  // Button click -> fireworks page
  document.getElementById("magicBtn").onclick = function() {
    window.location.href = "fireworks.html";
  };
};
// script.js - starfield, button reveal, idle float trigger, simple flame toggle
document.addEventListener('DOMContentLoaded', () => {
  const starsContainer = document.querySelector('.stars');
  const STAR_COUNT = 70;

  // create stars
  for (let i = 0; i < STAR_COUNT; i++) {
    const s = document.createElement('span');
    s.className = 'star';
    const left = Math.random() * 100;
    const top = Math.pow(Math.random(), 1.6) * 92; // bias toward top
    s.style.position = 'absolute';
    s.style.left = left + '%';
    s.style.top = top + '%';

    const size = (Math.random() * 2.6) + 0.6;
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    s.style.borderRadius = '50%';
    s.style.background = 'white';
    s.style.opacity = (0.12 + Math.random() * 0.9).toFixed(2);
    const dur = (1.2 + Math.random() * 2.6).toFixed(2);
    const delay = (-Math.random() * 3.5).toFixed(2);
    s.style.animation = `starTwinkle ${dur}s ease-in-out ${delay}s infinite`;
    const glow = Math.round(8 + Math.random() * 28);
    s.style.boxShadow = `0 0 ${Math.round(glow/4)}px rgba(255,255,255,${0.15 + Math.random()*0.5})`;

    starsContainer.appendChild(s);
  }

  // show Begin Magic button after 2 seconds
  const btn = document.getElementById('magicBtn');
  setTimeout(() => btn.classList.add('visible'), 2000);

  // navigate with a quick pulse animation then go
  btn.addEventListener('click', () => {
    btn.animate([
      { transform: 'scale(1)', opacity: 1 },
      { transform: 'scale(.92)', opacity: 0.98 },
      { transform: 'scale(1.12)', opacity: 1 }
    ], { duration: 340, easing: 'cubic-bezier(.2,.8,.2,1)' });

    setTimeout(() => location.href = 'fireworks.html', 400);
  });

  // after entrance done, add idle float
  window.addEventListener('load', () => {
    const cake = document.getElementById('cake');
    setTimeout(() => cake.classList.add('idle'), 1000 + 200);
  });

  // optional: clicking candle toggles flame
  const candle = document.querySelector('.candle');
  const flame = candle && candle.querySelector('.flame');
  candle && candle.addEventListener('click', e => {
    e.stopPropagation();
    if (!flame) return;
    flame.style.display = (flame.style.display === 'none') ? '' : 'none';
  });
});

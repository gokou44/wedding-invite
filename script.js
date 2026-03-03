/* ===== Countdown ===== */
/* ===== Canvas ===== */
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const sky = new Image();
sky.src = 'assets/sky.png';

const far = new Image();
far.src = 'assets/flower_far.png';

const near = new Image();
near.src = 'assets/flower_near.png';

const sprite = new Image();
sprite.src = 'assets/wedding_chibi.png';

let progress = 0;
let frame = 0;

/* ===== Falling flowers ===== */
const petals = [];
for (let i = 0; i < 40; i++) {
  petals.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speed: 0.3 + Math.random() * 0.7,
  });
}

function drawPetals() {
  ctx.fillStyle = '#ffffff';
  petals.forEach(p => {
    p.y += p.speed;
    if (p.y > canvas.height) p.y = -10;
    ctx.fillRect(p.x, p.y, 2, 2);
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(sky, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(far, 0, canvas.height - 220, canvas.width, 220);
  ctx.drawImage(near, 0, canvas.height - 140, canvas.width, 140);

  drawPetals();

  const total = weddingDate - new Date('2025-01-01');
  const current = new Date() - new Date('2025-01-01');
  progress = Math.min(1, current / total);

  const x = progress * (canvas.width - 120);
  const y = canvas.height - 170;

  frame = (frame + 0.15) % 4;
  const frameIndex = Math.floor(frame);

  ctx.drawImage(
    sprite,
    frameIndex * 64,
    0,
    64,
    64,
    x,
    y,
    96,
    96
  );

  requestAnimationFrame(animate);
}

sprite.onload = () => animate();

/* ===== Music ===== */
const audio = document.getElementById('bgm');
const btn = document.getElementById('playBtn');

let started = false;

function tryPlay() {
  if (!started) {
    audio.play().catch(() => {});
    started = true;
  }
}

document.body.addEventListener('click', tryPlay);

btn.onclick = () => {
  if (audio.paused) audio.play();
  else audio.pause();
};

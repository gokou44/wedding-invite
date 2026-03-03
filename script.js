// ================= COUNTDOWN + MOVE =================

const weddingDate = new Date("2026-04-28T16:00:00").getTime();
const countdownEl = document.getElementById("countdown");
const couple = document.getElementById("couple");

const startDate = new Date("2025-01-01").getTime();
const totalDuration = weddingDate - startDate;

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance <= 0) {
    countdownEl.innerHTML = "🎉 Đã tới ngày cưới!";
    couple.style.left = "85%";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  countdownEl.innerHTML =
    `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;

  // progress move
  const passed = now - startDate;
  let progress = passed / totalDuration;
  progress = Math.max(0, Math.min(1, progress));
  couple.style.left = (progress * 85) + "%";
}

setInterval(updateCountdown, 1000);
updateCountdown();


// ================= AUTO PLAY MUSIC =================

const musicBtn = document.getElementById("musicBtn");
const music = document.getElementById("bgMusic");
let playing = false;
let userInteracted = false;

function startMusicOnce() {
  if (!userInteracted) {
    music.play().catch(()=>{});
    musicBtn.textContent = "⏸ Tạm dừng";
    playing = true;
    userInteracted = true;
  }
}

document.addEventListener("click", startMusicOnce);
document.addEventListener("touchstart", startMusicOnce);

musicBtn.addEventListener("click", () => {
  if (!playing) {
    music.play();
    musicBtn.textContent = "⏸ Tạm dừng";
  } else {
    music.pause();
    musicBtn.textContent = "▶ Phát nhạc";
  }
  playing = !playing;
});


// ================= PETAL FALL =================

const canvas = document.getElementById("petals");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const petals = [];
const PETAL_COUNT = 25;

for (let i = 0; i < PETAL_COUNT; i++) {
  petals.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 6 + Math.random() * 6,
    speed: 0.5 + Math.random(),
    drift: Math.random() * 0.5 - 0.25
  });
}

function drawPetal(p) {
  ctx.fillStyle = "#a5d6a7";
  ctx.fillRect(p.x, p.y, p.size, p.size);
}

function updatePetals() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  petals.forEach(p => {
    p.y += p.speed;
    p.x += p.drift;

    if (p.y > canvas.height) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }

    drawPetal(p);
  });

  requestAnimationFrame(updatePetals);
}

updatePetals();

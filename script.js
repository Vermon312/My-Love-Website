
// Lightbox interactions
const grid = document.querySelector('.grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

if (grid) {
  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    const img = card.querySelector('img');
    const caption = card.querySelector('figcaption')?.textContent || '';
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption;
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden', 'false');
  });
}

function closeLightbox(){
  lightbox.style.display = 'none';
  lightbox.setAttribute('aria-hidden', 'true');
}
window.closeLightbox = closeLightbox;

document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') closeLightbox();
});

// --- Love Check Feature ---
const loveYes = document.getElementById('love-yes');
const loveNo  = document.getElementById('love-no');
const loveRes = document.getElementById('love-result');

function revealLove() {
  loveRes.hidden = false;
  loveRes.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

loveYes?.addEventListener('click', revealLove);

// Make the "No" button slippery 😄
function moveNoAway() {
  if (!loveNo) return;
  loveNo.classList.add('escape');

  // Pick a random offset inside the buttons area
  const area = loveNo.parentElement.getBoundingClientRect();
  const btnW = loveNo.offsetWidth;
  const btnH = loveNo.offsetHeight;

  // random position within container (with padding)
  const x = Math.max(0, Math.min(area.width  - btnW,  Math.random() * (area.width  - btnW)));
  const y = Math.max(0, Math.min(area.height - btnH, Math.random() * (area.height - btnH)));

  loveNo.style.transform = `translate(${x}px, ${y}px)`;
  loveNo.style.opacity = 0.9;
}

// On hover (desktop) or touch (mobile), the button runs away / disappears
loveNo?.addEventListener('mouseenter', moveNoAway);
loveNo?.addEventListener('touchstart', (e) => { e.preventDefault(); moveNoAway(); });

// If someone still manages to click "No", just hide it 😅
loveNo?.addEventListener('click', (e) => {
  e.preventDefault();
  loveNo.style.opacity = 0;
  loveNo.style.pointerEvents = 'none';
});
``

// Year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Lightbox interactions
const grid = document.querySelector('.grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
if (grid) {
  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    const img = card.querySelector('img');
    const caption = card.querySelector('figcaption')?.textContent || '';
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption;
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden', 'false');
  });
}
function closeLightbox(){
  lightbox.style.display = 'none';
  lightbox.setAttribute('aria-hidden', 'true');
}
window.closeLightbox = closeLightbox;

document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') closeLightbox();
});

// --- Love Check, including slippery NO and reveal on YES ---
const loveYes = document.getElementById('love-yes');
const loveNo  = document.getElementById('love-no');
const loveRes = document.getElementById('love-result');

function revealLove() {
  if (!loveRes) return;
  loveRes.hidden = false;
  loveRes.scrollIntoView({ behavior: 'smooth', block: 'center' });
  // Also trigger rose effect
  spawnRoses(16);
}

loveYes?.addEventListener('click', revealLove);

function moveNoAway() {
  if (!loveNo) return;
  loveNo.classList.add('escape');
  const area = loveNo.parentElement.getBoundingClientRect();
  const btnW = loveNo.offsetWidth;
  const btnH = loveNo.offsetHeight;
  const x = Math.max(0, Math.min(area.width  - btnW,  Math.random() * (area.width  - btnW)));
  const y = Math.max(0, Math.min(area.height - btnH, Math.random() * (area.height - btnH)));
  loveNo.style.transform = `translate(${x}px, ${y}px)`;
  loveNo.style.opacity = 0.9;
}

loveNo?.addEventListener('mouseenter', moveNoAway);
loveNo?.addEventListener('touchstart', (e) => { e.preventDefault(); moveNoAway(); });

loveNo?.addEventListener('click', (e) => {
  e.preventDefault();
  loveNo.style.opacity = 0;
  loveNo.style.pointerEvents = 'none';
});

// --- Daily Compliment Generator ---
const compliments = [
  "You make ordinary days feel special.",
  "Your smile is my favorite sight.",
  "You brighten everything you touch.",
  "You are effortlessly beautiful.",
  "I’m lucky to know you.",
  "You make my heart happy.",
  "You’re my favorite hello.",
  "You’re even better than my dreams.",
  "You’re my safe place.",
  "You are loved, always."
];
(function showCompliment(){
  const el = document.getElementById('compliment-text');
  if (!el) return;
  const todayIndex = Math.floor((Date.now() / 86400000)) % compliments.length; // day-based rotating index
  el.textContent = compliments[todayIndex];
})();

// --- Floating Hearts Animation (on click and pointer move) ---
let lastSpawn = 0;
function spawnHeart(x, y, char = '💗') {
  const h = document.createElement('div');
  h.className = 'heart';
  h.textContent = char;
  h.style.left = (x - 8) + 'px';
  h.style.top  = (y - 8) + 'px';
  h.style.transform = `translateY(0) scale(${0.8 + Math.random()*0.6})`;
  h.style.opacity = 0.85;
  document.body.appendChild(h);
  setTimeout(()=> h.remove(), 2400);
}

window.addEventListener('pointermove', (e)=>{
  const now = performance.now();
  if (now - lastSpawn > 90) { // throttle
    lastSpawn = now;
    spawnHeart(e.clientX, e.clientY, Math.random() < 0.3 ? '💞' : '💗');
  }
});
window.addEventListener('click', (e)=>{
  spawnHeart(e.clientX, e.clientY, '💖');
});

// --- Blossoming Roses on YES ---
function spawnRoses(count=12){
  const { innerWidth: w, innerHeight: h } = window;
  for (let i=0;i<count;i++){
    setTimeout(()=>{
      const x = 60 + Math.random()*(w-120);
      const y = (h*0.65) + Math.random()*80;
      spawnHeart(x, y, '🌹');
    }, i*80);
  }
}

// --- Gift Box toggle ---
const giftBox = document.getElementById('gift-box');
const giftReveal = document.getElementById('gift-reveal');

giftBox?.addEventListener('click', ()=>{
  const open = giftBox.classList.toggle('open');
  giftBox.setAttribute('aria-expanded', open ? 'true' : 'false');
  if (open) {
    giftReveal.hidden = false;
    giftReveal.scrollIntoView({ behavior:'smooth', block:'center' });
  } else {
    giftReveal.hidden = true;
  }
});

// --- Secret Page Unlock ---
const PASSCODE = 'us-two-forever'; // <-- change this to your secret
const unlockBtn = document.getElementById('unlock-btn');
const unlockModal = document.getElementById('unlock-modal');
const unlockInput = document.getElementById('unlock-input');
const unlockOk = document.getElementById('unlock-ok');
const unlockCancel = document.getElementById('unlock-cancel');

unlockBtn?.addEventListener('click', ()=>{
  unlockModal.setAttribute('aria-hidden', 'false');
  unlockInput.focus();
});
unlockCancel?.addEventListener('click', ()=>{
  unlockModal.setAttribute('aria-hidden', 'true');
});
unlockOk?.addEventListener('click', ()=>{
  if ((unlockInput.value || '').trim() === PASSCODE) {
    window.location.href = 'secret.html';
  } else {
    unlockInput.value='';
    unlockInput.placeholder = 'Try again';
  }
});
unlockInput?.addEventListener('keydown', (e)=>{
  if (e.key === 'Enter') unlockOk.click();
});

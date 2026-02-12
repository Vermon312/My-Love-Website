
// -------- Lightbox interactions --------
const grid = document.querySelector('.grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

if (grid && lightbox && lightboxImg && lightboxCaption) {
  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    const img = card.querySelector('img');
    const caption = card.querySelector('figcaption')?.textContent || '';
    if (!img) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
    lightboxCaption.textContent = caption;
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden', 'false');
  });
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.style.display = 'none';
  lightbox.setAttribute('aria-hidden', 'true');
}
window.closeLightbox = closeLightbox;

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// -------- Floating Hearts in Hero --------
function startFloatingHearts() {
  const cont = document.getElementById('hearts-container');
  if (!cont) return;

  const HEARTS = ['❤', '💗', '💖', '💘', '💝'];
  const makeHeart = () => {
    const span = document.createElement('span');
    span.className = 'heart-floating';
    span.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];

    // randomize
    const left = Math.random() * 100;        // %
    const size = 16 + Math.random() * 16;    // px
    const dur  = 6 + Math.random() * 5;      // s
    const drift = (Math.random() - 0.5) * 120; // px

    span.style.left = `${left}%`;
    span.style.fontSize = `${size}px`;
    span.style.setProperty('--dur', `${dur}s`);
    span.style.setProperty('--drift', `${drift}px`);

    cont.appendChild(span);
    // remove after animation
    setTimeout(() => span.remove(), (dur + 0.5) * 1000);
  };

  // gentle frequency
  makeHeart();
  const timer = setInterval(makeHeart, 700);
  // store handle if you later want to clearInterval(timer)
}
startFloatingHearts();

// -------- Love Check Feature --------
const loveYes = document.getElementById('love-yes');
const loveNo  = document.getElementById('love-no');
const loveRes = document.getElementById('love-result');

function revealLove() {
  if (!loveRes) return;
  loveRes.hidden = false;
  loveRes.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // blossom rose at the Yes button
  if (loveYes) blossomAt(loveYes);

  // set / refresh compliment when shown
  setDailyCompliment();
}
loveYes?.addEventListener('click', revealLove);

// Make the "No" button slippery 😄
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

// -------- Rose blossom animation (emoji 🌹) --------
function blossomAt(el) {
  const rect = el.getBoundingClientRect();
  const rose = document.createElement('div');
  rose.className = 'rose-blossom';
  rose.textContent = '🌹';
  // center above the element
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  rose.style.left = `${x - 10}px`;
  rose.style.top = `${y - 10}px`;
  document.body.appendChild(rose);
  // remove after animation
  setTimeout(() => rose.remove(), 1000);
}

// -------- Gift Box: open/close + reveal --------
const giftBox = document.getElementById('gift-box');
const giftReveal = document.getElementById('gift-reveal');

function toggleGift() {
  if (!giftBox || !giftReveal) return;
  const expanded = giftBox.getAttribute('aria-expanded') === 'true';
  giftBox.setAttribute('aria-expanded', String(!expanded));
  giftReveal.hidden = expanded; // if was open, hide; if was closed, show
  if (!expanded) {
    giftReveal.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // small hearts burst when opening
    burstHeartsAt(giftBox);
  }
}
giftBox?.addEventListener('click', toggleGift);
giftBox?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleGift(); }
});

// cute hearts burst
function burstHeartsAt(el) {
  const rect = el.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const HEARTS = ['💖', '💗', '❤️'];
  for (let i = 0; i < 8; i++) {
    const h = document.createElement('div');
    h.className = 'rose-blossom'; // reuse animation base
    h.textContent = HEARTS[i % HEARTS.length];
    const angle = (i / 8) * Math.PI * 2;
    h.style.left = `${centerX + Math.cos(angle) * 4}px`;
    h.style.top  = `${centerY + Math.sin(angle) * 4}px`;
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 900);
  }
}

// -------- Daily Compliment Generator --------
const complimentEl = document.getElementById('compliment');
const complimentBtn = document.getElementById('compliment-refresh');

const COMPLIMENTS = [
  "You make ordinary moments feel magical.",
  "Your smile is my favorite sunshine.",
  "Every day with you is my best day.",
  "You’re the reason my heart races in the best way.",
  "I love the way your eyes light up when you laugh.",
  "You are beautiful—inside and out.",
  "With you, everything feels possible.",
  "I’m proud of you—more than you know.",
  "You’re my safe place and my favorite adventure.",
  "You make me want to be the best version of myself.",
  "You’re the art in my everyday life.",
  "I fall for you a little more each day."
];

function getDailyIndex() {
  const today = new Date();
  const key = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  // simple hash
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) % 1000000007;
  return hash % COMPLIMENTS.length;
}

function setDailyCompliment() {
  if (!complimentEl) return;
  complimentEl.textContent = COMPLIMENTS[getDailyIndex()];
}

complimentBtn?.addEventListener('click', () => {
  if (!complimentEl) return;
  // random new compliment different from current
  const current = complimentEl.textContent;
  let next = current;
  let guard = 0;
  while (next === current && guard++ < 10) {
    next = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
  }
  complimentEl.textContent = next;
});

// -------- Secret Unlock (hidden page) --------
const unlockBtn = document.getElementById('unlock-btn');
const unlockModal = document.getElementById('unlock-modal');
const unlockInput = document.getElementById('unlock-input');
const unlockOk = document.getElementById('unlock-ok');
const unlockCancel = document.getElementById('unlock-cancel');

// CHANGE THIS to your secret (client-side only; fine for GitHub Pages)
const PASSCODE = 'iloveyou'; // <-- set your passcode here

function openUnlockModal() {
  if (!unlockModal) return;
  unlockModal.setAttribute('aria-hidden', 'false');
  setTimeout(() => unlockInput?.focus(), 20);
}
function closeUnlockModal() {
  unlockModal?.setAttribute('aria-hidden', 'true');
  if (unlockInput) unlockInput.value = '';
}
function tryUnlock() {
  if (!unlockInput) return;
  const code = unlockInput.value.trim();
  if (code.toLowerCase() === PASSCODE.toLowerCase()) {
    // optional: remember
    localStorage.setItem('secretUnlocked', '1');
    window.location.href = 'secret.html';
  } else {
    unlockInput.value = '';
    unlockInput.placeholder = 'Try again 💙';
  }
}

unlockBtn?.addEventListener('click', openUnlockModal);
unlockCancel?.addEventListener('click', closeUnlockModal);
unlockOk?.addEventListener('click', tryUnlock);
unlockInput?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') tryUnlock();
});

document.addEventListener('keydown', (e) => {
  // close modal on Escape too
  if (e.key === 'Escape' && unlockModal?.getAttribute('aria-hidden') === 'false') {
    closeUnlockModal();
  }
});

// -------- Year --------
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();


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




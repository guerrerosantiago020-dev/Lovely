// --- PERSONALIZA AQUÍ ---
const AUTHOR = "Santiago"; // nombre que aparece
const SHORT_LEAD = "Prometo cuidarte, respetarte y amarte cada día. No quiero estar con otra persona que no seas tú.";
const FULL_LETTER = `Mi amor,

Desde que te conocí supe que quería hacerte feliz. Cada risa tuya ilumina mi día y cada abrazo tuyo me recuerda que no necesito a nadie más: no quiero estar con otra persona que no seas tú.

Prometo apoyarte en lo bueno y en lo difícil, reír contigo, aprender contigo y construir recuerdos. Eres mi persona favorita, mi calma y mi alegría. Te amo con todo mi corazón y quiero pasar mi vida a tu lado.

Siempre tuyo,
${AUTHOR}
`;
// ---------------------------

// Llenar textos iniciales
document.getElementById('author').textContent = AUTHOR;
document.getElementById('leadText').textContent = SHORT_LEAD;
document.getElementById('letterContent').textContent = FULL_LETTER;

// Modal carta
const openLetter = document.getElementById('openLetter');
const letterModal = document.getElementById('letterModal');
const closeLetter = document.getElementById('closeLetter');
openLetter.addEventListener('click', () => {
  letterModal.setAttribute('aria-hidden', 'false');
  document.getElementById('letterContent').focus();
});
closeLetter.addEventListener('click', () => letterModal.setAttribute('aria-hidden', 'true'));
letterModal.addEventListener('click', (e) => { if (e.target === letterModal) letterModal.setAttribute('aria-hidden','true'); });

// Descargar carta como archivo .txt
document.getElementById('downloadBtn').addEventListener('click', () => {
  const blob = new Blob([FULL_LETTER], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'carta-para-mi-amor.txt';
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
});

// Galería: abrir imagen grande
const gallery = document.getElementById('gallery');
const imgModal = document.getElementById('imgModal');
const closeImgModal = document.getElementById('closeImgModal');
const imgEnlarged = document.getElementById('imgEnlarged');

gallery.addEventListener('click', (e) => {
  if (e.target.matches('img')) {
    imgEnlarged.src = e.target.src;
    imgEnlarged.alt = e.target.alt || '';
    imgModal.setAttribute('aria-hidden','false');
  }
});
closeImgModal.addEventListener('click', () => imgModal.setAttribute('aria-hidden','true'));
imgModal.addEventListener('click', (e) => { if (e.target === imgModal) imgModal.setAttribute('aria-hidden','true'); });

// Audio play/pause
const audio = document.getElementById('bgAudio');
const playBtn = document.getElementById('playBtn');
let playing = false;
playBtn.addEventListener('click', async () => {
  if (!audio.src) {
    alert('Agrega un archivo en audio/musica.mp3 dentro del repo (carpeta audio) o edita la etiqueta <audio>.');
    return;
  }
  try {
    if (!playing) {
      await audio.play();
      playBtn.textContent = 'Pausar canción';
      playing = true;
    } else {
      audio.pause();
      playBtn.textContent = 'Reproducir canción';
      playing = false;
    }
  } catch (err) {
    console.error(err);
  }
});

// Botón sorpresa -> confetti y pequeña animación en el autor
document.getElementById('surpriseBtn').addEventListener('click', () => {
  burstConfetti();
  const a = document.getElementById('author');
  a.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.08)' }, { transform: 'scale(1)' }], { duration: 700, easing: 'ease-out' });
});

// Confetti simple
function burstConfetti() {
  const count = 36;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'confetti';
    document.body.appendChild(el);
    const left = Math.random() * 90 + 2;
    el.style.left = left + 'vw';
    el.style.background = `hsl(${Math.random()*40 + 40} 90% 55%)`; // amarillos/ánaranjados
    el.style.transform = `translateY(-30vh) rotate(${Math.random()*360}deg)`;
    setTimeout(()=> el.remove(), 3600);
  }
}

// Pequeña mejora: si el usuario presiona Escape cierra modales
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    letterModal.setAttribute('aria-hidden','true');
    imgModal.setAttribute('aria-hidden','true');
  }
});
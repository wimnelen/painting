// Footer year
document.querySelectorAll('#year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Lightbox — click a painting to see it larger with its full label
const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');

if (gallery && lightbox) {
  const canvas = document.getElementById('lightbox-canvas');
  const noEl = document.getElementById('lightbox-no');
  const titleEl = document.getElementById('lightbox-title');
  const metaEl = document.getElementById('lightbox-meta');
  const closeBtn = document.getElementById('lightbox-close');

  gallery.querySelectorAll('.piece').forEach(piece => {
    piece.addEventListener('click', () => {
      noEl.textContent = piece.dataset.no || '';
      titleEl.textContent = piece.dataset.title || '';
      metaEl.textContent = piece.dataset.meta || '';

      canvas.innerHTML = '';
      canvas.className = 'lightbox-canvas';

      const media = piece.querySelector('.thumb img, .thumb video');

      if (media) {
        // A real photo or video has been added — show it enlarged.
        const clone = media.cloneNode(true);
        if (clone.tagName === 'VIDEO') {
          // Keeps behaving like a silent looping clip (same as the
          // thumbnail), just bigger — with controls so it can be paused.
          clone.muted = true;
          clone.loop = true;
          clone.controls = true;
          clone.play().catch(() => {});
        }
        if (clone.tagName === 'IMG') {
          // Click the image to zoom in to full size and scroll around;
          // click again to fit it back to the screen.
          clone.addEventListener('click', () => {
            canvas.classList.toggle('zoomed');
          });
        }
        canvas.appendChild(clone);
      } else {
        // No media yet — fall back to the placeholder swatch.
        const tex = piece.dataset.tex;
        if (tex) canvas.classList.add(tex);
        const label = document.createElement('span');
        label.className = 'thumb-label';
        label.textContent = piece.dataset.title ? `Photo of "${piece.dataset.title}"` : '';
        canvas.appendChild(label);
      }

      lightbox.classList.add('open');
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
  }

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

// Mailing list subscribe form — sends to FormSubmit, which emails
// wimnelen@gmail.com. See README for the one-time activation step.
const subForm = document.getElementById('subscribe-form');

if (subForm) {
  const successBox = document.getElementById('subscribe-success');
  const errorBox = document.getElementById('subscribe-error');
  const nameEcho = document.getElementById('sub-name-echo');
  const submitBtn = subForm.querySelector('.sub-submit');

  subForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorBox.hidden = true;

    const formData = new FormData(subForm);
    const name = formData.get('name');
    const payload = Object.fromEntries(formData.entries());

    submitBtn.disabled = true;
    submitBtn.textContent = '> SENDING...';

    try {
      const response = await fetch('https://formsubmit.co/ajax/wimnelen@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Request failed');

      nameEcho.textContent = name ? ', ' + name : '';
      subForm.hidden = true;
      successBox.hidden = false;
    } catch (err) {
      errorBox.hidden = false;
      submitBtn.disabled = false;
      submitBtn.textContent = '> SUBSCRIBE_';
    }
  });
}

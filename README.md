# Your Name — Painting Portfolio

A simple, dependency-free website: just HTML, CSS, and a little JS. No build
step, no installs — edit the files directly and open `index.html` in a
browser to preview.

## 1. Add your own content

**Photos or videos of your paintings**

Each frame (gallery thumbnails, the featured image, the about-page portrait)
automatically sizes itself to whatever you put inside — tall, wide, or
square, nothing gets cropped or squished. This works the same way for a
still photo or a video (handy if you want to show a painting process, a
time-lapse, or a short studio clip).

- Put your files in the `images/` folder. For photos: JPG or PNG, roughly
  1600px on the long edge. For video: MP4 (H.264) keeps file size small —
  aim for well under 20MB per clip so the page still loads quickly.
- **Filenames:** avoid spaces — use hyphens instead (e.g.
  `sand-dunes-frontier.jpg`, not `Sand Dunes Frontier.jpg`). Also make sure
  the filename in your HTML matches the actual file exactly, including
  capitalization — this matters once the site is live on GitHub Pages even
  if it seems to work fine on your own Mac.
- In `index.html`, each painting is one `<button class="piece">` block.
  Inside its `<div class="thumb tex-X">...</div>`, delete the placeholder
  `<span class="thumb-label">` and replace it with **either**:
  ```html
  <img src="images/your-file.jpg" alt="Piece Title One">
  ```
  **or**, for a video:
  ```html
  <video src="images/your-clip.mp4" autoplay muted loop playsinline></video>
  ```
  The `autoplay muted loop playsinline` attributes make it play silently and
  continuously as a thumbnail. Clicking it opens the same clip enlarged in
  the lightbox — still silent and looping, just bigger — with a control bar
  so it can be paused. (This assumes a silent looping clip rather than a
  video with sound; get in touch if you ever want a version with audio
  instead.)
- Update `data-title`, `data-meta`, and `data-no` on the `<button>` so the
  lightbox (the click-to-enlarge popup) shows the right info.
- To add or remove paintings, copy or delete a whole `<button class="piece">…</button>` block.
- You don't need to touch any CSS — the frame around each piece adjusts to
  the media automatically, whether it's an image or a video.

**Featured image or video** — same idea, in the `.feature-canvas` div near
the top of `index.html`.

**About page photo or video** — same idea, in the `.portrait` div in `about.html`.

**Text** — search `about.html` and `index.html` for "Your Name", "you@example.com",
and the placeholder paragraphs, and swap in your own.

## Description sentence

Each painting can show a short sentence about what inspired it — under the
title/meta in the gallery list, and again in the enlarged lightbox view.

To add one, put the same sentence in two places on that painting's `<button
class="piece">`:

1. As a `data-desc="..."` attribute on the `<button>` itself (this is what
   the lightbox reads).
2. As a new `<p class="desc">...</p>` line inside `.piece-info`, right after
   the `<p class="meta">` line (this is what shows in the gallery list).

For example:
```html
<button class="piece" data-title="Piece Title One" data-meta="Oil on canvas, 61 x 91 cm, 2025" data-no="FILE 001" data-tex="tex-1" data-desc="Painted after a week camping on the coast in early spring.">
  <div class="thumb tex-1">
    <img src="images/your-file.jpg" alt="Piece Title One">
  </div>
  <div class="piece-info">
    <span class="no">FILE 001</span>
    <p class="title">Piece Title One</p>
    <p class="meta">Oil on canvas, 61 x 91 cm, 2025</p>
    <p class="desc">Painted after a week camping on the coast in early spring.</p>
  </div>
</button>
```

If you leave `data-desc` off (or leave it empty), the lightbox simply won't
show a sentence for that painting — no error, nothing broken.

## 2. Preview locally

Just open `index.html` in your browser — no server needed. (If image paths
misbehave, run `python3 -m http.server` in this folder and visit
`http://localhost:8000`.)

## 3. Put it on GitHub

```bash
cd painter-site
git init
git add .
git commit -m "First version of my portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

(Create the empty repo on github.com first if you haven't.)

## 4. Turn on GitHub Pages (free hosting)

1. On GitHub, open your repo → **Settings** → **Pages**.
2. Under "Build and deployment", set **Source** to **Deploy from a branch**.
3. Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
4. Wait a minute, then your site is live at:
   `https://YOUR-USERNAME.github.io/YOUR-REPO/`

Every time you `git push` after that, the live site updates automatically
within a minute or two.

**Optional — custom domain:** in the same Pages settings page you can add a
domain you own; GitHub will show you the DNS records to add at your registrar.

## 5. Mailing list form — one-time setup required

The "About" page has a name + email signup form. It uses a free service
called **FormSubmit** to actually deliver the email — since this is a static
site with no server of its own, a plain HTML form can't send email by itself.

**Before it will work, you must activate it once:**
1. Push the site live (or open `about.html` locally) and submit the form
   yourself with a test name/email.
2. FormSubmit will send an email to **wimnelen@gmail.com** asking you to
   confirm you own that address — open it and click the confirmation link.
3. After that, every future submission is forwarded straight to that inbox
   automatically, with no further action needed.

**To change the destination email:** in `script.js`, find this line and
replace the address:
```js
fetch('https://formsubmit.co/ajax/wimnelen@gmail.com', {
```

**To change the email subject:** edit the `_subject` hidden field value in
`about.html`.

No FormSubmit account or sign-up is required for this. Their free plan does
have a submission volume cap — check formsubmit.co if you expect heavy
traffic, or switch to a paid plan or a service like Formspree if you outgrow it.

## 6. Social links

The footer on both pages links to your email, Instagram, and LinkedIn.
Update these two lines in both `index.html` and `about.html`:
```html
<a href="https://instagram.com/your_handle" target="_blank" rel="noopener">INSTAGRAM</a>
<a href="https://linkedin.com/in/your-handle" target="_blank" rel="noopener">LINKEDIN</a>
```

## Notes

- The style is deliberately bare-bones: gallery-white background, one
  dark-blue accent, pixel display font, monospace body text, hard-edged
  borders, faint scanlines. The striped blocks are just placeholder
  "canvases" — swap them for real photos whenever you're ready.
- Fonts (Press Start 2P, IBM Plex Mono) load free from Google Fonts via the
  `<link>` tags in the `<head>` — no setup needed.
- Everything is a single set of static files, so this also works unmodified
  on Cloudflare Pages or GitLab Pages if you'd rather use those.
- Every frame (gallery, featured image, about portrait, lightbox) is
  responsive and mobile-friendly out of the box — no changes needed.

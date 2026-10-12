// Mobile menu: open on desktop, collapsed on small screens
const nav = document.querySelector('#site-nav');
if (nav) {
    const small = window.matchMedia('(max-width: 800px)');
    const sync = () => { nav.open = !small.matches; };
    sync();
    small.addEventListener('change', sync);
}

// Photo lightbox
// - click a thumbnail to open
// - if the thumbnail has data-back="...", the viewer can flip to the reverse
//   (Flip button, click the image, or Left/Right arrow keys)
// - Close button, Esc, or clicking outside closes; clicking a one-sided image closes
const box = document.querySelector('#lightbox');
if (box) {
    const bigImg = box.querySelector('img');
    const bigCap = box.querySelector('p');
    const flipBtn = box.querySelector('.flip');
    const closeBtn = box.querySelector('.close');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let sides = [];   // image URLs for this entry: [front] or [front, back]
    let side = 0;
    let alt = '';

    const show = () => {
        bigImg.src = sides[side];
        bigImg.alt = sides.length > 1 ? alt + (side === 0 ? ' (front)' : ' (back)') : alt;
        if (flipBtn) flipBtn.textContent = side === 0 ? 'Flip to back' : 'Flip to front';
    };

    const flip = () => {
        if (sides.length < 2) return;
        side = (side + 1) % sides.length;
        if (reduceMotion.matches) {
            show();
            return;
        }
        bigImg.classList.remove('flipping');
        void bigImg.offsetWidth;            // restart the animation
        bigImg.classList.add('flipping');
        setTimeout(show, 150);              // swap the image when the coin is edge-on
    };

    document.querySelectorAll('.thumb').forEach((btn) => {
        btn.addEventListener('click', () => {
            const thumb = btn.querySelector('img');
            const caption = btn.closest('figure').querySelector('figcaption');
            sides = [thumb.src];
            if (btn.dataset.back) sides.push(btn.dataset.back);
            side = 0;
            alt = thumb.alt;
            bigImg.classList.remove('flipping');
            bigCap.textContent = caption ? caption.innerText : '';
            if (flipBtn) flipBtn.hidden = sides.length < 2;
            show();
            box.showModal();
        });
    });

    if (flipBtn) flipBtn.addEventListener('click', flip);
    if (closeBtn) closeBtn.addEventListener('click', () => box.close());

    box.addEventListener('click', (e) => {
        if (e.target.closest('button')) return;           // buttons have their own handlers
        if (e.target === bigImg && sides.length > 1) {    // click the coin to flip it
            flip();
            return;
        }
        box.close();
    });

    box.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
            flip();
        }
    });
}
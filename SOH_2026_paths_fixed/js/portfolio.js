// Portfolio page: image viewer, search filter, question game popup

const cards = document.querySelectorAll('.project-card');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalTarget');
const searchInput = document.getElementById('input');

// Click a project thumbnail to enlarge it; click anywhere or press Esc to close
if (modal && modalImg) {
    const closeModal = () => { modal.style.display = 'none'; };

    cards.forEach((card) => {
        const img = card.querySelector('img');
        if (!img) return;
        img.addEventListener('click', () => {
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            modal.style.display = 'flex';
        });
    });

    modal.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// Search: hide cards whose text doesn't match what's typed
if (searchInput) {
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        cards.forEach((card) => {
            card.hidden = query !== '' && !card.textContent.toLowerCase().includes(query);
        });
    });
}

// Opens the question game in a centered popup window
function openQuestionGame() {
    const width = 1000;
    const height = 600;
    const left = Math.round((window.screen.width - width) / 2);
    const top = Math.round((window.screen.height - height) / 2);
    window.open(
        new URL('../programming/question game/question-game.html', document.currentScript?.src || document.baseURI).href,
        'Question Game',
        `width=${width},height=${height},left=${left},top=${top}`
    );
}
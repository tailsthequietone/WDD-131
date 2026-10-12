const menuButton = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');

// Toggle menu on mobile button click
menuButton.addEventListener('click', () => {
    nav.classList.toggle('hide');
});

// Reset menu visibility on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 1000) {
        nav.classList.remove('hide');
    } else {
        nav.classList.add('hide');
    }
});

// Modal viewer template builder
function viewerTemplate(pic, alt) {
    return `
        <div class="viewer">
            <button class="close-viewer">X</button>
            <img src="${pic}" alt="${alt}">
        </div>
    `;
}

// Modal view handler
function viewHandler(event) {
    const clickedElement = event.target;
    if (clickedElement.tagName !== 'IMG') return;

    // Get image source and derive full-size image source (or use current image source)
    const src = clickedElement.getAttribute('src');
    const alt = clickedElement.getAttribute('alt');
    const fullSrc = src.replace('-sm', '-full'); // Adjust if full images are named with '-full'

    // Insert modal into body
    document.body.insertAdjacentHTML('afterbegin', viewerTemplate(src, alt));

    // Handle modal close button click
    const closeButton = document.querySelector('.close-viewer');
    closeButton.addEventListener('click', closeViewer);
}

function closeViewer() {
    const viewer = document.querySelector('.viewer');
    if (viewer) {
        viewer.remove();
    }
}

// Attach event listener to gallery
const gallery = document.querySelector('.gallery');
gallery.addEventListener('click', viewHandler);
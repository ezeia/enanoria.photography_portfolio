const initialImages = [
    { url: 'beach.jpeg', caption: 'Beach Views', category: 'Beach' },
    { url: 'violin.jpeg', caption: 'My Violin', category: 'Violin' },
    { url: 'guitar.jpeg', caption: 'Guitar Playing', category: 'Guitar' }
];

let images = [...initialImages];
let currentFilter = 'All';
let searchQuery = '';

const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const addForm = document.getElementById('addForm');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeBtn = document.querySelector('.close-btn');

function renderGallery() {
    gallery.innerHTML = '';
    const filteredImages = images.filter(img => {
        const matchesCategory = currentFilter === 'All' || img.category === currentFilter;
        const matchesSearch = img.caption.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    filteredImages.forEach(img => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => openLightbox(img.url, img.caption);

        const imageEl = document.createElement('img');
        imageEl.src = img.url;
        imageEl.alt = img.caption;

        const captionEl = document.createElement('p');
        captionEl.textContent = img.caption;

        card.appendChild(imageEl);
        card.appendChild(captionEl);
        gallery.appendChild(card);
    });
}

function openLightbox(url, caption) {
    lightboxImg.src = url;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderGallery();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderGallery();
    });
});

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newImage = {
        url: document.getElementById('imgUrl').value,
        caption: document.getElementById('imgCaption').value,
        category: document.getElementById('imgCategory').value
    };
    images.push(newImage);
    renderGallery();
    addForm.reset();
});

closeBtn.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

renderGallery();

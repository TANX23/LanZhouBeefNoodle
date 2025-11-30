// Mengambil elemen slider
const sliderWindow = document.querySelector('.slider-window');
const slider = document.querySelector('.menu-slider');
const slides = document.querySelectorAll('.menu-slider .slide-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.slider-dots');

let currentSlide = 0;
const totalSlides = slides.length;

function goToSlide(index) {
    // Logika Loop (Muter balik)
    if (index < 0) {
        currentSlide = totalSlides - 1; 
    } else if (index >= totalSlides) {
        currentSlide = 0; 
    } else {
        currentSlide = index;
    }

    // 1. Ambil lebar jendela pembungkus dan lebar satu kartu
    const windowWidth = sliderWindow.offsetWidth;
    const slideWidth = slides[0].offsetWidth;
    
    // 2. Hitung posisi tengah
    // Kita ingin tengah kartu berada di tengah jendela
    // Rumus: (Lebar Jendela / 2) - (Lebar Kartu / 2) - (Urutan Kartu * Lebar Kartu)
    
    // Kita perlu memperhitungkan margin antar kartu (misal 20px total kiri kanan)
    // Cara paling aman pakai offsetLeft
    const currentSlideEl = slides[currentSlide];
    
    // Hitung posisi agar elemen aktif ada di tengah
    const centerPosition = (windowWidth / 2) - (slideWidth / 2);
    const slidePosition = currentSlideEl.offsetLeft;
    
    // Geser slider
    const moveAmount = centerPosition - slidePosition;
    slider.style.transform = `translateX(${moveAmount}px)`;

    // 3. Update Class Active untuk efek visual (Scale & Opacity)
    slides.forEach((slide, i) => {
        if (i === currentSlide) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    updateDots();
}

function updateDots() {
    dotsContainer.innerHTML = ''; 
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === currentSlide) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

// Event Listeners
if(prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
}

// Jalankan saat load
// Init
document.addEventListener('DOMContentLoaded', () => {
    if(slides.length > 0) {
        // GANTI 0 JADI 1 DI SINI
        // Agar mulai dari tengah, jadi kiri & kanan langsung ada isinya
        setTimeout(() => goToSlide(1), 100); 
    }
});

// Update posisi saat layar di-resize (agar tetap di tengah)
window.addEventListener('resize', () => {
    goToSlide(currentSlide);
});

// Scroll Halus Navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target){
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
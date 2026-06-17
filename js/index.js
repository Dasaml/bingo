// --- MOBILNÍ NAVIGACE ---
const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger = document.querySelector(".hamburger");
const closeIcon = document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

function toggleMenu() {
    if (!menu || !closeIcon || !menuIcon) return; // Bezpečnostní kontrola

    if (menu.classList.contains("showMenu")) {
        menu.classList.remove("showMenu");
        closeIcon.style.display = "none";
        menuIcon.style.display = "block";
    } else {
        menu.classList.add("showMenu");
        closeIcon.style.display = "block";
        menuIcon.style.display = "none";
    }
}

if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
}

menuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", toggleMenu);
});

// --- CAROUSEL ---
const track = document.querySelector('.carousel-track');
const dots = document.querySelectorAll('.dot');
const slides = document.querySelectorAll('.carousel-slide');

let currentIndex = 0;
let autoPlayInterval;

function goToSlide(index) {
    if (!track) return;
    
    currentIndex = index;
    const offset = index * -100;
    track.style.transform = `translateX(${offset}%)`;
    
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[currentIndex]) {
        dots[currentIndex].classList.add('active');
    }
}

function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % slides.length;
        goToSlide(nextIndex);
    }, 4000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Event Listenery pro tečky
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        stopAutoPlay();
        goToSlide(index);
        startAutoPlay();
    });
});

// Dotykové ovládání (swipe)
let startX = 0;
if (track) {
    track.addEventListener('touchstart', (e) => {
        stopAutoPlay();
        startX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) { 
            if (diff > 0 && currentIndex < slides.length - 1) {
                goToSlide(currentIndex + 1);
            } else if (diff < 0 && currentIndex > 0) {
                goToSlide(currentIndex - 1);
            }
        }
        startAutoPlay();
    });
}

// Spuštění automatiky
if (slides.length > 0) {
    startAutoPlay();
}

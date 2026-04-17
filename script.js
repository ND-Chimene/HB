const slides = [...document.querySelectorAll('.text-slide')];
const dots = [...document.querySelectorAll('.prog-dot')];
const overlay = document.getElementById('overlay');
const photo = document.querySelector('.photo-block');

let current = 0;
let locked = false;

/* SHOW SLIDE */
function showSlide(index) {

    slides.forEach((slide, i) => {

        if (i === index) {
            slide.className = 'text-slide active';
        } else if (i < index) {
            slide.className = 'text-slide above';
        } else {
            slide.className = 'text-slide below';
        }

    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    current = index;
}

/* NAV */
function navigate(dir) {

    if (locked) return;

    locked = true;
    setTimeout(() => locked = false, 650);

    if (dir === 'down' && current < slides.length - 1) {
        showSlide(current + 1);
    }

    if (dir === 'up' && current > 0) {
        showSlide(current - 1);
    }
}

/* INTRO */
function intro() {
    requestAnimationFrame(() => {
        photo.classList.add('animate');
    });

    setTimeout(() => {
        overlay.classList.add('hidden');
        showSlide(0);
    }, 1200);
}

/* WHEEL */
window.addEventListener('wheel', e => {
    e.preventDefault();
    navigate(e.deltaY > 0 ? 'down' : 'up');
}, { passive: false });

/* TOUCH */
let startY = 0;

window.addEventListener('touchstart', e => {
    startY = e.touches[0].clientY;
});

window.addEventListener('touchend', e => {

    const endY = e.changedTouches[0].clientY;
    const diff = startY - endY;

    if (Math.abs(diff) < 40) return;

    navigate(diff > 0 ? 'down' : 'up');
});

/* KEYBOARD */
window.addEventListener('keydown', e => {

    if (e.key === 'ArrowDown') navigate('down');
    if (e.key === 'ArrowUp') navigate('up');

});

/* LOAD */
window.addEventListener('load', () => {

    setTimeout(intro, 200);

});

window.addEventListener(
    'touchmove',
    function (e) {
        e.preventDefault();
    },
    { passive: false }
);
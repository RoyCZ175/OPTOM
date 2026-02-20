document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =========================================================
       1. NAVEGACIÓN DINÁMICA
       ========================================================= */
    const nav = document.getElementById("mainNav");
    const hero = document.getElementById("nosotros"); 

    if (nav && hero) {
        const actualizarNav = () => {
            const heroBottom = hero.offsetTop + hero.offsetHeight;
            if (window.scrollY < (heroBottom - 80)) {
                nav.classList.add("nav-on-hero");
                nav.classList.remove("nav-scrolled");
            } else {
                nav.classList.add("nav-scrolled");
                nav.classList.remove("nav-on-hero");
            }
        };
        window.addEventListener("scroll", actualizarNav, { passive: true });
        actualizarNav();
    }

    /* =========================================================
       2. NUESTRA ESENCIA (LA QUE NO CAMBIABA)
       ========================================================= */
    // Definimos la función globalmente para que el 'onclick' del HTML la encuentre
    window.showSlide = function(index) {
        const essenceSlides = document.querySelectorAll('.essence-slide');
        const navBtns = document.querySelectorAll('.nav-btn');
        
        if (essenceSlides.length > 0) {
            essenceSlides.forEach(s => s.classList.remove('active'));
            navBtns.forEach(b => b.classList.remove('active'));
            
            // Usamos el ID o la posición
            const target = document.getElementById(`slide-${index}`);
            if (target) target.classList.add('active');
            if (navBtns[index]) navBtns[index].classList.add('active');
            
            // Actualizamos el índice del auto-play para que no salte raro
            essenceIndex = index;
        }
    };

    let essenceIndex = 0;
    let essenceInterval = setInterval(() => {
        essenceIndex = (essenceIndex + 1) % 3;
        showSlide(essenceIndex);
    }, 3500);

    /* =========================================================
       3. FLIP SLIDER (INTERACTIVO AL MOUSE)
       ========================================================= */
    const flipSlider = document.getElementById("nosotrosFlipSlider");
    if (flipSlider) {
        const slides = Array.from(flipSlider.querySelectorAll(".flip-slide"));
        let currentIndex = slides.findIndex(s => s.classList.contains("is-active"));
        if (currentIndex === -1) currentIndex = 0;
        let flipTimer;

        const nextFlip = () => {
            const current = slides[currentIndex];
            currentIndex = (currentIndex + 1) % slides.length;
            const next = slides[currentIndex];
            current.classList.remove("is-active");
            current.classList.add("is-exit");
            next.classList.add("is-active");
            setTimeout(() => current.classList.remove("is-exit"), 750);
        };

        const startFlip = () => {
            clearInterval(flipTimer);
            flipTimer = setInterval(nextFlip, 4000);
        };

        const stopFlip = () => clearInterval(flipTimer);

        flipSlider.addEventListener("mouseenter", () => { 
            nextFlip(); 
            stopFlip(); 
        });

        flipSlider.addEventListener("mouseleave", startFlip);
        startFlip();
    }

});
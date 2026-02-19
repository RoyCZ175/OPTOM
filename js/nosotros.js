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
       2. NUESTRA ESENCIA (FLIP SLIDER & CONTENT)
       ========================================================= */
    window.showSlide = function(index) {
        const essenceSlides = document.querySelectorAll('.essence-slide');
        const navBtns = document.querySelectorAll('.nav-btn');
        
        if (essenceSlides.length > 0) {
            essenceSlides.forEach(s => s.classList.remove('active'));
            navBtns.forEach(b => b.classList.remove('active'));
            
            const target = document.getElementById(`slide-${index}`);
            if (target) target.classList.add('active');
            if (navBtns[index]) navBtns[index].classList.add('active');
        }
    };

    let essenceIndex = 0;
    setInterval(() => {
        essenceIndex = (essenceIndex + 1) % 3;
        showSlide(essenceIndex);
    }, 6000);

    const flipSlider = document.getElementById("nosotrosFlipSlider");
    if (flipSlider) {
        const slides = Array.from(flipSlider.querySelectorAll(".flip-slide"));
        let currentIndex = slides.findIndex(s => s.classList.contains("is-active")) || 0;
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

        const startFlip = () => flipTimer = setInterval(nextFlip, 4000);
        const stopFlip = () => clearInterval(flipTimer);

        flipSlider.addEventListener("mouseenter", () => { stopFlip(); });
        flipSlider.addEventListener("mouseleave", startFlip);
        startFlip();
    }

    /* =========================================================
       3. NUESTRA INFRAESTRUCTURA (SLIDER SIN BARRA - FIX)
       ========================================================= */
    const infraSlides = document.querySelectorAll('.infra-slide');
    const infraDots = document.querySelectorAll('.dot');
    const infraBox = document.getElementById('mainSlider');
    
    if (infraBox && infraSlides.length > 0) {
        let infraCurrent = 0;
        let infraAutoPlay;
        const duration = 3000; // 3 segundos de cambio

        function updateInfra(index) {
            // Sincronizamos el índice global con el recibido
            infraCurrent = index; 

            infraSlides.forEach(s => s.classList.remove('active'));
            infraDots.forEach(d => d.classList.remove('active'));
            
            infraSlides[infraCurrent].classList.add('active');
            if (infraDots[infraCurrent]) infraDots[infraCurrent].classList.add('active');
        }

        const startInfra = () => {
            // Limpiamos cualquier intervalo previo para no duplicar velocidad
            clearInterval(infraAutoPlay); 
            infraAutoPlay = setInterval(() => {
                let nextIndex = (infraCurrent + 1) % infraSlides.length;
                updateInfra(nextIndex);
            }, duration);
        };

        const stopInfra = () => {
            clearInterval(infraAutoPlay);
        };

        // Pausa y Reanuda
        infraBox.addEventListener('mouseenter', stopInfra);
        infraBox.addEventListener('mouseleave', startInfra);

        // Click en dots
        infraDots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                updateInfra(i);
                startInfra(); // Reinicia el timer al hacer click manual
            });
        });

        // Inicio oficial
        updateInfra(0);
        startInfra();
    }
});
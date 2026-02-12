/* =========================
   FLIP SLIDER (Eje Y)
   - autoplay cada 4s
   - al pasar el mouse => cambia a la siguiente
   ========================= */
(function () {
  "use strict";

  const slider = document.getElementById("nosotrosFlipSlider");
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll(".flip-slide"));
  if (slides.length < 2) return;

  let index = slides.findIndex(s => s.classList.contains("is-active"));
  if (index < 0) index = 0;

  const intervalMs = 4000; // ✅ 3000 o 5000 si quieres
  let timer = null;

  function show(nextIndex) {
    const current = slides[index];
    const next = slides[nextIndex];
    if (current === next) return;

    // fuerza repaint para que NO se congele
    current.getBoundingClientRect();

    current.classList.remove("is-active");
    current.classList.add("is-exit");

    next.classList.remove("is-exit");
    next.classList.add("is-active");

    setTimeout(() => current.classList.remove("is-exit"), 750);

    index = nextIndex;
  }

  function nextSlide() {
    show((index + 1) % slides.length);
  }

  function start() {
    stop();
    timer = setInterval(nextSlide, intervalMs);
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  // ✅ autoplay
  start();

  // ✅ hover = cambia UNA vez al entrar con el mouse
  slider.addEventListener("mouseenter", () => {
    nextSlide();   // cambia inmediato al pasar el mouse
    stop();        // pausa mientras está encima (opcional)
  });

  // ✅ al salir vuelve el autoplay
  slider.addEventListener("mouseleave", start);
})();
function showSlide(index) {
    // 1. Quitar clase active de todos los slides
    const slides = document.querySelectorAll('.essence-slide');
    const buttons = document.querySelectorAll('.nav-btn');
    
    slides.forEach(slide => slide.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // 2. Activar el seleccionado
    document.getElementById(`slide-${index}`).classList.add('active');
    buttons[index].classList.add('active');
}

// Opcional: Auto-cambio cada 6 segundos
let currentEssenceSlide = 0;
setInterval(() => {
    currentEssenceSlide = (currentEssenceSlide + 1) % 3;
    showSlide(currentEssenceSlide);
}, 6000);

/* =========================================================
   LÓGICA ESPECÍFICA PARA EL NAV DE NOSOTROS
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("mainNav");
    // Usamos el ID "nosotros" que es tu Header Hero
    const hero = document.getElementById("nosotros"); 
    
    if (!nav || !hero) return;

    const actualizarNav = () => {
        // Obtenemos la posición del final del hero
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        
        // Si el scroll no ha llegado al final del hero (menos un margen de 80px)
        if (window.scrollY < (heroBottom - 80)) {
            nav.classList.add("nav-on-hero");
            nav.classList.remove("nav-scrolled");
        } else {
            nav.classList.add("nav-scrolled");
            nav.classList.remove("nav-on-hero");
        }
    };

    window.addEventListener("scroll", actualizarNav, { passive: true });
    actualizarNav(); // Ejecución inicial
});
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.infra-slide');
    const dots = document.querySelectorAll('.dot');
    const progressBar = document.getElementById('progressBar');
    const sliderBox = document.getElementById('mainSlider');
    
    let current = 0;
    let progressInterval;
    let autoPlayTimer;
    const duration = 4000; // 4 segundos

    function updateSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        resetProgressBar();
    }

    function resetProgressBar() {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        setTimeout(() => {
            progressBar.style.transition = `width ${duration}ms linear`;
            progressBar.style.width = '100%';
        }, 50);
    }

    function startCycle() {
        autoPlayTimer = setInterval(() => {
            current = (current + 1) % slides.length;
            updateSlide(current);
        }, duration);
        resetProgressBar();
    }

    function stopCycle() {
        clearInterval(autoPlayTimer);
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
    }

    // Eventos de Mouse
    sliderBox.addEventListener('mouseenter', stopCycle);
    sliderBox.addEventListener('mouseleave', startCycle);

    // Clic en dots
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            current = i;
            updateSlide(current);
        });
    });

    // Iniciar
    updateSlide(0);
    startCycle();
});
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

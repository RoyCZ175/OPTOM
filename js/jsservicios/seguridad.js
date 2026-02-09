document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // AOS
  if (window.AOS) {
    AOS.init({ duration: 900, once: true, offset: 90 });
  }

  // (Opcional) Si quieres efecto al bajar, solo sombra/solidez:
  const nav = document.getElementById("mainNav");
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 50) nav.classList.add("nav-scrolled");
    else nav.classList.remove("nav-scrolled");
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});

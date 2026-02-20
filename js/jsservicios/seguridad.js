document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // AOS (Para animaciones)
  if (window.AOS) {
    AOS.init({ duration: 900, once: true, offset: 90 });
  }

  // Navbar Scroll
  const nav = document.getElementById("mainNav");

  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 50) {
      nav.classList.add("nav-scrolled");
    } else {
      nav.classList.remove("nav-scrolled");
    }
  };

  // Ejecutar al cargar la página y cada vez que se haga scroll
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  
});

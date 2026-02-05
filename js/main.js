/* =========================================================
   MAIN.JS - Social Float (WhatsApp) + Navbar Index
   Estados navbar:
   - nav-on-hero (arriba, transparente)
   - nav-scrolled (scroll, glass blanco)
   ========================================================= */
(() => {
  "use strict";

  // =========================
  // WhatsApp
  // =========================
  const whatsappBtn = document.querySelector(".social-icon.whatsapp");
  if (whatsappBtn) {
    const container = document.querySelector(".social-float-container");

    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (!isTouch) {
      whatsappBtn.addEventListener("mouseenter", () => whatsappBtn.classList.add("is-open"));
      whatsappBtn.addEventListener("mouseleave", () => whatsappBtn.classList.remove("is-open"));
    } else {
      whatsappBtn.addEventListener("click", (e) => {
        const isOpen = whatsappBtn.classList.contains("is-open");
        if (!isOpen) {
          e.preventDefault();
          e.stopPropagation();
          whatsappBtn.classList.add("is-open");
        }
        // si ya está abierto, el 2do tap navega normal
      });

      document.addEventListener("click", (e) => {
        const clickedInside = container && container.contains(e.target);
        if (!clickedInside) whatsappBtn.classList.remove("is-open");
      });
    }
  }

  // =========================
  // Navbar SOLO INDEX
  // =========================
  document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("mainNav");
    const hero = document.getElementById("heroIndex");
    if (!nav || !hero) return;

    const setNav = () => {
      const navH = nav.offsetHeight || 0;
      const heroBottom = hero.offsetTop + hero.offsetHeight;

      // "en hero" hasta pasar el final del hero (considerando alto del nav)
      const inHero = window.scrollY + navH < heroBottom - 20;

      nav.classList.toggle("nav-on-hero", inHero);
      nav.classList.toggle("nav-scrolled", !inHero);
    };

    setNav();
    window.addEventListener("scroll", setNav, { passive: true });
    window.addEventListener("resize", setNav);
  });
})();

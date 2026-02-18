document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const CAROUSEL_ID = "serviciosHeroCarousel";
  const INTERVAL_MS = 4500;
  const slides = [
    { img: "img/servicios/hero1.jpg" },
    { img: "img/servicios/hero2.jpg" },
    { img: "img/servicios/hero3.jpg" },
    { img: "img/servicios/hero4.jpg" },
  ];

  const mount = document.getElementById("serviciosHeroMount");

  if (mount) {
    // Generamos solo los items (sin indicadores para máxima limpieza)
    const items = slides.map((s, i) => `
      <div class="carousel-item ${i === 0 ? "active" : ""}">
        <div class="hero-slide">
          <img class="hero-img" src="${s.img}" alt="OPTOM Soluciones">
          <div class="hero-slide-overlay"></div>
        </div>
        <a class="hero-slide-link" href="#areas-solucion"></a>
      </div>
    `).join("");

    mount.innerHTML = `
      <div id="${CAROUSEL_ID}" class="carousel slide carousel-fade" data-bs-ride="carousel">
        <div class="carousel-inner">${items}</div>
      </div>
    `;

    const el = document.getElementById(CAROUSEL_ID);
    if (window.bootstrap?.Carousel && el) {
      bootstrap.Carousel.getOrCreateInstance(el, {
        interval: INTERVAL_MS,
        pause: false,
        touch: true,
        wrap: true
      }).cycle();
    }

    // Scroll suave
    mount.addEventListener("click", (e) => {
      const link = e.target.closest('a.hero-slide-link');
      if (!link) return;
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  // Lógica de Navbar
  const nav = document.getElementById("mainNav");
  const hero = document.getElementById("servicios");

  if (nav && hero) {
    const setState = () => {
      const scrolled = window.scrollY >= (hero.offsetHeight - nav.offsetHeight);
      nav.classList.toggle("nav-scrolled", scrolled);
      nav.classList.toggle("nav-transparent", !scrolled);
    };
    window.addEventListener("scroll", setState, { passive: true });
    setState();
  }
});
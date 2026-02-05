/* =========================================================
   HERO-SERVICIOS.JS
   - Carousel auto + controles
   - Navbar transparente arriba / blanca al bajar
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // =========================
  // Config
  // =========================
  const CAROUSEL_ID = "serviciosHeroCarousel";
  const INTERVAL_MS = 4500;

  const slides = [
    { img: "img/servicios/data-center.jpg", href: "data-center.html", title: "Data Centers" },
    { img: "img/servicios/climatizacion.jpg", href: "climatizacion.html", title: "Climatización de Precisión" },
    { img: "img/servicios/energia-respaldo.jpg", href: "energia-respaldo.html", title: "Energía y Respaldo" },
    { img: "img/servicios/energia-solar.jpg", href: "energia-solar.html", title: "Energía Solar" },
    { img: "img/servicios/seguridad.jpg", href: "seguridad-monitoreo.html", title: "Seguridad y Monitoreo" },
    { img: "img/servicios/soporte.jpg", href: "soporte-mantenimiento.html", title: "Soporte y Mantenimiento" },
  ];

  // =========================
  // 1) HERO CAROUSEL (render)
  // =========================
  const mount = document.getElementById("serviciosHeroMount");

  if (mount) {
    const indicators = slides.map((s, i) => `
      <button type="button"
        data-bs-target="#${CAROUSEL_ID}"
        data-bs-slide-to="${i}"
        class="${i === 0 ? "active" : ""}"
        ${i === 0 ? 'aria-current="true"' : ""}
        aria-label="${s.title}">
      </button>
    `).join("");

    const items = slides.map((s, i) => `
      <div class="carousel-item ${i === 0 ? "active" : ""}">
        <div class="hero-slide">
          <img class="hero-img" src="${s.img}" alt="${s.title}">
        </div>

        <div class="hero-slide-overlay"></div>

        <div class="hero-slide-caption">
          <div class="container">
            <div class="hero-slide-caption__box">
              <h2 class="hero-slide-caption__title mb-2">${s.title}</h2>
            </div>
          </div>
        </div>

        <a class="hero-slide-link" href="#areas-solucion" aria-label="Ir a Áreas de Solución"></a>
      </div>
    `).join("");

    mount.innerHTML = `
      <div id="${CAROUSEL_ID}" class="carousel slide carousel-fade" data-bs-ride="carousel">
        <div class="carousel-indicators">${indicators}</div>
        <div class="carousel-inner">${items}</div>

        <button class="carousel-control-prev" type="button" data-bs-target="#${CAROUSEL_ID}" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Anterior</span>
        </button>

        <button class="carousel-control-next" type="button" data-bs-target="#${CAROUSEL_ID}" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Siguiente</span>
        </button>
      </div>
    `;

    const el = document.getElementById(CAROUSEL_ID);
    if (window.bootstrap?.Carousel && el) {
      bootstrap.Carousel.getOrCreateInstance(el, {
        interval: INTERVAL_MS,
        pause: false,     // ✅ NO se pausa al hover
        touch: true,
        wrap: true,
        keyboard: true
      }).cycle();
    }

    // Scroll suave al dar click en el slide
    mount.addEventListener("click", (e) => {
      const link = e.target.closest('a.hero-slide-link[href^="#"]');
      if (!link) return;

      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // =========================
  // 2) NAVBAR: transparente arriba, blanca al bajar
  // =========================
  const nav = document.getElementById("mainNav");
  const hero = document.getElementById("servicios");

  if (nav && hero) {
    const setState = () => {
      const navbarH = nav.offsetHeight || 80;
      const heroH = hero.offsetHeight || 0;

      const trigger = Math.max(10, heroH - navbarH);
      const scrolled = window.scrollY >= trigger;

      nav.classList.toggle("nav-scrolled", scrolled);
      nav.classList.toggle("nav-transparent", !scrolled);
    };

    setState();
    window.addEventListener("scroll", setState, { passive: true });
    window.addEventListener("resize", setState);
  }
});

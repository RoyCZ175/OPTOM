/* =========================================================
   HERO-SERVICIOS.JS - Carousel + Navbar transparente
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // =========================
  // 1) HERO CAROUSEL
  // =========================
  const mount = document.getElementById("serviciosHeroMount");
  const slides = [
    { img: "img/servicios/data-center.jpg", href: "data-center.html", title: "Data Centers", desc: "Micro Data Center, soluciones modulares y expansión escalable según demanda." },
    { img: "img/servicios/climatizacion.jpg", href: "climatizacion.html", title: "Climatización de Precisión", desc: "Control térmico para equipos críticos: estabilidad, eficiencia y operación continua." },
    { img: "img/servicios/energia-respaldo.jpg", href: "energia-respaldo.html", title: "Energía y Respaldo", desc: "UPS, bancos de baterías, distribución y protección eléctrica para alta disponibilidad." },
    { img: "img/servicios/energia-solar.jpg", href: "energia-solar.html", title: "Energía Solar", desc: "Soluciones fotovoltaicas con gestión inteligente y enfoque en eficiencia." },
    { img: "img/servicios/seguridad.jpg", href: "seguridad-monitoreo.html", title: "Seguridad y Monitoreo", desc: "Monitoreo y control para infraestructura crítica (operación y continuidad)." },
    { img: "img/servicios/soporte.jpg", href: "soporte-mantenimiento.html", title: "Soporte y Mantenimiento", desc: "Planes preventivos, correctivos y predictivos con soporte especializado." },
  ];

  const id = "serviciosHeroCarousel";

  if (mount) {
    const indicators = slides.map((s, i) => `
      <button type="button"
        data-bs-target="#${id}"
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
              <p class="hero-slide-caption__desc mb-0">${s.desc}</p>
            </div>
          </div>
        </div>

        <!-- Click en todo el slide => baja a Áreas (SIN tapar flechas/puntitos) -->
        <a class="hero-slide-link" href="#areas-solucion" aria-label="Ir a Áreas de Solución"></a>
      </div>
    `).join("");

    mount.innerHTML = `
      <div id="${id}" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="4500">
        <div class="carousel-indicators">${indicators}</div>
        <div class="carousel-inner">${items}</div>

        <button class="carousel-control-prev" type="button" data-bs-target="#${id}" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Anterior</span>
        </button>

        <button class="carousel-control-next" type="button" data-bs-target="#${id}" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Siguiente</span>
        </button>
      </div>
    `;

    const el = document.getElementById(id);
    if (window.bootstrap?.Carousel && el) {
      bootstrap.Carousel.getOrCreateInstance(el, {
        interval: 4500,
        pause: "hover",
        touch: true,
        wrap: true
      }).cycle();
    }

    // Scroll suave al dar click en el slide (opcional, pero se ve pro)
    mount.addEventListener("click", (e) => {
      const link = e.target.closest('a.hero-slide-link[href^="#"]');
      if (!link) return;

      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);
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

      // Cambia a blanco cuando ya pasaste el hero (un poco antes)
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

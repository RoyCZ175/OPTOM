document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* ================================
     CONFIG
  ================================= */
  const CAROUSEL_ID = "serviciosHeroCarousel";
  const INTERVAL_MS = 4500;

  const slides = [
    { img: "img/servicios/hero1.jpg", alt: "OPTOM - Soluciones" },
    { img: "img/servicios/hero2.jpg", alt: "OPTOM - Infraestructura" },
    { img: "img/servicios/hero3.jpg", alt: "OPTOM - Misión Crítica" },
    { img: "img/servicios/hero4.jpg", alt: "OPTOM - Continuidad" },
  ];

  const SELECTORS = {
    mount: "#serviciosHeroMount",
    nav: "#mainNav",
    hero: "#servicios",
    anchor: "#areas-solucion",
  };

  const reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const isTouch =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  /* ================================
     HELPERS
  ================================= */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const smoothScrollTo = (el) => {
    if (!el) return;
    el.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const rafThrottle = (fn) => {
    let ticking = false;
    return (...args) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        fn(...args);
        ticking = false;
      });
    };
  };

  /* ================================
     UI ADDONS (progress + backToTop)
  ================================= */
  const addProgressBar = () => {
    if ($("#scrollProgress")) return;
    const bar = document.createElement("div");
    bar.id = "scrollProgress";
    document.body.appendChild(bar);

    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    };
    window.addEventListener("scroll", rafThrottle(update), { passive: true });
    update();
  };

  const addBackToTop = () => {
    if ($("#backToTop")) return;

    const btn = document.createElement("button");
    btn.id = "backToTop";
    btn.type = "button";
    btn.setAttribute("aria-label", "Volver arriba");
    btn.innerHTML = `<i class="fas fa-arrow-up"></i>`;
    document.body.appendChild(btn);

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });

    const toggle = () => {
      btn.classList.toggle("is-visible", window.scrollY > 600);
    };
    window.addEventListener("scroll", rafThrottle(toggle), { passive: true });
    toggle();
  };

 // addProgressBar();
  addBackToTop();

  /* ================================
     HERO CAROUSEL (mount)
  ================================= */
  const mount = $(SELECTORS.mount);

  if (mount) {
    const items = slides
      .map(
        (s, i) => `
      <div class="carousel-item ${i === 0 ? "active" : ""}">
        <div class="hero-slide">
          <img class="hero-img" src="${s.img}" alt="${(s.alt || "OPTOM").replace(/"/g, "&quot;")}" loading="${i === 0 ? "eager" : "lazy"}" decoding="async">
          <div class="hero-slide-overlay"></div>
        </div>
        <a class="hero-slide-link" href="${SELECTORS.anchor}"></a>
      </div>
    `
      )
      .join("");

    mount.innerHTML = `
      <div id="${CAROUSEL_ID}" class="carousel slide carousel-fade" data-bs-ride="carousel">
        <div class="carousel-inner">${items}</div>
      </div>
    `;

    const el = document.getElementById(CAROUSEL_ID);

    // Bootstrap carousel
    if (el && window.bootstrap?.Carousel) {
      const carousel = bootstrap.Carousel.getOrCreateInstance(el, {
        interval: reduceMotion ? false : INTERVAL_MS,
        pause: false,
        touch: true,
        wrap: true,
      });

      if (!reduceMotion) carousel.cycle();

      // Ken Burns: marca slide activo para CSS
      const markActive = () => {
        $$(".hero-slide", el).forEach((s) => s.classList.remove("is-active"));
        const active = $(".carousel-item.active .hero-slide", el);
        if (active) active.classList.add("is-active");
      };
      markActive();
      //el.addEventListener("slid.bs.carousel", markActive);
    }

    // Click overlay scroll
    mount.addEventListener("click", (e) => {
      const link = e.target.closest("a.hero-slide-link");
      if (!link) return;
      const target = $(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        smoothScrollTo(target);
      }
    });

    // Parallax leve SOLO en hero
    const hero = $(SELECTORS.hero);
    if (hero && !reduceMotion) {
      const onScroll = rafThrottle(() => {
        const y = window.scrollY;
        // solo mientras estás cerca del hero
        if (y > hero.offsetHeight + 200) return;
        const activeSlide = $(".carousel-item.active .hero-slide", mount);
        if (!activeSlide) return;
        activeSlide.style.transform = `translate3d(0, ${Math.min(26, y * 0.05)}px, 0)`;
      });
      window.addEventListener("scroll", onScroll, { passive: true });
    }
  }

  /* ================================
     NAVBAR state (igual que tu lógica pero más sólida)
  ================================= */
  const nav = $(SELECTORS.nav);
  const hero = $(SELECTORS.hero);

  if (nav && hero) {
    let threshold = 0;

    const computeThreshold = () => {
      const heroH = hero.offsetHeight || 0;
      const navH = nav.offsetHeight || 0;
      threshold = Math.max(0, heroH - navH - 8);
    };

    const applyState = () => {
      const scrolled = window.scrollY >= threshold;
      nav.classList.toggle("nav-scrolled", scrolled);
      nav.classList.toggle("nav-transparent", !scrolled);
    };

    const onScroll = rafThrottle(applyState);
    const onResize = rafThrottle(() => {
      computeThreshold();
      applyState();
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    requestAnimationFrame(() => {
      computeThreshold();
      applyState();
    });
  }

  /* ================================
     REVEAL (extra a AOS, no choca)
     Marca elementos como .reveal automáticamente
  ================================= */
  const autoReveal = () => {
    // selecciona cosas que se benefician del reveal (sin tocar navbar/footer)
    const targets = [
      ".solution-tile",
      ".gcard",
      ".service-card",
      ".cta-box-modern",
      ".cta-box",
      ".row.mb-5.shadow.p-4.rounded.bg-white"
    ];

    const els = targets.flatMap((sel) => $$(sel));
    els.forEach((el) => el.classList.add("reveal"));

    if (reduceMotion) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    els.forEach((el) => io.observe(el));
  };

  autoReveal();

  /* ================================
     TILT (desktop only) - pro y sutil
  ================================= */
  const addTilt = () => {
    if (reduceMotion || isTouch) return;

    const tiltEls = [
      ...$$(".solution-tile"),
      ...$$(".gcard"),
      ...$$(".service-card")
    ];

    const maxDeg = 6;

    tiltEls.forEach((card) => {
      card.style.transformStyle = "preserve-3d";

      const onMove = (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;  // 0..1
        const y = (e.clientY - r.top) / r.height;  // 0..1
        const rx = (y - 0.5) * -maxDeg;
        const ry = (x - 0.5) * maxDeg;
        card.style.transform = `translateY(-3px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      };

      const onLeave = () => {
        card.style.transform = "";
      };

      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
    });
  };

  addTilt();

  /* ================================
     COUNTERS (si quieres)
     Usa: <span data-count="11">0</span>
  ================================= */
  const runCounters = () => {
    const counters = $$("[data-count]");
    if (!counters.length) return;

    const animate = (el) => {
      const to = Number(el.dataset.count || 0);
      const from = Number(el.textContent.replace(/[^\d.-]/g, "")) || 0;
      const dur = reduceMotion ? 0 : 900;

      if (dur === 0) {
        el.textContent = String(to);
        return;
      }

      const start = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - start) / dur);
        const val = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)));
        el.textContent = String(val);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          animate(en.target);
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach((c) => io.observe(c));
  };

  runCounters();
});
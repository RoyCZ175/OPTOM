(() => {
  "use strict";

  document.addEventListener("DOMContentLoaded", async () => {
    // =========================================================
    // BASE PATH (root vs /indexservicios/)
    // =========================================================
    const isSubPage = location.pathname.includes("/indexservicios/");
    const base = isSubPage ? "../" : "";

    // =========================================================
    // 0) NAVBAR GLOBAL (partial)
    // Requiere: /partials/navbar.html
    // En cada HTML debe existir: <div id="navbarMount"></div>
    // =========================================================
    const mount = document.getElementById("navbarMount");
    if (mount) {
      try {
        const res = await fetch(`${base}partials/navbar.html`, { cache: "no-store" });
        if (!res.ok) {
          console.warn("Navbar partial not found:", res.status, `${base}partials/navbar.html`);
        } else {
          mount.innerHTML = await res.text();

          // data-href -> href con base correcta
          mount.querySelectorAll("[data-href]").forEach((el) => {
            const to = el.getAttribute("data-href");
            if (to) el.setAttribute("href", base + to);
          });

          // data-src -> src con base correcta (logo)
          mount.querySelectorAll("[data-src]").forEach((el) => {
            const src = el.getAttribute("data-src");
            if (src) el.setAttribute("src", base + src);
          });
        }
      } catch (e) {
        console.warn("Navbar partial not loaded:", e);
      }
    }

    // =========================================================
    // 1) WHATSAPP FLOAT
    // =========================================================
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
          if (!whatsappBtn.classList.contains("is-open")) {
            e.preventDefault();
            e.stopPropagation();
            whatsappBtn.classList.add("is-open");
          }
        });

        document.addEventListener("click", (e) => {
          if (container && !container.contains(e.target)) whatsappBtn.classList.remove("is-open");
        });
      }
    }

    // =========================================================
    // 2) NAVBAR GLOBAL (nav-on-hero / nav-scrolled)
    // Detecta el hero por clases:
    // .hero-ms, .about-hero, .nav-hero, .cl-hero, .dc-hero, .en-hero, .hero-slider, .hero-slide
    // =========================================================
    const nav = document.getElementById("mainNav");
    const hero = document.querySelector(
      ".hero-ms, .about-hero, .nav-hero, .cl-hero, .dc-hero, .en-hero, .hero-slider, .hero-slide"
    );

    const setNav = () => {
      if (!nav) return;

      if (!hero) {
        nav.classList.remove("nav-on-hero");
        nav.classList.add("nav-scrolled");
        return;
      }

      const navH = nav.offsetHeight || 0;
      const heroBottom = hero.offsetTop + hero.offsetHeight;

      // arriba del todo siempre blanco si hay hero
      const inHero = window.scrollY < 5 || (window.scrollY + navH < heroBottom - 20);

      nav.classList.toggle("nav-on-hero", inHero);
      nav.classList.toggle("nav-scrolled", !inHero);
    };

    window.addEventListener("scroll", setNav, { passive: true });
    window.addEventListener("resize", setNav);

    // Evita “sale negro hasta mover”
    setNav();
    requestAnimationFrame(setNav);
    window.addEventListener("load", setNav);

    // =========================================================
    // 3) EFECTO TILT 3D (si existe .solution-card)
    // =========================================================
    document.querySelectorAll(".solution-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform =
          `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform =
          "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
      });
    });

    // =========================================================
    // 4) CONTACT FAB (partial)
    // Requiere: /partials/contact-fab.html
    // =========================================================
    try {
      if (!document.getElementById("contactFab")) {
        const res = await fetch(`${base}partials/contact-fab.html`, { cache: "no-store" });
        if (res.ok) {
          const html = await res.text();
          document.body.insertAdjacentHTML("beforeend", html);
        } else {
          console.warn("Contact FAB partial not found:", res.status, `${base}partials/contact-fab.html`);
        }
      }

      const fab = document.getElementById("contactFab");
      const btn = fab?.querySelector(".contact-fab__btn");
      const closeBtn = fab?.querySelector(".contact-fab__close");

      if (fab && btn && closeBtn) {
        const setExpanded = (open) => btn.setAttribute("aria-expanded", String(open));

        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const open = fab.classList.toggle("is-open");
          setExpanded(open);
        });

        closeBtn.addEventListener("click", (e) => {
          e.preventDefault();
          fab.classList.remove("is-open");
          setExpanded(false);
        });

        document.addEventListener("click", (e) => {
          if (!fab.classList.contains("is-open")) return;
          if (fab.contains(e.target)) return;
          fab.classList.remove("is-open");
          setExpanded(false);
        });

        document.addEventListener("keydown", (e) => {
          if (e.key !== "Escape") return;
          fab.classList.remove("is-open");
          setExpanded(false);
        });

        // Abre la burbuja desde cualquier botón con data-open-contact
        document.addEventListener("click", (e) => {
          const trigger = e.target.closest("[data-open-contact]");
          if (!trigger) return;
          e.preventDefault();
          fab.classList.add("is-open");
          setExpanded(true);
        });
      }
    } catch (err) {
      console.warn("Contact FAB not loaded:", err);
    }
  });
})();
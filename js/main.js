(() => {
    "use strict";

    document.addEventListener("DOMContentLoaded", () => {
        
        // 1. WHATSAPP FLOAT
        const whatsappBtn = document.querySelector(".social-icon.whatsapp");
        if (whatsappBtn) {
            const container = document.querySelector(".social-float-container");
            const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

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

        // 2. NAVBAR GLOBAL (Scroll & Glass effect)
        const nav = document.getElementById("mainNav");
        // Aquí unificamos todas las clases de hero que tú y tu amigo agregaron
        const hero = document.querySelector(".hero-ms, .about-hero, .nav-hero, .cl-hero, .dc-hero, .en-hero");

        const setNav = () => {
            if (!nav) return;
            if (!hero) {
                nav.classList.add("nav-scrolled");
                return;
            }
            const navH = nav.offsetHeight || 0;
            const heroBottom = hero.offsetTop + hero.offsetHeight;
            const inHero = window.scrollY + navH < heroBottom - 20;

            nav.classList.toggle("nav-on-hero", inHero);
            nav.classList.toggle("nav-scrolled", !inHero);
        };

        window.addEventListener("scroll", setNav, { passive: true });
        window.addEventListener("resize", setNav);
        setNav();

        // 3. EFECTO TILT 3D
        const cards = document.querySelectorAll('.solution-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
            });
        });

        // 4. CONTACT BUBBLE (Async)
        (async () => {
            try {
                if (document.getElementById("contactFab")) return;
                const res = await fetch("/partials/contact-fab.html", { cache: "no-store" });
                if (!res.ok) return;

                const html = await res.text();
                document.body.insertAdjacentHTML("beforeend", html);

                const fab = document.getElementById("contactFab");
                const btn = fab?.querySelector(".contact-fab__btn");
                const closeBtn = fab?.querySelector(".contact-fab__close");
                if (!fab || !btn || !closeBtn) return;

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

                document.addEventListener("click", (e) => {
                    const trigger = e.target.closest("[data-open-contact]");
                    if (!trigger) return;
                    e.preventDefault();
                    fab.classList.add("is-open");
                    setExpanded(true);
                });
            } catch (err) {
                console.warn("Contact FAB not loaded:", err);
            }
        })();

    }); // Fin DOMContentLoaded
})();
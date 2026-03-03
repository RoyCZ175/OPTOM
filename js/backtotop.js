document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Evita duplicados
  if (document.getElementById("backToTop")) return;

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
    btn.classList.toggle("is-visible", window.scrollY > 500);
  };

  window.addEventListener("scroll", toggle, { passive: true });
  toggle();
});
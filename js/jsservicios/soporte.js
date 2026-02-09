document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  if (window.AOS) {
    AOS.init({ duration: 900, once: true, offset: 90 });
  }

  const nav = document.getElementById("mainNav");
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 50) nav.classList.add("nav-scrolled");
    else nav.classList.remove("nav-scrolled");
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});

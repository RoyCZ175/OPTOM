document.addEventListener("DOMContentLoaded", () => {
  AOS.init({ duration: 800, once: true, offset: 80 });

  // Navbar más sólida al scroll (opcional)
  const nav = document.getElementById("mainNav");
  const onScroll = () => {
    if (!nav) return;
    nav.style.background = window.scrollY > 10 ? "rgba(2,6,23,.62)" : "rgba(2,6,23,.25)";
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Parallax suave en hero
  const heroBg = document.querySelector(".cl-hero__bg");
  window.addEventListener("scroll", () => {
    if (!heroBg) return;
    const y = Math.min(window.scrollY, 500);
    heroBg.style.transform = `translateY(${y * 0.12}px) scale(1.05)`;
  }, { passive: true });
});

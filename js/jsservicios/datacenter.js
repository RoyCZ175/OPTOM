document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 800,
    once: true,
    offset: 80
  });

  // Navbar más sólida al hacer scroll
  const nav = document.getElementById("mainNav");
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle("nav-glass--scrolled", window.scrollY > 10);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Parallax muy suave en hero (opcional)
  const heroBg = document.querySelector(".dc-hero__bg");
  window.addEventListener("scroll", () => {
    if (!heroBg) return;
    const y = Math.min(window.scrollY, 500);
    heroBg.style.transform = `translateY(${y * 0.12}px) scale(1.05)`;
  }, { passive: true });
});

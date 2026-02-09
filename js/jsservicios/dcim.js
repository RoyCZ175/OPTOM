document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("mainNav");

  // Efecto "scrolled" opcional (si luego quieres oscurecer más)
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 30) nav.classList.add("nav-glass");
    else nav.classList.add("nav-glass"); // se mantiene glass siempre (como en tus otros subíndices)
  };
  onScroll();
  window.addEventListener("scroll", onScroll);

  // Smooth scroll para anchors (#soluciones, etc.)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.pageYOffset - 86; // offset nav
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });
});

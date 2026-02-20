document.addEventListener("DOMContentLoaded", () => {
  if (window.AOS) AOS.init({ duration: 900, once: true });

  const nav = document.getElementById("mainNav");
  if (!nav) return;

  const hero = document.querySelector(".en-hero");  // Específico para la subclase 'energía'

  const setNavColor = () => {
    // Si el hero no está en la vista, cambia el color a blanco (estado nav-scrolled)
    if (window.scrollY > hero.offsetHeight - 20) {
      nav.classList.add("nav-scrolled");
      nav.classList.remove("nav-on-hero");
    } else {
      // Si está en la vista, regresa a transparente (estado nav-on-hero)
      nav.classList.add("nav-on-hero");
      nav.classList.remove("nav-scrolled");
    }
  };

  // Ejecutamos la función al cargar la página y cuando el usuario hace scroll
  setNavColor();
  window.addEventListener("scroll", setNavColor, { passive: true });
  window.addEventListener("resize", setNavColor);
});

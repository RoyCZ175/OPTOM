/* =========================================================
   MAIN.JS - Dinámico (sin tocar estilos base)
   ========================================================= */
(function () {
  "use strict";

  const whatsappBtn = document.querySelector(".social-icon.whatsapp");

  if (!whatsappBtn) return;

  // Elemento contenedor para detectar "fuera"
  const container = document.querySelector(".social-float-container");

  // 1) Desktop: abre/cierra con hover (mouseenter/leave) usando clase
  whatsappBtn.addEventListener("mouseenter", () => {
    whatsappBtn.classList.add("is-open");
  });

  whatsappBtn.addEventListener("mouseleave", () => {
    whatsappBtn.classList.remove("is-open");
  });

  // 2) Móvil: toggle con click (porque hover no existe bien en touch)
  //    - Si quieres que en móvil sea solo click, puedes comentar los 2 listeners de arriba.
  whatsappBtn.addEventListener("click", (e) => {
    // Evita que navegue si tu botón es <a href="..."> y quieres que primero abra.
    // Si prefieres que al click SI abra WhatsApp, elimina estas 2 líneas.
    e.preventDefault();
    e.stopPropagation();

    whatsappBtn.classList.toggle("is-open");
  });

  // 3) Cerrar si se hace click fuera (útil en móvil)
  document.addEventListener("click", (e) => {
    const clickedInside = container && container.contains(e.target);
    if (!clickedInside) whatsappBtn.classList.remove("is-open");
  });
})();

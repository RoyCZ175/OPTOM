document.addEventListener("DOMContentLoaded", () => {
  const items = Array.from(document.querySelectorAll(".mv-item"));
  if (!items.length) return;

  const img  = document.getElementById("mvPreviewImg");
  const name = document.getElementById("mvPreviewName");
  const desc = document.getElementById("mvPreviewDesc");
  const link = document.getElementById("mvPreviewLink");

  const setActive = (el) => {
    items.forEach(btn => {
      btn.classList.remove("is-active");
      btn.setAttribute("aria-selected", "false");
    });

    el.classList.add("is-active");
    el.setAttribute("aria-selected", "true");

    const dataName = el.dataset.name || "Marca";
    const dataLogo = el.dataset.logo || "";
    const dataDesc = el.dataset.desc || "";
    const dataSite = el.dataset.site || "#";

    if (name) name.textContent = dataName;
    if (desc) desc.textContent = dataDesc;

    if (link) {
      link.href = dataSite;
      link.innerHTML = `Ver sitio oficial <span aria-hidden="true">↗</span>`;
    }

    // Fade suave del logo grande
    if (img && dataLogo) {
      img.style.opacity = "0";
      img.style.transform = "scale(0.98)";

      const pre = new Image();
      pre.onload = () => {
        img.src = dataLogo;
        img.alt = `Logo de ${dataName}`;

        requestAnimationFrame(() => {
          img.style.opacity = "1";
          img.style.transform = "scale(1)";
        });
      };
      pre.src = dataLogo;
    }
  };

  // Hover + focus + click
  items.forEach((el) => {
    el.addEventListener("mouseenter", () => setActive(el));
    el.addEventListener("focus", () => setActive(el));
    el.addEventListener("click", () => setActive(el));
  });

  // Teclado: ↑ ↓ y Enter/Espacio
  items.forEach((el, idx) => {
    el.addEventListener("keydown", (e) => {
      const key = e.key;

      if (key === "ArrowDown") {
        e.preventDefault();
        const next = items[idx + 1] || items[0];
        next.focus();
        setActive(next);
      }

      if (key === "ArrowUp") {
        e.preventDefault();
        const prev = items[idx - 1] || items[items.length - 1];
        prev.focus();
        setActive(prev);
      }

      if (key === "Enter" || key === " ") {
        e.preventDefault();
        setActive(el);
      }
    });
  });

  // Inicial
  setActive(items[0]);
});

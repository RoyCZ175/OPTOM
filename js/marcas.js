/**
 * Lógica para la sección de Marcas Verificadas - OPTOM
 * - Corrige clase activa: usa .is-active (como en tu CSS)
 * - Actualiza el panel derecho (logo, nombre, descripción, link)
 */
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.mv-item');
  const previewImg = document.getElementById('mvPreviewImg');
  const previewName = document.getElementById('mvPreviewName');
  const previewDesc = document.getElementById('mvPreviewDesc');
  const previewLink = document.getElementById('mvPreviewLink');

  if (!items.length || !previewImg || !previewName || !previewDesc || !previewLink) return;

  const updatePreview = (element) => {
    // 1) Quitar activo a todos
    items.forEach(i => {
      i.classList.remove('is-active');
      i.setAttribute('aria-selected', 'false');
    });

    // 2) Activar el seleccionado
    element.classList.add('is-active');
    element.setAttribute('aria-selected', 'true');

    // 3) Datos desde data-attrs
    const name = element.getAttribute('data-name') || '';
    const logo = element.getAttribute('data-logo') || '';
    const desc = element.getAttribute('data-desc') || '';
    const site = element.getAttribute('data-site') || '';

    // 4) Fade out (panel derecho)
    if (previewImg.parentElement) previewImg.parentElement.style.opacity = '0';
    previewName.style.opacity = '0';
    previewDesc.style.opacity = '0';

    setTimeout(() => {
      // 5) Cambiar contenido
      if (logo) previewImg.src = logo;
      previewImg.alt = name || 'Logo';

      previewName.textContent = name;
      previewDesc.textContent = desc;

      // Link visible solo si existe una URL real
      previewLink.href = site || '#';
      previewLink.style.display = (!site || site === '#') ? 'none' : 'inline-flex';

      // 6) Fade in
      if (previewImg.parentElement) previewImg.parentElement.style.opacity = '1';
      previewName.style.opacity = '1';
      previewDesc.style.opacity = '1';
    }, 150);
  };

  // Eventos (click + hover)
  items.forEach(item => {
    item.addEventListener('click', () => updatePreview(item));
    item.addEventListener('mouseenter', () => updatePreview(item));
  });

  // Inicializa con la primera marca (y actualiza preview)
  updatePreview(items[0]);
});

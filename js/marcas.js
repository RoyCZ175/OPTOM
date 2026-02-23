/**
 * OPTOM - Marcas & Clientes
 * - Filtro por categorías (3 + Todos)
 * - Dropdown por marca (click)
 * - Marquee continuo para clientes
 */
document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     1) FILTRO MARCAS
     ========================================================= */
  const filterButtons = document.querySelectorAll('.filter-pill');
  const brandTiles = document.querySelectorAll('#brandsGrid .brand-tile');
  const brandsGrid = document.getElementById('brandsGrid');

  // Mensaje "sin resultados" (se crea una vez)
  let emptyState = document.getElementById('brandsEmptyState');
  if (!emptyState && brandsGrid) {
    emptyState = document.createElement('div');
    emptyState.id = 'brandsEmptyState';
    emptyState.className = 'brands-empty-state';
    emptyState.innerHTML = `
      <div class="brands-empty-state__box">
        <i class="fa-solid fa-circle-info"></i>
        <div>
          <h6 class="mb-1">Sin resultados</h6>
          <p class="mb-0">No hay marcas asociadas a esta categoría por el momento.</p>
        </div>
      </div>
    `;
    brandsGrid.insertAdjacentElement('afterend', emptyState);
    emptyState.style.display = 'none';
  }

  const normalize = (txt) => (txt || '').trim().toLowerCase();

  const applyBrandFilter = (filterKey) => {
    const key = normalize(filterKey);
    let visibleCount = 0;

    brandTiles.forEach(tile => {
      const cats = normalize(tile.dataset.cat || '');
      const catList = cats.split(',').map(s => s.trim()).filter(Boolean);

      const show = (key === 'all') || catList.includes(key);
      tile.classList.toggle('is-hidden', !show);

      if (show) visibleCount++;
    });

    if (emptyState) emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
  };

  if (filterButtons.length && brandTiles.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyBrandFilter(btn.dataset.filter || 'all');

        // opcional: al filtrar cerramos cualquier dropdown abierto
        brandTiles.forEach(t => t.classList.remove('is-open'));
      });
    });

    // Estado inicial: Todos
    const defaultBtn = document.querySelector('.filter-pill[data-filter="all"]') || filterButtons[0];
    if (defaultBtn) {
      filterButtons.forEach(b => b.classList.remove('active'));
      defaultBtn.classList.add('active');
      applyBrandFilter(defaultBtn.dataset.filter || 'all');
    }

    console.log(
      "%c OPTOM SYSTEM: Filtro de marcas listo ",
      "color:#A8D713;background:#05080a;font-weight:bold;border-left:4px solid #A8D713;padding:6px;"
    );
  } else {
    console.warn("OPTOM: No se encontró filtro o tiles de marcas (#brandsGrid .brand-tile).");
  }

  /* =========================================================
     2) DROPDOWN POR MARCA (CLICK)
     ========================================================= */
  if (brandTiles.length) {
    brandTiles.forEach(tile => {
      tile.addEventListener('click', (e) => {
        // Ctrl/Cmd click: deja abrir el link en otra pestaña (no interferimos)
        if (e.ctrlKey || e.metaKey) return;

        // Evita navegar para permitir desplegar
        e.preventDefault();

        // Cierra otros (acordeón)
        brandTiles.forEach(t => { if (t !== tile) t.classList.remove('is-open'); });

        // Toggle del actual
        tile.classList.toggle('is-open');
      });
    });

    console.log(
      "%c OPTOM SYSTEM: Dropdown de marcas OK ",
      "color:#A8D713;background:#05080a;font-weight:bold;border-left:4px solid #A8D713;padding:6px;"
    );
  }

  /* =========================================================
     3) MARQUEE CLIENTES (sin espacios en blanco)
     ========================================================= */
  const track = document.getElementById('clientsTrack');
  if (track) {
    const marqueeBox = track.parentElement;
    const original = Array.from(track.children);

    const rebuild = () => {
      track.innerHTML = '';
      original.forEach(n => track.appendChild(n.cloneNode(true)));

      let safety = 0;
      while (track.scrollWidth < marqueeBox.clientWidth * 2.2 && safety < 30) {
        original.forEach(n => track.appendChild(n.cloneNode(true)));
        safety++;
      }

      if (track.children.length < original.length * 2) {
        original.forEach(n => track.appendChild(n.cloneNode(true)));
      }
    };

    rebuild();

    let t;
    window.addEventListener('resize', () => {
      clearTimeout(t);
      t = setTimeout(rebuild, 140);
    });

    console.log(
      "%c OPTOM SYSTEM: Marquee de clientes OK ",
      "color:#A8D713;background:#05080a;font-weight:bold;border-left:4px solid #A8D713;padding:6px;"
    );
  } else {
    console.warn("OPTOM: No se encontró #clientsTrack para el marquee.");
  }

});
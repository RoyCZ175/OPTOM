/**
 * Lógica para Alianzas Estratégicas - OPTOM
 * Estilo: Grid Mission Critical
 */
document.addEventListener('DOMContentLoaded', () => {
    const techCards = document.querySelectorAll('.tech-card');

    // 1. Efecto de Brillo dinámico (Glow Effect)
    // Este efecto hace que la tarjeta reaccione a la posición del mouse
    techCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // posición X dentro de la card
            const y = e.clientY - rect.top;  // posición Y dentro de la card

            // Creamos un reflejo sutil en el borde al mover el mouse
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            
            // Aplicamos un gradiente radial dinámico de fondo
            card.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(255, 204, 0, 0.08), transparent 40%)`;
        });

        // Al salir el mouse, restauramos el fondo original suavemente
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'background 0.5s ease';
card.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(168, 215, 19, 0.1), transparent 40%)`;        });
    });

    // 2. Animación de "Carga de Sistema" (Staggered Load)
    // Si usas AOS (Animate On Scroll), esto mejora el delay automáticamente
    const cards = document.querySelectorAll('[data-aos="zoom-in"]');
    cards.forEach((card, index) => {
        // Añade un delay incremental de 50ms por cada marca (14 marcas = efecto fluido)
        card.setAttribute('data-aos-delay', (index * 50).toString());
    });

    // 3. Log de Consola (Estilo Técnico)
    console.log("%c OPTOM SYSTEM: 14 Strategic Partners Loaded Successfully ", 
                "color: #ffc107; background: #05080a; font-weight: bold; border: 1px solid #ffc107; padding: 5px;");
});
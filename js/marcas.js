/**
 * OPTOM - Gestión de Interacción para Alianzas Estratégicas
 * Maneja el brillo dinámico y la carga de tarjetas
 */
document.addEventListener('DOMContentLoaded', () => {
    const techCards = document.querySelectorAll('.tech-card');

    techCards.forEach(card => {
        // 1. EFECTO DE BRILLO NEÓN (MouseMove)
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            
            // Calculamos posición exacta del mouse respecto a la card
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Pasamos las coordenadas al CSS
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            
            // Aplicamos el gradiente radial usando el color Lima OPTOM
            // Esto crea el efecto de linterna que sigue al puntero
            card.style.background = `radial-gradient(800px circle at ${x}px ${y}px, rgba(168, 215, 19, 0.12), transparent 40%)`;
            card.style.borderColor = "rgba(168, 215, 19, 0.8)";
        });

        // 2. RESET DE ESTADO (MouseLeave)
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'all 0.5s ease';
            card.style.background = 'rgba(255, 255, 255, 0.02)';
            card.style.borderColor = 'rgba(168, 215, 19, 0.1)';
        });
    });

    // 3. LOG DE INICIALIZACIÓN (Consola limpia)
    console.log("%c OPTOM SYSTEM: Alianzas Estratégicas vinculadas correctamente ", 
                "color: #A8D713; background: #05080a; font-weight: bold; border-left: 4px solid #A8D713; padding: 5px;");
});
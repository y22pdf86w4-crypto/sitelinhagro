/**
 * HEADER - ESCONDER AO ROLAR (GLOBAL)
 * - Rolando para baixo: esconde
 * - Rolando para cima: mostra
 * Funciona mesmo se o header for carregado depois (components-loader).
 */

(function () {
  function initHideHeaderOnScroll() {
    const header = document.querySelector('.header');
    if (!header) {
      console.warn('⚠️ header.js: .header não encontrado');
      return;
    }

    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;

    window.addEventListener('scroll', () => {
      const currentY = window.pageYOffset || document.documentElement.scrollTop;

      // evita flicker em movimentos muito pequenos
      if (Math.abs(currentY - lastScrollY) < 5) {
        return;
      }

      if (currentY > lastScrollY) {
        // rolando pra baixo: esconde
        header.classList.add('header-hidden');
      } else {
        // rolando pra cima: mostra
        header.classList.remove('header-hidden');
      }

      lastScrollY = currentY;
    });

    console.log('📌 header.js: hide/show header on scroll configurado');
  }

  // tenta inicializar após load completo
  window.addEventListener('load', initHideHeaderOnScroll);

  // se você dispara um evento customizado depois de carregar o header, garante também aqui
  document.addEventListener('componentsLoaded', initHideHeaderOnScroll);
})();

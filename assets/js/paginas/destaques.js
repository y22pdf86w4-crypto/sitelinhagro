/**
 * ==========================================
 * PÁGINA DESTAQUES
 * ==========================================
 */

document.addEventListener('componentsLoaded', () => {
  console.log('✅ Página Destaques carregada');
  initDestaquesPage();
});

function initDestaquesPage() {
  // Marca menu ativo
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') && link.getAttribute('href').includes('destaques')) {
      link.classList.add('active');
    }
  });

  // Animação de entrada dos cards
  animateCards();

  // WhatsApp flutuante com mensagens
  initFloatingWhatsappMessage();

  console.log('🎯 Página Destaques inicializada');
}

function animateCards() {
  const cards = document.querySelectorAll('.destaque-card');

  if (cards.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 150);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

/**
 * WhatsApp flutuante – balão aparece de vez em quando com mensagens diferentes
 */
function initFloatingWhatsappMessage() {
  const messageEl = document.querySelector('.whatsapp-floating-message');

  if (!messageEl) return;

  const mensagens = [
    'Fale com um consultor<br>especialista Linhagro',
    'Quer melhorar a<br>produtividade da lavoura?',
    'Tire suas dúvidas<br>pelo WhatsApp',
    'Fale com nosso time<br>técnico agora',
    'Vamos construir um<br>manejo mais eficiente?'
  ];

  let idx = 0;

  function mostrarMensagem() {
    const span = messageEl.querySelector('span');
    if (!span) return;

    span.innerHTML = mensagens[idx];

    messageEl.classList.add('visible');

    setTimeout(() => {
      messageEl.classList.remove('visible');
    }, 2500);

    idx = (idx + 1) % mensagens.length;
  }

  setTimeout(mostrarMensagem, 3000);
  setInterval(mostrarMensagem, 6000);
}
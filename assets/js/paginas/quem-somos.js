/**
 * ==========================================
 * PÁGINA QUEM SOMOS
 * ==========================================
 */

document.addEventListener('componentsLoaded', () => {
  console.log('✅ Página Quem Somos carregada');
  initQuemSomosPage();
  initFloatingWhatsappMessage();
});

function initQuemSomosPage() {
  // Marca menu ativo
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') && link.getAttribute('href').includes('quem-somos')) {
      link.classList.add('active');
    }
  });
  
  // Animação de entrada
  animateOnScroll();
  
  // Anima os números
  animateNumbers();
  
  console.log('🎯 Página Quem Somos inicializada');
}

function animateOnScroll() {
  const items = document.querySelectorAll('.mvv-card, .historia-text, .historia-image');
  
  if (items.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  items.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
  });
}

function animateNumbers() {
  const numeroCards = document.querySelectorAll('.numero-valor');
  
  if (numeroCards.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = parseInt(target.getAttribute('data-valor'));
        animateValue(target, 0, finalValue, 2000);
        observer.unobserve(target);
      }
    });
  }, {
    threshold: 0.5
  });
  
  numeroCards.forEach(card => observer.observe(card));
}

function animateValue(element, start, end, duration) {
  const range = end - start;
  const increment = end > start ? 1 : -1;
  const stepTime = Math.abs(Math.floor(duration / range));
  let current = start;
  
  const timer = setInterval(() => {
    current += increment * Math.ceil(range / 100);
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      current = end;
      clearInterval(timer);
    }
    element.textContent = current.toLocaleString('pt-BR');
  }, stepTime);
}

/**
 * ==========================================
 * WHATSAPP FLUTUANTE - BALÃO ALTERNANDO
 * ==========================================
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

  // primeira mensagem depois de 3s
  setTimeout(mostrarMensagem, 3000);
  // depois, a cada 6s
  setInterval(mostrarMensagem, 6000);
}
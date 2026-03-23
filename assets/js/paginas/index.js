/**
 * INDEX - JS FINAL
 * Hero slider (3 banners) + Counter + Scroll Reveal + Smooth Scroll + WhatsApp Balão
 */

document.addEventListener('componentsLoaded', () => {
  console.log('✅ Página Index carregada (hero slider 3 banners)');
  initIndexPage();
});

function initIndexPage() {
  initHeroSlider();
  initCounterAnimation();
  initScrollReveal();
  initSmoothScroll();
  initFloatingWhatsappMessage(); // <- balão do WhatsApp
}

/**
 * HERO SLIDER - 3 SLIDES + SETAS
 */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.querySelector('.hero-arrow-prev');
  const nextBtn = document.querySelector('.hero-arrow-next');

  if (!slides.length) return;

  let currentIndex = 0;
  const total = slides.length;
  const intervalTime = 6000;
  let intervalId = null;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    currentIndex = index;
  }

  function nextSlide() {
    const nextIndex = (currentIndex + 1) % total;
    showSlide(nextIndex);
  }

  function prevSlide() {
    const prevIndex = (currentIndex - 1 + total) % total;
    showSlide(prevIndex);
  }

  function startAutoPlay() {
    stopAutoPlay();
    intervalId = setInterval(nextSlide, intervalTime);
  }

  function stopAutoPlay() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      startAutoPlay();
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoPlay();
    });
  }

  showSlide(0);
  startAutoPlay();

  console.log('🎞️ Hero slider iniciado (3 slides + setas)');
}

/**
 * COUNTER - ANIMAÇÃO DE CONTAGEM
 */
function initCounterAnimation() {
  const numeroElements = document.querySelectorAll('.numero-numero');

  if (!numeroElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        animateCounter(entry.target);
        entry.target.dataset.animated = 'true';
      }
    });
  }, {
    threshold: 0.5
  });

  numeroElements.forEach(el => observer.observe(el));
  console.log('🔢 Animação de contagem configurada');
}

function animateCounter(element) {
  const targetValue = parseInt(element.dataset.valor);
  const duration = 2000;
  const steps = 60;
  const increment = targetValue / steps;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;

    if (current >= targetValue) {
      current = targetValue;
      clearInterval(timer);
    }

    let displayValue = Math.floor(current);

    if (displayValue >= 1000) {
      displayValue = displayValue.toLocaleString('pt-BR');
    }

    const label = element.nextElementSibling.textContent.toLowerCase();
    if (label.includes('anos')) {
      element.textContent = displayValue + '+';
    } else if (label.includes('produtores') || label.includes('hectares')) {
      element.textContent = displayValue + '+';
    } else {
      element.textContent = displayValue;
    }
  }, duration / steps);
}

/**
 * SCROLL REVEAL
 */
function initScrollReveal() {
  const cards = document.querySelectorAll('.destaque-card, .area-card, .parceiro-item');

  if (!cards.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 80);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });

  console.log('✨ Scroll Reveal ativado');
}

/**
 * SMOOTH SCROLL
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  console.log('🧷 Smooth Scroll configurado');
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

  console.log('💬 Balão do WhatsApp inicializado');
}

console.log('🚀 Index JS (hero slider 3 banners) carregado!');
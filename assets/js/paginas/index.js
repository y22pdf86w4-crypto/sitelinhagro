/**
 * INDEX - JS FINAL
 * Typewriter frases + Counter + Scroll Reveal + Smooth Scroll
 */

document.addEventListener('componentsLoaded', () => {
  console.log('✅ Página Index carregada (hero full-screen com typewriter de frases)');
  initIndexPage();
});

function initIndexPage() {
  initHeroTypewriter();
  initCounterAnimation();
  initScrollReveal();
  initSmoothScroll();
}

/**
 * TYPEWRITER - FRASES COMPLETAS
 */
function initHeroTypewriter() {
  const el = document.getElementById('hero-typewriter');
  const cursor = document.querySelector('.hero-cursor');
  if (!el || !cursor) return;

  // Frases com span laranja na palavra-chave
  const phrases = [
    'Regeneramos o <span class="hero-highlight-laranja">solo</span>.',
    'Multiplicamos <span class="hero-highlight-laranja">resultados</span>.',
    'Agricultura <span class="hero-highlight-laranja">regenerativa</span> com inteligência técnica.',
    'O futuro da <span class="hero-highlight-laranja">produtividade</span> começa no solo vivo.'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 55;       // velocidade de digitação
  const deletingSpeed = 40;     // velocidade de apagar
  const pauseOnComplete = 2000; // 2s com frase completa
  const pauseBetween = 400;     // pausa entre apagar e próxima

  function type() {
    const currentPhrase = phrases[phraseIndex];
    const plain = currentPhrase.replace(/<[^>]*>/g, ''); // texto sem tags

    if (!isDeleting) {
      // escrevendo
      const visibleLength = charIndex;
      const currentVisible = sliceHtmlByPlainLength(currentPhrase, visibleLength);
      el.innerHTML = currentVisible;

      if (charIndex < plain.length) {
        charIndex++;
        setTimeout(type, typingSpeed);
      } else {
        // frase completa – pausa
        setTimeout(() => {
          isDeleting = true;
          setTimeout(type, deletingSpeed);
        }, pauseOnComplete);
      }
    } else {
      // apagando
      const visibleLength = charIndex;
      const currentVisible = sliceHtmlByPlainLength(currentPhrase, visibleLength);
      el.innerHTML = currentVisible;

      if (charIndex > 0) {
        charIndex--;
        setTimeout(type, deletingSpeed);
      } else {
        // terminou de apagar – próxima frase
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, pauseBetween);
      }
    }
  }

  /**
   * Corta string com HTML com base no comprimento do texto plano (sem tags),
   * preservando as tags.
   */
  function sliceHtmlByPlainLength(html, targetLength) {
    let plainCount = 0;
    let result = '';
    let inTag = false;

    for (let i = 0; i < html.length; i++) {
      const char = html[i];
      result += char;

      if (char === '<') {
        inTag = true;
      } else if (char === '>') {
        inTag = false;
      } else if (!inTag) {
        plainCount++;
        if (plainCount >= targetLength) {
          return result;
        }
      }
    }
    return result;
  }

  // inicia após pequeno delay
  setTimeout(type, 700);
  console.log('⌨️ Typewriter de frases iniciado');
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

console.log('🚀 Index JS (hero full-screen + typewriter) carregado!');

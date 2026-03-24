// ============================================
// PÁGINA PORTAL - LINHAGRO (versão enxuta)
// ============================================

console.log('🚀 Portal do Cliente iniciado');

// Aguarda o DOM
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initPortal();
  }, 100);
});

function initPortal() {
  marcarNavAtivo();
  renderizarConteudosDestaque();  // apenas OnFirm e Solo Vivo
  setupNewsletter();
  initFloatingWhatsappMessage();
  console.log('✅ Portal carregado!');
}

// Marca nav ativo
function marcarNavAtivo() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.classList.contains('btn-portal')) {
      link.classList.add('active');
    }
  });
}

// ============================================
// DADOS - APENAS 2 CARDS
// ============================================

const conteudosDestaque = [
  {
    id: 'onfirm',
    titulo: 'OnFirm',
    descricao:
      'Projeto focado em gestão e estabilidade da produção, unindo tecnologia, diagnóstico e acompanhamento técnico contínuo.',
    tag: 'Projeto Especial',
    data: '2026',
    autor: 'Time Linhagro',
    icone: 'fa-seedling',
    link: 'onfirme.html' // destino do botão Saiba mais
  },
  {
    id: 'solo-vivo',
    titulo: 'Solo Vivo, Planta Forte',
    descricao:
      'Programa voltado para construção de solo vivo, manejo regenerativo e plantas mais equilibradas e produtivas.',
    tag: 'Programa Solo',
    data: '2026',
    autor: 'Equipe Técnica',
    icone: 'fa-leaf',
    link: 'solo-vivo-planta-forte.html' // destino do botão Saiba mais
  }
];

// Renderiza os 2 cards
function renderizarConteudosDestaque() {
  const grid = document.getElementById('conteudo-grid');
  if (!grid) return;

  grid.innerHTML = conteudosDestaque
    .map(
      c => `
    <article class="conteudo-card" id="${c.id}">
      <div class="conteudo-imagem">
        <div class="conteudo-imagem-placeholder">
          <i class="fas ${c.icone}"></i>
        </div>
        <span class="conteudo-categoria categoria-destaque">
          ${c.tag}
        </span>
        <span class="conteudo-data">
          <i class="far fa-calendar"></i>
          ${c.data}
        </span>
      </div>
      <div class="conteudo-corpo">
        <h3 class="conteudo-titulo">${c.titulo}</h3>
        <p class="conteudo-descricao">${c.descricao}</p>
        <div class="conteudo-rodape">
          <div class="conteudo-autor">
            <div class="autor-avatar">${c.autor.charAt(0)}</div>
            <span>${c.autor}</span>
          </div>
          <a href="${c.link}" class="conteudo-btn">
            Saiba mais
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </article>
  `
    )
    .join('');

  animarCards();
}

// Animação simples de entrada
function animarCards() {
  const cards = document.querySelectorAll('.conteudo-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';

    setTimeout(() => {
      card.style.transition = 'all 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

// ============================================
// NEWSLETTER
// ============================================

function setupNewsletter() {
  const btn = document.getElementById('newsletter-btn');
  const input = document.getElementById('newsletter-email');

  if (!btn || !input) return;

  btn.addEventListener('click', () => {
    const email = input.value.trim();

    if (!email) {
      alert('Por favor, insira seu e-mail');
      return;
    }

    if (!validarEmail(email)) {
      alert('Por favor, insira um e-mail válido');
      return;
    }

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Inscrito!';
      btn.style.background = '#2ecc71';
      input.value = '';

      setTimeout(() => {
        btn.innerHTML =
          '<i class="fas fa-paper-plane"></i> <span>Inscrever-se</span>';
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);

      console.log(`📧 Newsletter: ${email} inscrito`);
    }, 1500);
  });

  input.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      btn.click();
    }
  });
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// ============================================
// WHATSAPP FLUTUANTE - BALÃO ALTERNANDO
// ============================================

function initFloatingWhatsappMessage() {
  const messageEl = document.querySelector('.whatsapp-floating-message');
  if (!messageEl) return;

  const mensagens = [
    'Fale com um consultor<br>especialista Linhagro',
    'Quer tirar dúvidas sobre<br>OnFirm ou Solo Vivo?',
    'Clique aqui e<br>fale pelo WhatsApp',
    'Nosso time técnico<br>está online agora'
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
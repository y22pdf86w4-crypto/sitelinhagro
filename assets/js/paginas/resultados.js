// ============================================
// PÁGINA RESULTADOS - LINHAGRO
// ============================================

document.addEventListener('componentsLoaded', () => {
  initResultados();
  initFloatingWhatsappMessage();
});

function initResultados() {
  marcarNavAtivo();
  renderizarVideoDepoimentos();
  animarEstatisticas();
}

// ============================================
// MARCA NAV-LINK ATIVO
// ============================================
function marcarNavAtivo() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.textContent.includes('Resultados')) {
      link.classList.add('active');
    }
  });
}

// ============================================
// ANIMAÇÃO DAS ESTATÍSTICAS
// ============================================
function animarEstatisticas() {
  const numeros = document.querySelectorAll('.stat-number');
  if (!numeros.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const valorFinal = parseInt(el.getAttribute('data-valor'), 10) || 0;
      const sufixo = el.getAttribute('data-sufixo') || '';
      const format = el.getAttribute('data-format') || '';
      const duracao = 1500;
      const inicioTempo = performance.now();

      function atualizar(agora) {
        const progresso = Math.min((agora - inicioTempo) / duracao, 1);
        const valorAtual = Math.floor(valorFinal * progresso);

        let texto;
        if (format === 'k') {
          texto = valorAtual.toLocaleString('pt-BR');
        } else {
          texto = valorAtual.toString();
        }

        el.textContent = texto + sufixo;

        if (progresso < 1) {
          requestAnimationFrame(atualizar);
        }
      }

      requestAnimationFrame(atualizar);
      obs.unobserve(el);
    });
  }, { threshold: 0.3 });

  numeros.forEach(num => observer.observe(num));
}

// ============================================
// DEPOIMENTOS EM VÍDEO - DADOS
// ============================================

const CAMINHO_CAPAS = '../assets/imagens/resultados/capavideos/';

const videoDepoimentos = [
  {
    nome: 'Vanderlei Ceolin',
    inicial: 'V',
    quote: '“Depoimento em vídeo sobre a evolução da lavoura com o manejo Linhagro.”',
    cultura: 'Produtor de Café',
    local: 'Espírito Santo',
    driveId: '1RJgQl09snW7thTE1dV2RhW7i0AS-oPS2',
    capa: 'VANDERLEI-CEOLIN.png'
  },
  {
    nome: 'Jardeson - JMF',
    inicial: 'J',
    quote: '“Relato em vídeo de ganhos de produtividade com nutrição estratégica.”',
    cultura: 'Produtor Rural',
    local: 'Espírito Santo',
    driveId: '1AKPvcRSYpgIl4HXNE94Z9pQWOVYGYBfU',
    capa: 'JARDESON---JMF.png'
  },
  {
    nome: 'Jarbas Nicoli',
    inicial: 'J',
    quote: '“Mostra como o solo vivo e bem nutrido mudou o desempenho da área.”',
    cultura: 'Produtor Rural',
    local: 'Espírito Santo',
    driveId: '1RxUJA_gmv1cDCaanwLBj_YAtn_MERX9U',
    capa: 'JARBAS-NICOLI--.png' // ajuste aqui se o nome for diferente
  },
  {
    nome: 'Guto',
    inicial: 'G',
    quote: '“Depoimento sobre adoção de soluções biológicas e manejo regenerativo.”',
    cultura: 'Produtor Rural',
    local: 'Espírito Santo',
    driveId: '1gQCvNSwtVM_6cC8BC-dXOJfxiwFbjV9k',
    capa: 'GUTO.png'
  },
  {
    nome: 'Eduardo Bortolini',
    inicial: 'E',
    quote: '“Evolução de produtividade e mais estabilidade de safra com a Linhagro.”',
    cultura: 'Produtor Rural',
    local: 'Espírito Santo',
    driveId: '15iwE6SRiZ5MdGDnqfET6r34aUEqMO6LA',
    capa: 'EDUARDO-BORTOLINI--.png'
  },
  {
    nome: 'Almir Gaburro - Café Esperanza',
    inicial: 'A',
    quote: '“Relato em vídeo sobre recuperação de áreas e construção de fertilidade.”',
    cultura: 'Produtor Rural',
    local: 'Espírito Santo',
    driveId: '1ATPtsblBgY_jxM1IqKuyvt8qUpKAYGaC',
    capa: 'ALMIR-GABURRO---CAFÉ-ESPERANZA.png'
  },
  {
    nome: 'Aline Malta - Fazenda Três Marias',
    inicial: 'A',
    quote: '“Depoimento sobre salto de resultado com manejo regenerativo.”',
    cultura: 'Produtora Rural',
    local: 'Espírito Santo',
    driveId: '1WKgaxL1l-2W8ACAJThH5onImhlEEpxSk',
    capa: 'ALINE-MALTA---FAZENDA-TRES-MARIAS.png'
  }
];

function getDrivePreviewUrl(id) {
  return `https://drive.google.com/file/d/${id}/preview`;
}

// ============================================
// RENDERIZA OS CARDS DE VÍDEO
// ============================================
function renderizarVideoDepoimentos() {
  const container = document.getElementById('video-testimonials-list');
  if (!container) return;

  container.innerHTML = videoDepoimentos
    .map(
      (v, index) => `
      <article class="video-testimonial-card">
        <div class="video-wrapper" data-video-index="${index}">
          <img
            class="video-cover"
            src="${CAMINHO_CAPAS + v.capa}"
            alt="Capa do depoimento de ${v.nome}"
            loading="lazy"
          />
          <div class="video-overlay-play">
            <div class="video-overlay-play-icon">
              <i class="fas fa-play-circle"></i>
            </div>
            <div class="video-overlay-play-text">
              Clique para assistir ao depoimento
            </div>
          </div>
          <div class="video-loader">
            <div class="video-loader-spinner"></div>
          </div>
        </div>
        <div class="video-info">
          <div>
            <div class="video-quote-icon">
              <i class="fas fa-quote-left"></i>
            </div>
            <p class="video-quote">${v.quote}</p>
          </div>
          <div class="video-author-block">
            <div class="video-avatar">${v.inicial}</div>
            <div class="video-author-texts">
              <span class="video-title">${v.nome}</span>
              <span class="video-meta">${v.cultura} • ${v.local}</span>
            </div>
          </div>
        </div>
      </article>
    `
    )
    .join('');

  initLazyLoadVideos();
}

// ============================================
// LAZY LOAD DOS IFRAMES + LOADING
// ============================================
function initLazyLoadVideos() {
  const wrappers = document.querySelectorAll('.video-wrapper');
  if (!wrappers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      const wrapper = entry.target;
      const index = parseInt(wrapper.getAttribute('data-video-index'), 10);
      const data = videoDepoimentos[index];

      if (!data) {
        obs.unobserve(wrapper);
        return;
      }

      // Só adiciona o listener de clique uma vez
      if (!wrapper.dataset.clickBound) {
        wrapper.addEventListener('click', () => {
          carregarIframeNoWrapper(wrapper, data);
        });
        wrapper.dataset.clickBound = 'true';
      }

      // Se quiser que ele já carregue sozinho ao entrar na tela SEM clicar,
      // descomente a linha abaixo:
      // carregarIframeNoWrapper(wrapper, data);

      // uma vez que o elemento entrou na tela, não precisa mais observar
      obs.unobserve(wrapper);
    });
  }, { threshold: 0.3 });

  wrappers.forEach(w => observer.observe(w));
}

function carregarIframeNoWrapper(wrapper, data) {
  // se já tiver iframe, não faz nada
  if (wrapper.querySelector('iframe')) return;

  const loader = wrapper.querySelector('.video-loader');
  const overlayPlay = wrapper.querySelector('.video-overlay-play');
  const cover = wrapper.querySelector('.video-cover');

  if (loader) loader.classList.add('visible');

  const iframe = document.createElement('iframe');
  iframe.src = getDrivePreviewUrl(data.driveId);
  iframe.allow =
    'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  iframe.loading = 'lazy';

  iframe.addEventListener('load', () => {
    if (loader) loader.classList.remove('visible');
    if (overlayPlay) overlayPlay.style.display = 'none';
    if (cover) cover.style.display = 'none';
  });

  wrapper.appendChild(iframe);
}

// ============================================
// WHATSAPP FLUTUANTE - BALÃO ALTERNANDO
// ============================================
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
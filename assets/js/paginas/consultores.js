// ============================================
// PÁGINA CONSULTORES COM MAPA DE FILIAIS
// ============================================

let mapa;

// Aguarda o carregamento do header/footer
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initConsultores();
  }, 100);
});

function initConsultores() {
  marcarNavAtivo();
  inicializarMapa();
  setupFiltros();
  animarStats();
  initFloatingWhatsappMessage();
}

// Marca nav-link ativo
function marcarNavAtivo() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.textContent.trim() === 'Consultores') {
      link.classList.add('active');
    }
  });
}

// Filiais com coordenadas
const filiais = [
  {
    nome: 'LINHAGRO - MATRIZ',
    cidade: 'Linhares',
    estado: 'ES',
    endereco: 'Rua Samuel Batista Cruz, 2959 - Nossa Senhora da Conceição',
    coordenadas: [-19.383869647660646, -40.067497604698]
  },
  {
    nome: 'LINHAGRO JAGUARÉ',
    cidade: 'Jaguare',
    estado: 'ES',
    endereco: 'Rua Nove de Agosto, 2857 - Centro',
    coordenadas: [-18.87084281652228, -40.08645601202899]
  },
  {
    nome: 'LINHAGRO RIO BANANAL',
    cidade: 'Rio Bananal',
    estado: 'ES',
    endereco: 'Rua Henrique Gaburro, 446 - Santo Antônio',
    coordenadas: [-19.260898987755045, -40.3333937335372]
  },
  {
    nome: 'LINHAGRO TEIXEIRA DE FREITAS',
    cidade: 'Teixeira de Freitas',
    estado: 'BA',
    endereco: 'Rua Santíssima Trindade, 22 - São José',
    coordenadas: [-17.523468309809783, -39.710360862420465]
  }
];

// Inicializar mapa Leaflet
function inicializarMapa() {
  const centroMapa = [-18.3, -40.1];

  mapa = L.map('mapa').setView(centroMapa, 7);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(mapa);

  adicionarMarcadoresFiliais('todos');
}

// Adicionar marcadores de filiais (apenas logo PNG)
function adicionarMarcadoresFiliais(estadoFiltro) {
  // Limpa todas camadas exceto tile layer
  mapa.eachLayer(layer => {
    if (!(layer instanceof L.TileLayer)) {
      mapa.removeLayer(layer);
    }
  });

  const filiaisFiltradas =
    estadoFiltro === 'todos'
      ? filiais
      : filiais.filter(f => f.estado === estadoFiltro);

  const markers = [];

  filiaisFiltradas.forEach(filial => {
    const iconeFilial = L.divIcon({
      html:
        '<div class="marker-filial">' +
          '<img src="../assets/imagens/logo-white.png" alt="Linhagro">' +
        '</div>',
      className: 'custom-marker-filial',
      iconSize: [50, 50],
      iconAnchor: [25, 50]
    });

    const popupHTML =
      '<div class="popup-consultor">' +
      '<div class="popup-nome">' + filial.nome + '</div>' +
      '<div class="popup-info">' +
      '<span><i class="fas fa-map-marker-alt"></i> ' + filial.endereco + '</span>' +
      '<span><i class="fas fa-city"></i> ' + filial.cidade + ' - ' + filial.estado + '</span>' +
      '</div>' +
      '</div>';

    const marker = L.marker(filial.coordenadas, { icon: iconeFilial })
      .addTo(mapa)
      .bindPopup(popupHTML);

    markers.push(marker);
  });

  if (markers.length > 0) {
    const grupo = L.featureGroup(markers);
    mapa.fitBounds(grupo.getBounds().pad(0.2));
  }
}

// Filtros (filtram as filiais por estado)
function setupFiltros() {
  const filtros = document.querySelectorAll('.filtro-btn');

  filtros.forEach(filtro => {
    filtro.addEventListener('click', () => {
      filtros.forEach(f => f.classList.remove('active'));
      filtro.classList.add('active');

      const estado = filtro.dataset.estado;
      adicionarMarcadoresFiliais(estado);
    });
  });
}

// Animar estatísticas
function animarStats() {
  const stats = document.querySelectorAll('.stat-numero');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stat = entry.target;
        const target = parseInt(stat.dataset.target, 10);
        const sufixo = stat.dataset.sufixo || '';
        let current = 0;
        const increment = target / 50;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            stat.textContent = target + sufixo;
            clearInterval(timer);
          } else {
            stat.textContent = Math.floor(current) + sufixo;
          }
        }, 30);

        observer.unobserve(stat);
      }
    });
  });

  stats.forEach(stat => observer.observe(stat));
}

// WhatsApp floating message (balão rotativo)
function initFloatingWhatsappMessage() {
  const messageEl = document.querySelector('.whatsapp-floating-message');
  if (!messageEl) return;

  const mensagens = [
    'Fale com um consultor<br>da sua região',
    'Clique aqui e fale<br>com a Linhagro',
    'Envie suas dúvidas<br>pelo WhatsApp',
    'Vamos construir juntos<br>sua estratégia no campo'
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
// ============================================
// PÁGINA RESULTADOS - LINHAGRO
// ============================================

console.log('🚀 Página Resultados iniciada');

// Aguarda o carregamento do header/footer
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initResultados();
  }, 100);
});

function initResultados() {
  console.log('✅ Inicializando resultados...');

  // Marca o link ativo no menu
  marcarNavAtivo();

  // Renderiza conteúdo dinâmico
  renderizarDepoimentos();
  renderizarCases();

  // Anima os números das estatísticas
  animarEstatisticas();

  console.log('✅ Resultados carregados!');
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

  const options = {
    threshold: 0.3
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const valorFinal = parseInt(el.getAttribute('data-valor'), 10) || 0;
      const sufixo = el.getAttribute('data-sufixo') || '';
      const format = el.getAttribute('data-format') || '';
      const duracao = 1500; // ms
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
  }, options);

  numeros.forEach(num => observer.observe(num));
}

// ============================================
// BANCO DE DADOS - DEPOIMENTOS
// ============================================
const depoimentos = [
  {
    texto: "Com os produtos da Linhagro, conseguimos aumentar em 40% a produtividade do café. O suporte técnico é excepcional e sempre estão disponíveis para tirar dúvidas.",
    autor: "João Silva",
    cargo: "Produtor de Café",
    local: "Espírito Santo",
    inicial: "J",
    rating: 5
  },
  {
    texto: "Utilizamos os biofertilizantes há 3 anos e os resultados são impressionantes. Solo mais saudável, plantas mais vigorosas e redução de custos com defensivos.",
    autor: "Maria Santos",
    cargo: "Engenheira Agrônoma",
    local: "Minas Gerais",
    inicial: "M",
    rating: 5
  },
  {
    texto: "A qualidade dos produtos é excelente. Notamos diferença já na primeira safra. A equipe técnica é muito capacitada e sempre nos orienta da melhor forma.",
    autor: "Carlos Oliveira",
    cargo: "Produtor Rural",
    local: "São Paulo",
    inicial: "C",
    rating: 5
  },
  {
    texto: "Parceria de longa data com a Linhagro. Confiamos nos produtos e no atendimento. Já recomendei para vários produtores da região.",
    autor: "Ana Costa",
    cargo: "Produtora de Hortaliças",
    local: "Rio de Janeiro",
    inicial: "A",
    rating: 5
  },
  {
    texto: "Os condicionadores de solo transformaram nossa produção. Conseguimos recuperar áreas degradadas e aumentar significativamente a produtividade.",
    autor: "Pedro Almeida",
    cargo: "Fazendeiro",
    local: "Bahia",
    inicial: "P",
    rating: 5
  },
  {
    texto: "Excelente custo-benefício. Os produtos entregam o que prometem. Estamos muito satisfeitos com os resultados obtidos.",
    autor: "Lucia Fernandes",
    cargo: "Produtora Orgânica",
    local: "Espírito Santo",
    inicial: "L",
    rating: 5
  }
];

// ============================================
// BANCO DE DADOS - CASES
// ============================================
const cases = [
  {
    titulo: "Café Arábica Premium",
    local: "Espírito Santo",
    icone: "fa-coffee",
    descricao: "Implementação de programa nutricional completo resultou em grãos de maior qualidade e produtividade excepcional.",
    resultados: [
      { valor: "+42%", label: "Produtividade" },
      { valor: "15%", label: "Melhor Qualidade" }
    ]
  },
  {
    titulo: "Hortaliças Orgânicas",
    local: "Minas Gerais",
    icone: "fa-carrot",
    descricao: "Uso de biofertilizantes e manejo sustentável garantiu certificação orgânica e aumento expressivo nas vendas.",
    resultados: [
      { valor: "+35%", label: "Produção" },
      { valor: "28%", label: "Redução Custos" }
    ]
  },
  {
    titulo: "Milho Híbrido",
    local: "São Paulo",
    icone: "fa-seedling",
    descricao: "Programa de nutrição balanceada com micronutrientes específicos elevou a média de sacas por hectare.",
    resultados: [
      { valor: "+38%", label: "Sacas/ha" },
      { valor: "22%", label: "Lucro Líquido" }
    ]
  },
  {
    titulo: "Cana-de-Açúcar",
    local: "Rio de Janeiro",
    icone: "fa-leaf",
    descricao: "Correção de solo e aplicação de condicionadores recuperou áreas improdutivas e aumentou ATR.",
    resultados: [
      { valor: "+31%", label: "ATR" },
      { valor: "18%", label: "Toneladas/ha" }
    ]
  },
  {
    titulo: "Fruticultura",
    local: "Bahia",
    icone: "fa-apple-alt",
    descricao: "Manejo integrado com produtos específicos melhorou calibre, coloração e vida útil pós-colheita das frutas.",
    resultados: [
      { valor: "+45%", label: "Frutas Tipo A" },
      { valor: "25%", label: "Shelf Life" }
    ]
  },
  {
    titulo: "Pastagem Melhorada",
    local: "Espírito Santo",
    icone: "fa-cow",
    descricao: "Recuperação de pastagens degradadas com programa de adubação e correção aumentou capacidade de suporte.",
    resultados: [
      { valor: "+50%", label: "Cap. Suporte" },
      { valor: "33%", label: "Ganho Peso" }
    ]
  }
];

// ============================================
// RENDERIZAR DEPOIMENTOS
// ============================================
function renderizarDepoimentos() {
  const grid = document.getElementById('testimonials-grid');
  if (!grid) return;

  grid.innerHTML = depoimentos
    .map(
      d => `
      <article class="testimonial-card">
        <i class="fas fa-quote-right quote-icon"></i>
        <p class="testimonial-text">"${d.texto}"</p>
        <div class="testimonial-author">
          <div class="author-avatar">${d.inicial}</div>
          <div class="author-info">
            <h4>${d.autor}</h4>
            <p>${d.cargo} • ${d.local}</p>
            <div class="rating">
              ${'<i class="fas fa-star"></i>'.repeat(d.rating)}
            </div>
          </div>
        </div>
      </article>
    `
    )
    .join('');
}

// ============================================
// RENDERIZAR CASES
// ============================================
function renderizarCases() {
  const grid = document.getElementById('cases-grid');
  if (!grid) return;

  grid.innerHTML = cases
    .map(
      c => `
      <article class="case-card">
        <div class="case-image">
          <i class="fas ${c.icone}"></i>
        </div>
        <div class="case-content">
          <h3 class="case-title">${c.titulo}</h3>
          <p class="case-location">
            <i class="fas fa-map-marker-alt"></i>
            ${c.local}
          </p>
          <p class="case-description">${c.descricao}</p>
          <div class="case-results">
            ${c.resultados
              .map(
                r => `
              <div class="result-item">
                <div class="result-value">${r.valor}</div>
                <div class="result-label">${r.label}</div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      </article>
    `
    )
    .join('');
}

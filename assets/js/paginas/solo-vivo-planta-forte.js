// PÁGINA SOLO VIVO, PLANTA FORTE

document.addEventListener('componentsLoaded', () => {
  marcarNavSoloVivo();
  initFloatingWhatsappMessageSolo();
});

function marcarNavSoloVivo() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    if (link.textContent.includes('Solo Vivo')) {
      link.classList.add('active');
    }
  });
}

// Reuso da lógica de balão do WhatsApp
function initFloatingWhatsappMessageSolo() {
  const messageEl = document.querySelector('.whatsapp-floating-message');
  if (!messageEl) return;

  const mensagens = [
    'Fale com um consultor<br>sobre manejo de solo',
    'Quer construir um solo<br>mais vivo e produtivo?',
    'Tire dúvidas do programa<br>Solo Vivo, Planta Forte',
    'Vamos planejar o manejo<br>da sua lavoura?'
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
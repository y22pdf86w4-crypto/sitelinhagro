// ============================================
// TRABALHE CONOSCO - LINHAGRO
// ============================================

// Marca nav ativo (ajuste se tiver link específico no menu)
function marcarNavAtivo() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.textContent.includes('Trabalhe')) {
      link.classList.add('active');
    }
  });
}

// Envio AJAX para Formspree
function setupFormTrabalhe() {
  const form = document.getElementById('trabalhe-form');
  const successBox = document.getElementById('form-sucesso');
  const errorBox = document.getElementById('form-erro');

  if (!form || !successBox || !errorBox) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('.form-submit');
    if (!btn) return;

    const originalBtnHTML = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Enviando...</span>';

    successBox.style.display = 'none';
    errorBox.style.display = 'none';

    try {
      const formData = new FormData(form);

      const response = await fetch(form.action, {
        method: form.method || 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        successBox.style.display = 'flex';
        errorBox.style.display = 'none';
        form.reset();
        successBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        errorBox.style.display = 'flex';
        successBox.style.display = 'none';
        errorBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (err) {
      errorBox.style.display = 'flex';
      successBox.style.display = 'none';
      errorBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } finally {
      btn.disabled = false;
      btn.innerHTML = originalBtnHTML;
    }
  });
}

// WhatsApp floating message
function initFloatingWhatsappMessage() {
  const messageEl = document.querySelector('.whatsapp-floating-message');
  if (!messageEl) return;

  const mensagens = [
    'Tem interesse em trabalhar<br>com a Linhagro?',
    'Clique aqui e fale<br>com nosso time de RH',
    'Envie suas dúvidas<br>pelo WhatsApp',
    'Vamos conversar sobre<br>sua próxima oportunidade?'
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

document.addEventListener('DOMContentLoaded', () => {
  marcarNavAtivo();
  setupFormTrabalhe();
  initFloatingWhatsappMessage();
});
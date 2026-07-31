/**
 * Lector newsletter — inscrição pelo rodapé (e demais blocos marcados)
 *
 * Include: <script src="/shared/newsletter.js" data-base=""></script>
 *
 * Marcação esperada:
 *   <form data-newsletter data-newsletter-origem="rodape">
 *     <input type="email" name="email" required placeholder="seu@email.com">
 *     <button type="submit">…</button>
 *   </form>
 *
 * Envia POST /api/newsletter → e-mail para EMAIL_TO avisando quem se inscreveu.
 * Usa delegação no document para sobreviver a re-renders do runtime .dc.html.
 */
(function () {
  if (window.__LectorNewsletter) return;

  var script =
    document.currentScript ||
    document.querySelector('script[src*="newsletter.js"]');
  var baseAttr = script ? script.getAttribute('data-base') : null;
  var base = baseAttr != null ? String(baseAttr) : '';
  base = base.replace(/\/$/, '');

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var MSG_ATTR = 'data-newsletter-msg';

  function messageEl(form) {
    var el = form.querySelector('[' + MSG_ATTR + ']');
    if (el) return el;
    el = document.createElement('div');
    el.setAttribute(MSG_ATTR, '');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.style.cssText =
      'flex-basis:100%;font-size:13px;line-height:1.45;margin-top:10px;';
    form.appendChild(el);
    return el;
  }

  function say(form, text, tone) {
    var el = messageEl(form);
    el.textContent = text;
    el.style.color =
      tone === 'error' ? '#ff9a8b' : tone === 'success' ? '#7ee2b8' : 'inherit';
  }

  function submit(form) {
    if (!form || form.getAttribute('data-newsletter-busy') === '1') return;

    var input =
      form.querySelector('input[name="email"]') ||
      form.querySelector('input[type="email"]') ||
      form.querySelector('input');
    var email = input ? String(input.value || '').trim() : '';

    if (!EMAIL_RE.test(email)) {
      say(form, 'Informe um e-mail válido.', 'error');
      if (input) input.focus();
      return;
    }

    var button = form.querySelector('button[type="submit"], button');
    form.setAttribute('data-newsletter-busy', '1');
    if (button) {
      button.disabled = true;
      button.style.opacity = '.6';
    }
    say(form, 'Enviando…', 'neutral');

    var honeypot = form.querySelector('input[name="website"]');

    fetch(base + '/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        origem: form.getAttribute('data-newsletter-origem') || 'newsletter',
        pagina: window.location.pathname,
        website: honeypot ? honeypot.value : '',
      }),
    })
      .then(function (r) {
        return r.json().then(function (data) {
          return { ok: r.ok && data.ok };
        });
      })
      .then(function (result) {
        if (!result.ok) throw new Error('send_failed');
        say(form, 'Pronto! Você receberá nossas novidades em breve.', 'success');
        if (input) input.value = '';
      })
      .catch(function () {
        say(
          form,
          'Não foi possível inscrever agora. Tente novamente em instantes.',
          'error'
        );
      })
      .finally(function () {
        form.removeAttribute('data-newsletter-busy');
        if (button) {
          button.disabled = false;
          button.style.opacity = '';
        }
      });
  }

  document.addEventListener(
    'submit',
    function (e) {
      var form = e.target && e.target.closest && e.target.closest('[data-newsletter]');
      if (!form) return;
      e.preventDefault();
      submit(form);
    },
    true
  );

  window.__LectorNewsletter = { submit: submit };
})();

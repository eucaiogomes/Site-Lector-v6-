/**
 * Lector lead form modal
 * - Include: <link rel="stylesheet" href="../../shared/lead-form.css">
 *            <script src="../../shared/lead-form.js" data-base="../.."></script>
 * - Open: any clickable with data-open-lead (optional data-lead-interest="...")
 * - Also opens for #contato / #cta hash and announcement diagnostic CTA
 */
(function () {
  if (window.__LectorLeadForm) return;

  var script =
    document.currentScript ||
    document.querySelector('script[src*="lead-form.js"]');
  var base = (script && script.getAttribute('data-base')) || '';
  if (!base && script) {
    var src = script.getAttribute('src') || script.src || '';
    // .../shared/lead-form.js → site root (relative to page)
    base = src.replace(/\/?shared\/lead-form\.js(?:\?.*)?$/i, '') || '../..';
  }
  if (!base) base = '../..';
  base = base.replace(/\/$/, '');
  var logoSrc = base + '/assets/brand/logo-lector.svg';

  var root = null;
  var form = null;
  var firstField = null;
  var lastFocus = null;

  function icons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  function ensure() {
    if (root) return root;

    root = document.createElement('div');
    root.className = 'lk-lead-root';
    root.setAttribute('aria-hidden', 'true');
    root.innerHTML =
      '<button type="button" class="lk-lead-backdrop" data-lead-close aria-label="Fechar formulário"></button>' +
      '<div class="lk-lead-dialog" role="dialog" aria-modal="true" aria-labelledby="lk-lead-title">' +
      '  <button type="button" class="lk-lead-close" data-lead-close aria-label="Fechar">' +
      '    <i data-lucide="x"></i>' +
      '  </button>' +
      '  <aside class="lk-lead-aside" aria-hidden="false">' +
      '    <img class="lk-lead-aside__orbit" src="' +
      base +
      '/assets/brand/orbit.svg" alt="">' +
      '    <div class="lk-lead-aside__inner">' +
      '      <img class="lk-lead-aside__logo" src="' +
      logoSrc +
      '" alt="Lector" width="140" height="28">' +
      '      <div class="lk-lead-aside__eyebrow"><i data-lucide="sparkles"></i> Fale com a Lector</div>' +
      '      <h2 id="lk-lead-title">Vamos montar o <em>próximo passo</em> com você.</h2>' +
      '      <p class="lk-lead-aside__lead">Conte o desafio da sua empresa. Um especialista responde com uma proposta alinhada ao seu contexto de T&amp;D.</p>' +
      '      <ul class="lk-lead-aside__list">' +
      '        <li><span><i data-lucide="check"></i></span>Diagnóstico e demonstração sob medida</li>' +
      '        <li><span><i data-lucide="check"></i></span>Resposta em horário comercial</li>' +
      '        <li><span><i data-lucide="check"></i></span>Sem compromisso de contratação</li>' +
      '      </ul>' +
      '    </div>' +
      '  </aside>' +
      '  <div class="lk-lead-main">' +
      '    <div class="lk-lead-main__head">' +
      '      <h3>Agende uma conversa</h3>' +
      '      <p>Preencha os dados abaixo. Usamos só para entrar em contato com você.</p>' +
      '    </div>' +
      '    <form class="lk-lead-form" novalidate>' +
      '      <div class="lk-lead-row">' +
      '        <div class="lk-lead-field">' +
      '          <label for="lk-lead-nome">Nome</label>' +
      '          <input id="lk-lead-nome" name="nome" type="text" required autocomplete="name" placeholder="Seu nome">' +
      '        </div>' +
      '        <div class="lk-lead-field">' +
      '          <label for="lk-lead-empresa">Empresa</label>' +
      '          <input id="lk-lead-empresa" name="empresa" type="text" required autocomplete="organization" placeholder="Nome da empresa">' +
      '        </div>' +
      '      </div>' +
      '      <div class="lk-lead-row">' +
      '        <div class="lk-lead-field">' +
      '          <label for="lk-lead-email">E-mail corporativo</label>' +
      '          <input id="lk-lead-email" name="email" type="email" required autocomplete="email" placeholder="voce@empresa.com.br">' +
      '        </div>' +
      '        <div class="lk-lead-field">' +
      '          <label for="lk-lead-tel">Telefone / WhatsApp</label>' +
      '          <input id="lk-lead-tel" name="telefone" type="tel" autocomplete="tel" placeholder="(00) 00000-0000">' +
      '        </div>' +
      '      </div>' +
      '      <div class="lk-lead-field">' +
      '        <label for="lk-lead-interesse">Interesse</label>' +
      '        <select id="lk-lead-interesse" name="interesse">' +
      '          <option value="demonstracao">Agendar demonstração</option>' +
      '          <option value="especialista">Falar com especialista</option>' +
      '          <option value="diagnostico">Diagnóstico de maturidade T&amp;D</option>' +
      '          <option value="conteudo">Criação de conteúdo sob demanda</option>' +
      '          <option value="nr1">Solução NR-1</option>' +
      '          <option value="vendas">Copiloto de Vendas</option>' +
      '          <option value="servicos">Serviços Especializados</option>' +
      '          <option value="outro">Outro assunto</option>' +
      '        </select>' +
      '      </div>' +
      '      <div class="lk-lead-field">' +
      '        <label for="lk-lead-msg">Mensagem <span style="font-weight:500;text-transform:none;letter-spacing:0;opacity:.7">(opcional)</span></label>' +
      '        <textarea id="lk-lead-msg" name="mensagem" placeholder="Conte um pouco do desafio da sua empresa"></textarea>' +
      '      </div>' +
      '      <button type="submit" class="lk-lead-submit">' +
      '        Enviar e falar com especialista' +
      '        <i data-lucide="arrow-right"></i>' +
      '      </button>' +
      '      <p class="lk-lead-msg" data-lead-msg hidden></p>' +
      '      <p class="lk-lead-note">Ao enviar, você concorda em ser contatado pela equipe Lector. Não enviamos spam.</p>' +
      '    </form>' +
      '    <div class="lk-lead-success" role="status">' +
      '      <div class="lk-lead-success__icon" aria-hidden="true"><i data-lucide="check"></i></div>' +
      '      <h3>Recebemos seu pedido</h3>' +
      '      <p>Obrigado. Em breve um especialista Lector entra em contato no e-mail ou telefone informados.</p>' +
      '      <button type="button" data-lead-close>Fechar</button>' +
      '    </div>' +
      '  </div>' +
      '</div>';

    document.body.appendChild(root);
    form = root.querySelector('.lk-lead-form');
    firstField = root.querySelector('#lk-lead-nome');

    root.querySelectorAll('[data-lead-close]').forEach(function (el) {
      el.addEventListener('click', close);
    });

    form.addEventListener('submit', onSubmit);
    document.addEventListener('keydown', onKey);

    icons();
    return root;
  }

  function open(opts) {
    opts = opts || {};
    ensure();
    lastFocus = document.activeElement;
    root.classList.remove('is-success');
    root.classList.add('is-open');
    root.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lk-lead-open');

    if (form) {
      var msg = form.querySelector('[data-lead-msg]');
      if (msg) {
        msg.hidden = true;
        msg.textContent = '';
        msg.classList.remove('is-error');
      }
    }

    var interest = opts.interest || '';
    var select = root.querySelector('#lk-lead-interesse');
    if (select && interest) {
      var found = Array.prototype.some.call(select.options, function (o) {
        return o.value === interest;
      });
      if (found) select.value = interest;
    }

    icons();
    setTimeout(function () {
      if (firstField) firstField.focus();
    }, 40);
  }

  function close() {
    if (!root) return;
    root.classList.remove('is-open');
    root.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lk-lead-open');
    if (lastFocus && typeof lastFocus.focus === 'function') {
      try {
        lastFocus.focus();
      } catch (e) {}
    }
  }

  function onKey(e) {
    if (!root || !root.classList.contains('is-open')) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    var fd = new FormData(form);
    var nome = String(fd.get('nome') || '').trim();
    var email = String(fd.get('email') || '').trim();
    var empresa = String(fd.get('empresa') || '').trim();
    var msgEl = form.querySelector('[data-lead-msg]');

    if (!nome || !email || !empresa) {
      if (msgEl) {
        msgEl.hidden = false;
        msgEl.textContent = 'Preencha nome, e-mail e empresa para continuar.';
        msgEl.classList.add('is-error');
      }
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (msgEl) {
        msgEl.hidden = false;
        msgEl.textContent = 'Informe um e-mail válido.';
        msgEl.classList.add('is-error');
      }
      return;
    }

    // Placeholder de envio — trocar por endpoint real quando existir
    try {
      console.info('[Lector lead]', Object.fromEntries(fd.entries()));
    } catch (err) {}

    root.classList.add('is-success');
    form.reset();
    icons();
  }

  function interestFromEl(el) {
    if (!el) return '';
    var d = el.getAttribute('data-lead-interest');
    if (d) return d;
    var t = (el.textContent || '').toLowerCase();
    if (t.indexOf('diagnóst') !== -1 || t.indexOf('diagnost') !== -1) return 'diagnostico';
    if (t.indexOf('demonstr') !== -1) return 'demonstracao';
    if (t.indexOf('vendas') !== -1 || t.indexOf('copiloto') !== -1) return 'vendas';
    if (t.indexOf('nr-1') !== -1 || t.indexOf('nr1') !== -1) return 'nr1';
    if (t.indexOf('conteúdo') !== -1 || t.indexOf('conteudo') !== -1) return 'conteudo';
    if (t.indexOf('especialista') !== -1) return 'especialista';
    return 'demonstracao';
  }

  function isLeadTrigger(el) {
    if (!el || el.nodeType !== 1) return false;
    if (el.closest('[data-lead-close]')) return false;
    if (el.closest('.lk-lead-root')) return false;
    if (el.closest('.lk-announce-close')) return false;

    // Explicit open
    var marked = el.closest('[data-open-lead]');
    if (marked) return marked;

    // Announcement marquee → diagnóstico
    if (el.closest('.lk-announce') && !el.closest('.lk-announce-close')) {
      return el.closest('.lk-announce') || el;
    }

    var a = el.closest('a, button');
    if (!a) return false;

    // Don't hijack real page forms (submit stays local)
    if (a.closest('form') && !a.hasAttribute('data-open-lead')) return false;

    if (a.hasAttribute('data-no-lead')) return false;

    var href = (a.getAttribute('href') || '').trim();
    if (
      href === '#contato' ||
      href === '#cta' ||
      href.endsWith('#contato') ||
      href.endsWith('#cta')
    ) {
      return a;
    }

    if (
      a.classList.contains('lk-hero-cta') ||
      a.classList.contains('lk-ia__btn-primary') ||
      a.classList.contains('lk-spotlight__btn-primary') ||
      a.classList.contains('lec-nav-cta__solid') ||
      a.classList.contains('nr-btn--primary') ||
      a.classList.contains('pl-btn--primary') ||
      a.classList.contains('pl-btn--navy') ||
      a.classList.contains('pl-btn--outline') ||
      a.classList.contains('cv-btn--primary')
    ) {
      return a;
    }

    var t = (a.textContent || '').toLowerCase().replace(/\s+/g, ' ');
    if (
      t.indexOf('agendar demonstr') !== -1 ||
      t.indexOf('falar com especialista') !== -1 ||
      t.indexOf('falar com vendas') !== -1 ||
      t.indexOf('fazer diagnóstico') !== -1 ||
      t.indexOf('fazer diagnostico') !== -1 ||
      t.indexOf('solicitar orçamento') !== -1 ||
      t.indexOf('solicitar orcamento') !== -1 ||
      t.indexOf('quero meu diagnóstico') !== -1 ||
      t.indexOf('quero meu diagnostico') !== -1
    ) {
      return a;
    }

    return false;
  }

  document.addEventListener(
    'click',
    function (e) {
      var el = e.target;
      if (!el || !el.closest) return;
      var trigger = isLeadTrigger(el);
      if (!trigger) return;

      // allow real external navigation if explicitly external without lead intent
      var href = (trigger.getAttribute && trigger.getAttribute('href')) || '';
      href = String(href).trim();
      if (
        href &&
        /^https?:\/\//i.test(href) &&
        !(trigger.hasAttribute && trigger.hasAttribute('data-open-lead'))
      ) {
        return;
      }

      e.preventDefault();
      open({ interest: interestFromEl(trigger) });
    },
    true
  );

  function maybeOpenFromHash() {
    var h = (location.hash || '').toLowerCase();
    if (h === '#contato' || h === '#cta') {
      open({ interest: h === '#cta' ? 'demonstracao' : 'especialista' });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', maybeOpenFromHash);
  } else {
    maybeOpenFromHash();
  }

  window.addEventListener('hashchange', maybeOpenFromHash);

  window.__LectorLeadForm = { open: open, close: close, ensure: ensure };
})();

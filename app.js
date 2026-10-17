/* Más Una · v3 · Diagnóstico de feria (3 preguntas, live gamificado)
   Lógica documentada en mvp-lima-02 (sección 3) y en la skill diagnostico-landing-masuna. */
(() => {
  'use strict';

  // ============================================
  // CONFIGURACIÓN
  // ============================================
  const FORMSPREE_URL = 'https://formspree.io/f/xpqnlpql';
  const GUIDES = {
    B: { title: '¿Catálogo o comunidad?', url: 'https://drive.google.com/file/d/1UqnxvLVxy7wylFxY6UgcwrRwkthUH4f2/view', who: 'Si ya haces lives' },
    C: { title: 'Tus primeros 90 días en live', url: 'https://drive.google.com/file/d/1FeFsDiQXe_hvS3YBlVEBXr3r-FZWX_mN/view', who: 'Si aún no transmites' },
  };
  const WA_NUMBER = '51934151082';
  const EMAIL = 'consultoramasuna@gmail.com';
  const STORE_KEY = 'masuna-diag-v3';

  const params = new URLSearchParams(location.search);

  const $ = (s, r = document) => r.querySelector(s);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const wa = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

  // ============================================
  // PREGUNTAS
  // ============================================
  // P1 define la etapa (y la guía). P2 filtra (FUERA) y marca Belleza / Otro.
  // P3 cambia según P1: quien nunca transmitió no puede decir "entran y se van".
  const LEVELS = {
    a: { n: 1, name: 'Arranque', code: 'INICIO', guide: 'C' },
    b: { n: 2, name: 'Prueba', code: 'OPTIMIZACION', guide: 'B' },
    c: { n: 3, name: 'Constancia', code: 'OPTIMIZACION', guide: 'B' },
    d: { n: 4, name: 'Escala', code: 'OPTIMIZACION', guide: 'B' },
  };

  const Q = [
    {
      id: 'P1', q: '¿Ya haces lives?',
      options: [['a', 'Nunca he hecho uno'], ['b', 'A veces, sin constancia'], ['c', 'Seguido, pero no sé cuánto vendo'], ['d', 'Seguido, y lo mido']],
    },
    {
      id: 'P2', q: '¿Qué vendes?', grid: true,
      options: [['ropa', 'Ropa o calzado'], ['hogar', 'Hogar y deco'], ['tec', 'Tecnología y accesorios'], ['alim', 'Alimentos envasados'], ['belleza', 'Belleza y cuidado personal'], ['fuera', 'Comida preparada o servicios'], ['otro', 'Otro: ¿cuál?']],
    },
    {
      id: 'P3', q: '¿Qué te gustaría resolver?',
      options: [['se_van', 'Entran a mi live y se van'], ['no_compran', 'Preguntan y no compran'], ['no_mido', 'No sé cuánto me vende el live'], ['peru', 'Quiero vender a todo el Perú']],
      startOptions: [['empezar', 'No sé por dónde empezar'], ['peru', 'Quiero vender a todo el Perú'], ['pauta', 'La publicidad me sale cara'], ['medir', 'No sé si el live me va a vender']],
    },
  ];
  const optionsFor = (q) => (q.startOptions && answers.P1 === 'a' ? q.startOptions : q.options);
  const labelOf = (id) => {
    const q = Q.find((x) => x.id === id);
    const o = [...q.options, ...(q.startOptions || [])].find(([k]) => k === answers[id]);
    return o ? o[1] : '';
  };

  // Frase del comentario fijado en el resultado, según P3
  const P3_LINES = {
    se_van: 'Si la gente se va en segundos, el algoritmo deja de mostrarte. Tu guía te dice qué hacer frente a la cámara para que se queden.',
    no_compran: 'Las preguntas del chat ya son ventas. Solo falta que alguien las siga cuando el live termina.',
    no_mido: 'Lo que no se mide no se mejora. Te mostramos cómo medir el live como a una vendedora.',
    peru: 'El live te muestra a todo el país sin pauta. Falta el sistema para cerrar y enviar esas ventas.',
    empezar: 'Empezar bien vale más que empezar rápido. Tus primeros 90 días, paso a paso.',
    pauta: 'El live te pone frente a gente nueva de todo el Perú sin pagar pauta.',
    medir: 'Antes de invertir horas, define cómo vas a saber si el live vende. Tu guía te dice cómo.',
  };
  // Línea del puente a la parte 2, según P3
  const BRIDGE_LINES = {
    se_van: 'Y cómo logramos que la gente se quede en el live.',
    no_compran: 'Y cómo convertimos preguntas del chat en ventas.',
    no_mido: 'Y cómo medimos cada sol que vende el live.',
    peru: 'Y cómo el 90% de esas ventas se envió a otras ciudades.',
    empezar: 'Y por dónde empezar el tuyo.',
    pauta: 'Con 82% del tráfico sin pagar pauta.',
    medir: 'Y cómo medimos cada sol que vende el live.',
  };
  // Parte 2: dolor → solución. El que eligió en P3 va primero.
  const FIXES = [
    { key: ['se_van', 'empezar'], pain: 'Entran a mi live y se van en segundos', sol: 'Una host que conversa, no que lee la ficha', txt: 'La entrenamos para enseñar y conversar. El algoritmo premia lo que retiene y te muestra a más gente.', data: 'Retención de 52,5 s a 68,5 s tras la mentoría' },
    { key: ['no_compran'], pain: 'Preguntan precios y desaparecen', sol: 'Que el live no termine en el live', txt: 'Quien pregunta pasa a WhatsApp y queda registrado con su número. Un bot con IA le responde catálogo y precios a cualquier hora.', data: 'Cada pregunta queda como un lead' },
    { key: ['no_mido', 'medir'], pain: 'No sé cuánto me vende el live', sol: 'Mide el live como a una vendedora', txt: 'Un código exclusivo del live marca cada venta, aunque se cierre por WhatsApp o en tu tienda.', data: 'S/204 por hora de live, medido' },
    { key: ['peru', 'pauta'], pain: 'Solo vendo en mi ciudad y la pauta es cara', sol: 'El algoritmo te lleva a todo el Perú', txt: 'TikTok muestra tu live a gente nueva de todo el país sin pagar pauta. El courier hace el resto.', data: '82% del tráfico sin pauta · 90% de envíos a otras ciudades' },
    { key: [], pain: 'Me compran una vez y no vuelven', sol: 'Una comunidad que vuelve al live', txt: 'Un grupo de WhatsApp con avisos y promos exclusivas lleva a tus clientas de vuelta al live y a comprar otra vez.', data: 'La venta que se repite' },
  ];

  // ============================================
  // ESTADO
  // ============================================
  const answers = {};
  let otroText = '';
  const contact = { nombre: '', empresa: '', whatsapp: '', ok: false };
  let step = 0; // 0 portada · 1-3 preguntas · 4 resultado · 5 listo · -1 fuera

  const live = $('#live');
  const stage = $('[data-stage]');
  const chat = $('[data-chat]');
  const goal = $('[data-goal]');
  const goalN = $('[data-goal-n]');
  const gift = $('[data-gift]');
  const sistema = $('[data-sistema]');

  const level = () => LEVELS[answers.P1] || LEVELS.b;
  const guide = () => GUIDES[level().guide];
  const canCall = () => answers.P2 !== 'belleza';

  // ============================================
  // EFECTOS DEL LIVE
  // ============================================
  const HEART = '<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.4 2.9 4.5 6.6 4.5c2.1 0 3.6 1.1 5.4 3 1.8-1.9 3.3-3 5.4-3 3.7 0 5.7 3.9 4.2 7.2C19.5 16.4 12 21 12 21Z"/></svg>';
  const HEART_COLORS = ['#c96ce1', '#d10051', '#dfcbfc', '#f6d0dd', '#b19ed6'];
  const hearts = $('[data-hearts]');
  const burst = (n = 6) => {
    if (reduced) return;
    for (let i = 0; i < n; i++) {
      setTimeout(() => {
        const h = document.createElement('span');
        h.className = 'heart';
        h.innerHTML = HEART;
        h.style.setProperty('--dx', `${Math.round(Math.random() * 60 - 45)}px`);
        h.style.setProperty('--rot', `${Math.round(Math.random() * 40 - 20)}deg`);
        h.querySelector('path').style.fill = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];
        hearts.appendChild(h);
        setTimeout(() => h.remove(), 1700);
      }, i * 90);
    }
  };

  let likes = 0;
  const likesEl = $('[data-likes]');
  $('[data-like]').addEventListener('click', () => { likes += 1; likesEl.textContent = likes; burst(3); });

  const say = (who, text, cls = '') => {
    const li = document.createElement('li');
    if (cls) li.className = cls;
    li.innerHTML = who ? `<b>${esc(who)}</b><span>${esc(text)}</span>` : esc(text);
    chat.appendChild(li);
    const items = [...chat.children];
    items.forEach((x, i) => x.classList.toggle('is-old', i < items.length - 2));
    while (chat.children.length > 3) chat.firstElementChild.remove();
  };

  const setGoal = (n) => {
    [...goal.querySelectorAll('.goal-bar span')].forEach((s, i) => s.classList.toggle('on', i < n));
    goalN.textContent = `${n}/3`;
    goal.classList.toggle('is-full', n >= 3);
  };

  const sendGift = () => {
    const g = guide();
    gift.innerHTML = `<img src="img/masuna-isotipo.png" alt=""><span class="gift-t"><b>masuna_consultora</b><span>te envió: Guía ${esc(g.title)}</span></span><span class="gift-book"></span><span class="gift-x">x1</span>`;
    gift.classList.remove('is-on'); void gift.offsetWidth; gift.classList.add('is-on');
  };

  // espectadores: se mueve un poco, como en un live real
  const viewersEl = $('[data-viewers]');
  let viewers = 140 + Math.floor(Math.random() * 30);
  viewersEl.textContent = viewers;
  if (!reduced) setInterval(() => { viewers = Math.max(120, viewers + Math.round(Math.random() * 6 - 2)); viewersEl.textContent = viewers; }, 2600);

  // ============================================
  // PANTALLAS
  // ============================================
  const bookHTML = (key, extra = '') => {
    const g = GUIDES[key];
    return `<div class="book book-${key.toLowerCase()} ${extra}"><span class="book-k">Guía</span><span class="book-t">${esc(g.title)}</span><span class="book-for">${esc(g.who)}</span>${extra.includes('is-locked') ? '<span class="lock"><svg viewBox="0 0 24 24"><path d="M7 10V7a5 5 0 0 1 10 0v3h2v12H5V10h2Zm2 0h6V7a3 3 0 0 0-6 0v3Z"/></svg></span>' : ''}</div>`;
  };

  const deep = (on) => live.classList.toggle('is-deep', on);
  const focusHeading = () => { const h = stage.querySelector('h1, h2'); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); } };
  const toStage = () => {
    const top = stage.getBoundingClientRect().top + scrollY - 70;
    if (Math.abs(scrollY - top) > 40 && stage.getBoundingClientRect().top < 0) scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
  };

  function renderIntro() {
    step = 0;
    stage.innerHTML = `
      <div class="intro">
        <h1>¿Tu live <span class="hl">vende</span> o solo muestra?</h1>
        <p class="take">Haz el diagnóstico de <b>3 preguntas</b> y llévate:</p>
        <ul class="shelf" aria-label="Lo que te llevas">
          <li>${bookHTML('C')}</li>
          <li>${bookHTML('B')}</li>
          <li><span class="tag-free">Gratis</span><div class="ticket"><span class="book-k">Pase 1 a 1</span><span class="book-t">30<small>minutos</small></span><span class="book-for">Diagnóstico de tu live con María</span></div></li>
        </ul>
        <p class="shelf-note">Una guía según tu etapa y tu pase a un diagnóstico 1 a 1, si tu negocio califica.</p>
        <button type="button" class="go" data-start>Empezar <small>3 preguntas<br>1 minuto</small></button>
      </div>`;
  }

  function renderQuestion() {
    const q = Q[step - 1];
    const opts = optionsFor(q);
    const sel = answers[q.id];
    const keys = 'ABCDEFG';
    stage.innerHTML = `
      <div class="poll">
        <div class="poll-head"><p class="poll-tag">Encuesta en vivo</p><p class="poll-pts">Pregunta ${step} de 3</p></div>
        <h2>${esc(q.q)}</h2>
        <div class="opts ${q.grid ? 'is-grid' : ''}" role="group" aria-label="${esc(q.q)}">
          ${opts.map(([k, t], i) => `<button type="button" class="opt ${q.grid && i === opts.length - 1 && opts.length % 2 ? 'is-wide' : ''}" data-opt="${k}" aria-pressed="${sel === k}"><span class="opt-k" aria-hidden="true">${keys[i]}</span>${esc(t)}</button>`).join('')}
          ${q.id === 'P2' && sel === 'otro' ? `<div class="otro"><input type="text" data-otro maxlength="60" placeholder="Ej.: juguetes, autopartes…" value="${esc(otroText)}" aria-label="¿Qué vendes?"><button type="button" class="btn-dark" data-otro-next>Listo</button></div>` : ''}
        </div>
        <div class="poll-nav"><button type="button" class="link-btn" data-back>${step === 1 ? 'Volver' : 'Atrás'}</button></div>
      </div>`;
    const inp = $('[data-otro]', stage);
    if (inp) inp.focus();
  }

  function renderResult() {
    step = 4; deep(true);
    const lv = level();
    const g = guide();
    const p3 = answers.P3;
    stage.innerHTML = `
      <div class="result">
        <div class="level" aria-label="Nivel ${lv.n} de 4: ${lv.name}">
          <span class="level-n">${lv.n}<small>/4</small></span>
          <span class="level-meta"><span class="level-name">Nivel ${esc(lv.name)}</span><span class="level-bars">${[1, 2, 3, 4].map((i) => `<span class="${i <= lv.n ? 'on' : ''}"></span>`).join('')}</span></span>
        </div>
        <h2>Tu live está en etapa de <span class="hl">${lv.code === 'INICIO' ? 'inicio' : 'optimización'}</span>.</h2>
        <p class="pinned"><span class="pinned-k"><svg viewBox="0 0 24 24"><path d="M15 3l6 6-3 1-4 4 .5 4.5-1.5 1.5-4-4-5 5-1-1 5-5-4-4 1.5-1.5L10 10l4-4 1-3Z"/></svg>Comentario fijado</span>${esc(P3_LINES[p3] || '')}</p>
        <div class="unlock">
          ${bookHTML(lv.guide, 'is-locked')}
          <p class="unlock-t">Tu guía: ${esc(g.title)}<small>Déjanos tus datos y te la enviamos por WhatsApp.</small></p>
        </div>
        <form class="lead" data-lead novalidate>
          ${field('nombre', 'Tu nombre', 'text', 'given-name', '¿Cómo te llamas?')}
          ${field('empresa', 'Tu empresa o marca', 'text', 'organization', 'Nombre de tu negocio')}
          <div class="field">
            <label for="f-whatsapp">WhatsApp</label>
            <div class="phone"><span>+51</span><input id="f-whatsapp" name="whatsapp" type="tel" inputmode="tel" autocomplete="tel-national" placeholder="999 999 999" value="${esc(contact.whatsapp)}" required></div>
            <span class="err" data-err="whatsapp"></span>
          </div>
          <label class="check"><input type="checkbox" name="ok" ${contact.ok ? 'checked' : ''} required><span>Acepto que Más Una me escriba por WhatsApp para enviarme la guía y contarme sobre el diagnóstico.</span></label>
          <p class="privacy">Responsable: Más Una. Usamos tus datos solo para enviarte la guía y contactarte. Para borrarlos, escribe a ${EMAIL}.</p>
          <span class="err" data-err="ok" style="color:var(--magenta);font-size:.78rem"></span>
          <button type="submit" class="go" data-submit>Enviarme mi guía</button>
          <p class="form-err" data-form-err hidden></p>
        </form>
        <div class="poll-nav"><button type="button" class="link-btn" data-back>Cambiar respuestas</button></div>
      </div>`;
  }

  function field(id, label, type, ac, ph) {
    return `<div class="field"><label for="f-${id}">${label}</label><input id="f-${id}" name="${id}" type="${type}" autocomplete="${ac}" placeholder="${ph}" value="${esc(contact[id])}" required><span class="err" data-err="${id}"></span></div>`;
  }

  // Mensaje prellenado de WhatsApp: María ve de un vistazo quién es y qué entregable enviarle
  const waMsg = (callFirst = false) => {
    const lv = level();
    const g = guide();
    const p2 = answers.P2 === 'otro' ? `Otro: ${otroText.trim()}` : labelOf('P2');
    const want = [`• 📘 Guía ${lv.guide} · "${g.title}"`];
    if (canCall()) want[callFirst ? 'unshift' : 'push']('• 📅 Diagnóstico 1 a 1 de 30 min');
    return [
      `👋 Hola María, soy ${contact.nombre.trim()} de ${contact.empresa.trim()}.`,
      'Hice el diagnóstico de Más Una en la feria.',
      '',
      '🎁 *Quiero recibir:*',
      ...want,
      '',
      '📊 *Mi diagnóstico:*',
      `• 🎯 Etapa: nivel ${lv.n} de 4 · ${lv.code === 'INICIO' ? 'inicio' : 'optimización'}`,
      `• 🛍️ Vendo: ${p2}`,
      `• 🔧 Quiero resolver: ${labelOf('P3')}`,
    ].join('\n');
  };

  function renderDone(sentOk) {
    step = 5; deep(true);
    const g = guide();
    const p3 = answers.P3;
    const name = contact.nombre.trim().split(/\s+/)[0];
    const guideMsg = waMsg();
    const callMsg = waMsg(true);
    stage.innerHTML = `
      <div class="done">
        <h2>Listo, ${esc(name)}. <span class="hl">Tu guía está desbloqueada.</span></h2>
        ${sentOk ? '' : '<p class="done-sub">No pudimos registrar tus datos. Escríbenos por WhatsApp con el botón de abajo y te la enviamos igual.</p>'}
        <div class="unlock">
          ${bookHTML(level().guide)}
          <p class="unlock-t">${esc(g.title)}<small>Te la enviamos por WhatsApp. También puedes descargarla ahora.</small></p>
        </div>
        <div class="actions">
          <a class="btn btn-wa" href="${wa(guideMsg)}" target="_blank" rel="noopener">${WA_ICON}Recibir mi guía por WhatsApp</a>
          <a class="btn btn-ghost" href="${g.url}" target="_blank" rel="noopener">Descargar la guía</a>
          <button type="button" class="btn btn-ghost" data-vcard>Guardar a Más Una en mis contactos</button>
        </div>
        ${canCall() ? `<a class="pass" href="${wa(callMsg)}" target="_blank" rel="noopener"><span class="pass-k">Tu pase · gratis</span><span class="pass-t">Diagnóstico 1 a 1 de 30 min</span><span class="pass-go">Agendar</span></a>` : ''}
        <button type="button" class="bridge" data-open-sistema>
          <span class="bridge-t">Mira el sistema con el que una tienda creció <b>+582%</b> en ventas por live</span>
          <span class="bridge-s">${esc(BRIDGE_LINES[p3] || '')}</span>
          <span class="bridge-go">Ver el sistema <svg viewBox="0 0 24 24"><path d="M12 4v15M5 12l7 7 7-7"/></svg></span>
        </button>
      </div>`;
    renderSistema();
  }

  function renderOut() {
    step = -1; deep(true);
    stage.innerHTML = `
      <div class="out">
        <h2>Por ahora, <span class="hl">el live no es tu mejor canal</span>.</h2>
        <p>Trabajamos con marcas que venden producto físico y lo envían. Para comida preparada o servicios, el sistema no da los mismos resultados y preferimos decírtelo de frente.</p>
        <p>Igual te compartimos ideas en nuestras redes.</p>
        <div class="actions">
          <a class="btn btn-wa" href="https://www.tiktok.com/@masuna_consultora" target="_blank" rel="noopener">Síguenos en TikTok</a>
          <a class="btn btn-ghost" href="https://www.instagram.com/masuna_consultora" target="_blank" rel="noopener">Instagram</a>
        </div>
        <div class="poll-nav"><button type="button" class="link-btn" data-back>Cambiar mi respuesta</button></div>
      </div>`;
  }

  const WA_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>';

  // ============================================
  // PARTE 2
  // ============================================
  function renderSistema() {
    const p3 = answers.P3;
    const sorted = [...FIXES].sort((a, b) => (b.key.includes(p3) ? 1 : 0) - (a.key.includes(p3) ? 1 : 0));
    $('[data-fixes]').innerHTML = sorted.map((f) => {
      const mine = f.key.includes(p3);
      return `<li class="fix ${mine ? 'is-mine' : ''}">
        ${mine ? '<span class="fix-mine-tag">Lo que respondiste</span>' : ''}
        <p class="fix-pain"><i aria-hidden="true">Tú</i>${esc(f.pain)}</p>
        <div class="fix-sol"><b>${esc(f.sol)}</b><p>${esc(f.txt)}</p><span class="fix-data">${esc(f.data)}</span></div>
      </li>`;
    }).join('');
    const callMsg = waMsg(true);
    $('[data-final-cta]').innerHTML = canCall()
      ? `<a class="btn btn-wa" href="${wa(callMsg)}" target="_blank" rel="noopener">${WA_ICON}Agendar mi diagnóstico de 30 min</a>`
      : `<a class="btn btn-wa" href="https://www.tiktok.com/@masuna_consultora" target="_blank" rel="noopener">Síguenos en TikTok</a>`;
  }

  function openSistema(scroll = true) {
    sistema.hidden = false;
    if (scroll) sistema.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-seen'); io.unobserve(e.target); }
    }), { threshold: .35 });
    sistema.querySelectorAll('section').forEach((s) => io.observe(s));
  }

  // ============================================
  // FLUJO
  // ============================================
  const summary = () => {
    const lv = level();
    const tags = [];
    if (answers.P2 === 'belleza') tags.push('[BELLEZA-SIN-LLAMADA]');
    if (answers.P2 === 'otro') tags.push(`[REVISAR] Otro: ${otroText.trim() || 'sin detalle'}`);
    const p2 = answers.P2 === 'otro' ? `Otro: ${otroText.trim()}` : labelOf('P2');
    return `[${lv.code}] ${tags.join(' ')} Fuente: feria (NFC) || P1: ${labelOf('P1')} (nivel ${lv.n}) | P2: ${p2} | P3: ${labelOf('P3')}`.replace(/\s+/g, ' ');
  };

  function go(n) {
    step = n; deep(n >= 4);
    if (n === 0) renderIntro();
    else if (n <= 3) renderQuestion();
    else if (n === 4) renderResult();
    setGoal(n >= 4 ? 3 : Math.max(0, n - 1));
    focusHeading();
    toStage();
  }

  stage.addEventListener('click', (e) => {
    if (e.target.closest('[data-start]')) {
      say('', 'Te uniste al diagnóstico en vivo', 'is-join');
      burst(4);
      go(1);
      return;
    }
    if (e.target.closest('[data-back]')) {
      if (step === -1) { go(2); return; }
      if (step === 4) { go(3); return; }
      go(step - 1);
      return;
    }
    const opt = e.target.closest('[data-opt]');
    if (opt) {
      const q = Q[step - 1];
      answers[q.id] = opt.dataset.opt;
      if (q.id === 'P1' && answers.P3 && !optionsFor(Q[2]).some(([k]) => k === answers.P3)) delete answers.P3;
      stage.querySelectorAll('[data-opt]').forEach((b) => b.setAttribute('aria-pressed', String(b === opt)));
      burst(5);
      if (q.id === 'P2' && answers.P2 === 'otro') { renderQuestion(); return; }
      if (q.id === 'P2' && answers.P2 === 'fuera') { setTimeout(renderOut, reduced ? 0 : 280); return; }
      setGoal(step);
      const reacts = ['¡Anotado! Vamos 1/3', '¡Buena! Ya casi', '¡Listo! Mira tu resultado'];
      say('masuna_consultora', reacts[step - 1]);
      if (step === 3) {
        setTimeout(() => { sendGift(); burst(10); go(4); }, reduced ? 0 : 320);
      } else {
        setTimeout(() => go(step + 1), reduced ? 0 : 320);
      }
      return;
    }
    if (e.target.closest('[data-otro-next]')) {
      const inp = $('[data-otro]', stage);
      otroText = inp.value.trim();
      if (!otroText) { inp.focus(); inp.placeholder = 'Cuéntanos qué vendes'; return; }
      setGoal(2); say('masuna_consultora', '¡Buena! Ya casi'); burst(5);
      go(3);
      return;
    }
    if (e.target.closest('[data-vcard]')) { saveVCard(); return; }
    if (e.target.closest('[data-open-sistema]')) { openSistema(); }
  });

  stage.addEventListener('input', (e) => {
    if (e.target.matches('[data-otro]')) otroText = e.target.value;
    if (e.target.closest('[data-lead]')) {
      const t = e.target;
      if (t.name === 'ok') contact.ok = t.checked;
      else if (t.name in contact) contact[t.name] = t.value;
      const err = $(`[data-err="${t.name}"]`, stage);
      if (err) err.textContent = '';
    }
  });
  stage.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.matches('[data-otro]')) { e.preventDefault(); $('[data-otro-next]', stage).click(); }
  });

  function validate() {
    let ok = true;
    const set = (k, msg) => { const el = $(`[data-err="${k}"]`, stage); if (el) el.textContent = msg; if (msg && ok) { ok = false; const i = stage.querySelector(`[name="${k}"]`); if (i) i.focus(); } };
    set('nombre', contact.nombre.trim().length < 2 ? 'Escribe tu nombre.' : '');
    set('empresa', contact.empresa.trim().length < 2 ? 'Escribe tu empresa o marca.' : '');
    set('whatsapp', contact.whatsapp.replace(/\D/g, '').length < 9 ? 'Revisa tu número: son 9 dígitos.' : '');
    set('ok', contact.ok ? '' : 'Marca la casilla para poder escribirte.');
    return ok;
  }

  stage.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (step !== 4 || !validate()) return;
    const btn = $('[data-submit]', stage);
    btn.disabled = true; btn.textContent = 'Enviando…';
    let sentOk = false;
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          Nombre: contact.nombre.trim(),
          Empresa: contact.empresa.trim(),
          Whatsapp: `+51 ${contact.whatsapp.trim()}`,
          Fuente: 'Feria (NFC)',
          Etapa: level().code,
          Guia: guide().title,
          Experiencia: summary(),
          _subject: `Lead feria: ${contact.empresa.trim()} · ${level().code}`,
        }),
      });
      sentOk = res.ok;
    } catch (err) { console.error('Formspree', err); }
    try { localStorage.setItem(STORE_KEY, JSON.stringify({ answers, otroText, contact: { nombre: contact.nombre, empresa: contact.empresa } })); } catch (err) { /* sin almacenamiento */ }
    burst(12);
    say('masuna_consultora', `¡Gracias, ${contact.nombre.trim().split(/\s+/)[0]}! Tu guía va en camino`);
    renderDone(sentOk);
    focusHeading();
    toStage();
  });

  // ============================================
  // CONTACTO (vCard)
  // ============================================
  function saveVCard() {
    const v = ['BEGIN:VCARD', 'VERSION:3.0', 'N:Una;Más;;;', 'FN:Más Una · Live commerce', 'ORG:Más Una', 'TITLE:Live commerce para marcas peruanas',
      `TEL;TYPE=CELL:+${WA_NUMBER}`, `EMAIL:${EMAIL}`, 'URL:https://www.tiktok.com/@masuna_consultora', 'NOTE:TikTok e Instagram: @masuna_consultora', 'END:VCARD'].join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([v], { type: 'text/vcard' }));
    a.download = 'mas-una.vcf';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  // ============================================
  // INICIO
  // ============================================
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(STORE_KEY) || 'null'); } catch (err) { saved = null; }
  if (saved && saved.answers && saved.answers.P3 && !params.has('nuevo')) {
    // ya dejó sus datos antes (vuelve desde el enlace de WhatsApp): todo desbloqueado
    Object.assign(answers, saved.answers);
    otroText = saved.otroText || '';
    Object.assign(contact, saved.contact || {});
    setGoal(3);
    renderDone(true);
    openSistema(false);
  } else {
    renderIntro();
    setTimeout(() => say('', 'Te uniste al live de masuna_consultora', 'is-join'), reduced ? 0 : 600);
    setTimeout(() => say('masuna_consultora', '¡Hola! Responde 3 preguntas y te llevas tu guía'), reduced ? 0 : 1500);
  }
})();

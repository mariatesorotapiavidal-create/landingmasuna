/* Más Una · Línea Live */
(() => {
  document.documentElement.classList.add('js');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ============================================
  // CONFIGURACIÓN (reemplazar los enlaces de las guías cuando estén en Drive)
  // ============================================
  const FORMSPREE_URL = 'https://formspree.io/f/xpqnlpql';
  const GUIDES = {
    A: null, // Mapa del Ecosistema Live: se envía por WhatsApp hasta tener el enlace
    B: null, // ¿Catálogo o comunidad?: pegar aquí el enlace de Drive cuando esté
    C: null, // Tus primeros 90 días: pegar aquí el enlace de Drive cuando esté
  };
  const WA_NUMBER = '51934151082';
  const WA_TEXT = 'Hola María, hice el diagnóstico de Más Una y quiero agendar mi llamada de 30 minutos. Mi empresa es: ';
  const URL_TIKTOK = 'https://www.tiktok.com/@masuna_consultora';
  const URL_INSTAGRAM = 'https://www.instagram.com/masuna_consultora';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const live = $('[data-live]');

  // ============================================
  // EL LIVE: conectados, chat y corazones
  // ============================================
  let heroVisible = true;
  new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; }).observe(live);

  const viewersEl = $('[data-viewers]');
  let viewers = 612;
  if (!reduced) {
    setInterval(() => {
      if (!heroVisible || document.hidden) return;
      viewers = viewers < 720
        ? Math.min(720, viewers + 2 + Math.round(Math.random() * 8))
        : Math.min(734, Math.max(702, viewers + Math.round(Math.random() * 12) - 6));
      viewersEl.textContent = viewers;
    }, 1600);
  }

  const chatEl = $('[data-chat]');
  const messages = [
    ['rosa_m', '¿hacen envío a Piura?'],
    ['jorge.tienda', '¿cómo mido cuánto vendo en el live?'],
    ['', 'carla.home se unió'],
    ['andrea_mkt', 'eso nos pasa: entran y se van 😅'],
    ['kathy.21', 'yo quiero el set 🙌'],
    ['paola.pets', '¿mañana a qué hora es el live?'],
    ['', 'daniel_s se unió'],
    ['mili', 'quedan 4 unidades 😱'],
    ['fer', 'ya me uní al grupo 💜'],
    ['lucho.hogar', '¿llega a Arequipa?'],
  ];
  let mi = 0;
  const maxChat = () => (window.innerHeight < 720 ? 2 : 3);
  const pushChat = () => {
    const [u, t] = messages[mi++ % messages.length];
    const li = document.createElement('li');
    if (u) { const b = document.createElement('b'); b.textContent = u; li.append(b, t); }
    else { li.className = 'join'; li.textContent = t; }
    chatEl.append(li);
    while (chatEl.children.length > maxChat()) chatEl.firstElementChild.remove();
  };
  for (let i = 0; i < maxChat(); i++) pushChat();
  if (!reduced) setInterval(() => { if (heroVisible && !document.hidden && !live.classList.contains('is-diag')) pushChat(); }, 2400);

  const heartsEl = $('[data-hearts]');
  const colors = ['#c96ce1', '#d10051', '#ffffff', '#dfcbfc'];
  const heart = () => {
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 24 24');
    s.innerHTML = '<path d="M12 21s-7.5-4.6-10-9.4C.4 8.4 2.3 4.5 6 4.5c2.2 0 3.6 1.2 4.4 2.5h3.2c.8-1.3 2.2-2.5 4.4-2.5 3.7 0 5.6 3.9 4 7.1C19.5 16.4 12 21 12 21Z"/>';
    s.style.fill = colors[Math.floor(Math.random() * colors.length)];
    s.style.setProperty('--x', `${Math.round(Math.random() * 40 - 28)}px`);
    s.style.setProperty('--r', `${Math.round(Math.random() * 40 - 20)}deg`);
    s.style.setProperty('--d', `${(2.2 + Math.random() * 1.2).toFixed(2)}s`);
    heartsEl.append(s);
    s.addEventListener('animationend', () => s.remove());
  };
  if (!reduced) {
    setInterval(() => { if (heroVisible && !document.hidden) heart(); }, 850);
    $('.feed').parentElement.addEventListener('dblclick', () => { for (let i = 0; i < 6; i++) setTimeout(heart, i * 70); });
  }

  // ============================================
  // DIAGNÓSTICO
  // ============================================
  const Q = [
    { id: 'P1', text: '¿Cómo está hoy el live en tu negocio?', options: [
      ['a', 'Nunca hemos hecho un live'],
      ['b', 'Hacemos lives de vez en cuando'],
      ['c', 'Seguido, pero no sabemos cuánto vende'],
      ['d', 'Seguido, y medimos la venta'],
    ]},
    { id: 'P2', text: '¿Qué vendes?', options: [
      ['a', 'Producto físico, con envío a todo el Perú'],
      ['b', 'Producto físico, solo en tienda o delivery local'],
      ['c', 'Servicios o productos digitales'],
    ]},
    { id: 'P3', text: '¿En qué rubro estás?', cols: 2, options: [
      ['a', 'Mascotas'], ['b', 'Hogar y decoración'], ['c', 'Suplementos y nutrición'], ['d', 'Tecnología y accesorios'],
      ['e', 'Juguetes'], ['f', 'Joyería y bisutería'], ['g', 'Librería y regalos'], ['h', 'Belleza y cuidado personal'],
      ['i', 'Ropa o calzado'], ['j', 'Alimentos'], ['k', 'Otro'],
    ]},
    { id: 'P4', text: '¿Cuál es tu ticket promedio?', options: [
      ['a', 'Menos de S/50'], ['b', 'S/50 a S/80'], ['c', 'S/80 a S/250'], ['d', 'Más de S/250'],
    ]},
    { id: 'P5', text: '¿Quién ve el marketing de tu negocio?', options: [
      ['a', 'Yo, junto con todo lo demás'], ['b', 'Una persona del equipo'], ['c', 'Un equipo de 2 o más'], ['d', 'Una agencia externa'],
    ]},
    { id: 'P6', text: '¿Cuánto inviertes al mes en pauta?', options: [
      ['a', 'Nada'], ['b', 'Menos de S/1.000'], ['c', 'S/1.000 a S/3.000'], ['d', 'Más de S/3.000'],
    ]},
    { id: 'P7', text: '¿Qué te frena más hoy?', options: [
      ['a', 'No sé cómo empezar'], ['b', 'Entra poca gente'], ['c', 'Entra gente, pero no compra'],
      ['d', 'No sé cuánto vende el live'], ['e', 'Las clientas compran una vez y no vuelven'], ['f', 'No tengo quién transmita'],
    ]},
    { id: 'P8', text: '¿Qué esperas del live?', options: [
      ['a', 'Ventas este mes'], ['b', 'Probar a ver qué pasa'], ['c', 'Construir un canal propio en los próximos 6 a 12 meses'],
    ]},
  ];
  const FORM_STEP = Q.length; // 8
  const RESULT_STEP = Q.length + 1;
  const P7_LINES = {
    a: 'Tu primer paso: elegir un producto estrella y dos días fijos de live.',
    b: 'Tu oportunidad está en el descubrimiento: constancia y temas que retienen.',
    c: 'Tu oportunidad está en la nutrición: que el live no termine en el live.',
    d: 'Tu principal oportunidad: medir cuánto vende tu live, con un código de vendedora exclusivo.',
    e: 'Tu oportunidad está en la recompra: registrar a cada clienta y darle razones para volver.',
    f: 'Tu primer paso: elegir a la persona que va a transmitir, y a una de respaldo.',
  };

  const answers = {};
  const contact = { nombre: '', empresa: '', cargo: '', whatsapp: '', correo: '', ciudad: '' };
  let step = 0;
  const body = $('[data-diag-body]');
  const route = $('[data-route]');
  const form = $('[data-diag-form]');
  const sign = $('#diagnostico');

  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const renderRoute = () => {
    const total = Q.length + 1;
    let html = '';
    for (let i = 0; i < total; i++) {
      const cls = i < step ? 'done' : i === step ? 'now' : '';
      html += `<span class="rs ${cls}"></span>`;
      if (i < total - 1) html += `<span class="rc ${i < step ? 'done' : ''}"></span>`;
    }
    route.innerHTML = html;
  };

  const focusHeading = () => { const h = $('[data-focus]', body); if (h) h.focus({ preventScroll: true }); };

  const renderQuestion = () => {
    const q = Q[step];
    const sel = answers[q.id];
    const first = step === 0 && !live.classList.contains('is-diag');
    body.innerHTML = `
      ${first ? '' : `<p class="sr-only">Pregunta ${step + 1} de ${Q.length}</p>`}
      <h2 class="diag-q" tabindex="-1" data-focus>${esc(q.text)}</h2>
      <div class="opts ${q.cols === 2 ? 'grid-2' : ''}" role="group" aria-label="${esc(q.text)}">
        ${q.options.map(([k, l]) => `<button type="button" class="opt" data-k="${k}" aria-pressed="${sel === k}"><span class="ring" aria-hidden="true"></span><span>${esc(l)}</span></button>`).join('')}
      </div>
      ${first
        ? '<p class="diag-foot">Diagnóstico gratis · 8 preguntas en 5 minutos. Al final recibes una guía para tu etapa.</p>'
        : `<div class="diag-nav"><button type="button" class="link-btn" data-back>${step === 0 ? 'Volver al live' : 'Atrás'}</button>${sel ? '<button type="button" class="btn btn-dark" data-next>Siguiente</button>' : ''}</div>`}
    `;
    $$('.opt', body).forEach((b) => b.addEventListener('click', () => {
      answers[q.id] = b.dataset.k;
      $$('.opt', body).forEach((o) => o.setAttribute('aria-pressed', o === b));
      setTimeout(() => go(step + 1), reduced ? 0 : 260);
    }));
  };

  const renderForm = () => {
    const f = (id, label, type, ac, req, ph = '') => `
      <div class="field" data-field="${id}">
        <label for="f-${id}">${label}${req ? '' : ' <span class="opt-note">(opcional)</span>'}</label>
        <input id="f-${id}" name="${id}" type="${type}" autocomplete="${ac}" value="${esc(contact[id])}" placeholder="${ph}" ${req ? 'required' : ''}>
        <p class="err">${{ nombre: 'Escribe tu nombre.', empresa: 'Escribe el nombre de tu empresa.', whatsapp: 'Escribe un número válido, por ejemplo 999 888 777.', correo: 'Escribe un correo válido.' }[id] || ''}</p>
      </div>`;
    body.innerHTML = `
      <p class="sr-only">Último paso</p>
      <h2 class="diag-q" tabindex="-1" data-focus>¿A dónde te enviamos tu diagnóstico?</h2>
      <div class="fields">
        ${f('nombre', 'Nombre', 'text', 'name', true)}
        ${f('empresa', 'Empresa', 'text', 'organization', true)}
        ${f('cargo', 'Cargo', 'text', 'organization-title', false)}
        ${f('whatsapp', 'WhatsApp', 'tel', 'tel', true, '999 888 777')}
        ${f('correo', 'Correo', 'email', 'email', true, 'tucorreo@empresa.com')}
        ${f('ciudad', 'Ciudad', 'text', 'address-level2', false)}
      </div>
      <div class="diag-nav"><button type="button" class="link-btn" data-back>Atrás</button><button type="submit" class="btn btn-dark" data-submit>Ver mi diagnóstico</button></div>
    `;
    $$('input', body).forEach((i) => i.addEventListener('input', () => { contact[i.name] = i.value; i.closest('.field').classList.remove('bad'); }));
  };

  const validate = () => {
    let first = null;
    const bad = (id, isBad) => { const el = $(`[data-field="${id}"]`, body); el.classList.toggle('bad', isBad); el.querySelector('input').setAttribute('aria-invalid', isBad); if (isBad && !first) first = el.querySelector('input'); };
    bad('nombre', contact.nombre.trim().length < 2);
    bad('empresa', contact.empresa.trim().length < 2);
    bad('whatsapp', !/^\+?\d{6,15}$/.test(contact.whatsapp.replace(/[\s\-()]/g, '')));
    bad('correo', !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.correo.trim()));
    if (first) first.focus();
    return !first;
  };

  const verdict = () => {
    const { P1, P2, P3, P4, P5, P6, P8 } = answers;
    if (P2 === 'c') return { code: 'NO_CALIFICA', summary: 'Servicios o producto digital' };
    if (P2 === 'b') return { code: 'LOCAL', summary: 'Negocio local', guide: 'C' };
    const rubroOk = !['h', 'i'].includes(P3);
    const base = rubroOk && ['c', 'd'].includes(P4) && ['b', 'c', 'd'].includes(P5);
    const p6 = ['c', 'd'].includes(P6);
    const p8 = P8 === 'c';
    if (base && p6 && p8) return { code: 'ECOSISTEMA', summary: 'Lead calificado: ofrecer llamada de 30 minutos', guide: 'A' };
    const tibio = base && (p6 !== p8);
    if (P1 === 'a') return { code: 'INICIO', summary: 'Nunca transmitió', guide: 'C', tibio };
    return { code: 'OPTIMIZACION', summary: 'Ya transmite', guide: 'B', tibio };
  };

  const summaryText = (v) => {
    const labels = Q.map((q) => { const o = q.options.find(([k]) => k === answers[q.id]); return `${q.id}: ${o ? o[1] : '—'}`; }).join(' | ');
    return `[${v.code}]${v.tibio ? ' [TIBIO]' : ''} ${v.summary} || ${labels}`;
  };

  const waLink = () => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_TEXT + contact.empresa.trim())}`;

  const renderResult = (v) => {
    const line = P7_LINES[answers.P7] || '';
    const T = {
      ECOSISTEMA: ['Tu negocio tiene lo necesario para construir un ecosistema live.', 'Te invitamos a una llamada de diagnóstico de 30 minutos: revisamos tus lives, tu equipo y tus números, y te decimos con honestidad si tiene sentido trabajar juntos.'],
      OPTIMIZACION: ['Ya transmites: ahora toca saber si tu live es catálogo o comunidad.', 'Tu guía trae un autodiagnóstico y un plan de 14 días.'],
      INICIO: ['Estás listo para empezar con el pie derecho.', 'Tu guía te acompaña en tus primeros 90 días en TikTok Live.'],
      LOCAL: ['Tu modelo pide un enfoque local.', 'Te dejamos la guía para empezar, con una nota para negocios locales.'],
      NO_CALIFICA: ['Hoy el live no es tu mejor canal.', 'Te dejamos nuestro contenido por si tu modelo cambia.'],
    }[v.code];
    const guideUrl = v.guide ? GUIDES[v.guide] : null;
    let actions = '';
    if (v.code === 'ECOSISTEMA') {
      actions += `<a class="btn btn-dark" href="${waLink()}" target="_blank" rel="noopener">Agendar mi llamada por WhatsApp</a>`;
      actions += guideUrl
        ? `<a class="btn btn-line" href="${guideUrl}" target="_blank" rel="noopener">Descargar el Mapa del Ecosistema Live</a>`
        : '<p class="diag-foot">Te enviaremos el Mapa del Ecosistema Live por WhatsApp.</p>';
    } else if (guideUrl) {
      actions += `<a class="btn btn-dark" href="${guideUrl}" target="_blank" rel="noopener">Descargar mi guía</a>`;
    } else if (v.guide) {
      actions += '<p class="result-line"><strong>Te enviaremos tu guía por WhatsApp.</strong></p>';
    }
    actions += `<p class="diag-foot">Síguenos: <a href="${URL_TIKTOK}" target="_blank" rel="noopener">TikTok</a> · <a href="${URL_INSTAGRAM}" target="_blank" rel="noopener">Instagram</a></p>`;
    body.innerHTML = `
      <p class="sr-only">Tu diagnóstico</p>
      <h2 class="diag-q" tabindex="-1" data-focus>${esc(T[0])}</h2>
      ${line && v.code !== 'NO_CALIFICA' ? `<p class="result-line"><strong>${esc(line)}</strong></p>` : ''}
      <p class="result-line">${esc(T[1])}</p>
      <div class="result-actions">${actions}</div>
      <div class="diag-nav"><button type="button" class="link-btn" data-back-live>Volver al live</button></div>
    `;
  };

  const go = (n, opts = {}) => {
    step = Math.max(0, n);
    if (step > 0 || opts.diag) live.classList.add('is-diag');
    renderRoute();
    if (step < FORM_STEP) renderQuestion();
    else if (step === FORM_STEP) renderForm();
    if (live.classList.contains('is-diag')) {
      const top = sign.getBoundingClientRect().top;
      const head = document.querySelector('[data-head]').offsetHeight;
      if (top < head || top > window.innerHeight * 0.5) window.scrollTo({ top: window.scrollY + top - head - 12, behavior: reduced ? 'auto' : 'smooth' });
      focusHeading();
    }
  };

  const exitDiag = () => { live.classList.remove('is-diag'); route.style.display = ''; step = 0; renderRoute(); renderQuestion(); };

  body.addEventListener('click', (e) => {
    if (e.target.closest('[data-back]')) { if (step === 0) exitDiag(); else go(step - 1); }
    if (e.target.closest('[data-next]')) go(step + 1);
    if (e.target.closest('[data-back-live]')) { Object.keys(answers).forEach((k) => delete answers[k]); exitDiag(); }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (step !== FORM_STEP || !validate()) return;
    const v = verdict();
    const btn = $('[data-submit]', body);
    btn.disabled = true; btn.textContent = 'Enviando…';
    try {
      await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          Nombre: contact.nombre.trim(), Empresa: contact.empresa.trim(), Cargo: contact.cargo.trim(),
          Whatsapp: contact.whatsapp.trim(), Correo: contact.correo.trim(), Ciudad: contact.ciudad.trim(),
          Experiencia: summaryText(v),
        }),
      });
    } catch (err) { console.error('Formspree', err); }
    step = RESULT_STEP; renderRoute(); route.style.display = 'none';
    renderResult(v); focusHeading();
  });

  $$('[data-start-diag]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    const head = document.querySelector('[data-head]').offsetHeight;
    window.scrollTo({ top: window.scrollY + sign.getBoundingClientRect().top - head - 12, behavior: reduced ? 'auto' : 'smooth' });
    setTimeout(() => { const b = $('.opt', body) || $('[data-focus]', body); if (b) b.focus({ preventScroll: true }); }, reduced ? 0 : 500);
  }));

  renderRoute();
  renderQuestion();

  // ============================================
  // SCROLL: la línea, el mapa y el cabezal
  // ============================================
  const list = $('[data-stations]');
  const stations = $$('.station', list);
  const guide = $('[data-guide]');
  const guideN = $('[data-guide-n]');
  const guideName = $('[data-guide-name]');
  const map = $('[data-map]');
  const mapTrain = $('[data-map-train]');
  const mapCaption = $('[data-map-caption]');
  const NAMES = ['Descubrimiento', 'Atracción', 'Nutrición', 'Conversión', 'Recompra', 'Fidelización'];
  const C = 200, R = 150;
  const pt = (i, r = R) => { const a = (-90 + i * 60) * Math.PI / 180; return [C + r * Math.cos(a), C + r * Math.sin(a)]; };

  const stopsG = $('[data-map-stops]');
  NAMES.forEach((n, i) => {
    const [x, y] = pt(i);
    const [lx, ly] = pt(i, R + 34);
    const anchor = Math.abs(lx - C) < 10 ? 'middle' : lx > C ? 'start' : 'end';
    stopsG.insertAdjacentHTML('beforeend', `<circle class="map-stop" cx="${x}" cy="${y}" r="14" data-i="${i}"/><text class="map-label" x="${lx}" y="${ly + 4}" text-anchor="${anchor}" data-i="${i}">${n}</text>`);
  });

  let active = -1;
  const update = () => {
    const vh = window.innerHeight;
    const r = list.getBoundingClientRect();
    const p = Math.min(Math.max((vh * 0.55 - r.top) / r.height, 0), 1);
    list.style.setProperty('--p', p.toFixed(4));

    let idx = -1;
    stations.forEach((s, i) => { if (s.getBoundingClientRect().top < vh * 0.55) idx = i; });
    if (idx !== active) {
      active = idx;
      stations.forEach((s, i) => { s.classList.toggle('is-active', i === idx); s.classList.toggle('is-past', i < idx); });
      const k = Math.min(Math.max(idx, 0), 5);
      const isReturn = idx === stations.length - 1;
      guideN.innerHTML = isReturn ? 'Vuelta' : `<span class="g-word">Estación </span>${k + 1}/6`;
      guideName.textContent = isReturn ? 'De vuelta al live' : NAMES[k];
      if (map) {
        $$('.map-stop', map).forEach((c) => { const i = +c.dataset.i; c.classList.toggle('on', i === k && idx >= 0 && !isReturn); c.classList.toggle('past', i < k || isReturn); });
        $$('.map-label', map).forEach((t) => t.classList.toggle('on', +t.dataset.i === k && idx >= 0));
        mapTrain.style.transform = `rotate(${(isReturn ? 6 : k) * 60}deg)`;
        map.style.setProperty('--mp', isReturn ? 1 : (k / 6).toFixed(3));
        mapCaption.textContent = isReturn ? 'Otra vez al live' : NAMES[k];
      }
    }
    const inLoop = r.top < vh * 0.5 && r.bottom > vh * 0.35;
    guide.classList.toggle('is-on', inLoop);
  };
  const spine = $('[data-spine]');
  const mainEl = $('main');
  const finalH2 = $('#final-title');
  let sTop = 0, sH = 1, sMin = 0;
  const layoutSpine = () => {
    const mr = mainEl.getBoundingClientRect();
    const lr = live.getBoundingClientRect();
    const fr = finalH2.getBoundingClientRect();
    const x = list.getBoundingClientRect().left - 32 - mr.left;
    sTop = lr.bottom - mr.top - (window.innerWidth >= 1024 ? 18 : 0);
    sH = Math.max(1, fr.top - mr.top + 20 - sTop);
    spine.style.cssText = `left:${x}px;top:${sTop}px;height:${sH}px`;
    const firstRing = $('.section h2').getBoundingClientRect().top - mr.top + 18;
    sMin = Math.min(1, (firstRing - sTop) / sH);
  };
  const fillSpine = () => {
    const mr = mainEl.getBoundingClientRect();
    const p = Math.min(Math.max((window.innerHeight * 0.6 - (mr.top + sTop)) / sH, 0), 1);
    spine.style.setProperty('--sp', Math.max(p, sMin).toFixed(4));
  };
  layoutSpine();
  window.addEventListener('load', () => { layoutSpine(); fillSpine(); });
  window.addEventListener('resize', () => { layoutSpine(); fillSpine(); });
  let ticking = false;
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { update(); fillSpine(); ticking = false; }); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
  fillSpine();

  // Revelados de líneas
  const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { threshold: 0.3 });
  $$('[data-reveal]').forEach((el) => io.observe(el));

  // Contadores
  const fmt = (n, dec, thousands) => {
    const [i, d] = n.toFixed(dec).split('.');
    const int = thousands ? i.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : i;
    return d ? `${int},${d}` : int;
  };
  const countIO = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    countIO.unobserve(e.target);
    const el = e.target;
    const to = parseFloat(el.dataset.count);
    const dec = parseInt(el.dataset.decimals || '0', 10);
    const th = el.hasAttribute('data-thousands');
    const pre = el.dataset.prefix || '';
    const suf = el.dataset.suffix || '';
    const final = el.textContent;
    const t0 = performance.now();
    const dur = 1100;
    const tick = (t) => {
      const k = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(2, -10 * k);
      el.textContent = pre + fmt(to * eased, dec, th) + suf;
      if (k < 1) requestAnimationFrame(tick); else el.textContent = final;
    };
    requestAnimationFrame(tick);
  }), { threshold: 0.6 });
  if (!reduced) $$('[data-count]').forEach((el) => countIO.observe(el));
})();

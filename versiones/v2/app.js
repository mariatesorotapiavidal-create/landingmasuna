/* Más Una · Línea Live */
(() => {
  document.documentElement.classList.add('js');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ============================================
  // CONFIGURACIÓN (reemplazar los enlaces de las guías cuando estén en Drive)
  // ============================================
  const FORMSPREE_URL = 'https://formspree.io/f/xpqnlpql';
  const GUIDES = {
    B: 'https://drive.google.com/file/d/1UqnxvLVxy7wylFxY6UgcwrRwkthUH4f2/view', // ¿Catálogo o comunidad? (ya transmiten)
    C: 'https://drive.google.com/file/d/1FeFsDiQXe_hvS3YBlVEBXr3r-FZWX_mN/view', // Tus primeros 90 días (nunca transmitieron)
  };
  const WA_NUMBER = '51934151082';
  const WA_DISPLAY = '+51 934 151 082';
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
      ['c', 'Comida preparada o restaurante'],
      ['d', 'Servicios o productos digitales'],
    ]},
    { id: 'P3', text: '¿En qué rubro estás?', cols: 2, options: [
      ['a', 'Mascotas'], ['b', 'Hogar y decoración'], ['c', 'Suplementos y nutrición'], ['d', 'Tecnología y accesorios'],
      ['e', 'Juguetes'], ['f', 'Joyería y bisutería'], ['g', 'Librería y regalos'], ['h', 'Belleza y cuidado personal'],
      ['i', 'Ropa o calzado'], ['j', 'Alimentos envasados'], ['k', 'Otro'],
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
    // P7 cambia según P1: quien nunca transmitió ve frenos de inicio
    { id: 'P7', text: '¿Qué te frena más hoy?', options: [
      ['b', 'Entra poca gente'], ['c', 'Entra gente, pero no compra'], ['d', 'No sé cuánto vende el live'],
      ['e', 'Las clientas compran una vez y no vuelven'], ['g', 'Mi host no se siente cómoda o no tengo respaldo'],
    ], startOptions: [
      ['a', 'No sé por dónde empezar'], ['f', 'No tengo quién transmita'],
      ['h', 'No sé qué mostrar ni cómo armar el live'], ['i', 'Me da miedo que nadie entre'],
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
    g: 'Tu oportunidad está en la host: pasar de leer el producto a conversar con el chat, y tener a alguien de respaldo.',
    h: 'Tu primer paso: un producto estrella y un live de 6 bloques de 10 minutos, con un tema que enseñe.',
    i: 'Tu primer paso: constancia. El algoritmo trae gente nueva cuando transmites en días y horarios fijos.',
  };
  const isOut = () => ['c', 'd'].includes(answers.P2); // comida preparada, servicios o digital: sin guía
  const optionsFor = (q) => (q.startOptions && answers.P1 === 'a' ? q.startOptions : q.options);

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
    const opts = optionsFor(q);
    if (answers[q.id] && !opts.some(([k]) => k === answers[q.id])) delete answers[q.id]; // cambió P1
    const sel = answers[q.id];
    const first = step === 0 && !live.classList.contains('is-diag');
    body.innerHTML = `
      ${first ? '' : `<p class="sr-only">Pregunta ${step + 1} de ${Q.length}</p>`}
      <h2 class="diag-q" tabindex="-1" data-focus>${esc(q.text)}</h2>
      <div class="opts ${q.cols === 2 ? 'grid-2' : ''}" role="group" aria-label="${esc(q.text)}">
        ${opts.map(([k, l]) => `<button type="button" class="opt" data-k="${k}" aria-pressed="${sel === k}"><span class="ring" aria-hidden="true"></span><span>${esc(l)}</span></button>`).join('')}
      </div>
      ${first
        ? '<p class="diag-foot">Diagnóstico gratis · 8 preguntas en 5 minutos. Al final recibes una guía para tu etapa.</p>'
        : `<div class="diag-nav"><button type="button" class="link-btn" data-back>${step === 0 ? 'Volver al live' : 'Atrás'}</button>${sel ? '<button type="button" class="btn btn-dark" data-next>Siguiente</button>' : ''}</div>`}
    `;
    $$('.opt', body).forEach((b) => b.addEventListener('click', () => {
      answers[q.id] = b.dataset.k;
      $$('.opt', body).forEach((o) => o.setAttribute('aria-pressed', o === b));
      setTimeout(() => (q.id === 'P2' && isOut() ? showOut() : go(step + 1)), reduced ? 0 : 260);
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

  // 1) Filtro: comida preparada, servicios o digital quedan FUERA (sin guía).
  // 2) Etapa: la guía depende solo de P1 (nunca transmitió → C; ya transmite → B).
  // 3) Calificación: suma la invitación a agendar (datos de contacto). Negocio local también la recibe.
  const verdict = () => {
    const { P1, P2, P3, P4, P5, P6, P8 } = answers;
    if (isOut()) return { code: 'FUERA', summary: P2 === 'c' ? 'Comida preparada o restaurante' : 'Servicios o producto digital', tags: [] };
    const start = P1 === 'a';
    const v = start
      ? { code: 'INICIO', summary: 'Nunca transmitió', guide: 'C', tags: [] }
      : { code: 'OPTIMIZACION', summary: 'Ya transmite', guide: 'B', tags: [] };
    if (P2 === 'b') { v.tags.push('LOCAL'); v.contact = true; return v; }
    const base = !['h', 'i'].includes(P3) && ['c', 'd'].includes(P4) && ['b', 'c', 'd'].includes(P5);
    const p6 = ['c', 'd'].includes(P6);
    const p8 = P8 === 'c';
    if (base && p6 && p8) { v.tags.push('LLAMADA'); v.contact = true; }
    else if (base && p6 !== p8) v.tags.push('TIBIO');
    return v;
  };

  const summaryText = (v) => {
    const labels = Q.map((q) => { const o = [...q.options, ...(q.startOptions || [])].find(([k]) => k === answers[q.id]); return `${q.id}: ${o ? o[1] : '—'}`; }).join(' | ');
    return `[${v.code}]${v.tags.map((t) => ` [${t}]`).join('')} ${v.summary} || ${labels}`;
  };

  const waLink = () => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_TEXT + contact.empresa.trim())}`;

  const renderResult = (v) => {
    const line = P7_LINES[answers.P7] || '';
    const T = {
      OPTIMIZACION: ['Ya transmites: ahora toca saber si tu live es catálogo o comunidad.', 'Tu guía trae el mapa de las 6 etapas, un autodiagnóstico y un plan de 14 días.'],
      INICIO: ['Estás listo para empezar con el pie derecho.', 'Tu guía te acompaña en tus primeros 90 días en TikTok Live.'],
      FUERA: ['Hoy el live no es el mejor canal para tu modelo.', 'Funciona mejor con producto físico que se pueda enviar a todo el Perú. Te dejamos nuestro contenido por si tu modelo cambia.'],
    }[v.code];
    const guideUrl = v.guide ? GUIDES[v.guide] : null;
    let actions = '';
    if (guideUrl) {
      actions += `<a class="btn btn-dark" href="${guideUrl}" target="_blank" rel="noopener">Descargar mi guía</a>`;
    } else if (v.guide) {
      actions += '<p class="result-line"><strong>Te enviaremos tu guía por WhatsApp.</strong></p>';
    }
    if (v.contact) {
      actions += `<p class="result-line">Agenda tu diagnóstico de 30 minutos: revisamos tu negocio y te decimos con honestidad si tiene sentido trabajar juntos.</p>`;
      actions += `<a class="btn btn-line" href="${waLink()}" target="_blank" rel="noopener">WhatsApp ${WA_DISPLAY}</a>`;
    }
    actions += `<p class="diag-foot">Síguenos: <a href="${URL_TIKTOK}" target="_blank" rel="noopener">TikTok</a> · <a href="${URL_INSTAGRAM}" target="_blank" rel="noopener">Instagram</a></p>`;
    body.innerHTML = `
      <p class="sr-only">Tu diagnóstico</p>
      <h2 class="diag-q" tabindex="-1" data-focus>${esc(T[0])}</h2>
      ${line && v.code !== 'FUERA' ? `<p class="result-line"><strong>${esc(line)}</strong></p>` : ''}
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

  // FUERA: se corta en P2, sin formulario ni guía
  const showOut = () => {
    step = RESULT_STEP; renderRoute(); route.style.display = 'none';
    renderResult(verdict()); focusHeading();
  };

  const exitDiag = () => { live.classList.remove('is-diag'); route.style.display = ''; step = 0; renderRoute(); renderQuestion(); };

  body.addEventListener('click', (e) => {
    if (e.target.closest('[data-back]')) { if (step === 0) exitDiag(); else go(step - 1); }
    if (e.target.closest('[data-next]')) { if (Q[step] && Q[step].id === 'P2' && isOut()) showOut(); else go(step + 1); }
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

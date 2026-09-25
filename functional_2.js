/* ═══════════════════════════════════════════════════════════════════
   Bogotá a tu ritmo — functional_2.js (GOOGLE MAPS RESTAURADO)
   
   CAMBIOS APLICADOS:
   - Leaflet REMOVIDO completamente
   - Google Maps iframe RESTAURADO
   - Marcadores mediante parámetro de búsqueda en URL
   - Botón "Cómo llegar" en detalles (Google Maps Directions)
   
   Arquitectura: JS Vanilla, sin dependencias externas.
   Persistencia: localStorage.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ──────────────────────────────────────────────────────────────
     1. CATÁLOGO REAL DE BOGOTÁ
     ────────────────────────────────────────────────────────────── */
  var catalog = [
    /* ── GASTRONOMÍA ── */
    {
      id: 'puerta-falsa',
      title: 'La Puerta Falsa',
      category: 'Gastronomía',
      icon: '🍲',
      barrio: 'La Candelaria',
      lat: 4.5978, lng: -74.0753,
      seguridad_nivel: 'Turística / Alta',
      rango_precios: '$',
      desc: 'Plato insignia: Ajiaco Santafereño tradicional con alcaparras y crema de leche. Desde 1816.',
      consejo_seguridad: 'Zona turística de día. Al salir de noche usa taxi autorizado o plataforma de transporte.',
      hours: '8:00 a.m. – 8:00 p.m.',
      duration: '1 h',
      transport: 'A pie desde Las Aguas (TransMilenio)',
      rate: '4.7'
    },
    {
      id: 'casa-vieja',
      title: 'Ajiaco en Casa Vieja',
      category: 'Gastronomía',
      icon: '🥘',
      barrio: 'Centro Histórico',
      lat: 4.6012, lng: -74.0731,
      seguridad_nivel: 'Turística / Alta',
      rango_precios: '$$',
      desc: 'Clásico de cocina colombiana: ajiaco, bandeja paisa y changua, en ambiente colonial bogotano.',
      consejo_seguridad: 'Zona bien iluminada y transitada. Evita mostrar cámara fotográfica en calles adyacentes.',
      hours: '11:00 a.m. – 9:00 p.m.',
      duration: '1 h 15 min',
      transport: 'TransMilenio: Las Aguas o Museo del Oro',
      rate: '4.5'
    },
    {
      id: 'el-chato',
      title: 'Restaurante El Chato',
      category: 'Gastronomía',
      icon: '🍽️',
      barrio: 'Chapinero / La Macarena',
      lat: 4.6508, lng: -74.0583,
      seguridad_nivel: 'Turística / Alta',
      rango_precios: '$$$',
      desc: 'Alta cocina colombiana de autor. Menú degustación con ingredientes locales: ají amarillo, chontaduro y cocona.',
      consejo_seguridad: 'Barrio seguro y bien iluminado. Reserva con anticipación.',
      hours: '12:00 m. – 10:00 p.m.',
      duration: '2 h',
      transport: 'SITP o taxi; estación Flores (TransMilenio)',
      rate: '4.9'
    },
    {
      id: 'san-alberto',
      title: 'Café San Alberto',
      category: 'Gastronomía',
      icon: '☕',
      barrio: 'La Candelaria',
      lat: 4.5974, lng: -74.0742,
      seguridad_nivel: 'Turística / Alta',
      rango_precios: '$$',
      desc: 'Referente del café especial colombiano. Granos origen de Huila, Nariño y Sierra Nevada. Especialidad: café tostado en casa.',
      consejo_seguridad: 'Céntrico y seguro. Cuida tus pertenencias en la calle frente al local.',
      hours: '8:00 a.m. – 7:00 p.m.',
      duration: '45 min',
      transport: 'A pie desde Plaza de Bolívar',
      rate: '4.8'
    },
    {
      id: 'abasto',
      title: 'Abasto Usaquén',
      category: 'Gastronomía',
      icon: '🌮',
      barrio: 'Usaquén',
      lat: 4.6932, lng: -74.0305,
      seguridad_nivel: 'Turística / Alta',
      rango_precios: '$$',
      desc: 'Mercado gourmet con puestos de cocina colombiana, fusión y artesanías. Ideal para el almuerzo de fin de semana.',
      consejo_seguridad: 'Zona residencial de alta seguridad. Usa taxi o plataforma para regresar de noche.',
      hours: 'Sáb – Dom: 10:00 a.m. – 6:00 p.m.',
      duration: '2 h',
      transport: 'SITP Ruta 112 o taxi desde la 93',
      rate: '4.6'
    },
    {
      id: 'andres-dc',
      title: 'Andrés Carne de Res D.C.',
      category: 'Gastronomía',
      icon: '🥩',
      barrio: 'Zona T / Retiro',
      lat: 4.6664, lng: -74.0547,
      seguridad_nivel: 'Turística / Alta',
      rango_precios: '$$$',
      desc: 'Ícono gastronómico y de entretenimiento bogotano. Especialidad: Carne asada, bandeja paisa XL y cocteles artesanales.',
      consejo_seguridad: 'Zona T es muy segura. Llega antes de las 9 p.m. para evitar filas largas.',
      hours: '12:00 m. – 3:00 a.m.',
      duration: '2 h 30 min',
      transport: 'A pie desde estación El Retiro (TransMilenio)',
      rate: '4.7'
    },
    {
      id: 'son-grillos',
      title: 'El Son de los Grillos',
      category: 'Gastronomía',
      icon: '🎵',
      barrio: 'Chapinero',
      lat: 4.5966, lng: -74.0725,
      seguridad_nivel: 'Precaución de noche',
      rango_precios: '$',
      desc: 'Restaurante popular con sancocho de gallina, frijoles y mazorca. Música de carrilera en vivo los fines de semana.',
      consejo_seguridad: 'Visita de día o temprano en la noche. Evita portar objetos de valor visible en el sector.',
      hours: '11:00 a.m. – 9:00 p.m.',
      duration: '1 h',
      transport: 'TransMilenio: estación Universidades',
      rate: '4.4'
    },

    /* ── CULTURA ── */
    {
      id: 'museo-oro',
      title: 'Museo del Oro',
      category: 'Cultura',
      icon: '🏺',
      barrio: 'Centro Histórico',
      lat: 4.6017, lng: -74.0722,
      seguridad_nivel: 'Turística / Alta',
      rango_precios: '$',
      desc: 'La colección de orfebrería precolombina más grande del mundo. Más de 55.000 piezas de oro y cerámica.',
      consejo_seguridad: 'Interior completamente seguro. Confirma el horario antes de ir; cierra los lunes.',
      hours: 'Mar – Sáb: 9:00 a.m. – 6:00 p.m.',
      duration: '2 h',
      transport: 'TransMilenio: Museo del Oro',
      rate: '4.8'
    },
    {
      id: 'museo-nacional',
      title: 'Museo Nacional de Colombia',
      category: 'Cultura',
      icon: '🏛️',
      barrio: 'Santa Fe',
      lat: 4.6157, lng: -74.0666,
      seguridad_nivel: 'Turística / Alta',
      rango_precios: 'Gratis',
      desc: 'El museo más antiguo de Colombia, en una penitenciaría neoclásica del siglo XIX. Arte, arqueología e historia nacional.',
      consejo_seguridad: 'Zona segura. Usa los corredores principales al salir hacia la carrera 7.',
      hours: 'Mar – Dom: 10:00 a.m. – 6:00 p.m.',
      duration: '1 h 30 min',
      transport: 'TransMilenio: Museo Nacional',
      rate: '4.7'
    },
    {
      id: 'candelaria-tour',
      title: 'Tour La Candelaria',
      category: 'Cultura',
      icon: '🎨',
      barrio: 'La Candelaria',
      lat: 4.5975, lng: -74.0761,
      seguridad_nivel: 'Turística / Alta',
      rango_precios: '$',
      desc: 'Recorrido guiado por murales, cafés coloniales, el Chorro de Quevedo y la Plaza de Bolívar.',
      consejo_seguridad: 'Mantente en los corredores turísticos señalizados. Evita callejones solitarios después de las 7 p.m.',
      hours: 'Todos los días: 9:00 a.m. – 5:00 p.m.',
      duration: '3 h',
      transport: 'TransMilenio: Las Aguas',
      rate: '4.7'
    },
    {
      id: 'monserrate',
      title: 'Monserrate',
      category: 'Cultura',
      icon: '⛰️',
      barrio: 'Centro Histórico',
      lat: 4.6051, lng: -74.0557,
      seguridad_nivel: 'Turística / Alta',
      rango_precios: '$$',
      desc: 'Santuario y mirador icónico a 3.152 m.s.n.m. Vista panorámica de toda Bogotá. Acceso en funicular o teleférico.',
      consejo_seguridad: 'Sube solo por el funicular o teleférico oficial. La subida a pie es arriesgada, no recomendada.',
      hours: 'Lun – Vie: 12:00 m. – 12:00 a.m. | Sáb – Dom: 6:00 a.m. – 12:00 a.m.',
      duration: '2 h',
      transport: 'A pie desde estación La Cabrera',
      rate: '4.8'
    },
    {
      id: 'plaza-bolivar',
      title: 'Plaza de Bolívar',
      category: 'Cultura',
      icon: '🕊️',
      barrio: 'La Candelaria',
      lat: 4.5980, lng: -74.0760,
      seguridad_nivel: 'Turística / Alta',
      rango_precios: 'Gratis',
      desc: 'El corazón histórico de Bogotá: catedral, capitolio, palacio de justicia y el Congreso en una sola plaza.',
      consejo_seguridad: 'Zona muy transitada y segura de día. Evita quedarte solo al atardecer.',
      hours: 'Libre (24 h)',
      duration: '1 h',
      transport: 'TransMilenio: Las Aguas o Portal Norte',
      rate: '4.6'
    },

    /* ── NATURALEZA ── */
    {
      id: 'ciclovia',
      title: 'Ciclovía Dominical',
      category: 'Naturaleza',
      icon: '🚲',
      barrio: 'Toda la ciudad',
      lat: 4.6574, lng: -74.0587,
      seguridad_nivel: 'Turística / Alta',
      rango_precios: 'Gratis',
      desc: 'Los domingos se cierran más de 120 km de vías para ciclistas, patinadores y peatones. La ciclovía más grande del mundo.',
      consejo_seguridad: 'Usa casco y mantente en los corredores señalizados. Comienza temprano antes del sol.',
      hours: 'Domingos y festivos: 7:00 a.m. – 2:00 p.m.',
      duration: '2 h',
      transport: 'Bicicleta, patines o a pie',
      rate: '4.9'
    },
    {
      id: 'parque-93',
      title: 'Parque de la 93',
      category: 'Naturaleza',
      icon: '🌳',
      barrio: 'El Chicó / Parque 93',
      lat: 4.6764, lng: -74.0483,
      seguridad_nivel: 'Turística / Alta',
      rango_precios: 'Gratis',
      desc: 'Parque de diseño con restaurantes alrededor, terrazas gastronómicas y mercados los fines de semana.',
      consejo_seguridad: 'Zona premium y muy segura. Ideal para cenar al aire libre con familia.',
      hours: 'Abierto todos los días',
      duration: '1 h 30 min',
      transport: 'SITP o taxi; Transmilenio calle 100',
      rate: '4.6'
    },
    {
      id: 'humedal-jaboque',
      title: 'Humedal de Jaboque',
      category: 'Naturaleza',
      icon: '🦅',
      barrio: 'Engativá',
      lat: 4.7058, lng: -74.1283,
      seguridad_nivel: 'Acompañado',
      rango_precios: 'Gratis',
      desc: 'Reserva natural urbana con aves acuáticas y vegetación nativa. Ideal para senderismo suave y avistamiento de aves.',
      consejo_seguridad: 'Ve en grupo o con guía local. Lleva agua y protector solar. No aconsejado solo.',
      hours: 'Mar – Dom: 8:00 a.m. – 4:00 p.m.',
      duration: '2 h',
      transport: 'SITP Ruta 34 desde Portal 80',
      rate: '4.3'
    },

    /* ── EVENTOS ── */
    {
      id: 'bogota-fashion',
      title: 'Bogotá Fashion Week',
      category: 'Eventos',
      icon: '👗',
      barrio: 'Corferias / Teusaquillo',
      lat: 4.6383, lng: -74.0960,
      seguridad_nivel: 'Turística / Alta',
      rango_precios: '$$',
      desc: 'La semana de la moda más importante de Latinoamérica. Desfiles de diseñadores colombianos e internacionales.',
      consejo_seguridad: 'Evento masivo: llega 30 min antes. Usa TransMilenio desde Portal Américas.',
      hours: 'Consultar programación oficial',
      duration: '4 h',
      transport: 'TransMilenio: Corferias',
      rate: '4.5'
    },
    {
      id: 'feria-usaquen',
      title: 'Mercado Artesanal Usaquén',
      category: 'Eventos',
      icon: '🎪',
      barrio: 'Usaquén',
      lat: 4.6940, lng: -74.0312,
      seguridad_nivel: 'Turística / Alta',
      rango_precios: '$',
      desc: 'Feria artesanal dominical con más de 200 expositores. Artesanías, ropa étnica, comida local y música en vivo.',
      consejo_seguridad: 'Zona de alta seguridad. Lleva efectivo; muchos puestos no aceptan tarjeta.',
      hours: 'Domingos: 9:00 a.m. – 6:00 p.m.',
      duration: '2 h',
      transport: 'SITP o taxi; fácil acceso desde la autopista Norte',
      rate: '4.7'
    },
    {
      id: 'jazz-festival',
      title: 'Festival de Jazz de Bogotá',
      category: 'Eventos',
      icon: '🎷',
      barrio: 'Centro / Chapinero',
      lat: 4.6118, lng: -74.0700,
      seguridad_nivel: 'Turística / Alta',
      rango_precios: 'Gratis',
      desc: 'El festival de jazz más importante de Colombia. Conciertos en teatros, cafés y espacios públicos de la ciudad.',
      consejo_seguridad: 'Al terminar eventos nocturnos, usa taxi autorizado o plataformas de transporte.',
      hours: 'Consultar programación anual (sept – oct)',
      duration: '2 h',
      transport: 'TransMilenio: Teatro Colón / Museo del Oro',
      rate: '4.8'
    },

    /* ── NOCHE ── */
    {
      id: 'zona-rosa',
      title: 'Zona Rosa y Parque 93',
      category: 'Noche',
      icon: '🍹',
      barrio: 'Zona T / Retiro',
      lat: 4.6680, lng: -74.0543,
      seguridad_nivel: 'Turística / Alta',
      rango_precios: '$$$',
      desc: 'El epicentro del entretenimiento nocturno de Bogotá: bares, rooftops, restaurantes de fusión y clubs de jazz.',
      consejo_seguridad: 'Zona segura y patrullada. No aceptes bebidas de desconocidos. Usa plataformas de transporte.',
      hours: '7:00 p.m. – 3:00 a.m.',
      duration: '3 h',
      transport: 'TransMilenio: El Retiro, luego 5 min a pie',
      rate: '4.6'
    },
    {
      id: 'la-macarena',
      title: 'Noche en La Macarena',
      category: 'Noche',
      icon: '🌙',
      barrio: 'La Macarena',
      lat: 4.6473, lng: -74.0591,
      seguridad_nivel: 'Precaución de noche',
      rango_precios: '$$',
      desc: 'Barrio bohemio con galerías de arte, restaurantes de autor y bares de cócteles artesanales. Ambiente alternativo y cultural.',
      consejo_seguridad: 'Mantente dentro del sector consolidado. Usa apps de taxi para regresar después de las 11 p.m.',
      hours: '6:00 p.m. – 2:00 a.m.',
      duration: '3 h',
      transport: 'SITP o taxi; cerca de la Circunvalar',
      rate: '4.5'
    }
  ];

  /* ──────────────────────────────────────────────────────────────
     2. CONSTANTES Y ESTADO
     ────────────────────────────────────────────────────────────── */
  var STORAGE_KEY  = 'bogota-a-tu-ritmo-functional-plan';
  var CHAT_KEY     = 'bogota-a-tu-ritmo-chat';
  var FAVS_KEY     = 'bogota-a-tu-ritmo-favs';

  var CATEGORIES = [
    ['Gastronomía', '🍽️'],
    ['Cultura',     '🏛️'],
    ['Naturaleza',  '🌿'],
    ['Eventos',     '🗓️'],
    ['Noche',       '🌙']
  ];

  /* Carga de persistencia */
  var savedPlan  = null;
  var savedChat  = null;
  var savedFavs  = [];
  try { savedPlan = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch(e) { savedPlan = null; }
  try { savedChat = JSON.parse(localStorage.getItem(CHAT_KEY));     } catch(e) { savedChat = null; }
  try { savedFavs = JSON.parse(localStorage.getItem(FAVS_KEY)) || []; } catch(e) { savedFavs = []; }

  if (savedPlan && Array.isArray(savedPlan.items)) {
    savedPlan.items = savedPlan.items.map(function(x) { return typeof x === 'string' ? x : x.id; });
  }

  var state = {
    view:      'home',
    history:   [],
    filter:    'Todos',
    query:     '',
    place:     null,
    mapPlace:  null,
    interests: ['Cultura', 'Gastronomía'],
    plan:      (savedPlan && Array.isArray(savedPlan.items)) ? savedPlan : null,
    favs:      savedFavs,
    chat: savedChat || [
      { side: 'bot', text: '¡Hola! Soy tu asistente de viaje para Bogotá 🗺️ Puedo recomendarte restaurantes reales, atracciones, consejos de movilidad y seguridad. ¿Por dónde empezamos?' }
    ]
  };

  var root = document.getElementById('app');

  /* ──────────────────────────────────────────────────────────────
     3. UTILIDADES
     ────────────────────────────────────────────────────────────── */
  function get(id) { return catalog.find(function(p) { return p.id === id; }); }

  function planPlaces() {
    return state.plan ? state.plan.items.map(get).filter(Boolean) : [];
  }

  function esc(text) {
    return String(text).replace(/[&<>"']/g, function(c) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  function persist() {
    if (state.plan) localStorage.setItem(STORAGE_KEY, JSON.stringify(state.plan));
    localStorage.setItem(CHAT_KEY, JSON.stringify(state.chat.slice(-40)));
    localStorage.setItem(FAVS_KEY, JSON.stringify(state.favs));
  }

  function toast(text) {
    var el = document.getElementById('toast');
    el.textContent = text;
    el.className = 'toast show';
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(function() { el.className = 'toast'; }, 2600);
  }

  function ensurePlan() {
    if (!state.plan) {
      state.plan = { time: '1 día', budget: 80000, interests: state.interests.slice(), items: [], saved: false };
    }
    return state.plan;
  }

  /* ──────────────────────────────────────────────────────────────
     4. BADGES
     ────────────────────────────────────────────────────────────── */
  function badgeSeg(nivel) {
    if (!nivel) return '';
    if (/alta|turística/i.test(nivel)) {
      return '<span class="badge-seg-alta">🟢 Zona Turística</span>';
    }
    if (/precaución|noche/i.test(nivel)) {
      return '<span class="badge-seg-precau">🟡 Precaución de noche</span>';
    }
    return '<span class="badge-seg-acomp">🔴 Acompañado</span>';
  }

  function badgePrice(rango) {
    if (!rango) return '';
    var cls = rango === 'Gratis' ? 'badge-precio badge-gratis' : 'badge-precio';
    return '<span class="' + cls + '">' + esc(rango) + '</span>';
  }

  /* ──────────────────────────────────────────────────────────────
     5. COMPONENTES HTML
     ────────────────────────────────────────────────────────────── */
  function header(name, subtitle, back) {
    return '<div class="top"><div class="identity">' +
      (back
        ? '<button class="icon" onclick="appBack()" aria-label="Volver">‹</button>'
        : '<div class="logo">⌖</div>') +
      '<div><h1>' + esc(name) + '</h1>' +
      (subtitle ? '<p class="sub">' + esc(subtitle) + '</p>' : '') +
      '</div></div>' +
      (back ? '' : '<button class="icon" onclick="appToast()" aria-label="Notificaciones">🔔</button>') +
      '</div>';
  }

  function navigation(active) {
    var links = [
      ['home',    '🏠', 'Inicio'],
      ['plan',    '🗓️', 'Planes'],
      ['map',     '🗺️', 'Mapa'],
      ['chat',    '💬', 'Asistente'],
      ['profile', '👤', 'Perfil']
    ];
    return '<nav class="nav">' + links.map(function(l) {
      return '<button class="' + (active === l[0] ? 'on' : '') +
        '" onclick="appGo(\'' + l[0] + '\')" aria-label="' + l[2] + '">' +
        '<b>' + l[1] + '</b><span>' + l[2] + '</span></button>';
    }).join('') + '</nav>';
  }

  function card(place) {
    var inPlan = state.plan && state.plan.items.includes(place.id);
    return '<button class="card" onclick="appOpen(\'' + place.id + '\')">' +
      '<div class="art">' + place.icon + '</div>' +
      '<div class="copy">' +
        '<h3>' + esc(place.title) + '</h3>' +
        '<p>' + esc(place.category) + ' · ' + esc(place.barrio) + '</p>' +
        '<p class="rate">★ ' + esc(place.rate) + ' &nbsp;' + badgePrice(place.rango_precios) + '</p>' +
        '<p>' + badgeSeg(place.seguridad_nivel) + '</p>' +
      '</div>' +
      '<span class="chev">' + (inPlan ? '✓' : '›') + '</span>' +
      '</button>';
  }

  function matching() {
    var q = state.query.toLowerCase().trim();
    return catalog.filter(function(p) {
      var catMatch = state.filter === 'Todos' || p.category === state.filter;
      if (!q) return catMatch;
      var haystack = [p.title, p.category, p.barrio, p.desc, p.rango_precios].join(' ').toLowerCase();
      return catMatch && haystack.includes(q);
    });
  }

  /* ──────────────────────────────────────────────────────────────
     6. GOOGLE MAPS IFRAME (RESTAURADO)
     ────────────────────────────────────────────────────────────── */
  function buildGoogleMapsUrl(place) {
    /* Construye URL de Google Maps con marcador en ubicación exacta */
    var query = encodeURIComponent(place.title + ', ' + place.barrio + ', Bogotá, Colombia');
    var coords = place.lat + ',' + place.lng;
    return 'https://www.google.com/maps?q=' + query + '&ll=' + coords + '&z=15&output=embed';
  }

  function buildDirectionsUrl(place) {
    /* URL para "Cómo llegar" desde ubicación actual */
    return 'https://www.google.com/maps/dir/?api=1&destination=' + place.lat + ',' + place.lng + '&travelmode=transit';
  }

  /* ──────────────────────────────────────────────────────────────
     7. CHATBOT GASTRONÓMICO
     ────────────────────────────────────────────────────────────── */
  function recommend(place) {
    if (!place) return '';
    return '<div class="recommend">' +
      '<strong>' + esc(place.icon) + ' ' + esc(place.title) + '</strong>' +
      '<br><span style="color:#8b5e3c;font-size:11px">' + esc(place.category) + ' · ' + esc(place.barrio) + ' · ' + badgePrice(place.rango_precios) + '</span>' +
      '<br><span style="font-size:12px">' + esc(place.desc) + '</span>' +
      '<br>' + badgeSeg(place.seguridad_nivel) +
      '<div class="recommend-actions">' +
        '<button class="rec-btn-plan" onclick="appAdd(\'' + place.id + '\')">+ Agregar al plan</button>' +
        '<button class="rec-btn-map"  onclick="appMapFocus(\'' + place.id + '\')">🗺️ Ver en el mapa</button>' +
      '</div></div>';
  }

  function botReply(text) {
    var q = text.toLowerCase();

    /* ── Consultas gastronómicas ── */
    if (/ajiaco/.test(q)) {
      return 'El ajiaco santafereño es el plato emblema de Bogotá. Aquí dos opciones clásicas:' +
        recommend(get('puerta-falsa')) + recommend(get('casa-vieja'));
    }
    if (/café|tinto|espresso|coffee/.test(q)) {
      return 'Para una experiencia de café especial colombiano, el referente es:' +
        recommend(get('san-alberto'));
    }
    if (/romántic|pareja|aniversario|cena especial/.test(q)) {
      return 'Para una cena romántica o especial en Bogotá te recomiendo:' +
        recommend(get('el-chato')) + recommend(get('andres-dc'));
    }
    if (/barat|económic|barato|económico|\$/.test(q)) {
      var cheapPlaces = catalog.filter(function(p) { return p.rango_precios === '$' && p.category === 'Gastronomía'; });
      var result = 'Opciones económicas (desde $):\n';
      cheapPlaces.slice(0, 3).forEach(function(p) { result += recommend(p); });
      return result;
    }
    if (/lujo|gourmet|fine dining|alta cocina/.test(q)) {
      return 'Para alta cocina bogotana, El Chato es la referencia de autor:' +
        recommend(get('el-chato')) + recommend(get('andres-dc'));
    }
    if (/carne|asado|parrilla/.test(q)) {
      return 'Si quieres carne asada de calidad en Bogotá, la opción icónica es:' +
        recommend(get('andres-dc'));
    }
    if (/usaquén/.test(q)) {
      return 'Usaquén es uno de los barrios más gastronómicos de Bogotá. Opciones:' +
        recommend(get('abasto')) + recommend(get('feria-usaquen'));
    }
    if (/comer|restaurante|gastr|almorzar|cenar|dónde como/.test(q)) {
      var gastro = catalog.filter(function(p) { return p.category === 'Gastronomía'; });
      return 'Aquí algunos restaurantes reales de Bogotá que te recomiendo:' +
        gastro.slice(0, 3).map(recommend).join('');
    }

    /* ── Seguridad ── */
    if (/segur|peligro|cuidado|robo/.test(q)) {
      return 'Consejos generales de seguridad en Bogotá:<br>' +
        '<div class="tip">🛡️ Usa siempre taxi autorizado o apps (InDriver, Uber) especialmente de noche.<br>' +
        '📵 No uses el celular en la calle en zonas poco concurridas.<br>' +
        '👀 Guarda cámaras y objetos de valor en sectores no turísticos.<br>' +
        '🟢 Las zonas más seguras: Zona T, Usaquén, Parque 93, Candelaria de día.</div>';
    }

    /* ── Movilidad ── */
    if (/transmi|bus|sitp|ciclovía|metro|llegar/.test(q)) {
      return 'Movilidad en Bogotá:<br>' +
        '<div class="tip">🚌 <strong>TransMilenio</strong>: La red troncal más rápida. Tarifa: $3.200. Cubre Candelaria, Chapinero, Zona T.<br>' +
        '🚌 <strong>SITP</strong>: Buses de barrio, conectan zonas sin troncal. Misma tarifa.<br>' +
        '🚲 <strong>Ciclovía</strong>: Domingos y festivos, 7 a.m. – 2 p.m. Gratis.<br>' +
        '📱 <strong>Apps</strong>: Uber, InDriver y Cabify disponibles. Recomendadas de noche.</div>';
    }
    if (/candelaria/.test(q)) {
      return 'Para llegar a La Candelaria usa TransMilenio hasta la estación <strong>Las Aguas</strong> (Línea 1) o <strong>Museo del Oro</strong>. De allí todo es a pie.' +
        recommend(get('puerta-falsa')) + recommend(get('candelaria-tour'));
    }
    if (/zona.?t|retiro|chapinero/.test(q)) {
      return 'Para la Zona T y El Retiro, baja en la estación <strong>El Retiro</strong> del TransMilenio (Caracas con calle 82). Luego 5 minutos a pie.' +
        recommend(get('andres-dc')) + recommend(get('zona-rosa'));
    }

    /* ── Planes y actividades ── */
    if (/hoy|qué hac|plan|actividad/.test(q)) {
      return 'Un plan completo para hoy en Bogotá podría ser:' +
        '<div class="tip">☕ Mañana: Café San Alberto en La Candelaria<br>' +
        '🏺 Media mañana: Museo del Oro (gratuito primeros sábados)<br>' +
        '🍲 Almuerzo: La Puerta Falsa, ajiaco tradicional<br>' +
        '🎨 Tarde: Tour por La Candelaria<br>' +
        '🌙 Noche: Zona Rosa o La Macarena</div>' +
        recommend(get('san-alberto'));
    }
    if (/cultural|museo|histori|arte/.test(q)) {
      return 'Opciones culturales top en Bogotá:' +
        recommend(get('museo-oro')) + recommend(get('museo-nacional')) + recommend(get('candelaria-tour'));
    }
    if (/natural|parque|aire libre|bici/.test(q)) {
      return 'Planes al aire libre en Bogotá:' +
        recommend(get('ciclovia')) + recommend(get('parque-93')) + recommend(get('monserrate'));
    }
    if (/noche|bar|rumba|rumbear|salir/.test(q)) {
      return 'Para la vida nocturna bogotana:' +
        recommend(get('zona-rosa')) + recommend(get('la-macarena'));
    }
    if (/event|feria|festi|concierto/.test(q)) {
      return 'Eventos y ferias destacadas en Bogotá:' +
        recommend(get('jazz-festival')) + recommend(get('feria-usaquen'));
    }

    return 'Puedo ayudarte con restaurantes, lugares culturales, naturaleza, movilidad y seguridad en Bogotá.<br>' +
      'Prueba preguntando: <em>"¿Dónde comer ajiaco?"</em>, <em>"Restaurantes románticos"</em>, <em>"¿Cómo llego a La Candelaria?"</em> o <em>"¿Qué hacer hoy?"</em>';
  }

  /* ──────────────────────────────────────────────────────────────
     8. API PÚBLICA (llamada desde HTML generado)
     ────────────────────────────────────────────────────────────── */
  window.appToast = function() { toast('No tienes notificaciones nuevas'); };

  window.appGo = function(view) {
    state.view = view;
    
    if (view === 'home')         renderHome();
    else if (view === 'explore') renderExplore();
    else if (view === 'detail')  renderDetail();
    else if (view === 'plan')    state.plan && state.plan.items.length ? renderPlan() : renderPlanner();
    else if (view === 'map')     renderMap();
    else if (view === 'chat')    renderChat();
    else if (view === 'profile') renderProfile();
  };

  window.appBack = function() {
    var prev = state.history.pop() || 'home';
    window.appGo(prev);
  };

  window.appOpen = function(id) {
    state.history.push(state.view);
    state.place = id;
    state.view  = 'detail';
    renderDetail();
  };

  window.appSearchHome = function(val) {
    state.query = val;
    var results = catalog.filter(function(p) {
      return [p.title, p.category, p.barrio, p.desc].join(' ').toLowerCase().includes(val.toLowerCase());
    });
    var el = document.getElementById('home-results');
    if (el) el.innerHTML = results.length ? results.slice(0, 5).map(card).join('') : '<div class="empty">Sin resultados. Prueba "ajiaco", "museo" o "noche".</div>';
  };

  window.appFilter = function(f) { state.filter = f; state.query = ''; renderExplore(); };

  window.appSearchExplore = function(val) {
    state.query = val;
    var el = document.getElementById('explore-results');
    var r  = matching();
    if (el) el.innerHTML = r.length ? r.map(card).join('') : '<div class="empty">Sin resultados con esa búsqueda.</div>';
  };

  window.appInterest = function(name) {
    state.interests = state.interests.includes(name)
      ? state.interests.filter(function(x) { return x !== name; })
      : state.interests.concat(name);
    renderPlanner();
  };

  window.appGenerate = function(e) {
    e.preventDefault();
    var time   = document.getElementById('plan-time').value;
    var budget = Number(document.getElementById('plan-budget').value);
    var wanted = state.interests.length ? state.interests : ['Cultura'];
    var limit  = time === '4 horas' ? 3 : time === '2 días' ? 6 : 4;
    var items  = catalog.filter(function(p) { return wanted.includes(p.category) && (p.rango_precios === 'Gratis' || p.rango_precios === '$' || budget >= 80000); });
    catalog.forEach(function(p) { if (items.length < limit && !items.includes(p)) items.push(p); });
    state.plan = { time: time, budget: budget, interests: wanted, items: items.slice(0, limit).map(function(p) { return p.id; }), saved: false };
    state.mapPlace = state.plan.items[0] || null;
    persist();
    toast('✅ Tu plan personalizado está listo');
    window.appGo('plan');
  };

  window.appAdd = function(id) {
    var plan = ensurePlan();
    if (plan.items.includes(id)) { toast('Este lugar ya está en tu plan'); return; }
    plan.items.push(id);
    plan.saved = false;
    persist();
    toast('✅ ' + get(id).title + ' agregado al plan');
    if (state.view === 'detail') renderDetail();
  };

  window.appRemove = function(id) {
    if (!state.plan) return;
    state.plan.items = state.plan.items.filter(function(x) { return x !== id; });
    persist();
    toast('Lugar eliminado del plan');
    if (state.view === 'plan') renderPlan();
    else if (state.view === 'detail') renderDetail();
  };

  window.appSave = function() {
    ensurePlan().saved = true;
    persist();
    renderPlan();
    toast('💾 Plan guardado en este dispositivo');
  };

  window.appMapFocus = function(id) {
    state.mapPlace = id;
    state.history.push(state.view);
    window.appGo('map');
  };

  window.appGoChat = function(id) {
    var p = get(id);
    if (p) {
      state.chat.push({ side: 'user', text: '¿Qué me recomiendas sobre ' + esc(p.title) + '?' });
      state.chat.push({ side: 'bot',  text: recommend(p) });
      persist();
    }
    window.appGo('chat');
  };

  window.appAsk = function(text) {
    if (!text.trim()) return;
    state.chat.push({ side: 'user', text: esc(text) });
    state.chat.push({ side: 'bot',  text: botReply(text) });
    persist();
    renderChat();
  };

  window.appSend = function(e) {
    e.preventDefault();
    var input = document.getElementById('chat-input');
    if (input && input.value.trim()) {
      window.appAsk(input.value.trim());
      input.value = '';
    }
  };

  window.appNewPlan = function() {
    state.plan = null;
    state.interests = ['Cultura', 'Gastronomía'];
    localStorage.removeItem(STORAGE_KEY);
    window.appGo('plan');
  };

  window.renderPlanner = renderPlanner;

  /* ──────────────────────────────────────────────────────────────
     9. RENDERS DE PANTALLA
     ────────────────────────────────────────────────────────────── */
  function renderHome() {
    state.query = '';
    root.innerHTML =
      '<section class="screen">' +
      header('Bogotá a tu ritmo', 'Descubre la ciudad con tranquilidad') +
      '<div class="hero"><h2>¿Qué plan te inspira hoy?</h2><p>Restaurantes reales, cultura, naturaleza y vida nocturna, todo en un solo lugar.</p></div>' +
      '<div class="search"><span>🔍</span><input placeholder="Buscar restaurantes, museos, barrios..." oninput="appSearchHome(this.value)" aria-label="Buscar"></div>' +
      '<div class="heading"><h2>Explorar por categoría</h2></div>' +
      '<div class="grid">' + CATEGORIES.map(function(c) {
        return '<button class="cat" onclick="appFilter(\'' + c[0] + '\');appGo(\'explore\')"><b>' + c[1] + '</b>' + c[0] + '</button>';
      }).join('') + '</div>' +
      '<div class="heading"><h2>Recomendados</h2><button class="link" onclick="appGo(\'explore\')">Ver todo</button></div>' +
      '<div class="list" id="home-results">' + catalog.slice(0, 4).map(card).join('') + '</div>' +
      '</section>' +
      navigation('home');
  }

  function renderExplore() {
    var filters = ['Todos'].concat(CATEGORIES.map(function(c) { return c[0]; }));
    var results = matching();
    root.innerHTML =
      '<section class="screen">' +
      header('Descubrir', 'Gastronomía, cultura y más') +
      '<div class="search"><span>🔍</span><input placeholder="Buscar por nombre, barrio, especialidad..." oninput="appSearchExplore(this.value)" aria-label="Buscar" value="' + esc(state.query) + '"></div>' +
      '<div class="row">' + filters.map(function(f) {
        return '<button class="chip ' + (state.filter === f ? 'active' : '') + '" onclick="appFilter(\'' + f + '\')">' + f + '</button>';
      }).join('') + '</div>' +
      '<div class="heading"><h2>' + esc(state.filter) + '</h2><span class="sub">' + results.length + ' opciones</span></div>' +
      '<div class="list" id="explore-results">' +
        (results.length ? results.map(card).join('') : '<div class="empty">Sin resultados. Prueba otra categoría o término.</div>') +
      '</div></section>' +
      navigation('explore');
  }

  function renderDetail() {
    var p = get(state.place);
    if (!p) { window.appGo('home'); return; }
    var inPlan = state.plan && state.plan.items.includes(p.id);
    var directionsUrl = buildDirectionsUrl(p);
    
    root.innerHTML =
      '<section class="screen">' +
      header(p.title, p.category, true) +
      '<div class="banner">' + p.icon + '</div>' +
      '<div class="heading"><h2>' + esc(p.title) + '</h2><span class="badge">★ ' + esc(p.rate) + '</span></div>' +
      '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">' + badgeSeg(p.seguridad_nivel) + ' ' + badgePrice(p.rango_precios) + '</div>' +
      '<p style="font-size:14px;line-height:1.6;color:#3d2b1a;margin:0 0 14px">' + esc(p.desc) + '</p>' +
      '<div class="meta">' +
        '<div><b>📍</b>' + esc(p.barrio) + '</div>' +
        '<div><b>🚌</b>' + esc(p.transport) + '</div>' +
        '<div><b>🕐</b>' + esc(p.hours) + '</div>' +
        '<div><b>⏱️</b>Duración sugerida: ' + esc(p.duration) + '</div>' +
      '</div>' +
      '<div class="tip">🛡️ <strong>Consejo de seguridad:</strong> ' + esc(p.consejo_seguridad) + '</div>' +
      '<div class="actions">' +
        '<button class="' + (inPlan ? 'secondary' : 'primary') + '" onclick="' + (inPlan ? 'appRemove(\'' + p.id + '\')' : 'appAdd(\'' + p.id + '\')') + '">' +
          (inPlan ? '✓ Quitar de mi plan' : '+ Agregar a mi plan') +
        '</button>' +
        '<button class="secondary" onclick="appMapFocus(\'' + p.id + '\')">🗺️ Ver en el mapa</button>' +
        '<a class="secondary" href="' + directionsUrl + '" target="_blank" rel="noopener" style="display:block;text-align:center;text-decoration:none">🚗 Cómo llegar</a>' +
      '</div></section>' +
      navigation('detail');
  }

  function renderPlanner() {
    var sel = state.interests;
    root.innerHTML =
      '<section class="screen">' +
      header('Crear plan', 'Itinerario personalizado', true) +
      '<div class="banner" style="height:130px;font-size:54px">🗺️</div>' +
      '<form class="panel" onsubmit="appGenerate(event)">' +
        '<h2>¿Qué te interesa?</h2>' +
        '<p class="sub">Configura tu recorrido según tiempo e intereses.</p>' +
        '<label>Tiempo disponible</label>' +
        '<select id="plan-time"><option>4 horas</option><option selected>1 día</option><option>2 días</option></select>' +
        '<label>Presupuesto por persona</label>' +
        '<select id="plan-budget">' +
          '<option value="50000">Hasta $50.000</option>' +
          '<option value="80000" selected>Hasta $80.000</option>' +
          '<option value="150000">Hasta $150.000</option>' +
        '</select>' +
        '<label>Intereses</label>' +
        '<div class="interest">' +
          ['Gastronomía','Cultura','Naturaleza','Eventos','Noche'].map(function(i) {
            return '<button type="button" class="' + (sel.includes(i) ? 'selected' : '') + '" onclick="appInterest(\'' + i + '\')">' + i + '</button>';
          }).join('') +
        '</div>' +
        '<div class="tip" style="margin-top:14px">El plan incluirá lugares reales de Bogotá con coordenadas en el mapa, consejos de seguridad y tiempos estimados.</div>' +
        '<button class="primary" style="margin-top:16px">Generar mi plan ›</button>' +
      '</form></section>' +
      navigation('plan');
  }

  function renderPlan() {
    if (!state.plan || !state.plan.items.length) { renderPlanner(); return; }
    var plan  = state.plan;
    var list  = planPlaces();
    var times = ['9:00 a.m.', '11:30 a.m.', '1:00 p.m.', '3:30 p.m.', '6:00 p.m.', '9:00 p.m.'];
    root.innerHTML =
      '<section class="screen">' +
      header('Tu plan en Bogotá', 'Itinerario personalizado', true) +
      '<div class="panel summary">' +
        '<div class="mini">🗺️</div>' +
        '<div><h3>Plan personalizado</h3>' +
        '<p>Duración: ' + esc(plan.time) + ' · Hasta $' + Number(plan.budget).toLocaleString('es-CO') + '</p>' +
        '<p>' + list.length + ' paradas · ' + list.filter(function(p){ return p.category === 'Gastronomía'; }).length + ' gastronómicas</p>' +
        '</div>' +
      '</div>' +
      '<div class="timeline">' +
        list.map(function(p, i) {
          return '<div class="step">' +
            '<i class="dot"></i>' +
            '<span class="time">' + (times[i] || '–') + '</span>' +
            '<button class="card" onclick="appOpen(\'' + p.id + '\')">' +
              '<div class="copy">' +
                '<h3>' + esc(p.title) + '</h3>' +
                '<p>' + esc(p.category) + ' · ' + esc(p.barrio) + '</p>' +
                '<p>' + badgeSeg(p.seguridad_nivel) + ' ' + badgePrice(p.rango_precios) + '</p>' +
              '</div>' +
            '</button>' +
            '<button class="remove-btn" onclick="appRemove(\'' + p.id + '\')" aria-label="Quitar">×</button>' +
          '</div>';
        }).join('') +
      '</div>' +
      '<div class="actions">' +
        '<button class="primary" onclick="appGo(\'map\')">🗺️ Ver mapa del recorrido</button>' +
        '<button class="secondary" onclick="appSave()">' + (plan.saved ? '✓ Plan guardado' : '💾 Guardar plan') + '</button>' +
        '<button class="secondary" onclick="appNewPlan()">Crear plan nuevo</button>' +
      '</div></section>' +
      navigation('plan');
  }

  function renderMap() {
    var list = planPlaces();
    var places = list.length ? list : catalog.slice(0, 8);
    var focusPlace = get(state.mapPlace) || places[0];
    var mapUrl = buildGoogleMapsUrl(focusPlace);

    root.innerHTML =
      '<section class="screen">' +
      header('Mapa de Bogotá', 'Ubicación de lugares recomendados', true) +
      (list.length
        ? '<div class="row">' + list.map(function(p) {
            return '<button class="chip ' + (p.id === focusPlace.id ? 'active' : '') + '" onclick="appMapFocus(\'' + p.id + '\')">' + p.icon + ' ' + esc(p.title) + '</button>';
          }).join('') + '</div>'
        : '<div class="row">' + CATEGORIES.map(function(c) {
            return '<button class="chip ' + (state.filter === c[0] ? 'active' : '') + '" onclick="appFilter(\'' + c[0] + '\');appGo(\'map\')">' + c[1] + ' ' + c[0] + '</button>';
          }).join('') + '</div>'
      ) +
      '<div class="map-container">' +
        '<iframe title="Mapa de Google Maps: ' + esc(focusPlace.title) + '" src="' + mapUrl + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' +
      '</div>' +
      '<div class="panel summary">' +
        '<div class="mini">' + focusPlace.icon + '</div>' +
        '<div><h3>' + esc(focusPlace.title) + '</h3>' +
        '<p>' + esc(focusPlace.category) + ' · ' + esc(focusPlace.barrio) + '</p>' +
        '<p>' + badgeSeg(focusPlace.seguridad_nivel) + ' ' + badgePrice(focusPlace.rango_precios) + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="tip">🗺️ Mapa de Google Maps centrado en esta ubicación. Usa las fichas superiores para cambiar de lugar.</div>' +
      '<div class="actions">' +
        '<a class="primary" href="' + buildDirectionsUrl(focusPlace) + '" target="_blank" rel="noopener" style="display:block;text-align:center;text-decoration:none">🚗 Cómo llegar con Google Maps</a>' +
        '<button class="secondary" onclick="appOpen(\'' + focusPlace.id + '\')">Ver detalles completos</button>' +
      '</div></section>' +
      navigation('map');
  }

  function renderChat() {
    root.innerHTML =
      '<section class="screen chat">' +
      header('Asistente de Bogotá', 'Recomendaciones en lenguaje natural', true) +
      '<div class="messages" id="chat-messages">' +
        state.chat.map(function(m) {
          return '<div class="msg ' + m.side + '">' + m.text + '</div>';
        }).join('') +
      '</div>' +
      '<div class="suggest">' +
        '<button onclick="appAsk(\'¿Dónde comer ajiaco?\')">🍲 ¿Dónde comer ajiaco?</button>' +
        '<button onclick="appAsk(\'Restaurantes románticos\')">💑 Romántico</button>' +
        '<button onclick="appAsk(\'Comida barata\')">💰 Comida barata</button>' +
        '<button onclick="appAsk(\'¿Cómo llego a La Candelaria?\')">🚌 Ir a La Candelaria</button>' +
        '<button onclick="appAsk(\'Plan cultural para hoy\')">🏛️ Plan cultural</button>' +
        '<button onclick="appAsk(\'Consejos de seguridad\')">🛡️ Seguridad</button>' +
      '</div>' +
      '<form class="chatbar" onsubmit="appSend(event)">' +
        '<input id="chat-input" placeholder="Pregunta sobre restaurantes, lugares o seguridad..." aria-label="Mensaje">' +
        '<button aria-label="Enviar">➤</button>' +
      '</form></section>' +
      navigation('chat');

    var msgs = document.getElementById('chat-messages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
  }

  function renderProfile() {
    var plan = ensurePlan();
    var list = planPlaces();
    root.innerHTML =
      '<section class="screen">' +
      header('Perfil', 'Tu viaje en Bogotá') +
      '<div class="panel profile">' +
        '<div class="avatar">🧭</div>' +
        '<h2>Viajero curioso</h2>' +
        '<p class="sub">Intereses: ' + esc(plan.interests.join(', ')) + '</p>' +
        '<div class="stats">' +
          '<div><b>' + list.length + '</b><span>en mi plan</span></div>' +
          '<div><b>' + (plan.saved ? '1' : '0') + '</b><span>guardados</span></div>' +
          '<div><b>' + state.favs.length + '</b><span>favoritos</span></div>' +
        '</div>' +
      '</div>' +
      '<div class="heading"><h2>Tu itinerario actual</h2></div>' +
      (list.length
        ? '<div class="list">' + list.map(function(p) {
            return '<button class="card" onclick="appOpen(\'' + p.id + '\')">' +
              '<div class="art">' + p.icon + '</div>' +
              '<div class="copy"><h3>' + esc(p.title) + '</h3>' +
              '<p>' + esc(p.category) + ' · ' + esc(p.barrio) + '</p>' +
              '<p>' + badgeSeg(p.seguridad_nivel) + '</p>' +
              '</div><span class="chev">›</span></button>';
          }).join('') + '</div>'
        : '<div class="empty">Aún no tienes un plan. ¡Crea uno para comenzar tu aventura bogotana!</div>'
      ) +
      '<div class="actions"><button class="secondary" onclick="appNewPlan()">Crear plan nuevo</button></div>' +
      '</section>' +
      navigation('profile');
  }

  /* ──────────────────────────────────────────────────────────────
     10. ARRANQUE
     ────────────────────────────────────────────────────────────── */
  renderHome();

}());

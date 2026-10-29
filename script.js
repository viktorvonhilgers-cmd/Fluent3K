/* =============================================================
   FLUENT3K — script.js
   Vanilla JS · SPA Navigation · Spaced Repetition Logic
   ============================================================= */

// ─────────────────────────────────────────────────────────────
// 1.  LANGUAGE DATABASE  (25 European languages)
// ─────────────────────────────────────────────────────────────
const LANGUAGES = {
  de: { name: 'Deutsch',      flag: '🇩🇪' },
  en: { name: 'English',      flag: '🇬🇧' },
  fr: { name: 'Français',     flag: '🇫🇷' },
  es: { name: 'Español',      flag: '🇪🇸' },
  it: { name: 'Italiano',     flag: '🇮🇹' },
  pt: { name: 'Português',    flag: '🇵🇹' },
  nl: { name: 'Nederlands',   flag: '🇳🇱' },
  pl: { name: 'Polski',       flag: '🇵🇱' },
  cs: { name: 'Čeština',      flag: '🇨🇿' },
  sk: { name: 'Slovenčina',   flag: '🇸🇰' },
  hu: { name: 'Magyar',       flag: '🇭🇺' },
  ro: { name: 'Română',       flag: '🇷🇴' },
  sv: { name: 'Svenska',      flag: '🇸🇪' },
  no: { name: 'Norsk',        flag: '🇳🇴' },
  da: { name: 'Dansk',        flag: '🇩🇰' },
  fi: { name: 'Suomi',        flag: '🇫🇮' },
  el: { name: 'Ελληνικά',     flag: '🇬🇷' },
  bg: { name: 'Български',    flag: '🇧🇬' },
  hr: { name: 'Hrvatski',     flag: '🇭🇷' },
  sl: { name: 'Slovenščina',  flag: '🇸🇮' },
  lt: { name: 'Lietuvių',     flag: '🇱🇹' },
  lv: { name: 'Latviešu',     flag: '🇱🇻' },
  et: { name: 'Eesti',        flag: '🇪🇪' },
  uk: { name: 'Українська',   flag: '🇺🇦' },
  ru: { name: 'Русский',      flag: '🇷🇺' },
};

// ─────────────────────────────────────────────────────────────
// 2.  ANCHOR WORD DATABASE  (10 mock words, multi-language)
//     Each word carries translations per language code.
//     English is always the "Anchor" (EN).
// ─────────────────────────────────────────────────────────────
const ANCHOR_WORDS = [
  {
    id: 1,
    anchor: 'house',
    level: 'A1',
    topic: 'Alltag',
    translations: {
      de: 'Haus',       fr: 'maison',     es: 'casa',       it: 'casa',
      pt: 'casa',       nl: 'huis',       pl: 'dom',        cs: 'dům',
      sk: 'dom',        hu: 'ház',        ro: 'casă',       sv: 'hus',
      no: 'hus',        da: 'hus',        fi: 'talo',       el: 'σπίτι',
      bg: 'къща',       hr: 'kuća',       sl: 'hiša',       lt: 'namas',
      lv: 'māja',       et: 'maja',       uk: 'будинок',    ru: 'дом',
      en: 'house',
    },
    examples: {
      en: 'The <em>house</em> is big and comfortable.',
      de: 'Das <em>Haus</em> ist groß und gemütlich.',
      fr: 'La <em>maison</em> est grande et confortable.',
      es: 'La <em>casa</em> es grande y cómoda.',
      it: 'La <em>casa</em> è grande e confortevole.',
      pt: 'A <em>casa</em> é grande e confortável.',
      nl: 'Het <em>huis</em> is groot en comfortabel.',
      pl: 'Ten <em>dom</em> jest duży i wygodny.',
      sv: 'Huset är stort och bekvämt.',
      default: 'The <em>house</em> is big and comfortable.',
    },
    hook: 'Das englische "house" klingt wie das deutsche "Haus" — gleicher Ursprung!',
  },
  {
    id: 2,
    anchor: 'water',
    level: 'A1',
    topic: 'Alltag',
    translations: {
      de: 'Wasser',     fr: 'eau',        es: 'agua',       it: 'acqua',
      pt: 'água',       nl: 'water',      pl: 'woda',       cs: 'voda',
      sk: 'voda',       hu: 'víz',        ro: 'apă',        sv: 'vatten',
      no: 'vann',       da: 'vand',       fi: 'vesi',       el: 'νερό',
      bg: 'вода',       hr: 'voda',       sl: 'voda',       lt: 'vanduo',
      lv: 'ūdens',      et: 'vesi',       uk: 'вода',       ru: 'вода',
      en: 'water',
    },
    examples: {
      en: 'I drink <em>water</em> every morning.',
      de: 'Ich trinke jeden Morgen <em>Wasser</em>.',
      fr: 'Je bois de l\'<em>eau</em> tous les matins.',
      es: 'Bebo <em>agua</em> cada mañana.',
      default: 'I drink <em>water</em> every morning.',
    },
    hook: '"Water" und "Wasser" — nahezu identisch, germanische Wurzel.',
  },
  {
    id: 3,
    anchor: 'work',
    level: 'A1',
    topic: 'Beruf',
    translations: {
      de: 'Arbeit',     fr: 'travail',    es: 'trabajo',    it: 'lavoro',
      pt: 'trabalho',   nl: 'werk',       pl: 'praca',      cs: 'práce',
      sk: 'práca',      hu: 'munka',      ro: 'muncă',      sv: 'arbete',
      no: 'arbeid',     da: 'arbejde',    fi: 'työ',        el: 'εργασία',
      bg: 'работа',     hr: 'posao',      sl: 'delo',       lt: 'darbas',
      lv: 'darbs',      et: 'töö',        uk: 'робота',     ru: 'работа',
      en: 'work',
    },
    examples: {
      en: 'She goes to <em>work</em> by train every day.',
      de: 'Sie fährt jeden Tag mit dem Zug zur <em>Arbeit</em>.',
      fr: 'Elle va au <em>travail</em> en train chaque jour.',
      default: 'She goes to <em>work</em> by train every day.',
    },
    hook: 'Im Englischen = Verb & Nomen. Anchor für "Arbeit/travail/lavoro".',
  },
  {
    id: 4,
    anchor: 'time',
    level: 'A1',
    topic: 'Alltag',
    translations: {
      de: 'Zeit',       fr: 'temps',      es: 'tiempo',     it: 'tempo',
      pt: 'tempo',      nl: 'tijd',       pl: 'czas',       cs: 'čas',
      sk: 'čas',        hu: 'idő',        ro: 'timp',       sv: 'tid',
      no: 'tid',        da: 'tid',        fi: 'aika',       el: 'χρόνος',
      bg: 'време',      hr: 'vrijeme',    sl: 'čas',        lt: 'laikas',
      lv: 'laiks',      et: 'aeg',        uk: 'час',        ru: 'время',
      en: 'time',
    },
    examples: {
      en: 'There\'s no <em>time</em> to waste.',
      de: 'Es gibt keine <em>Zeit</em> zu verlieren.',
      fr: 'Il n\'y a pas de <em>temps</em> à perdre.',
      default: 'There\'s no <em>time</em> to waste.',
    },
    hook: '"Zeit" (DE) und "tid" (SV/NO) — alles dieselbe germanische Wurzel.',
  },
  {
    id: 5,
    anchor: 'person',
    level: 'A1',
    topic: 'Soziales',
    translations: {
      de: 'Person',     fr: 'personne',   es: 'persona',    it: 'persona',
      pt: 'pessoa',     nl: 'persoon',    pl: 'osoba',      cs: 'osoba',
      sk: 'osoba',      hu: 'személy',    ro: 'persoană',   sv: 'person',
      no: 'person',     da: 'person',     fi: 'henkilö',    el: 'πρόσωπο',
      bg: 'човек',      hr: 'osoba',      sl: 'oseba',      lt: 'asmuo',
      lv: 'persona',    et: 'isik',       uk: 'людина',     ru: 'человек',
      en: 'person',
    },
    examples: {
      en: 'Every <em>person</em> has their own story.',
      de: 'Jede <em>Person</em> hat ihre eigene Geschichte.',
      default: 'Every <em>person</em> has their own story.',
    },
    hook: 'Aus dem Lateinischen "persona" — in fast allen romanischen Sprachen identisch!',
  },
  {
    id: 6,
    anchor: 'money',
    level: 'A2',
    topic: 'Finanzen',
    translations: {
      de: 'Geld',       fr: 'argent',     es: 'dinero',     it: 'denaro',
      pt: 'dinheiro',   nl: 'geld',       pl: 'pieniądze',  cs: 'peníze',
      sk: 'peniaze',    hu: 'pénz',       ro: 'bani',       sv: 'pengar',
      no: 'penger',     da: 'penge',      fi: 'raha',       el: 'χρήματα',
      bg: 'пари',       hr: 'novac',      sl: 'denar',      lt: 'pinigai',
      lv: 'nauda',      et: 'raha',       uk: 'гроші',      ru: 'деньги',
      en: 'money',
    },
    examples: {
      en: 'She saves <em>money</em> every month.',
      de: 'Sie spart jeden Monat <em>Geld</em>.',
      fr: 'Elle économise de l\'<em>argent</em> chaque mois.',
      es: 'Ella ahorra <em>dinero</em> cada mes.',
      default: 'She saves <em>money</em> every month.',
    },
    hook: '"Money" → Münze (DE) → aus dem Lateinischen "moneta".',
  },
  {
    id: 7,
    anchor: 'city',
    level: 'A2',
    topic: 'Reisen',
    translations: {
      de: 'Stadt',      fr: 'ville',      es: 'ciudad',     it: 'città',
      pt: 'cidade',     nl: 'stad',       pl: 'miasto',     cs: 'město',
      sk: 'mesto',      hu: 'város',      ro: 'oraș',       sv: 'stad',
      no: 'by',         da: 'by',         fi: 'kaupunki',   el: 'πόλη',
      bg: 'град',       hr: 'grad',       sl: 'mesto',      lt: 'miestas',
      lv: 'pilsēta',    et: 'linn',       uk: 'місто',      ru: 'город',
      en: 'city',
    },
    examples: {
      en: 'Paris is a beautiful <em>city</em>.',
      de: 'Paris ist eine wunderschöne <em>Stadt</em>.',
      fr: 'Paris est une belle <em>ville</em>.',
      default: 'Paris is a beautiful <em>city</em>.',
    },
    hook: '"City" < Latein "civitas" = Bürgerschaft → englisch, französisch, spanisch verwandt.',
  },
  {
    id: 8,
    anchor: 'health',
    level: 'B1',
    topic: 'Gesundheit',
    translations: {
      de: 'Gesundheit',  fr: 'santé',     es: 'salud',      it: 'salute',
      pt: 'saúde',       nl: 'gezondheid',pl: 'zdrowie',    cs: 'zdraví',
      sk: 'zdravie',     hu: 'egészség',  ro: 'sănătate',   sv: 'hälsa',
      no: 'helse',       da: 'helbred',   fi: 'terveys',    el: 'υγεία',
      bg: 'здраве',      hr: 'zdravlje',  sl: 'zdravje',    lt: 'sveikata',
      lv: 'veselība',    et: 'tervis',    uk: 'здоров\'я',  ru: 'здоровье',
      en: 'health',
    },
    examples: {
      en: 'Good <em>health</em> is the greatest wealth.',
      de: 'Gute <em>Gesundheit</em> ist der größte Reichtum.',
      fr: 'La bonne <em>santé</em> est la plus grande richesse.',
      default: 'Good <em>health</em> is the greatest wealth.',
    },
    hook: '"Health" (EN), "Helse" (NO), "Hälsa" (SV) — gleiche germanische Wurzel "heil".',
  },
  {
    id: 9,
    anchor: 'decision',
    level: 'B1',
    topic: 'Beruf',
    translations: {
      de: 'Entscheidung', fr: 'décision',  es: 'decisión',  it: 'decisione',
      pt: 'decisão',      nl: 'beslissing',pl: 'decyzja',   cs: 'rozhodnutí',
      sk: 'rozhodnutie',  hu: 'döntés',    ro: 'decizie',   sv: 'beslut',
      no: 'beslutning',   da: 'beslutning',fi: 'päätös',    el: 'απόφαση',
      bg: 'решение',      hr: 'odluka',    sl: 'odločitev', lt: 'sprendimas',
      lv: 'lēmums',       et: 'otsus',     uk: 'рішення',   ru: 'решение',
      en: 'decision',
    },
    examples: {
      en: 'It was a difficult <em>decision</em> to make.',
      de: 'Es war eine schwierige <em>Entscheidung</em>.',
      fr: 'C\'était une <em>décision</em> difficile à prendre.',
      default: 'It was a difficult <em>decision</em> to make.',
    },
    hook: 'Latein "decisio" → romanische Sprachen fast identisch: decisión/décision/decisione.',
  },
  {
    id: 10,
    anchor: 'consequence',
    level: 'B2',
    topic: 'Beruf',
    translations: {
      de: 'Konsequenz',   fr: 'conséquence', es: 'consecuencia', it: 'conseguenza',
      pt: 'consequência', nl: 'gevolg',       pl: 'konsekwencja', cs: 'důsledek',
      sk: 'dôsledok',     hu: 'következmény', ro: 'consecință',   sv: 'konsekvens',
      no: 'konsekvens',   da: 'konsekvens',   fi: 'seuraus',      el: 'συνέπεια',
      bg: 'последствие',  hr: 'posljedica',   sl: 'posledica',    lt: 'pasekmė',
      lv: 'sekas',        et: 'tagajärg',     uk: 'наслідок',     ru: 'последствие',
      en: 'consequence',
    },
    examples: {
      en: 'Every action has a <em>consequence</em>.',
      de: 'Jede Handlung hat eine <em>Konsequenz</em>.',
      fr: 'Chaque action a une <em>conséquence</em>.',
      default: 'Every action has a <em>consequence</em>.',
    },
    hook: 'Latein "consequentia" — im Deutschen, Schwedischen, Polnischen fast gleich buchstabiert!',
  },
];

// ─────────────────────────────────────────────────────────────
// 3.  APP STATE
// ─────────────────────────────────────────────────────────────
const state = {
  currentView: 'onboarding',
  nativeLang: 'de',
  targetLang: 'en',
  goalLevel: 'A1',

  // Progress
  masteredCount: 150,
  totalWords: 3000,
  todayCount: 0,
  streak: 7,
  accuracy: 84,

  // Level progress (words mastered per level)
  levelProgress: { A1: 120, A2: 28, B1: 2, B2: 0 },
  levelTotal:    { A1: 300, A2: 600, B1: 1500, B2: 600 },

  // Weekly activity (words reviewed per day, Mon–Sun)
  weekActivity: [14, 0, 22, 8, 17, 0, 0],

  // Word states: { id -> 'mastered' | 'learning' | 'new' }
  wordStates: {},

  // Session
  session: {
    queue: [],
    currentIdx: 0,
    isFlipped: false,
    results: { easy: 0, hard: 0, failed: 0 },
    active: false,
  },

  // Library filters
  libFilter: 'all',
  libSearch: '',
};

// Initialize word states from ANCHOR_WORDS
(function initWordStates() {
  ANCHOR_WORDS.forEach((w, i) => {
    if (i < 5)       state.wordStates[w.id] = 'mastered';
    else if (i < 8)  state.wordStates[w.id] = 'learning';
    else             state.wordStates[w.id] = 'new';
  });
})();

// ─────────────────────────────────────────────────────────────
// 4.  NAVIGATION
// ─────────────────────────────────────────────────────────────
function navigate(viewName) {
  if (state.currentView === viewName) return;

  // Hide all views
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));

  // Show target view
  const el = document.getElementById(`view-${viewName}`);
  if (!el) return;
  el.classList.remove('hidden');
  // Restart animation
  el.style.animation = 'none';
  requestAnimationFrame(() => { el.style.animation = ''; });

  state.currentView = viewName;

  // Update nav active state
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewName);
  });

  // Close mobile menu
  document.getElementById('nav-links').classList.remove('open');

  // View-specific init
  if (viewName === 'dashboard') initDashboard();
  if (viewName === 'study')     initStudy();
  if (viewName === 'library')   initLibrary();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─────────────────────────────────────────────────────────────
// 5.  MOBILE MENU
// ─────────────────────────────────────────────────────────────
function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('open');
}

// ─────────────────────────────────────────────────────────────
// 6.  ONBOARDING
// ─────────────────────────────────────────────────────────────
function updateLanguagePreview() {
  const nativeSel = document.getElementById('native-lang');
  const targetSel = document.getElementById('target-lang');
  state.nativeLang = nativeSel.value;
  state.targetLang = targetSel.value;

  const nl = LANGUAGES[state.nativeLang];
  const tl = LANGUAGES[state.targetLang];

  document.getElementById('preview-native').textContent = `${nl.flag} ${nl.name}`;
  document.getElementById('preview-target').textContent = `${tl.flag} ${tl.name}`;
}

function selectLevel(level) {
  state.goalLevel = level;
  document.querySelectorAll('.level-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.level === level);
  });
}

// Topic chip toggle
document.querySelectorAll('.topic-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    chip.classList.toggle('active');
  });
});

function saveProfile() {
  state.nativeLang = document.getElementById('native-lang').value;
  state.targetLang = document.getElementById('target-lang').value;
  navigate('dashboard');
}

// ─────────────────────────────────────────────────────────────
// 7.  DASHBOARD
// ─────────────────────────────────────────────────────────────
function initDashboard() {
  // Greeting
  const hour = new Date().getHours();
  let greeting = 'Guten Morgen';
  if (hour >= 12 && hour < 18) greeting = 'Guten Tag';
  else if (hour >= 18) greeting = 'Guten Abend';
  document.getElementById('dash-greeting').textContent = greeting;

  // Headline with target lang
  const tl = LANGUAGES[state.targetLang];
  document.getElementById('dash-headline').textContent =
    `Bereit für ${tl ? tl.name : 'English'}?`;

  // Core numbers
  document.getElementById('ring-count').textContent      = state.masteredCount;
  document.getElementById('remaining-count').textContent = state.totalWords - state.masteredCount;
  document.getElementById('streak-count').textContent    = state.streak;
  document.getElementById('accuracy-count').textContent  = `${state.accuracy}%`;
  document.getElementById('today-count').textContent     = state.todayCount;

  // Current level badge
  const currentLevel = computeCurrentLevel();
  document.getElementById('stat-level-badge').textContent = `Niveau: ${currentLevel}`;

  // Due count (mock)
  const dueCount = ANCHOR_WORDS.filter(w => state.wordStates[w.id] !== 'mastered').length;
  document.getElementById('due-count').textContent = dueCount;

  // Progress ring
  const pct = state.masteredCount / state.totalWords;
  const circumference = 2 * Math.PI * 52; // r=52
  const offset = circumference * (1 - pct);
  const ringCircle = document.getElementById('ring-fill-circle');
  // Inject gradient defs if not present
  injectSvgGradient();
  setTimeout(() => {
    ringCircle.style.strokeDasharray  = circumference;
    ringCircle.style.strokeDashoffset = offset;
  }, 100);

  // Level bars
  renderLevelBars();

  // Week chart
  renderWeekChart();
}

function computeCurrentLevel() {
  const m = state.masteredCount;
  if (m < 300)  return 'A1';
  if (m < 900)  return 'A2';
  if (m < 2400) return 'B1';
  return 'B2';
}

function injectSvgGradient() {
  const svg = document.getElementById('progress-ring-svg');
  if (!svg || svg.querySelector('defs')) return;
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  defs.innerHTML = `
    <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#4f9cf9"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>`;
  svg.prepend(defs);
}

const LEVEL_COLORS = {
  A1: '#34d399',
  A2: '#38bdf8',
  B1: '#fbbf24',
  B2: '#f87171',
};

function renderLevelBars() {
  const container = document.getElementById('level-bars');
  container.innerHTML = '';
  ['A1', 'A2', 'B1', 'B2'].forEach(level => {
    const done  = state.levelProgress[level];
    const total = state.levelTotal[level];
    const pct   = Math.round((done / total) * 100);
    const row   = document.createElement('div');
    row.className = 'level-bar-row';
    row.innerHTML = `
      <div class="level-bar-label">${level}</div>
      <div class="level-bar-track">
        <div class="level-bar-fill" style="width:0%; background:${LEVEL_COLORS[level]}" data-target="${pct}%"></div>
      </div>
      <div class="level-bar-pct">${done} / ${total}</div>`;
    container.appendChild(row);
  });
  // Animate fills
  setTimeout(() => {
    container.querySelectorAll('.level-bar-fill').forEach(fill => {
      fill.style.width = fill.dataset.target;
    });
  }, 120);
}

const DAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

function renderWeekChart() {
  const container = document.getElementById('week-chart');
  container.innerHTML = '';
  const today = (new Date().getDay() + 6) % 7; // 0=Mon
  const max   = Math.max(...state.weekActivity, 1);

  DAYS.forEach((day, i) => {
    const val  = state.weekActivity[i];
    const pct  = (val / max) * 100;
    const isToday = i === today;
    const wrap = document.createElement('div');
    wrap.className = 'week-bar-wrap';
    wrap.innerHTML = `
      <div class="week-bar${isToday ? ' today' : ''}"
           style="height:${Math.max(pct, 5)}%; background:${isToday ? 'linear-gradient(180deg,#4f9cf9,#3b82f6)' : 'rgba(79,156,249,0.25)'}"
           title="${val} Wörter">
      </div>
      <div class="week-day-label">${day}</div>`;
    container.appendChild(wrap);
  });
}

// ─────────────────────────────────────────────────────────────
// 8.  STUDY SESSION
// ─────────────────────────────────────────────────────────────
function initStudy() {
  // Build queue: non-mastered words + mastered ones at end
  const queue = [
    ...ANCHOR_WORDS.filter(w => state.wordStates[w.id] !== 'mastered'),
    ...ANCHOR_WORDS.filter(w => state.wordStates[w.id] === 'mastered'),
  ];

  state.session = {
    queue,
    currentIdx: 0,
    isFlipped: false,
    results: { easy: 0, hard: 0, failed: 0 },
    active: true,
  };

  // Show card scene, hide end screen
  document.getElementById('card-scene').classList.remove('hidden');
  document.getElementById('sr-buttons').classList.remove('hidden');
  document.getElementById('session-end').classList.add('hidden');

  // Lang pair label
  const nl = LANGUAGES[state.nativeLang];
  const tl = LANGUAGES[state.targetLang];
  document.getElementById('session-lang-pair').textContent =
    `${nl.flag}${nl.name.substring(0,2).toUpperCase()} → ${tl.flag}${tl.name.substring(0,2).toUpperCase()}`;

  renderCard();
}

function renderCard() {
  const sess = state.session;
  const word = sess.queue[sess.currentIdx];
  if (!word) { endSession(); return; }

  // Reset flip
  sess.isFlipped = false;
  const fc = document.getElementById('flashcard');
  fc.classList.remove('flipped');

  // Progress bar + text
  const total = sess.queue.length;
  const idx   = sess.currentIdx;
  const pct   = (idx / total) * 100;
  document.getElementById('session-bar-fill').style.width    = `${pct}%`;
  document.getElementById('session-progress-text').textContent = `${idx + 1} / ${total}`;

  // Front face
  document.getElementById('fc-level-badge').textContent = word.level;
  document.getElementById('fc-topic-badge').textContent  = word.topic;
  document.getElementById('fc-word').textContent         = word.anchor; // English anchor shown

  // Show target language word in example context
  const targetWord = getWordInLang(word, state.targetLang);
  const targetEx   = getExample(word, state.targetLang);
  document.getElementById('fc-word').textContent = targetWord;
  document.getElementById('fc-example').innerHTML = targetEx;

  // Back face
  const nativeWord = getWordInLang(word, state.nativeLang);
  const nativeEx   = getExample(word, state.nativeLang);
  document.getElementById('fc-translation').textContent    = nativeWord;
  document.getElementById('fc-native-example').innerHTML   = nativeEx;
  document.getElementById('fc-hook-text').textContent      = word.hook || `Anchor: "${word.anchor}"`;
}

function getWordInLang(word, lang) {
  return word.translations[lang] || word.translations['en'] || word.anchor;
}

function getExample(word, lang) {
  return word.examples[lang] || word.examples['default'] || word.examples['en'] || '';
}

function flipCard() {
  const sess = state.session;
  if (!sess.active) return;
  sess.isFlipped = !sess.isFlipped;
  document.getElementById('flashcard').classList.toggle('flipped', sess.isFlipped);
}

function srAnswer(rating) {
  const sess = state.session;
  if (!sess.active) return;

  const word = sess.queue[sess.currentIdx];
  if (!word) return;

  // Update result counts
  sess.results[rating]++;

  // Update word state based on rating
  if (rating === 'easy') {
    state.wordStates[word.id] = 'mastered';
    // Update mastered count & today count
    state.masteredCount++;
    state.todayCount++;
    // Update level progress
    if (state.levelProgress[word.level] !== undefined)
      state.levelProgress[word.level]++;
  } else if (rating === 'hard') {
    state.wordStates[word.id] = 'learning';
    state.todayCount++;
  } else {
    // failed — keep in learning
    state.wordStates[word.id] = 'learning';
  }

  // Button feedback animation
  const btnMap = { easy: 'btn-easy', hard: 'btn-hard', failed: 'btn-failed' };
  const btn = document.getElementById(btnMap[rating]);
  if (btn) {
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => { btn.style.transform = ''; }, 150);
  }

  // Next card
  sess.currentIdx++;
  if (sess.currentIdx >= sess.queue.length) {
    endSession();
  } else {
    renderCard();
  }
}

function endSession() {
  const sess = state.session;
  sess.active = false;

  document.getElementById('card-scene').classList.add('hidden');
  document.getElementById('sr-buttons').classList.add('hidden');

  const endEl  = document.getElementById('session-end');
  endEl.classList.remove('hidden');

  const total = sess.results.easy + sess.results.hard + sess.results.failed;
  document.getElementById('session-end-stats').textContent =
    `Du hast heute ${total} Wörter in dieser Session bearbeitet.`;

  const resultsEl = document.getElementById('session-end-results');
  resultsEl.innerHTML = `
    <div class="result-chip easy"><span>${sess.results.easy}</span>Einfach</div>
    <div class="result-chip hard"><span>${sess.results.hard}</span>Schwer</div>
    <div class="result-chip failed"><span>${sess.results.failed}</span>Nicht gewusst</div>`;
}

function restartSession() {
  initStudy();
}

// ─────────────────────────────────────────────────────────────
// 9.  LIBRARY (Wort-Matrix)
// ─────────────────────────────────────────────────────────────
function initLibrary() {
  // Update mini stats
  const mastered = Object.values(state.wordStates).filter(s => s === 'mastered').length;
  const learning = Object.values(state.wordStates).filter(s => s === 'learning').length;
  const newCount = Object.values(state.wordStates).filter(s => s === 'new').length;
  document.getElementById('lib-mastered').textContent = state.masteredCount;
  document.getElementById('lib-learning').textContent = learning;
  document.getElementById('lib-new').textContent = state.totalWords - state.masteredCount - learning;

  renderLibrary();
}

function filterLibrary() {
  state.libSearch = document.getElementById('lib-search').value.toLowerCase();
  renderLibrary();
}

function setLibFilter(filter, btnEl) {
  state.libFilter = filter;
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderLibrary();
}

function renderLibrary() {
  const tbody = document.getElementById('library-tbody');
  const empty = document.getElementById('lib-empty');
  tbody.innerHTML = '';

  const tl = state.targetLang;
  const nl = state.nativeLang;
  const query  = state.libSearch;
  const filter = state.libFilter;

  const filtered = ANCHOR_WORDS.filter(word => {
    const wordStatus = state.wordStates[word.id] || 'new';

    // Level filter
    if (['A1','A2','B1','B2'].includes(filter) && word.level !== filter) return false;
    // Status filter
    if (filter === 'mastered' && wordStatus !== 'mastered') return false;
    if (filter === 'learning' && wordStatus !== 'learning') return false;
    if (filter === 'new'      && wordStatus !== 'new')      return false;

    // Search
    if (query) {
      const targetWord = (word.translations[tl] || '').toLowerCase();
      const nativeWord = (word.translations[nl] || '').toLowerCase();
      const anchorWord = word.anchor.toLowerCase();
      if (!targetWord.includes(query) && !nativeWord.includes(query) && !anchorWord.includes(query)) return false;
    }

    return true;
  });

  if (filtered.length === 0) {
    empty.classList.remove('hidden');
    tbody.parentElement.classList.add('hidden');
    return;
  }

  empty.classList.add('hidden');
  tbody.parentElement.classList.remove('hidden');

  filtered.forEach(word => {
    const status    = state.wordStates[word.id] || 'new';
    const targetW   = word.translations[tl] || word.anchor;
    const nativeW   = word.translations[nl] || '—';
    const statusLabel = { mastered: 'Gemeistert', learning: 'Im Lernen', new: 'Neu' }[status];
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="td-id">${word.id}</td>
      <td class="td-anchor">${word.anchor}</td>
      <td class="td-target">${targetW}</td>
      <td class="td-native">${nativeW}</td>
      <td><span class="level-pill ${word.level}">${word.level}</span></td>
      <td>${word.topic}</td>
      <td><span class="status-dot ${status}">${statusLabel}</span></td>`;
    tbody.appendChild(tr);
  });
}

// ─────────────────────────────────────────────────────────────
// 10.  BOOTSTRAP
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Show onboarding first
  navigate('onboarding');

  // Sync language preview on load
  updateLanguagePreview();
});

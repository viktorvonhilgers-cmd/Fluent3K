/* =============================================================
   FLUENT3K — script.js  (v2 — 3 Übungstypen)
   Karteikarte · Lückentext · Freies Schreiben
   ============================================================= */

// ─────────────────────────────────────────────────────────────
// 1.  SPRACH-DATENBANK  (25 europäische Sprachen)
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
// 2.  ANCHOR-WORT DATENBANK  (10 Wörter, vollständig multi-lingual)
//     Für Cloze + Freies Schreiben: vollständige Sätze in EN + DE.
//     Das System setzt native/target aus den ausgewählten Sprachen ein.
// ─────────────────────────────────────────────────────────────
const ANCHOR_WORDS = [
  {
    id: 1, anchor: 'house', level: 'A1', topic: 'Alltag',
    translations: {
      de: 'Haus', fr: 'maison', es: 'casa', it: 'casa', pt: 'casa',
      nl: 'huis', pl: 'dom', cs: 'dům', sk: 'dom', hu: 'ház', ro: 'casă',
      sv: 'hus', no: 'hus', da: 'hus', fi: 'talo', el: 'σπίτι',
      bg: 'къща', hr: 'kuća', sl: 'hiša', lt: 'namas', lv: 'māja',
      et: 'maja', uk: 'будинок', ru: 'дом', en: 'house',
    },
    examples: {
      en: 'The {house} is big and comfortable.',
      de: 'Das {Haus} ist groß und gemütlich.',
      fr: 'La {maison} est grande et confortable.',
      es: 'La {casa} es grande y cómoda.',
      it: 'La {casa} è grande e confortevole.',
      pt: 'A {casa} é grande e confortável.',
      nl: 'Het {huis} is groot en comfortabel.',
      pl: 'Ten {dom} jest duży i wygodny.',
    },
    // Freies Schreiben: native sentence → target expected output
    writeSentences: {
      // native (DE) → target (EN)
      de_en: { source: 'Mein Haus ist groß.', target: 'My house is big.' },
      de_fr: { source: 'Mein Haus ist groß.', target: 'Ma maison est grande.' },
      de_es: { source: 'Mein Haus ist groß.', target: 'Mi casa es grande.' },
      de_it: { source: 'Mein Haus ist groß.', target: 'La mia casa è grande.' },
      en_de: { source: 'My house is big.',    target: 'Mein Haus ist groß.' },
      en_fr: { source: 'My house is big.',    target: 'Ma maison est grande.' },
    },
    hook: '"house" und "Haus" — gleicher germanischer Ursprung!',
    // Distraktoren für Lückentext
    distractors: { en: ['garden','room','street'], de: ['Garten','Raum','Straße'],
                   fr: ['jardin','pièce','rue'], es: ['jardín','habitación','calle'] },
  },
  {
    id: 2, anchor: 'water', level: 'A1', topic: 'Alltag',
    translations: {
      de: 'Wasser', fr: 'eau', es: 'agua', it: 'acqua', pt: 'água',
      nl: 'water', pl: 'woda', cs: 'voda', sk: 'voda', hu: 'víz', ro: 'apă',
      sv: 'vatten', no: 'vann', da: 'vand', fi: 'vesi', el: 'νερό',
      bg: 'вода', hr: 'voda', sl: 'voda', lt: 'vanduo', lv: 'ūdens',
      et: 'vesi', uk: 'вода', ru: 'вода', en: 'water',
    },
    examples: {
      en: 'I drink {water} every morning.',
      de: 'Ich trinke jeden Morgen {Wasser}.',
      fr: 'Je bois de l\'eau. ({eau})',
      es: 'Bebo {agua} cada mañana.',
    },
    writeSentences: {
      de_en: { source: 'Ich trinke jeden Morgen Wasser.', target: 'I drink water every morning.' },
      de_fr: { source: 'Ich trinke jeden Morgen Wasser.', target: 'Je bois de l\'eau chaque matin.' },
      en_de: { source: 'I drink water every morning.',    target: 'Ich trinke jeden Morgen Wasser.' },
    },
    hook: '"Water" und "Wasser" — nahezu identisch, germanische Wurzel.',
    distractors: { en: ['coffee','juice','milk'], de: ['Kaffee','Saft','Milch'],
                   fr: ['café','jus','lait'], es: ['café','zumo','leche'] },
  },
  {
    id: 3, anchor: 'work', level: 'A1', topic: 'Beruf',
    translations: {
      de: 'Arbeit', fr: 'travail', es: 'trabajo', it: 'lavoro', pt: 'trabalho',
      nl: 'werk', pl: 'praca', cs: 'práce', sk: 'práca', hu: 'munka', ro: 'muncă',
      sv: 'arbete', no: 'arbeid', da: 'arbejde', fi: 'työ', el: 'εργασία',
      bg: 'работа', hr: 'posao', sl: 'delo', lt: 'darbas', lv: 'darbs',
      et: 'töö', uk: 'робота', ru: 'работа', en: 'work',
    },
    examples: {
      en: 'She goes to {work} by train.',
      de: 'Sie fährt mit dem Zug zur {Arbeit}.',
      fr: 'Elle va au {travail} en train.',
      es: 'Ella va al {trabajo} en tren.',
    },
    writeSentences: {
      de_en: { source: 'Ich gehe morgen zur Arbeit.', target: 'I go to work tomorrow.' },
      de_fr: { source: 'Ich gehe morgen zur Arbeit.', target: 'Je vais au travail demain.' },
      en_de: { source: 'I go to work tomorrow.',       target: 'Ich gehe morgen zur Arbeit.' },
    },
    hook: 'Im Englischen = Verb & Nomen. Anker für "Arbeit / travail / lavoro".',
    distractors: { en: ['school','home','gym'], de: ['Schule','Zuhause','Fitnessstudio'],
                   fr: ['école','maison','salle de sport'], es: ['escuela','casa','gimnasio'] },
  },
  {
    id: 4, anchor: 'time', level: 'A1', topic: 'Alltag',
    translations: {
      de: 'Zeit', fr: 'temps', es: 'tiempo', it: 'tempo', pt: 'tempo',
      nl: 'tijd', pl: 'czas', cs: 'čas', sk: 'čas', hu: 'idő', ro: 'timp',
      sv: 'tid', no: 'tid', da: 'tid', fi: 'aika', el: 'χρόνος',
      bg: 'време', hr: 'vrijeme', sl: 'čas', lt: 'laikas', lv: 'laiks',
      et: 'aeg', uk: 'час', ru: 'время', en: 'time',
    },
    examples: {
      en: 'There is no {time} to waste.',
      de: 'Es gibt keine {Zeit} zu verlieren.',
      fr: 'Il n\'y a pas de {temps} à perdre.',
      es: 'No hay {tiempo} que perder.',
    },
    writeSentences: {
      de_en: { source: 'Wir haben keine Zeit.', target: 'We have no time.' },
      de_fr: { source: 'Wir haben keine Zeit.', target: 'Nous n\'avons pas le temps.' },
      en_de: { source: 'We have no time.',       target: 'Wir haben keine Zeit.' },
    },
    hook: '"Zeit" (DE) und "tid" (SV/NO) — dieselbe germanische Wurzel.',
    distractors: { en: ['money','space','place'], de: ['Geld','Raum','Platz'],
                   fr: ['argent','espace','endroit'], es: ['dinero','espacio','lugar'] },
  },
  {
    id: 5, anchor: 'person', level: 'A1', topic: 'Soziales',
    translations: {
      de: 'Person', fr: 'personne', es: 'persona', it: 'persona', pt: 'pessoa',
      nl: 'persoon', pl: 'osoba', cs: 'osoba', sk: 'osoba', hu: 'személy', ro: 'persoană',
      sv: 'person', no: 'person', da: 'person', fi: 'henkilö', el: 'πρόσωπο',
      bg: 'човек', hr: 'osoba', sl: 'oseba', lt: 'asmuo', lv: 'persona',
      et: 'isik', uk: 'людина', ru: 'человек', en: 'person',
    },
    examples: {
      en: 'Every {person} has their own story.',
      de: 'Jede {Person} hat ihre eigene Geschichte.',
      fr: 'Chaque {personne} a sa propre histoire.',
      es: 'Cada {persona} tiene su propia historia.',
    },
    writeSentences: {
      de_en: { source: 'Jede Person ist wichtig.', target: 'Every person is important.' },
      de_fr: { source: 'Jede Person ist wichtig.', target: 'Chaque personne est importante.' },
      en_de: { source: 'Every person is important.', target: 'Jede Person ist wichtig.' },
    },
    hook: 'Latein "persona" — in fast allen romanischen Sprachen identisch!',
    distractors: { en: ['animal','object','group'], de: ['Tier','Objekt','Gruppe'],
                   fr: ['animal','objet','groupe'], es: ['animal','objeto','grupo'] },
  },
  {
    id: 6, anchor: 'money', level: 'A2', topic: 'Finanzen',
    translations: {
      de: 'Geld', fr: 'argent', es: 'dinero', it: 'denaro', pt: 'dinheiro',
      nl: 'geld', pl: 'pieniądze', cs: 'peníze', sk: 'peniaze', hu: 'pénz', ro: 'bani',
      sv: 'pengar', no: 'penger', da: 'penge', fi: 'raha', el: 'χρήματα',
      bg: 'пари', hr: 'novac', sl: 'denar', lt: 'pinigai', lv: 'nauda',
      et: 'raha', uk: 'гроші', ru: 'деньги', en: 'money',
    },
    examples: {
      en: 'She saves {money} every month.',
      de: 'Sie spart jeden Monat {Geld}.',
      fr: 'Elle économise de l\'{argent} chaque mois.',
      es: 'Ella ahorra {dinero} cada mes.',
    },
    writeSentences: {
      de_en: { source: 'Ich habe kein Geld dabei.', target: 'I have no money with me.' },
      de_fr: { source: 'Ich habe kein Geld dabei.', target: 'Je n\'ai pas d\'argent sur moi.' },
      en_de: { source: 'I have no money with me.',  target: 'Ich habe kein Geld dabei.' },
    },
    hook: '"Money" → Münze (DE) → Latein "moneta".',
    distractors: { en: ['time','space','effort'], de: ['Zeit','Raum','Aufwand'],
                   fr: ['temps','espace','effort'], es: ['tiempo','espacio','esfuerzo'] },
  },
  {
    id: 7, anchor: 'city', level: 'A2', topic: 'Reisen',
    translations: {
      de: 'Stadt', fr: 'ville', es: 'ciudad', it: 'città', pt: 'cidade',
      nl: 'stad', pl: 'miasto', cs: 'město', sk: 'mesto', hu: 'város', ro: 'oraș',
      sv: 'stad', no: 'by', da: 'by', fi: 'kaupunki', el: 'πόλη',
      bg: 'град', hr: 'grad', sl: 'mesto', lt: 'miestas', lv: 'pilsēta',
      et: 'linn', uk: 'місто', ru: 'город', en: 'city',
    },
    examples: {
      en: 'Paris is a beautiful {city}.',
      de: 'Paris ist eine wunderschöne {Stadt}.',
      fr: 'Paris est une belle {ville}.',
      es: 'París es una {ciudad} hermosa.',
    },
    writeSentences: {
      de_en: { source: 'Ich lebe in einer großen Stadt.', target: 'I live in a big city.' },
      de_fr: { source: 'Ich lebe in einer großen Stadt.', target: 'Je vis dans une grande ville.' },
      en_de: { source: 'I live in a big city.',            target: 'Ich lebe in einer großen Stadt.' },
    },
    hook: '"City" < Latein "civitas" = Bürgerschaft → EN, FR, ES verwandt.',
    distractors: { en: ['village','country','island'], de: ['Dorf','Land','Insel'],
                   fr: ['village','pays','île'], es: ['pueblo','país','isla'] },
  },
  {
    id: 8, anchor: 'health', level: 'B1', topic: 'Gesundheit',
    translations: {
      de: 'Gesundheit', fr: 'santé', es: 'salud', it: 'salute', pt: 'saúde',
      nl: 'gezondheid', pl: 'zdrowie', cs: 'zdraví', sk: 'zdravie', hu: 'egészség', ro: 'sănătate',
      sv: 'hälsa', no: 'helse', da: 'helbred', fi: 'terveys', el: 'υγεία',
      bg: 'здраве', hr: 'zdravlje', sl: 'zdravje', lt: 'sveikata', lv: 'veselība',
      et: 'tervis', uk: 'здоров\'я', ru: 'здоровье', en: 'health',
    },
    examples: {
      en: 'Good {health} is the greatest wealth.',
      de: 'Gute {Gesundheit} ist der größte Reichtum.',
      fr: 'La bonne {santé} est la plus grande richesse.',
      es: 'La buena {salud} es la mayor riqueza.',
    },
    writeSentences: {
      de_en: { source: 'Gesundheit ist sehr wichtig.', target: 'Health is very important.' },
      de_fr: { source: 'Gesundheit ist sehr wichtig.', target: 'La santé est très importante.' },
      en_de: { source: 'Health is very important.',    target: 'Gesundheit ist sehr wichtig.' },
    },
    hook: '"Health" (EN), "Helse" (NO), "Hälsa" (SV) — alle aus germ. "heil".',
    distractors: { en: ['wealth','strength','beauty'], de: ['Reichtum','Stärke','Schönheit'],
                   fr: ['richesse','force','beauté'], es: ['riqueza','fuerza','belleza'] },
  },
  {
    id: 9, anchor: 'decision', level: 'B1', topic: 'Beruf',
    translations: {
      de: 'Entscheidung', fr: 'décision', es: 'decisión', it: 'decisione', pt: 'decisão',
      nl: 'beslissing', pl: 'decyzja', cs: 'rozhodnutí', sk: 'rozhodnutie', hu: 'döntés', ro: 'decizie',
      sv: 'beslut', no: 'beslutning', da: 'beslutning', fi: 'päätös', el: 'απόφαση',
      bg: 'решение', hr: 'odluka', sl: 'odločitev', lt: 'sprendimas', lv: 'lēmums',
      et: 'otsus', uk: 'рішення', ru: 'решение', en: 'decision',
    },
    examples: {
      en: 'It was a difficult {decision}.',
      de: 'Es war eine schwierige {Entscheidung}.',
      fr: 'C\'était une {décision} difficile.',
      es: 'Fue una {decisión} difícil.',
    },
    writeSentences: {
      de_en: { source: 'Das war eine gute Entscheidung.', target: 'That was a good decision.' },
      de_fr: { source: 'Das war eine gute Entscheidung.', target: 'C\'était une bonne décision.' },
      en_de: { source: 'That was a good decision.',       target: 'Das war eine gute Entscheidung.' },
    },
    hook: 'Latein "decisio" → romanische Sprachen fast identisch.',
    distractors: { en: ['problem','solution','question'], de: ['Problem','Lösung','Frage'],
                   fr: ['problème','solution','question'], es: ['problema','solución','pregunta'] },
  },
  {
    id: 10, anchor: 'consequence', level: 'B2', topic: 'Beruf',
    translations: {
      de: 'Konsequenz', fr: 'conséquence', es: 'consecuencia', it: 'conseguenza', pt: 'consequência',
      nl: 'gevolg', pl: 'konsekwencja', cs: 'důsledek', sk: 'dôsledok', hu: 'következmény', ro: 'consecință',
      sv: 'konsekvens', no: 'konsekvens', da: 'konsekvens', fi: 'seuraus', el: 'συνέπεια',
      bg: 'последствие', hr: 'posljedica', sl: 'posledica', lt: 'pasekmė', lv: 'sekas',
      et: 'tagajärg', uk: 'наслідок', ru: 'последствие', en: 'consequence',
    },
    examples: {
      en: 'Every action has a {consequence}.',
      de: 'Jede Handlung hat eine {Konsequenz}.',
      fr: 'Chaque action a une {conséquence}.',
      es: 'Cada acción tiene una {consecuencia}.',
    },
    writeSentences: {
      de_en: { source: 'Jede Entscheidung hat eine Konsequenz.', target: 'Every decision has a consequence.' },
      de_fr: { source: 'Jede Entscheidung hat eine Konsequenz.', target: 'Chaque décision a une conséquence.' },
      en_de: { source: 'Every decision has a consequence.',       target: 'Jede Entscheidung hat eine Konsequenz.' },
    },
    hook: 'Latein "consequentia" — EN, DE, SV, PL fast gleich buchstabiert!',
    distractors: { en: ['reason','cause','effect'], de: ['Grund','Ursache','Wirkung'],
                   fr: ['raison','cause','effet'], es: ['razón','causa','efecto'] },
  },
];

// ─────────────────────────────────────────────────────────────
// 3.  APP STATE
// ─────────────────────────────────────────────────────────────
const state = {
  currentView: 'onboarding',
  nativeLang:  'de',
  targetLang:  'en',
  goalLevel:   'A1',

  masteredCount: 150,
  totalWords:    3000,
  todayCount:    0,
  streak:        7,
  accuracy:      84,

  levelProgress: { A1: 120, A2: 28, B1: 2, B2: 0 },
  levelTotal:    { A1: 300, A2: 600, B1: 1500, B2: 600 },
  weekActivity:  [14, 0, 22, 8, 17, 0, 0],

  wordStates: {},   // id → 'mastered' | 'learning' | 'new'

  session: {
    // Each item: { word, type: 'flashcard'|'cloze'|'write' }
    queue:      [],
    currentIdx: 0,
    isFlipped:  false,
    results:    { easy: 0, hard: 0, failed: 0 },
    active:     false,
  },

  libFilter: 'all',
  libSearch: '',
};

// Init word states
(function() {
  ANCHOR_WORDS.forEach((w, i) => {
    if (i < 5)      state.wordStates[w.id] = 'mastered';
    else if (i < 8) state.wordStates[w.id] = 'learning';
    else            state.wordStates[w.id] = 'new';
  });
})();

// ─────────────────────────────────────────────────────────────
// 4.  NAVIGATION
// ─────────────────────────────────────────────────────────────
function navigate(viewName) {
  if (state.currentView === viewName) return;
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  const el = document.getElementById(`view-${viewName}`);
  if (!el) return;
  el.classList.remove('hidden');
  el.style.animation = 'none';
  requestAnimationFrame(() => { el.style.animation = ''; });
  state.currentView = viewName;
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.view === viewName));
  document.getElementById('nav-links').classList.remove('open');
  if (viewName === 'dashboard') initDashboard();
  if (viewName === 'study')     initStudy();
  if (viewName === 'library')   initLibrary();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('open');
}

// ─────────────────────────────────────────────────────────────
// 5.  ONBOARDING
// ─────────────────────────────────────────────────────────────
function updateLanguagePreview() {
  state.nativeLang = document.getElementById('native-lang').value;
  state.targetLang = document.getElementById('target-lang').value;
  const nl = LANGUAGES[state.nativeLang];
  const tl = LANGUAGES[state.targetLang];
  document.getElementById('preview-native-tag').textContent = `${nl.flag} ${nl.name}`;
  document.getElementById('preview-target-tag').textContent = `${tl.flag} ${tl.name}`;
}

function selectLevel(level) {
  state.goalLevel = level;
  document.querySelectorAll('.level-btn').forEach(b => b.classList.toggle('active', b.dataset.level === level));
}

document.querySelectorAll('.topic-chip').forEach(chip => {
  chip.addEventListener('click', () => chip.classList.toggle('active'));
});

function saveProfile() {
  state.nativeLang = document.getElementById('native-lang').value;
  state.targetLang = document.getElementById('target-lang').value;
  navigate('dashboard');
}

// ─────────────────────────────────────────────────────────────
// 6.  DASHBOARD
// ─────────────────────────────────────────────────────────────
function initDashboard() {
  const h = new Date().getHours();
  document.getElementById('dash-greeting').textContent =
    h < 12 ? 'Guten Morgen' : h < 18 ? 'Guten Tag' : 'Guten Abend';

  const tl = LANGUAGES[state.targetLang];
  document.getElementById('dash-headline').textContent = `Bereit für ${tl ? tl.name : 'English'}?`;

  const due = ANCHOR_WORDS.filter(w => state.wordStates[w.id] !== 'mastered').length;
  document.getElementById('due-count').textContent     = due;
  document.getElementById('ring-num').textContent      = state.masteredCount;
  document.getElementById('remaining-count').textContent = state.totalWords - state.masteredCount;
  document.getElementById('streak-val').textContent    = state.streak;
  document.getElementById('accuracy-val').textContent  = `${state.accuracy}%`;
  document.getElementById('today-val').textContent     = state.todayCount;
  document.getElementById('level-chip').textContent    = `Niveau ${computeCurrentLevel()}`;

  // Progress ring
  const pct = state.masteredCount / state.totalWords;
  const circ = 2 * Math.PI * 42;
  setTimeout(() => {
    document.getElementById('ring-fg').style.strokeDashoffset = circ * (1 - pct);
  }, 100);

  renderLevelBars();
  renderWeekChart();
}

function computeCurrentLevel() {
  const m = state.masteredCount;
  if (m < 300)  return 'A1';
  if (m < 900)  return 'A2';
  if (m < 2400) return 'B1';
  return 'B2';
}

const LEVEL_COLORS = { A1: '#10b981', A2: '#3b82f6', B1: '#f59e0b', B2: '#ef4444' };

function renderLevelBars() {
  const c = document.getElementById('level-bars');
  c.innerHTML = '';
  ['A1','A2','B1','B2'].forEach(lv => {
    const done  = state.levelProgress[lv];
    const total = state.levelTotal[lv];
    const pct   = Math.round((done / total) * 100);
    const row   = document.createElement('div');
    row.className = 'level-bar-row';
    row.innerHTML = `
      <div class="level-bar-lbl">${lv}</div>
      <div class="level-bar-track">
        <div class="level-bar-fill" style="width:0%;background:${LEVEL_COLORS[lv]}" data-w="${pct}%"></div>
      </div>
      <div class="level-bar-num">${done}/${total}</div>`;
    c.appendChild(row);
  });
  setTimeout(() => {
    c.querySelectorAll('.level-bar-fill').forEach(f => { f.style.width = f.dataset.w; });
  }, 80);
}

const DAYS = ['Mo','Di','Mi','Do','Fr','Sa','So'];
function renderWeekChart() {
  const c = document.getElementById('week-chart');
  c.innerHTML = '';
  const today = (new Date().getDay() + 6) % 7;
  const max   = Math.max(...state.weekActivity, 1);
  DAYS.forEach((d, i) => {
    const pct     = (state.weekActivity[i] / max) * 100;
    const isToday = i === today;
    const col = document.createElement('div');
    col.className = `week-col${isToday ? ' today' : ''}`;
    col.innerHTML = `
      <div class="week-bar-inner" style="height:${Math.max(pct,4)}%;background:${isToday ? '#3b82f6' : '#bfdbfe'}"></div>
      <div class="week-day">${d}</div>`;
    c.appendChild(col);
  });
}

// ─────────────────────────────────────────────────────────────
// 7.  STUDY SESSION — QUEUE BUILDER
//     Jedes Wort bekommt 3 Aufgaben: flashcard → cloze → write
// ─────────────────────────────────────────────────────────────
function buildQueue() {
  const queue = [];
  // Non-mastered first, then mastered
  const ordered = [
    ...ANCHOR_WORDS.filter(w => state.wordStates[w.id] !== 'mastered'),
    ...ANCHOR_WORDS.filter(w => state.wordStates[w.id] === 'mastered'),
  ];
  ordered.forEach(word => {
    queue.push({ word, type: 'flashcard' });
    queue.push({ word, type: 'cloze' });
    queue.push({ word, type: 'write' });
  });
  return queue;
}

function initStudy() {
  const queue = buildQueue();
  state.session = {
    queue,
    currentIdx: 0,
    isFlipped: false,
    results: { easy: 0, hard: 0, failed: 0 },
    active: true,
  };

  // Show all panels
  document.getElementById('ex-flashcard').classList.add('hidden');
  document.getElementById('ex-cloze').classList.add('hidden');
  document.getElementById('ex-write').classList.add('hidden');
  document.getElementById('session-end').classList.add('hidden');

  // Lang badge
  const nl = LANGUAGES[state.nativeLang];
  const tl = LANGUAGES[state.targetLang];
  document.getElementById('study-lang-badge').textContent =
    `${nl.flag} → ${tl.flag}`;

  renderExercise();
}

// ─────────────────────────────────────────────────────────────
// 8.  EXERCISE ROUTER
// ─────────────────────────────────────────────────────────────
function renderExercise() {
  const sess = state.session;
  if (sess.currentIdx >= sess.queue.length) { endSession(); return; }

  const { word, type } = sess.queue[sess.currentIdx];
  const total = sess.queue.length;
  const idx   = sess.currentIdx;

  // Progress
  document.getElementById('study-progress-text').textContent = `${idx + 1} / ${total}`;
  document.getElementById('study-progress-fill').style.width = `${(idx / total) * 100}%`;

  // Type indicator
  ['flashcard','cloze','write'].forEach(t => {
    document.getElementById(`ex-indicator-${t}`).classList.toggle('active', t === type);
  });

  // Hide all exercise panels
  document.getElementById('ex-flashcard').classList.add('hidden');
  document.getElementById('ex-cloze').classList.add('hidden');
  document.getElementById('ex-write').classList.add('hidden');

  if (type === 'flashcard') renderFlashcard(word);
  if (type === 'cloze')     renderCloze(word);
  if (type === 'write')     renderWrite(word);
}

// ─────────────────────────────────────────────────────────────
// 9A.  FLASHCARD EXERCISE
// ─────────────────────────────────────────────────────────────
function renderFlashcard(word) {
  const panel = document.getElementById('ex-flashcard');
  panel.classList.remove('hidden');

  // Reset flip
  state.session.isFlipped = false;
  document.getElementById('flashcard').classList.remove('flipped');

  document.getElementById('fc-level').textContent = word.level;
  document.getElementById('fc-topic').textContent = word.topic;

  const targetWord   = getLangWord(word, state.targetLang);
  const targetEx     = buildExampleHtml(word, state.targetLang, targetWord);
  const nativeWord   = getLangWord(word, state.nativeLang);
  const nativeEx     = buildExampleHtml(word, state.nativeLang, nativeWord);

  document.getElementById('fc-word').textContent       = targetWord;
  document.getElementById('fc-example').innerHTML      = targetEx;
  document.getElementById('fc-translation').textContent = nativeWord;
  document.getElementById('fc-native-example').innerHTML = nativeEx;
  document.getElementById('fc-hook-text').textContent  = word.hook || `Anchor: "${word.anchor}"`;
}

function flipCard() {
  if (!state.session.active) return;
  state.session.isFlipped = !state.session.isFlipped;
  document.getElementById('flashcard').classList.toggle('flipped', state.session.isFlipped);
}

function srAnswer(rating) {
  if (!state.session.active) return;
  const { word } = state.session.queue[state.session.currentIdx];
  state.session.results[rating]++;
  applyRating(word, rating);
  state.session.currentIdx++;
  renderExercise();
}

// ─────────────────────────────────────────────────────────────
// 9B.  CLOZE EXERCISE
// ─────────────────────────────────────────────────────────────
function renderCloze(word) {
  const panel = document.getElementById('ex-cloze');
  panel.classList.remove('hidden');

  const tl       = state.targetLang;
  const correct  = getLangWord(word, tl);
  const rawEx    = word.examples[tl] || word.examples['en'] || `{${correct}}`;
  // Build sentence with blank
  const sentence = rawEx.replace(`{${correct}}`, `<span class="cloze-blank">${correct}</span>`);

  document.getElementById('cloze-sentence').innerHTML = sentence;
  // Hide the answer inside blank with CSS (just visually hide)
  document.querySelectorAll('.cloze-blank').forEach(b => { b.style.color = 'transparent'; });

  // Distractors
  let distractors = (word.distractors[tl] || word.distractors['en'] || ['option1','option2','option3']).slice(0, 3);
  const options = shuffle([correct, ...distractors]);

  const container = document.getElementById('cloze-options');
  container.innerHTML = '';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'cloze-option';
    btn.textContent = opt;
    btn.onclick = () => checkCloze(opt, correct, btn, word);
    container.appendChild(btn);
  });

  document.getElementById('cloze-feedback').classList.add('hidden');
  document.getElementById('cloze-feedback').className = 'cloze-feedback hidden';
  document.getElementById('cloze-next-btn').classList.add('hidden');
}

function checkCloze(chosen, correct, btn, word) {
  // Disable all buttons
  document.querySelectorAll('.cloze-option').forEach(b => { b.disabled = true; });
  // Show answer in blank
  document.querySelectorAll('.cloze-blank').forEach(b => { b.style.color = ''; });

  const ok = chosen.toLowerCase().trim() === correct.toLowerCase().trim();
  btn.classList.add(ok ? 'correct' : 'wrong');

  if (!ok) {
    // Highlight correct
    document.querySelectorAll('.cloze-option').forEach(b => {
      if (b.textContent.toLowerCase().trim() === correct.toLowerCase().trim()) b.classList.add('correct');
    });
  }

  const fb = document.getElementById('cloze-feedback');
  fb.className = `cloze-feedback ${ok ? 'ok' : 'err'}`;
  fb.textContent = ok ? '✓ Richtig!' : `✗ Die richtige Antwort ist: „${correct}"`;
  fb.classList.remove('hidden');

  state.session.results[ok ? 'easy' : 'failed']++;
  applyRating(word, ok ? 'easy' : 'failed');

  document.getElementById('cloze-next-btn').classList.remove('hidden');
}

// ─────────────────────────────────────────────────────────────
// 9C.  FREE WRITING EXERCISE
// ─────────────────────────────────────────────────────────────
function renderWrite(word) {
  const panel = document.getElementById('ex-write');
  panel.classList.remove('hidden');

  // Look up the write pair: nativeLang_targetLang
  const pairKey = `${state.nativeLang}_${state.targetLang}`;
  const fallbackKey = `de_en`; // default fallback
  const pair = word.writeSentences[pairKey] || word.writeSentences[fallbackKey] || {
    source: `Translate: "${getLangWord(word, state.nativeLang)}"`,
    target: getLangWord(word, state.targetLang),
  };

  document.getElementById('write-source').textContent = pair.source;

  // Hint: show the anchor word
  const tl = LANGUAGES[state.targetLang];
  document.getElementById('write-word-hint').innerHTML =
    `Schlüsselwort auf ${tl ? tl.name : 'Englisch'}: <strong>${getLangWord(word, state.targetLang)}</strong>`;

  // Store expected for checking
  panel.dataset.expected = pair.target;
  panel.dataset.wordId   = word.id;

  const input = document.getElementById('write-input');
  input.value = '';
  input.disabled = false;
  input.focus();

  document.getElementById('write-feedback').classList.add('hidden');
  document.getElementById('write-next-btn').classList.add('hidden');
  document.getElementById('write-check-btn').disabled = false;
}

function checkWriting() {
  const panel    = document.getElementById('ex-write');
  const expected = panel.dataset.expected;
  const wordId   = parseInt(panel.dataset.wordId);
  const word     = ANCHOR_WORDS.find(w => w.id === wordId);
  const input    = document.getElementById('write-input');
  const typed    = input.value.trim();

  if (!typed) { input.focus(); return; }

  input.disabled = true;
  document.getElementById('write-check-btn').disabled = true;

  // Flexible matching: lowercase, ignore punctuation
  const normalize = s => s.toLowerCase().replace(/[.,!?'"]/g, '').replace(/\s+/g, ' ').trim();
  const ok = normalize(typed) === normalize(expected);
  // Partial credit: contains most key words
  const typedWords    = normalize(typed).split(' ');
  const expectedWords = normalize(expected).split(' ');
  const overlap       = expectedWords.filter(w => typedWords.includes(w)).length;
  const partial       = overlap >= Math.ceil(expectedWords.length * 0.7);

  const fb = document.getElementById('write-feedback');
  fb.classList.remove('hidden');

  if (ok) {
    fb.className = 'write-feedback ok';
    fb.innerHTML = `<div class="wf-label">✓ Perfekt!</div>`;
    state.session.results['easy']++;
    applyRating(word, 'easy');
  } else if (partial) {
    fb.className = 'write-feedback err';
    fb.innerHTML = `<div class="wf-label">~ Fast richtig</div>
      <div>Musterlösung: <span class="wf-expected">${expected}</span></div>`;
    state.session.results['hard']++;
    applyRating(word, 'hard');
  } else {
    fb.className = 'write-feedback err';
    fb.innerHTML = `<div class="wf-label">✗ Noch nicht ganz</div>
      <div>Musterlösung: <span class="wf-expected">${expected}</span></div>`;
    state.session.results['failed']++;
    applyRating(word, 'failed');
  }

  document.getElementById('write-next-btn').classList.remove('hidden');
}

// Enter key submits writing
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.ctrlKey) {
    const panel = document.getElementById('ex-write');
    if (!panel.classList.contains('hidden') && !document.getElementById('write-check-btn').disabled) {
      checkWriting();
    }
  }
});

function nextExercise() {
  state.session.currentIdx++;
  renderExercise();
}

// ─────────────────────────────────────────────────────────────
// 10.  RATING LOGIC
// ─────────────────────────────────────────────────────────────
function applyRating(word, rating) {
  if (rating === 'easy') {
    state.wordStates[word.id] = 'mastered';
    state.masteredCount++;
    state.todayCount++;
    if (state.levelProgress[word.level] !== undefined) state.levelProgress[word.level]++;
  } else if (rating === 'hard') {
    state.wordStates[word.id] = 'learning';
    state.todayCount++;
  } else {
    state.wordStates[word.id] = 'learning';
  }
}

// ─────────────────────────────────────────────────────────────
// 11.  SESSION END
// ─────────────────────────────────────────────────────────────
function endSession() {
  const sess = state.session;
  sess.active = false;
  document.getElementById('ex-flashcard').classList.add('hidden');
  document.getElementById('ex-cloze').classList.add('hidden');
  document.getElementById('ex-write').classList.add('hidden');

  const end = document.getElementById('session-end');
  end.classList.remove('hidden');

  const total = sess.results.easy + sess.results.hard + sess.results.failed;
  document.getElementById('session-end-stat').textContent = `Du hast ${total} Aufgaben bearbeitet.`;
  document.getElementById('result-row').innerHTML = `
    <div class="result-chip easy"><span>${sess.results.easy}</span>Einfach</div>
    <div class="result-chip hard"><span>${sess.results.hard}</span>Schwer</div>
    <div class="result-chip failed"><span>${sess.results.failed}</span>Nicht gewusst</div>`;
}

// ─────────────────────────────────────────────────────────────
// 12.  LIBRARY
// ─────────────────────────────────────────────────────────────
function initLibrary() {
  const mastered = Object.values(state.wordStates).filter(s => s === 'mastered').length;
  const learning = Object.values(state.wordStates).filter(s => s === 'learning').length;
  document.getElementById('lib-mastered').textContent = state.masteredCount;
  document.getElementById('lib-learning').textContent = learning;
  document.getElementById('lib-new').textContent      = state.totalWords - state.masteredCount - learning;
  renderLibrary();
}

function filterLibrary() {
  state.libSearch = document.getElementById('lib-search').value.toLowerCase();
  renderLibrary();
}

function setLibFilter(f, btn) {
  state.libFilter = f;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderLibrary();
}

function renderLibrary() {
  const tl = state.targetLang;
  const nl = state.nativeLang;
  const tbody = document.getElementById('lib-tbody');
  const empty = document.getElementById('lib-empty');
  tbody.innerHTML = '';

  const filtered = ANCHOR_WORDS.filter(word => {
    const status = state.wordStates[word.id] || 'new';
    const f = state.libFilter;
    if (['A1','A2','B1','B2'].includes(f) && word.level !== f) return false;
    if (f === 'mastered' && status !== 'mastered') return false;
    if (f === 'learning' && status !== 'learning') return false;
    if (f === 'new'      && status !== 'new')      return false;
    if (state.libSearch) {
      const tw = (word.translations[tl] || '').toLowerCase();
      const nw = (word.translations[nl] || '').toLowerCase();
      const aw = word.anchor.toLowerCase();
      if (!tw.includes(state.libSearch) && !nw.includes(state.libSearch) && !aw.includes(state.libSearch)) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    empty.classList.remove('hidden');
    document.getElementById('lib-table').style.display = 'none';
    return;
  }
  empty.classList.add('hidden');
  document.getElementById('lib-table').style.display = '';

  const labels = { mastered: 'Gemeistert', learning: 'Im Lernen', new: 'Neu' };
  filtered.forEach(word => {
    const status = state.wordStates[word.id] || 'new';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="td-id">${word.id}</td>
      <td class="td-anchor">${word.anchor}</td>
      <td class="td-target">${word.translations[tl] || word.anchor}</td>
      <td class="td-native">${word.translations[nl] || '—'}</td>
      <td><span class="lvl-pill ${word.level}">${word.level}</span></td>
      <td style="color:var(--text-2);font-size:12px">${word.topic}</td>
      <td><span class="status-dot ${status}">${labels[status]}</span></td>`;
    tbody.appendChild(tr);
  });
}

// ─────────────────────────────────────────────────────────────
// 13.  HELPERS
// ─────────────────────────────────────────────────────────────
function getLangWord(word, lang) {
  return word.translations[lang] || word.translations['en'] || word.anchor;
}

function buildExampleHtml(word, lang, targetWord) {
  const raw = word.examples[lang] || word.examples['en'] || '';
  return raw.replace(`{${targetWord}}`, `<em>${targetWord}</em>`);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─────────────────────────────────────────────────────────────
// 14.  BOOT
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  navigate('onboarding');
  updateLanguagePreview();
});

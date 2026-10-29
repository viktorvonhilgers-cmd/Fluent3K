(function () {
  'use strict';

  /* ---------- Konstanten ---------- */
  var TOTAL = 3000;
  var STORE_KEY = 'fluent3k.v1';
  var DAY = 86400000;
  var HOUR = 3600000;
  var INTERVALS = [0, 1, 3, 7, 14, 30]; // Tage pro Box
  var PAGES = ['dashboard', 'learn', 'library', 'settings'];

  var LANGS = {
    es: { name: 'Spanisch', to: 'Spanische', voice: 'es-ES' },
    en: { name: 'Englisch', to: 'Englische', voice: 'en-US' },
    fr: { name: 'Französisch', to: 'Französische', voice: 'fr-FR' },
    sv: { name: 'Schwedisch', to: 'Schwedische', voice: 'sv-SE' }
  };

  var STATUS_LABEL = { 'new': 'Neu', learning: 'Am Lernen', mastered: 'Gemeistert' };

  var MODES = {
    cards: 'Aktives Erinnern: Du rufst die Bedeutung ab, bevor du die Karte umdrehst, und bewertest dich ehrlich.',
    type: 'Produktives Abrufen: Du schreibst das Wort aus dem Gedächtnis. Das ist anstrengender, prägt aber Bedeutung und Schreibweise besonders gut ein.',
    cloze: 'Abrufen im Kontext: Du ergänzt das fehlende Wort im Satz und lernst gleich, wie es verwendet wird.'
  };

  /* ---------- Dummy-Datenbank ---------- */
  // l[Sprache] = [Wort, Beispielsatz, Aussprache (vereinfacht)]
  var WORDS = [
    { id: 1, de: 'Haus', ctx: 'Das Haus ist groß.', l: {
      es: ['casa', 'La casa es grande.', 'KA-sa'],
      en: ['house', 'The house is big.', 'haus'],
      fr: ['maison', 'La maison est grande.', 'mè-ZÕ'],
      sv: ['hus', 'Huset är stort.', 'hüüs'] } },
    { id: 2, de: 'Wasser', ctx: 'Ich trinke Wasser.', l: {
      es: ['agua', 'Yo bebo agua.', 'A-gua'],
      en: ['water', 'I drink water.', 'WO-ter'],
      fr: ['eau', "Je bois de l'eau.", 'o'],
      sv: ['vatten', 'Jag dricker vatten.', 'VAT-ten'] } },
    { id: 3, de: 'Freund', ctx: 'Er ist mein Freund.', l: {
      es: ['amigo', 'Él es mi amigo.', 'a-MI-go'],
      en: ['friend', 'He is my friend.', 'frend'],
      fr: ['ami', 'Il est mon ami.', 'a-MI'],
      sv: ['vän', 'Han är min vän.', 'vänn'] } },
    { id: 4, de: 'Zeit', ctx: 'Ich habe keine Zeit.', l: {
      es: ['tiempo', 'No tengo tiempo.', 'TYEM-po'],
      en: ['time', 'I have no time.', 'taim'],
      fr: ['temps', "Je n'ai pas le temps.", 'tã'],
      sv: ['tid', 'Jag har ingen tid.', 'tiid'] } },
    { id: 5, de: 'Buch', ctx: 'Das Buch ist neu.', l: {
      es: ['libro', 'El libro es nuevo.', 'LI-bro'],
      en: ['book', 'The book is new.', 'buk'],
      fr: ['livre', 'Le livre est nouveau.', 'LI-vr'],
      sv: ['bok', 'Boken är ny.', 'bōk'] } },
    { id: 6, de: 'Essen', ctx: 'Das Essen ist gut.', l: {
      es: ['comida', 'La comida es buena.', 'ko-MI-da'],
      en: ['food', 'The food is good.', 'fud'],
      fr: ['nourriture', 'La nourriture est bonne.', 'nu-ri-TÜR'],
      sv: ['mat', 'Maten är god.', 'maat'] } },
    { id: 7, de: 'Stadt', ctx: 'Die Stadt ist alt.', l: {
      es: ['ciudad', 'La ciudad es vieja.', 'siu-DAD'],
      en: ['city', 'The city is old.', 'SI-ti'],
      fr: ['ville', 'La ville est vieille.', 'vil'],
      sv: ['stad', 'Staden är gammal.', 'staad'] } },
    { id: 8, de: 'Arbeit', ctx: 'Ich liebe meine Arbeit.', l: {
      es: ['trabajo', 'Amo mi trabajo.', 'tra-BA-cho'],
      en: ['work', 'I love my work.', 'wörk'],
      fr: ['travail', "J'aime mon travail.", 'tra-VAI'],
      sv: ['arbete', 'Jag älskar mitt arbete.', 'AR-be-te'] } },
    { id: 9, de: 'Tag', ctx: 'Heute ist ein guter Tag.', l: {
      es: ['día', 'Hoy es un buen día.', 'DI-a'],
      en: ['day', 'Today is a good day.', 'dei'],
      fr: ['jour', "Aujourd'hui, c'est un bon jour.", 'schur'],
      sv: ['dag', 'Idag är en bra dag.', 'daag'] } },
    { id: 10, de: 'Frau', ctx: 'Die Frau lächelt.', l: {
      es: ['mujer', 'La mujer sonríe.', 'mu-CHER'],
      en: ['woman', 'The woman smiles.', 'WU-men'],
      fr: ['femme', 'La femme sourit.', 'fam'],
      sv: ['kvinna', 'Kvinnan ler.', 'KVIN-na'] } },
    { id: 11, de: 'Kind', ctx: 'Das Kind spielt.', l: {
      es: ['niño', 'El niño juega.', 'NI-nyo'],
      en: ['child', 'The child plays.', 'tschaild'],
      fr: ['enfant', "L'enfant joue.", 'ã-FÃ'],
      sv: ['barn', 'Barnet leker.', 'barn'] } },
    { id: 12, de: 'Straße', ctx: 'Die Straße ist lang.', l: {
      es: ['calle', 'La calle es larga.', 'KA-lje'],
      en: ['street', 'The street is long.', 'striit'],
      fr: ['rue', 'La rue est longue.', 'rü'],
      sv: ['gata', 'Gatan är lång.', 'GAA-ta'] } },
    { id: 13, de: 'Brot', ctx: 'Ich kaufe Brot.', l: {
      es: ['pan', 'Compro pan.', 'pan'],
      en: ['bread', 'I buy bread.', 'bred'],
      fr: ['pain', "J'achète du pain.", 'pẽ'],
      sv: ['bröd', 'Jag köper bröd.', 'brööd'] } },
    { id: 14, de: 'Sonne', ctx: 'Die Sonne scheint.', l: {
      es: ['sol', 'El sol brilla.', 'sol'],
      en: ['sun', 'The sun shines.', 'san'],
      fr: ['soleil', 'Le soleil brille.', 'so-LÄJ'],
      sv: ['sol', 'Solen skiner.', 'suul'] } },
    { id: 15, de: 'Nacht', ctx: 'Die Nacht ist still.', l: {
      es: ['noche', 'La noche es silenciosa.', 'NO-tsche'],
      en: ['night', 'The night is quiet.', 'nait'],
      fr: ['nuit', 'La nuit est calme.', 'nüi'],
      sv: ['natt', 'Natten är tyst.', 'nat'] } },
    { id: 16, de: 'Wort', ctx: 'Jedes Wort zählt.', l: {
      es: ['palabra', 'Cada palabra cuenta.', 'pa-LA-bra'],
      en: ['word', 'Every word counts.', 'wörd'],
      fr: ['mot', 'Chaque mot compte.', 'mo'],
      sv: ['ord', 'Varje ord räknas.', 'uurd'] } }
  ];

  /* ---------- Hilfsfunktionen ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Vergleichsform: Kleinbuchstaben, ohne Akzente und Satzzeichen
  function norm(s) {
    return String(s).toLowerCase().normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\p{L}\p{N}]/gu, '');
  }

  function byId(id) {
    for (var i = 0; i < WORDS.length; i++) if (WORDS[i].id === id) return WORDS[i];
    return null;
  }

  function todayKey() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  /* ---------- Zustand & LocalStorage ---------- */
  function defaults() {
    return { lang: 'es', goal: 20, audio: true, autoplay: false, rate: 0.9, mode: 'cards', progress: {}, daily: { date: '', count: 0 } };
  }

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return defaults();
      var s = Object.assign(defaults(), JSON.parse(raw));
      if (!LANGS[s.lang]) s.lang = 'es';
      if (!MODES[s.mode]) s.mode = 'cards';
      return s;
    } catch (e) {
      return defaults();
    }
  }

  var state = load();

  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* Speicher nicht verfügbar */ }
  }

  function prog() {
    if (!state.progress[state.lang]) state.progress[state.lang] = {};
    return state.progress[state.lang];
  }

  function todayCount() {
    return state.daily.date === todayKey() ? state.daily.count : 0;
  }

  /* ---------- SRS-Logik ---------- */
  function statusOf(id) {
    var p = prog()[id];
    if (!p) return 'new';
    return p.box >= 4 ? 'mastered' : 'learning';
  }

  function isDue(id) {
    var p = prog()[id];
    return !p || p.due <= Date.now();
  }

  function applyRating(id, grade) {
    var p = prog()[id] || { box: 0, due: 0 };
    var now = Date.now();

    if (grade === 'again') {
      p.box = 0;
      p.due = now + 10 * 60000;
    } else if (grade === 'hard') {
      p.box = Math.max(1, p.box - 1);
      p.due = now + Math.max(12 * HOUR, INTERVALS[p.box] * DAY / 2);
    } else {
      p.box = Math.min(5, p.box + (grade === 'easy' ? 2 : 1));
      p.due = now + INTERVALS[p.box] * DAY;
    }
    prog()[id] = p;

    if (grade !== 'again') {
      if (state.daily.date !== todayKey()) state.daily = { date: todayKey(), count: 0 };
      state.daily.count++;
    }
  }

  /* ---------- Audio ---------- */
  var canSpeak = 'speechSynthesis' in window;

  function speak(texts) {
    if (!state.audio || !canSpeak) return;
    window.speechSynthesis.cancel();
    texts.forEach(function (t) {
      var u = new SpeechSynthesisUtterance(t);
      u.lang = LANGS[state.lang].voice;
      u.rate = state.rate;
      window.speechSynthesis.speak(u);
    });
  }

  function speakCurrent() {
    if (!queue.length) return;
    var d = byId(queue[0]).l[state.lang];
    speak([d[0], d[1]]);
  }

  function updateSpeakButtons() {
    var off = !(state.audio && canSpeak);
    $('#btn-speak').disabled = off;
    $('#i-speak').disabled = off;
  }

  /* ---------- Dashboard ---------- */
  function setBar(sel, pct) {
    $(sel).style.width = Math.max(0, Math.min(100, pct)) + '%';
  }

  function counts() {
    var c = { 'new': 0, learning: 0, mastered: 0 };
    WORDS.forEach(function (w) { c[statusOf(w.id)]++; });
    return c;
  }

  function renderDashboard() {
    var c = counts();
    var today = todayCount();
    var due = WORDS.filter(function (w) { return isDue(w.id); }).length;
    var totalPct = c.mastered / TOTAL * 100;

    $('#dash-lang').textContent = 'Lernsprache: ' + LANGS[state.lang].name + ' · Ausgangssprache: Deutsch';
    $('#stat-mastered').textContent = c.mastered;
    $('#stat-today').textContent = today + ' / ' + state.goal;
    $('#stat-due').textContent = due;

    setBar('#bar-total', totalPct);
    $('#bar-total-label').textContent = c.mastered + ' / ' + TOTAL + ' Wörter gemeistert (' + totalPct.toFixed(1) + ' %)';

    setBar('#bar-today', today / state.goal * 100);
    $('#bar-today-label').textContent = today >= state.goal
      ? 'Tagesziel erreicht.'
      : 'Noch ' + (state.goal - today) + ' Wörter bis zum Tagesziel.';

    setBar('#bar-sample', c.mastered / WORDS.length * 100);
    $('#bar-sample-label').textContent = 'Demo-Auszug mit ' + WORDS.length + ' von ' + TOTAL + ' Wörtern: '
      + c['new'] + ' neu · ' + c.learning + ' am Lernen · ' + c.mastered + ' gemeistert';
  }

  /* ---------- Lernen: gemeinsame Warteschlange ---------- */
  var queue = [];
  var panels = { cards: $('#ex-cards'), intro: $('#ex-intro'), write: $('#ex-write') };

  function buildQueue() {
    var p = prog();
    var now = Date.now();
    var learned = WORDS.filter(function (w) { return p[w.id] && p[w.id].due <= now; })
      .sort(function (a, b) { return p[a.id].due - p[b.id].due; });
    var fresh = WORDS.filter(function (w) { return !p[w.id]; });
    queue = learned.concat(fresh).map(function (w) { return w.id; });
  }

  // Karte nach "offset" weiteren Karten erneut einreihen
  function reinsert(id, offset) {
    queue.splice(Math.min(queue.length, offset), 0, id);
  }

  function showPanel(name) {
    Object.keys(panels).forEach(function (k) { panels[k].hidden = (k !== name); });
  }

  function renderExercise() {
    var area = $('#learn-area');
    var done = $('#learn-done');
    var meta = $('#learn-meta');

    $$('#modes .mode').forEach(function (b) {
      var on = b.getAttribute('data-mode') === state.mode;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    $('#mode-desc').textContent = MODES[state.mode];
    if (canSpeak) window.speechSynthesis.cancel();

    meta.textContent = LANGS[state.lang].name + ' · ' + queue.length + ' Karten in dieser Sitzung · Tagesziel '
      + todayCount() + ' / ' + state.goal;

    if (!queue.length) {
      area.hidden = true;
      done.hidden = false;
      return;
    }
    area.hidden = false;
    done.hidden = true;
    updateSpeakButtons();

    var id = queue[0];
    if (state.mode === 'cards') renderCards(id);
    else if (!prog()[id]) renderIntro(id);
    else renderWrite(id);
  }

  /* ---------- Übung 1: Karteikarten ---------- */
  var flipped = false;
  var card = $('#card');
  var rateButtons = $$('#rate button');

  function setFlip(f) {
    flipped = f;
    card.classList.toggle('flipped', f);
    card.setAttribute('aria-pressed', f ? 'true' : 'false');
    rateButtons.forEach(function (b) { b.disabled = !f; });
  }

  function renderCards(id) {
    showPanel('cards');
    var w = byId(id);
    var d = w.l[state.lang];

    card.classList.add('no-anim');
    setFlip(false);
    void card.offsetWidth;
    card.classList.remove('no-anim');

    $('#card-word').textContent = d[0];
    $('#card-example').textContent = d[1];
    $('#card-trans').textContent = w.de;
    $('#card-ctx').textContent = w.ctx;
    $('#card-pron').textContent = 'Aussprache (vereinfacht): ' + d[2];

    if (state.autoplay) speak([d[0]]);
  }

  function rateCurrent(grade) {
    if (!queue.length || !flipped) return;
    var id = queue.shift();
    applyRating(id, grade);
    if (grade === 'again') reinsert(id, 4);
    save();
    renderExercise();
  }

  /* ---------- Vorstellung neuer Wörter ---------- */
  function renderIntro(id) {
    showPanel('intro');
    var w = byId(id);
    var d = w.l[state.lang];
    $('#i-word').textContent = d[0];
    $('#i-trans').textContent = w.de;
    $('#i-example').textContent = d[1] + ' – ' + w.ctx;
    $('#i-pron').textContent = 'Aussprache (vereinfacht): ' + d[2];
    if (state.autoplay) speak([d[0], d[1]]);
  }

  function introDone() {
    if (!queue.length) return;
    var id = queue.shift();
    prog()[id] = { box: 0, due: Date.now() };
    save();
    reinsert(id, 3); // wenige Karten später abfragen
    renderExercise();
  }

  /* ---------- Übung 2 und 3: Eintippen und Lückentext ---------- */
  var cur = null;
  var answered = false;
  var resultOk = false;

  function buildCloze(sentence, lemma) {
    var re = /[\p{L}\p{M}]+/gu;
    var tokens = [];
    var m;
    while ((m = re.exec(sentence)) !== null) tokens.push({ text: m[0], index: m.index });
    var nl = norm(lemma);
    var found = tokens.filter(function (t) { return norm(t.text) === nl; })[0]
      || tokens.filter(function (t) { return norm(t.text).indexOf(nl) === 0; })[0]
      || tokens.filter(function (t) { return norm(t.text).indexOf(nl) !== -1; })[0];
    if (!found) return null;
    return {
      before: sentence.slice(0, found.index),
      after: sentence.slice(found.index + found.text.length),
      answer: found.text
    };
  }

  function renderWrite(id) {
    showPanel('write');
    var w = byId(id);
    var d = w.l[state.lang];
    var cloze = state.mode === 'cloze' ? buildCloze(d[1], d[0]) : null;

    cur = { id: id, answer: cloze ? cloze.answer : d[0] };
    answered = false;
    resultOk = false;

    var main = $('#w-main');
    main.textContent = '';
    if (cloze) {
      main.className = 'prompt-main sentence';
      main.appendChild(document.createTextNode(cloze.before));
      var blank = document.createElement('span');
      blank.className = 'blank';
      main.appendChild(blank);
      main.appendChild(document.createTextNode(cloze.after));
      $('#w-tag').textContent = 'Lückentext';
      $('#w-sub').textContent = w.ctx;
      $('#w-hint').textContent = norm(cloze.answer) !== norm(d[0])
        ? 'Hinweis: Grundform „' + d[0] + '“, im Satz gebeugt.'
        : '';
    } else {
      main.className = 'prompt-main';
      main.textContent = w.de;
      $('#w-tag').textContent = 'Eintippen';
      $('#w-sub').textContent = 'Übersetze ins ' + LANGS[state.lang].to + '.';
      $('#w-hint').textContent = '';
    }

    var input = $('#w-input');
    input.value = '';
    input.readOnly = false;
    $('#w-submit').textContent = 'Prüfen';
    $('#w-feedback').hidden = true;
    $('#w-giveup').disabled = false;
    $('#w-speak').disabled = true;
    input.focus();
  }

  function checkAnswer(giveUp) {
    if (!cur || answered) return;
    var w = byId(cur.id);
    var d = w.l[state.lang];
    var typed = $('#w-input').value.trim();
    var ok = false;
    var note = '';

    if (!giveUp && typed) {
      if (typed.toLowerCase() === cur.answer.toLowerCase()) {
        ok = true;
      } else if (norm(typed) === norm(cur.answer)) {
        ok = true;
        note = 'Richtig, aber achte auf die genaue Schreibweise.';
      }
    }

    applyRating(cur.id, ok ? 'good' : 'again');
    save();
    answered = true;
    resultOk = ok;

    var fb = $('#w-feedback');
    fb.hidden = false;
    fb.className = 'feedback ' + (ok ? 'ok' : 'fail');
    $('#w-result').textContent = ok ? 'Richtig.' : (typed && !giveUp ? 'Nicht ganz.' : 'Kein Problem.');
    $('#w-answer').textContent = 'Antwort: ' + cur.answer;
    $('#w-note').textContent = note || (!ok && typed && !giveUp ? 'Deine Eingabe: ' + typed : '');
    $('#w-full').textContent = d[1] + ' – ' + w.ctx;

    $('#w-input').readOnly = true;
    $('#w-giveup').disabled = true;
    $('#w-speak').disabled = !(state.audio && canSpeak);
    $('#w-submit').textContent = 'Weiter';
    $('#w-submit').focus();

    if (state.autoplay) speak([d[0]]);
  }

  function nextWrite() {
    if (!queue.length) return;
    var id = queue.shift();
    if (!resultOk) reinsert(id, 3);
    renderExercise();
  }

  /* ---------- Bibliothek ---------- */
  var libFilter = 'all';

  function fmtDue(p) {
    if (!p) return '–';
    var diff = p.due - Date.now();
    if (diff <= 0) return 'Jetzt';
    if (diff < HOUR) return 'in ' + Math.max(1, Math.round(diff / 60000)) + ' Min.';
    if (diff < DAY) return 'in ' + Math.round(diff / HOUR) + ' Std.';
    var days = Math.round(diff / DAY);
    return 'in ' + days + (days === 1 ? ' Tag' : ' Tagen');
  }

  function renderLibrary() {
    var q = $('#lib-search').value.trim().toLowerCase();
    var p = prog();

    var rows = WORDS.filter(function (w) {
      var d = w.l[state.lang];
      if (libFilter !== 'all' && statusOf(w.id) !== libFilter) return false;
      return !q || d[0].toLowerCase().indexOf(q) !== -1 || w.de.toLowerCase().indexOf(q) !== -1;
    });

    $('#lib-body').innerHTML = rows.length
      ? rows.map(function (w) {
          var st = statusOf(w.id);
          return '<tr>'
            + '<td class="word">' + esc(w.l[state.lang][0]) + '</td>'
            + '<td>' + esc(w.de) + '</td>'
            + '<td><span class="badge ' + st + '">' + STATUS_LABEL[st] + '</span></td>'
            + '<td>' + fmtDue(p[w.id]) + '</td>'
            + '</tr>';
        }).join('')
      : '<tr><td class="empty-row" colspan="4">Keine Wörter gefunden.</td></tr>';

    $('#lib-count').textContent = rows.length + ' von ' + WORDS.length + ' Wörtern (Demo-Auszug aus ' + TOTAL + ')';
  }

  /* ---------- Einstellungen ---------- */
  var saveTimer = null;
  var SAVE_DEFAULT = 'Änderungen werden automatisch gespeichert.';

  function flashSaved() {
    var el = $('#save-status');
    el.textContent = 'Gespeichert.';
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () { el.textContent = SAVE_DEFAULT; }, 1800);
  }

  function renderSettings() {
    $('#set-lang').value = state.lang;
    $('#set-goal').value = String(state.goal);
    $('#set-audio').checked = state.audio;
    $('#set-autoplay').checked = state.autoplay;
    $('#set-rate').value = state.rate;
    $('#set-rate-val').textContent = '(' + Number(state.rate).toFixed(1) + '×)';
    $('#set-autoplay').disabled = !state.audio;
    $('#set-rate').disabled = !state.audio;
    $('#save-status').textContent = SAVE_DEFAULT;
  }

  /* ---------- Router ---------- */
  var currentPage = 'dashboard';

  function show(page) {
    if (PAGES.indexOf(page) === -1) page = 'dashboard';
    currentPage = page;

    PAGES.forEach(function (p) { $('#page-' + p).hidden = (p !== page); });
    $$('.nav a').forEach(function (a) {
      var on = a.getAttribute('data-page') === page;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });

    if (canSpeak) window.speechSynthesis.cancel();

    if (page === 'dashboard') renderDashboard();
    if (page === 'learn') { buildQueue(); renderExercise(); }
    if (page === 'library') renderLibrary();
    if (page === 'settings') renderSettings();

    window.scrollTo(0, 0);
  }

  /* ---------- Events ---------- */
  window.addEventListener('hashchange', function () { show(location.hash.slice(1)); });

  $$('[data-go]').forEach(function (btn) {
    btn.addEventListener('click', function () { location.hash = '#' + btn.getAttribute('data-go'); });
  });

  // Übungswahl
  $('#modes').addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-mode]');
    if (!btn) return;
    state.mode = btn.getAttribute('data-mode');
    save();
    buildQueue();
    renderExercise();
  });

  // Karteikarten
  card.addEventListener('click', function () { setFlip(!flipped); });
  rateButtons.forEach(function (btn) {
    btn.addEventListener('click', function () { rateCurrent(btn.getAttribute('data-rate')); });
  });

  // Anhören, Vorstellung, Eintippen/Lückentext
  $('#btn-speak').addEventListener('click', speakCurrent);
  $('#i-speak').addEventListener('click', speakCurrent);
  $('#w-speak').addEventListener('click', speakCurrent);
  $('#i-ok').addEventListener('click', introDone);
  $('#w-giveup').addEventListener('click', function () { checkAnswer(true); });
  $('#w-form').addEventListener('submit', function (e) {
    e.preventDefault();
    if (answered) nextWrite(); else checkAnswer(false);
  });

  // Tastatur (nur Karteikarten)
  document.addEventListener('keydown', function (e) {
    if (currentPage !== 'learn' || state.mode !== 'cards' || e.ctrlKey || e.metaKey || e.altKey) return;
    var tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA' || tag === 'BUTTON') return;
    if (!queue.length) return;

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      setFlip(!flipped);
    } else if (flipped) {
      var map = { '1': 'again', '2': 'hard', '3': 'good', '4': 'easy' };
      if (map[e.key]) rateCurrent(map[e.key]);
    }
  });

  // Bibliothek
  $('#lib-search').addEventListener('input', renderLibrary);
  $('#lib-filters').addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-filter]');
    if (!btn) return;
    libFilter = btn.getAttribute('data-filter');
    $$('#lib-filters button').forEach(function (b) { b.classList.toggle('active', b === btn); });
    renderLibrary();
  });

  // Einstellungen (automatisches Speichern)
  $('#set-lang').addEventListener('change', function (e) {
    state.lang = e.target.value;
    save();
    flashSaved();
  });
  $('#set-goal').addEventListener('change', function (e) {
    state.goal = parseInt(e.target.value, 10) || 20;
    save();
    flashSaved();
  });
  $('#set-audio').addEventListener('change', function (e) {
    state.audio = e.target.checked;
    if (!state.audio && canSpeak) window.speechSynthesis.cancel();
    save();
    renderSettings();
    flashSaved();
  });
  $('#set-autoplay').addEventListener('change', function (e) {
    state.autoplay = e.target.checked;
    save();
    flashSaved();
  });
  $('#set-rate').addEventListener('input', function (e) {
    state.rate = parseFloat(e.target.value);
    $('#set-rate-val').textContent = '(' + state.rate.toFixed(1) + '×)';
    save();
    flashSaved();
  });

  $('#btn-reset').addEventListener('click', function () {
    if (!window.confirm('Wirklich den gesamten Lernfortschritt und alle Einstellungen zurücksetzen?')) return;
    try { localStorage.removeItem(STORE_KEY); } catch (err) { /* ignorieren */ }
    state = defaults();
    save();
    location.hash = '#dashboard';
    show('dashboard');
  });

  /* ---------- Start ---------- */
  show(location.hash.slice(1));
})();

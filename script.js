(function () {
  'use strict';

  /* ---------- Konstanten ---------- */
  var TOTAL = 3000;
  var STORE_KEY = 'fluent3k.v1';
  var DAY = 86400000;
  var HOUR = 3600000;
  var INTERVALS = [0, 1, 3, 7, 14, 30]; // Tage pro Box
  var PAGES = ['dashboard', 'learn', 'library', 'settings'];

  // 20 gängige europäische Sprachen + die fünf meistgesprochenen Sprachen weltweit
  var LANGS = {
    bg: { name: 'Bulgarisch', to: 'Bulgarische', voice: 'bg-BG' },
    da: { name: 'Dänisch', to: 'Dänische', voice: 'da-DK' },
    de: { name: 'Deutsch', to: 'Deutsche', voice: 'de-DE' },
    fi: { name: 'Finnisch', to: 'Finnische', voice: 'fi-FI' },
    fr: { name: 'Französisch', to: 'Französische', voice: 'fr-FR' },
    el: { name: 'Griechisch', to: 'Griechische', voice: 'el-GR' },
    it: { name: 'Italienisch', to: 'Italienische', voice: 'it-IT' },
    hr: { name: 'Kroatisch', to: 'Kroatische', voice: 'hr-HR' },
    nl: { name: 'Niederländisch', to: 'Niederländische', voice: 'nl-NL' },
    no: { name: 'Norwegisch', to: 'Norwegische', voice: 'nb-NO' },
    pl: { name: 'Polnisch', to: 'Polnische', voice: 'pl-PL' },
    pt: { name: 'Portugiesisch', to: 'Portugiesische', voice: 'pt-PT' },
    ro: { name: 'Rumänisch', to: 'Rumänische', voice: 'ro-RO' },
    ru: { name: 'Russisch', to: 'Russische', voice: 'ru-RU' },
    sv: { name: 'Schwedisch', to: 'Schwedische', voice: 'sv-SE' },
    sr: { name: 'Serbisch (lateinisch)', to: 'Serbische', voice: 'sr-RS' },
    sk: { name: 'Slowakisch', to: 'Slowakische', voice: 'sk-SK' },
    cs: { name: 'Tschechisch', to: 'Tschechische', voice: 'cs-CZ' },
    uk: { name: 'Ukrainisch', to: 'Ukrainische', voice: 'uk-UA' },
    hu: { name: 'Ungarisch', to: 'Ungarische', voice: 'hu-HU' },
    en: { name: 'Englisch', to: 'Englische', voice: 'en-US' },
    zh: { name: 'Chinesisch (Mandarin)', to: 'Chinesische', voice: 'zh-CN' },
    hi: { name: 'Hindi', to: 'Hindi', voice: 'hi-IN' },
    es: { name: 'Spanisch', to: 'Spanische', voice: 'es-ES' },
    ar: { name: 'Arabisch', to: 'Arabische', voice: 'ar-SA' }
  };

  var GROUPS = [
    { label: 'Europäische Sprachen', codes: ['bg', 'da', 'de', 'fi', 'fr', 'el', 'it', 'hr', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sv', 'sr', 'sk', 'cs', 'uk', 'hu'] },
    { label: 'Meistgesprochene Sprachen weltweit', codes: ['en', 'zh', 'hi', 'es', 'ar'] }
  ];

  // Sprachen mit nicht-lateinischer Schrift: dritte Spalte der Daten ist die Umschrift
  var ROMAN = { ru: 1, uk: 1, bg: 1, el: 1, zh: 1, hi: 1, ar: 1 };

  var STATUS_LABEL = { 'new': 'Neu', learning: 'Am Lernen', mastered: 'Gemeistert' };

  var MODES = {
    cards: 'Aktives Erinnern: Du rufst die Bedeutung ab, bevor du die Karte umdrehst, und bewertest dich ehrlich.',
    type: 'Produktives Abrufen: Du schreibst das Wort aus dem Gedächtnis. Das ist anstrengender, prägt aber Bedeutung und Schreibweise besonders gut ein.',
    cloze: 'Abrufen im Kontext: Du ergänzt das fehlende Wort im Satz und lernst gleich, wie es verwendet wird.'
  };

  /* ---------- Dummy-Datenbank ---------- */
  // DATA[Sprache][n] = [Wort, Beispielsatz, Umschrift bzw. vereinfachte Aussprache]
  // Alle Sprachen nutzen dieselbe Reihenfolge der 16 Konzepte:
  // Haus, Wasser, Freund, Zeit, Buch, Essen, Stadt, Arbeit, Tag, Frau, Kind, Straße, Brot, Sonne, Nacht, Wort
  var DATA = {
    de: [
      ['Haus', 'Das Haus ist groß.'], ['Wasser', 'Ich trinke Wasser.'], ['Freund', 'Er ist mein Freund.'],
      ['Zeit', 'Ich habe keine Zeit.'], ['Buch', 'Das Buch ist neu.'], ['Essen', 'Das Essen ist gut.'],
      ['Stadt', 'Die Stadt ist alt.'], ['Arbeit', 'Ich liebe meine Arbeit.'], ['Tag', 'Heute ist ein guter Tag.'],
      ['Frau', 'Die Frau lächelt.'], ['Kind', 'Das Kind spielt.'], ['Straße', 'Die Straße ist lang.'],
      ['Brot', 'Ich kaufe Brot.'], ['Sonne', 'Die Sonne scheint.'], ['Nacht', 'Die Nacht ist still.'],
      ['Wort', 'Jedes Wort zählt.']
    ],
    en: [
      ['house', 'The house is big.', 'haus'], ['water', 'I drink water.', 'WO-ter'], ['friend', 'He is my friend.', 'frend'],
      ['time', 'I have no time.', 'taim'], ['book', 'The book is new.', 'buk'], ['food', 'The food is good.', 'fud'],
      ['city', 'The city is old.', 'SI-ti'], ['work', 'I love my work.', 'wörk'], ['day', 'Today is a good day.', 'dei'],
      ['woman', 'The woman smiles.', 'WU-men'], ['child', 'The child plays.', 'tschaild'], ['street', 'The street is long.', 'striit'],
      ['bread', 'I buy bread.', 'bred'], ['sun', 'The sun shines.', 'san'], ['night', 'The night is quiet.', 'nait'],
      ['word', 'Every word counts.', 'wörd']
    ],
    es: [
      ['casa', 'La casa es grande.', 'KA-sa'], ['agua', 'Yo bebo agua.', 'A-gua'], ['amigo', 'Él es mi amigo.', 'a-MI-go'],
      ['tiempo', 'No tengo tiempo.', 'TYEM-po'], ['libro', 'El libro es nuevo.', 'LI-bro'], ['comida', 'La comida es buena.', 'ko-MI-da'],
      ['ciudad', 'La ciudad es vieja.', 'siu-DAD'], ['trabajo', 'Amo mi trabajo.', 'tra-BA-cho'], ['día', 'Hoy es un buen día.', 'DI-a'],
      ['mujer', 'La mujer sonríe.', 'mu-CHER'], ['niño', 'El niño juega.', 'NI-nyo'], ['calle', 'La calle es larga.', 'KA-lje'],
      ['pan', 'Compro pan.', 'pan'], ['sol', 'El sol brilla.', 'sol'], ['noche', 'La noche es silenciosa.', 'NO-tsche'],
      ['palabra', 'Cada palabra cuenta.', 'pa-LA-bra']
    ],
    fr: [
      ['maison', 'La maison est grande.', 'mè-ZÕ'], ['eau', "Je bois de l'eau.", 'o'], ['ami', 'Il est mon ami.', 'a-MI'],
      ['temps', "Je n'ai pas le temps.", 'tã'], ['livre', 'Le livre est nouveau.', 'LI-vr'], ['nourriture', 'La nourriture est bonne.', 'nu-ri-TÜR'],
      ['ville', 'La ville est vieille.', 'vil'], ['travail', "J'aime mon travail.", 'tra-VAI'], ['jour', "Aujourd'hui, c'est un bon jour.", 'schur'],
      ['femme', 'La femme sourit.', 'fam'], ['enfant', "L'enfant joue.", 'ã-FÃ'], ['rue', 'La rue est longue.', 'rü'],
      ['pain', "J'achète du pain.", 'pẽ'], ['soleil', 'Le soleil brille.', 'so-LÄJ'], ['nuit', 'La nuit est calme.', 'nüi'],
      ['mot', 'Chaque mot compte.', 'mo']
    ],
    sv: [
      ['hus', 'Huset är stort.', 'hüüs'], ['vatten', 'Jag dricker vatten.', 'VAT-ten'], ['vän', 'Han är min vän.', 'vänn'],
      ['tid', 'Jag har ingen tid.', 'tiid'], ['bok', 'Boken är ny.', 'bōk'], ['mat', 'Maten är god.', 'maat'],
      ['stad', 'Staden är gammal.', 'staad'], ['arbete', 'Jag älskar mitt arbete.', 'AR-be-te'], ['dag', 'Idag är en bra dag.', 'daag'],
      ['kvinna', 'Kvinnan ler.', 'KVIN-na'], ['barn', 'Barnet leker.', 'barn'], ['gata', 'Gatan är lång.', 'GAA-ta'],
      ['bröd', 'Jag köper bröd.', 'brööd'], ['sol', 'Solen skiner.', 'suul'], ['natt', 'Natten är tyst.', 'nat'],
      ['ord', 'Varje ord räknas.', 'uurd']
    ],
    it: [
      ['casa', 'La casa è grande.'], ['acqua', 'Bevo acqua.'], ['amico', 'Lui è il mio amico.'],
      ['tempo', 'Non ho tempo.'], ['libro', 'Il libro è nuovo.'], ['cibo', 'Il cibo è buono.'],
      ['città', 'La città è vecchia.'], ['lavoro', 'Amo il mio lavoro.'], ['giorno', 'Oggi è un bel giorno.'],
      ['donna', 'La donna sorride.'], ['bambino', 'Il bambino gioca.'], ['strada', 'La strada è lunga.'],
      ['pane', 'Compro il pane.'], ['sole', 'Il sole splende.'], ['notte', 'La notte è silenziosa.'],
      ['parola', 'Ogni parola conta.']
    ],
    pt: [
      ['casa', 'A casa é grande.'], ['água', 'Eu bebo água.'], ['amigo', 'Ele é o meu amigo.'],
      ['tempo', 'Não tenho tempo.'], ['livro', 'O livro é novo.'], ['comida', 'A comida é boa.'],
      ['cidade', 'A cidade é antiga.'], ['trabalho', 'Eu adoro o meu trabalho.'], ['dia', 'Hoje é um bom dia.'],
      ['mulher', 'A mulher sorri.'], ['criança', 'A criança brinca.'], ['rua', 'A rua é comprida.'],
      ['pão', 'Eu compro pão.'], ['sol', 'O sol brilha.'], ['noite', 'A noite é silenciosa.'],
      ['palavra', 'Cada palavra conta.']
    ],
    nl: [
      ['huis', 'Het huis is groot.'], ['water', 'Ik drink water.'], ['vriend', 'Hij is mijn vriend.'],
      ['tijd', 'Ik heb geen tijd.'], ['boek', 'Het boek is nieuw.'], ['eten', 'Het eten is lekker.'],
      ['stad', 'De stad is oud.'], ['werk', 'Ik hou van mijn werk.'], ['dag', 'Vandaag is een goede dag.'],
      ['vrouw', 'De vrouw lacht.'], ['kind', 'Het kind speelt.'], ['straat', 'De straat is lang.'],
      ['brood', 'Ik koop brood.'], ['zon', 'De zon schijnt.'], ['nacht', 'De nacht is stil.'],
      ['woord', 'Elk woord telt.']
    ],
    pl: [
      ['dom', 'Dom jest duży.'], ['woda', 'Piję wodę.'], ['przyjaciel', 'On jest moim przyjacielem.'],
      ['czas', 'Nie mam czasu.'], ['książka', 'Książka jest nowa.'], ['jedzenie', 'Jedzenie jest dobre.'],
      ['miasto', 'Miasto jest stare.'], ['praca', 'Kocham moją pracę.'], ['dzień', 'Dziś jest dobry dzień.'],
      ['kobieta', 'Kobieta się uśmiecha.'], ['dziecko', 'Dziecko się bawi.'], ['ulica', 'Ulica jest długa.'],
      ['chleb', 'Kupuję chleb.'], ['słońce', 'Słońce świeci.'], ['noc', 'Noc jest cicha.'],
      ['słowo', 'Każde słowo się liczy.']
    ],
    ru: [
      ['дом', 'Дом большой.', 'dom'], ['вода', 'Я пью воду.', 'voda'], ['друг', 'Он мой друг.', 'drug'],
      ['время', 'У меня нет времени.', 'vremya'], ['книга', 'Книга новая.', 'kniga'], ['еда', 'Еда вкусная.', 'yeda'],
      ['город', 'Город старый.', 'gorod'], ['работа', 'Я люблю свою работу.', 'rabota'], ['день', 'Сегодня хороший день.', 'den'],
      ['женщина', 'Женщина улыбается.', 'zhenshchina'], ['ребёнок', 'Ребёнок играет.', 'rebyonok'], ['улица', 'Улица длинная.', 'ulitsa'],
      ['хлеб', 'Я покупаю хлеб.', 'khleb'], ['солнце', 'Солнце светит.', 'solntse'], ['ночь', 'Ночь тихая.', 'noch'],
      ['слово', 'Каждое слово важно.', 'slovo']
    ],
    uk: [
      ['дім', 'Дім великий.', 'dim'], ['вода', "Я п'ю воду.", 'voda'], ['друг', 'Він мій друг.', 'druh'],
      ['час', 'Я не маю часу.', 'chas'], ['книга', 'Книга нова.', 'knyha'], ['їжа', 'Їжа смачна.', 'yizha'],
      ['місто', 'Місто старе.', 'misto'], ['робота', 'Я люблю свою роботу.', 'robota'], ['день', 'Сьогодні гарний день.', 'den'],
      ['жінка', 'Жінка усміхається.', 'zhinka'], ['дитина', 'Дитина грає.', 'dytyna'], ['вулиця', 'Вулиця довга.', 'vulytsia'],
      ['хліб', 'Я купую хліб.', 'khlib'], ['сонце', 'Сонце світить.', 'sontse'], ['ніч', 'Ніч тиха.', 'nich'],
      ['слово', 'Кожне слово має значення.', 'slovo']
    ],
    ro: [
      ['casă', 'Casa este mare.'], ['apă', 'Beau apă.'], ['prieten', 'El este prietenul meu.'],
      ['timp', 'Nu am timp.'], ['carte', 'Cartea este nouă.'], ['mâncare', 'Mâncarea este bună.'],
      ['oraș', 'Orașul este vechi.'], ['muncă', 'Îmi place munca mea.'], ['zi', 'Astăzi este o zi bună.'],
      ['femeie', 'Femeia zâmbește.'], ['copil', 'Copilul se joacă.'], ['stradă', 'Strada este lungă.'],
      ['pâine', 'Cumpăr pâine.'], ['soare', 'Soarele strălucește.'], ['noapte', 'Noaptea este liniștită.'],
      ['cuvânt', 'Fiecare cuvânt contează.']
    ],
    el: [
      ['σπίτι', 'Το σπίτι είναι μεγάλο.', 'spíti'], ['νερό', 'Πίνω νερό.', 'neró'], ['φίλος', 'Αυτός είναι ο φίλος μου.', 'fílos'],
      ['χρόνος', 'Δεν έχω χρόνο.', 'chrónos'], ['βιβλίο', 'Το βιβλίο είναι καινούριο.', 'vivlío'], ['φαγητό', 'Το φαγητό είναι καλό.', 'fagitó'],
      ['πόλη', 'Η πόλη είναι παλιά.', 'póli'], ['δουλειά', 'Αγαπώ τη δουλειά μου.', 'douleiá'], ['μέρα', 'Σήμερα είναι μια καλή μέρα.', 'méra'],
      ['γυναίκα', 'Η γυναίκα χαμογελά.', 'gynaíka'], ['παιδί', 'Το παιδί παίζει.', 'paidí'], ['δρόμος', 'Ο δρόμος είναι μακρύς.', 'drómos'],
      ['ψωμί', 'Αγοράζω ψωμί.', 'psomí'], ['ήλιος', 'Ο ήλιος λάμπει.', 'ílios'], ['νύχτα', 'Η νύχτα είναι ήσυχη.', 'nýchta'],
      ['λέξη', 'Κάθε λέξη μετράει.', 'léxi']
    ],
    hu: [
      ['ház', 'A ház nagy.'], ['víz', 'Vizet iszom.'], ['barát', 'Ő a barátom.'],
      ['idő', 'Nincs időm.'], ['könyv', 'A könyv új.'], ['étel', 'Az étel jó.'],
      ['város', 'A város régi.'], ['munka', 'Szeretem a munkámat.'], ['nap', 'Ma jó nap van.'],
      ['nő', 'A nő mosolyog.'], ['gyerek', 'A gyerek játszik.'], ['utca', 'Az utca hosszú.'],
      ['kenyér', 'Kenyeret vásárolok.'], ['nap', 'A nap süt.'], ['éjszaka', 'Az éjszaka csendes.'],
      ['szó', 'Minden szó számít.']
    ],
    cs: [
      ['dům', 'Dům je velký.'], ['voda', 'Piji vodu.'], ['přítel', 'On je můj přítel.'],
      ['čas', 'Nemám čas.'], ['kniha', 'Kniha je nová.'], ['jídlo', 'Jídlo je dobré.'],
      ['město', 'Město je staré.'], ['práce', 'Miluji svou práci.'], ['den', 'Dnes je dobrý den.'],
      ['žena', 'Žena se usmívá.'], ['dítě', 'Dítě si hraje.'], ['ulice', 'Ulice je dlouhá.'],
      ['chléb', 'Kupuji chléb.'], ['slunce', 'Slunce svítí.'], ['noc', 'Noc je tichá.'],
      ['slovo', 'Každé slovo se počítá.']
    ],
    sk: [
      ['dom', 'Dom je veľký.'], ['voda', 'Pijem vodu.'], ['priateľ', 'On je môj priateľ.'],
      ['čas', 'Nemám čas.'], ['kniha', 'Kniha je nová.'], ['jedlo', 'Jedlo je dobré.'],
      ['mesto', 'Mesto je staré.'], ['práca', 'Milujem svoju prácu.'], ['deň', 'Dnes je dobrý deň.'],
      ['žena', 'Žena sa usmieva.'], ['dieťa', 'Dieťa sa hrá.'], ['ulica', 'Ulica je dlhá.'],
      ['chlieb', 'Kupujem chlieb.'], ['slnko', 'Slnko svieti.'], ['noc', 'Noc je tichá.'],
      ['slovo', 'Každé slovo sa počíta.']
    ],
    sr: [
      ['kuća', 'Kuća je velika.'], ['voda', 'Pijem vodu.'], ['prijatelj', 'On je moj prijatelj.'],
      ['vreme', 'Nemam vremena.'], ['knjiga', 'Knjiga je nova.'], ['hrana', 'Hrana je dobra.'],
      ['grad', 'Grad je star.'], ['posao', 'Volim svoj posao.'], ['dan', 'Danas je dobar dan.'],
      ['žena', 'Žena se smeje.'], ['dete', 'Dete se igra.'], ['ulica', 'Ulica je duga.'],
      ['hleb', 'Kupujem hleb.'], ['sunce', 'Sunce sija.'], ['noć', 'Noć je tiha.'],
      ['reč', 'Svaka reč se računa.']
    ],
    hr: [
      ['kuća', 'Kuća je velika.'], ['voda', 'Pijem vodu.'], ['prijatelj', 'On je moj prijatelj.'],
      ['vrijeme', 'Nemam vremena.'], ['knjiga', 'Knjiga je nova.'], ['hrana', 'Hrana je dobra.'],
      ['grad', 'Grad je star.'], ['posao', 'Volim svoj posao.'], ['dan', 'Danas je dobar dan.'],
      ['žena', 'Žena se smiješi.'], ['dijete', 'Dijete se igra.'], ['ulica', 'Ulica je duga.'],
      ['kruh', 'Kupujem kruh.'], ['sunce', 'Sunce sja.'], ['noć', 'Noć je tiha.'],
      ['riječ', 'Svaka riječ se računa.']
    ],
    bg: [
      ['къща', 'Къщата е голяма.', 'kashta'], ['вода', 'Пия вода.', 'voda'], ['приятел', 'Той е мой приятел.', 'priyatel'],
      ['време', 'Нямам време.', 'vreme'], ['книга', 'Книгата е нова.', 'kniga'], ['храна', 'Храната е добра.', 'hrana'],
      ['град', 'Градът е стар.', 'grad'], ['работа', 'Обичам работата си.', 'rabota'], ['ден', 'Днес е хубав ден.', 'den'],
      ['жена', 'Жената се усмихва.', 'zhena'], ['дете', 'Детето играе.', 'dete'], ['улица', 'Улицата е дълга.', 'ulitsa'],
      ['хляб', 'Купувам хляб.', 'hlyab'], ['слънце', 'Слънцето грее.', 'slantse'], ['нощ', 'Нощта е тиха.', 'nosht'],
      ['дума', 'Всяка дума има значение.', 'duma']
    ],
    da: [
      ['hus', 'Huset er stort.'], ['vand', 'Jeg drikker vand.'], ['ven', 'Han er min ven.'],
      ['tid', 'Jeg har ikke tid.'], ['bog', 'Bogen er ny.'], ['mad', 'Maden er god.'],
      ['by', 'Byen er gammel.'], ['arbejde', 'Jeg elsker mit arbejde.'], ['dag', 'I dag er en god dag.'],
      ['kvinde', 'Kvinden smiler.'], ['barn', 'Barnet leger.'], ['gade', 'Gaden er lang.'],
      ['brød', 'Jeg køber brød.'], ['sol', 'Solen skinner.'], ['nat', 'Natten er stille.'],
      ['ord', 'Hvert ord tæller.']
    ],
    no: [
      ['hus', 'Huset er stort.'], ['vann', 'Jeg drikker vann.'], ['venn', 'Han er vennen min.'],
      ['tid', 'Jeg har ikke tid.'], ['bok', 'Boken er ny.'], ['mat', 'Maten er god.'],
      ['by', 'Byen er gammel.'], ['arbeid', 'Jeg elsker arbeidet mitt.'], ['dag', 'I dag er en god dag.'],
      ['kvinne', 'Kvinnen smiler.'], ['barn', 'Barnet leker.'], ['gate', 'Gaten er lang.'],
      ['brød', 'Jeg kjøper brød.'], ['sol', 'Solen skinner.'], ['natt', 'Natten er stille.'],
      ['ord', 'Hvert ord teller.']
    ],
    fi: [
      ['talo', 'Talo on iso.'], ['vesi', 'Juon vettä.'], ['ystävä', 'Hän on ystäväni.'],
      ['aika', 'Minulla ei ole aikaa.'], ['kirja', 'Kirja on uusi.'], ['ruoka', 'Ruoka on hyvää.'],
      ['kaupunki', 'Kaupunki on vanha.'], ['työ', 'Rakastan työtäni.'], ['päivä', 'Tänään on hyvä päivä.'],
      ['nainen', 'Nainen hymyilee.'], ['lapsi', 'Lapsi leikkii.'], ['katu', 'Katu on pitkä.'],
      ['leipä', 'Ostan leipää.'], ['aurinko', 'Aurinko paistaa.'], ['yö', 'Yö on hiljainen.'],
      ['sana', 'Jokainen sana on tärkeä.']
    ],
    zh: [
      ['房子', '房子很大。', 'fángzi'], ['水', '我喝水。', 'shuǐ'], ['朋友', '他是我的朋友。', 'péngyou'],
      ['时间', '我没有时间。', 'shíjiān'], ['书', '这本书是新的。', 'shū'], ['食物', '食物很好吃。', 'shíwù'],
      ['城市', '这座城市很古老。', 'chéngshì'], ['工作', '我爱我的工作。', 'gōngzuò'], ['日子', '今天是个好日子。', 'rìzi'],
      ['女人', '这个女人在微笑。', 'nǚrén'], ['孩子', '孩子在玩耍。', 'háizi'], ['街道', '街道很长。', 'jiēdào'],
      ['面包', '我买面包。', 'miànbāo'], ['太阳', '太阳在发光。', 'tàiyáng'], ['夜晚', '夜晚很安静。', 'yèwǎn'],
      ['单词', '每个单词都很重要。', 'dāncí']
    ],
    hi: [
      ['घर', 'घर बड़ा है।', 'ghar'], ['पानी', 'मैं पानी पीता हूँ।', 'pānī'], ['दोस्त', 'वह मेरा दोस्त है।', 'dost'],
      ['समय', 'मेरे पास समय नहीं है।', 'samay'], ['किताब', 'किताब नई है।', 'kitāb'], ['खाना', 'खाना अच्छा है।', 'khānā'],
      ['शहर', 'शहर पुराना है।', 'shahar'], ['काम', 'मुझे अपना काम पसंद है।', 'kām'], ['दिन', 'आज एक अच्छा दिन है।', 'din'],
      ['महिला', 'महिला मुस्कुरा रही है।', 'mahilā'], ['बच्चा', 'बच्चा खेल रहा है।', 'bachchā'], ['सड़क', 'सड़क लंबी है।', 'sarak'],
      ['रोटी', 'मैं रोटी खरीदता हूँ।', 'roṭī'], ['सूरज', 'सूरज चमक रहा है।', 'sūraj'], ['रात', 'रात शांत है।', 'rāt'],
      ['शब्द', 'हर शब्द मायने रखता है।', 'shabd']
    ],
    ar: [
      ['بيت', 'البيت كبير.', 'bayt'], ['ماء', 'أشرب الماء.', "ma'"], ['صديق', 'هو صديقي.', 'sadiq'],
      ['وقت', 'ليس لدي وقت.', 'waqt'], ['كتاب', 'الكتاب جديد.', 'kitab'], ['طعام', 'الطعام جيد.', "ta'am"],
      ['مدينة', 'المدينة قديمة.', 'madina'], ['عمل', 'أحب عملي.', "'amal"], ['يوم', 'اليوم يوم جميل.', 'yawm'],
      ['امرأة', 'المرأة تبتسم.', "imra'a"], ['طفل', 'الطفل يلعب.', 'tifl'], ['شارع', 'الشارع طويل.', "shari'"],
      ['خبز', 'أشتري خبزا.', 'khubz'], ['شمس', 'الشمس مشرقة.', 'shams'], ['ليل', 'الليل هادئ.', 'layl'],
      ['كلمة', 'كل كلمة مهمة.', 'kalima']
    ]
  };

  var WORDS = [];
  for (var wi = 0; wi < 16; wi++) {
    var entry = { id: wi + 1, l: {} };
    Object.keys(DATA).forEach(function (code) { entry.l[code] = DATA[code][wi]; });
    WORDS.push(entry);
  }

  /* ---------- Hilfsfunktionen ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Vergleichsform: Kleinbuchstaben, ohne lateinische Akzente und Satzzeichen
  // (Zeichen anderer Schriften inklusive Vokalzeichen bleiben erhalten)
  function norm(s) {
    return String(s).toLowerCase().normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\p{L}\p{M}\p{N}]/gu, '');
  }

  function byId(id) {
    for (var i = 0; i < WORDS.length; i++) if (WORDS[i].id === id) return WORDS[i];
    return null;
  }

  // Umschrift (nicht-lateinische Schriften) oder vereinfachte Aussprache (nur für Deutschsprachige)
  function pronText(code, pron) {
    if (!pron) return '';
    if (ROMAN[code]) return 'Umschrift: ' + pron;
    if (state.native === 'de') return 'Aussprache (vereinfacht): ' + pron;
    return '';
  }

  /* ---------- Zustand & LocalStorage ---------- */
  function defaults() {
    return { lang: 'es', native: 'de', audio: true, autoplay: false, rate: 0.9, mode: 'cards', progress: {} };
  }

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return defaults();
      var s = Object.assign(defaults(), JSON.parse(raw));
      delete s.goal;
      delete s.daily;
      if (!LANGS[s.native]) s.native = 'de';
      if (!LANGS[s.lang]) s.lang = 'es';
      if (s.lang === s.native) s.lang = s.native === 'es' ? 'en' : 'es';
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
    var due = WORDS.filter(function (w) { return isDue(w.id); }).length;
    var totalPct = c.mastered / TOTAL * 100;

    $('#dash-lang').textContent = 'Lernsprache: ' + LANGS[state.lang].name + ' · Ausgangssprache: ' + LANGS[state.native].name;
    $('#stat-mastered').textContent = c.mastered;
    $('#stat-learning').textContent = c.learning;
    $('#stat-due').textContent = due;

    setBar('#bar-total', totalPct);
    $('#bar-total-label').textContent = c.mastered + ' / ' + TOTAL + ' Wörter gemeistert (' + totalPct.toFixed(1) + ' %)';

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

  // Ist nichts mehr fällig, geht die Übung einfach weiter: alle gelernten Wörter, das früheste Fälligkeitsdatum zuerst
  function ensureQueue() {
    if (queue.length) return;
    var p = prog();
    queue = WORDS.filter(function (w) { return p[w.id]; })
      .sort(function (a, b) { return p[a.id].due - p[b.id].due; })
      .map(function (w) { return w.id; });
    if (!queue.length) queue = WORDS.map(function (w) { return w.id; });
  }

  // Karte nach "offset" weiteren Karten erneut einreihen
  function reinsert(id, offset) {
    queue.splice(Math.min(queue.length, offset), 0, id);
  }

  function showPanel(name) {
    Object.keys(panels).forEach(function (k) { panels[k].hidden = (k !== name); });
  }

  function renderExercise() {
    ensureQueue();

    $$('#modes .mode').forEach(function (b) {
      var on = b.getAttribute('data-mode') === state.mode;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    $('#mode-desc').textContent = MODES[state.mode];
    if (canSpeak) window.speechSynthesis.cancel();

    $('#learn-meta').textContent = LANGS[state.lang].name + ' · ' + queue.length + ' Karten in dieser Sitzung';
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
    var n = w.l[state.native];

    card.classList.add('no-anim');
    setFlip(false);
    void card.offsetWidth;
    card.classList.remove('no-anim');

    $('#card-word').textContent = d[0];
    $('#card-example').textContent = d[1];
    $('#card-trans').textContent = n[0];
    $('#card-ctx').textContent = n[1];
    $('#card-pron').textContent = pronText(state.lang, d[2]);

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
    var n = w.l[state.native];
    $('#i-word').textContent = d[0];
    $('#i-trans').textContent = n[0];
    $('#i-example').textContent = d[1] + ' – ' + n[1];
    $('#i-pron').textContent = pronText(state.lang, d[2]);
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

  function commonPrefix(a, b) {
    var i = 0;
    while (i < a.length && i < b.length && a.charAt(i) === b.charAt(i)) i++;
    return i;
  }

  function buildCloze(sentence, lemma, lang) {
    // Chinesisch hat keine Leerzeichen: direkt im Satz suchen
    if (lang === 'zh') {
      var at = sentence.indexOf(lemma);
      if (at === -1) return null;
      return { before: sentence.slice(0, at), after: sentence.slice(at + lemma.length), answer: lemma };
    }

    var re = /[\p{L}\p{M}]+/gu;
    var tokens = [];
    var m;
    while ((m = re.exec(sentence)) !== null) tokens.push({ text: m[0], index: m.index });
    var nl = norm(lemma);

    var found = tokens.filter(function (t) { return norm(t.text) === nl; })[0]
      || tokens.filter(function (t) { return norm(t.text).indexOf(nl) === 0; })[0]
      || tokens.filter(function (t) { return norm(t.text).indexOf(nl) !== -1; })[0];

    // gebeugte Form mit gleichem Wortstamm (z. B. polnisch woda, wodę)
    if (!found) {
      var best = null, bestLen = 0;
      tokens.forEach(function (t) {
        var l = commonPrefix(norm(t.text), nl);
        if (l > bestLen) { bestLen = l; best = t; }
      });
      if (best && bestLen >= Math.max(3, nl.length - 2)) found = best;
    }

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
    var n = w.l[state.native];
    var cloze = state.mode === 'cloze' ? buildCloze(d[1], d[0], state.lang) : null;

    cur = { id: id, answer: cloze ? cloze.answer : d[0], cloze: !!cloze };
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
      $('#w-sub').textContent = n[1];
      $('#w-hint').textContent = norm(cloze.answer) !== norm(d[0])
        ? 'Hinweis: Grundform „' + d[0] + '“, im Satz gebeugt oder mit Artikel.'
        : '';
    } else {
      main.className = 'prompt-main';
      main.textContent = n[0];
      $('#w-tag').textContent = 'Eintippen';
      $('#w-sub').textContent = 'Übersetze ins ' + LANGS[state.lang].to + '.';
      $('#w-hint').textContent = ROMAN[state.lang] ? 'Schrift des Originals oder Umschrift sind erlaubt.' : '';
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
    var n = w.l[state.native];
    var typed = $('#w-input').value.trim();
    var ok = false;
    var note = '';

    if (!giveUp && typed) {
      if (typed.toLowerCase() === cur.answer.toLowerCase()) {
        ok = true;
      } else if (norm(typed) === norm(cur.answer)) {
        ok = true;
        note = 'Richtig, aber achte auf die genaue Schreibweise.';
      } else if (!cur.cloze && ROMAN[state.lang] && d[2] && norm(typed) === norm(d[2])) {
        ok = true;
        note = 'Richtig in Umschrift. Das Original lautet: ' + d[0];
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
    $('#w-full').textContent = d[1] + ' – ' + n[1];

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

    $('#lib-th-word').textContent = LANGS[state.lang].name;
    $('#lib-th-trans').textContent = LANGS[state.native].name;

    var rows = WORDS.filter(function (w) {
      var d = w.l[state.lang];
      var n = w.l[state.native];
      if (libFilter !== 'all' && statusOf(w.id) !== libFilter) return false;
      return !q || d[0].toLowerCase().indexOf(q) !== -1 || n[0].toLowerCase().indexOf(q) !== -1;
    });

    $('#lib-body').innerHTML = rows.length
      ? rows.map(function (w) {
          var st = statusOf(w.id);
          return '<tr>'
            + '<td class="word">' + esc(w.l[state.lang][0]) + '</td>'
            + '<td>' + esc(w.l[state.native][0]) + '</td>'
            + '<td><span class="badge ' + st + '">' + STATUS_LABEL[st] + '</span></td>'
            + '<td>' + fmtDue(p[w.id]) + '</td>'
            + '</tr>';
        }).join('')
      : '<tr><td class="empty-row" colspan="4">Keine Wörter gefunden.</td></tr>';

    $('#lib-count').textContent = rows.length + ' von ' + WORDS.length + ' Wörtern (Demo-Auszug aus ' + TOTAL + ')';
  }

  /* ---------- Profil / Einstellungen (mit Speichern-Button) ---------- */
  var draft = null;
  var justSaved = false;

  function fillLangSelect(sel) {
    sel.textContent = '';
    GROUPS.forEach(function (g) {
      var og = document.createElement('optgroup');
      og.label = g.label;
      g.codes.forEach(function (code) {
        var o = document.createElement('option');
        o.value = code;
        o.textContent = LANGS[code].name;
        og.appendChild(o);
      });
      sel.appendChild(og);
    });
  }

  function isDirty() {
    return ['lang', 'native', 'audio', 'autoplay', 'rate'].some(function (k) { return draft[k] !== state[k]; });
  }

  function updateSettingsUI() {
    var conflict = draft.lang === draft.native;
    var dirty = isDirty();

    $('#set-error').hidden = !conflict;
    $('#set-autoplay').disabled = !draft.audio;
    $('#set-rate').disabled = !draft.audio;
    $('#set-rate-val').textContent = '(' + Number(draft.rate).toFixed(1) + '×)';
    $('#btn-save').disabled = conflict || !dirty;

    $('#save-status').textContent = dirty
      ? 'Ungespeicherte Änderungen. Mit „Speichern“ übernehmen.'
      : (justSaved ? 'Gespeichert.' : 'Änderungen werden erst mit „Speichern“ übernommen.');
  }

  function renderSettings() {
    draft = { lang: state.lang, native: state.native, audio: state.audio, autoplay: state.autoplay, rate: state.rate };
    justSaved = false;
    fillLangSelect($('#set-lang'));
    fillLangSelect($('#set-native'));
    $('#set-lang').value = draft.lang;
    $('#set-native').value = draft.native;
    $('#set-audio').checked = draft.audio;
    $('#set-autoplay').checked = draft.autoplay;
    $('#set-rate').value = draft.rate;
    updateSettingsUI();
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

  // Profil: Änderungen landen im Entwurf, erst „Speichern“ übernimmt sie
  function onDraftChange() { justSaved = false; updateSettingsUI(); }

  $('#set-lang').addEventListener('change', function (e) { draft.lang = e.target.value; onDraftChange(); });
  $('#set-native').addEventListener('change', function (e) { draft.native = e.target.value; onDraftChange(); });
  $('#set-audio').addEventListener('change', function (e) { draft.audio = e.target.checked; onDraftChange(); });
  $('#set-autoplay').addEventListener('change', function (e) { draft.autoplay = e.target.checked; onDraftChange(); });
  $('#set-rate').addEventListener('input', function (e) { draft.rate = parseFloat(e.target.value); onDraftChange(); });

  $('#btn-save').addEventListener('click', function () {
    if (draft.lang === draft.native) return;
    state.lang = draft.lang;
    state.native = draft.native;
    state.audio = draft.audio;
    state.autoplay = draft.autoplay;
    state.rate = draft.rate;
    if (!state.audio && canSpeak) window.speechSynthesis.cancel();
    save();
    justSaved = true;
    updateSettingsUI();
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

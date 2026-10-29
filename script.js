{\rtf1\ansi\ansicpg1252\cocoartf2907
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 /* =============================================================\
   FLUENT3K \'97 script.js\
   Vanilla JS \'b7 SPA Navigation \'b7 Spaced Repetition Logic\
   ============================================================= */\
\
// \uc0\u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \
// 1.  LANGUAGE DATABASE  (25 European languages)\
// \uc0\u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \
const LANGUAGES = \{\
  de: \{ name: 'Deutsch',      flag: '\uc0\u55356 \u56809 \u55356 \u56810 ' \},\
  en: \{ name: 'English',      flag: '\uc0\u55356 \u56812 \u55356 \u56807 ' \},\
  fr: \{ name: 'Fran\'e7ais',     flag: '\uc0\u55356 \u56811 \u55356 \u56823 ' \},\
  es: \{ name: 'Espa\'f1ol',      flag: '\uc0\u55356 \u56810 \u55356 \u56824 ' \},\
  it: \{ name: 'Italiano',     flag: '\uc0\u55356 \u56814 \u55356 \u56825 ' \},\
  pt: \{ name: 'Portugu\'eas',    flag: '\uc0\u55356 \u56821 \u55356 \u56825 ' \},\
  nl: \{ name: 'Nederlands',   flag: '\uc0\u55356 \u56819 \u55356 \u56817 ' \},\
  pl: \{ name: 'Polski',       flag: '\uc0\u55356 \u56821 \u55356 \u56817 ' \},\
  cs: \{ name: '\uc0\u268 e\'9atina',      flag: '\u55356 \u56808 \u55356 \u56831 ' \},\
  sk: \{ name: 'Sloven\uc0\u269 ina',   flag: '\u55356 \u56824 \u55356 \u56816 ' \},\
  hu: \{ name: 'Magyar',       flag: '\uc0\u55356 \u56813 \u55356 \u56826 ' \},\
  ro: \{ name: 'Rom\'e2n\uc0\u259 ',       flag: '\u55356 \u56823 \u55356 \u56820 ' \},\
  sv: \{ name: 'Svenska',      flag: '\uc0\u55356 \u56824 \u55356 \u56810 ' \},\
  no: \{ name: 'Norsk',        flag: '\uc0\u55356 \u56819 \u55356 \u56820 ' \},\
  da: \{ name: 'Dansk',        flag: '\uc0\u55356 \u56809 \u55356 \u56816 ' \},\
  fi: \{ name: 'Suomi',        flag: '\uc0\u55356 \u56811 \u55356 \u56814 ' \},\
  el: \{ name: '\uc0\u917 \u955 \u955 \u951 \u957 \u953 \u954 \u940 ',     flag: '\u55356 \u56812 \u55356 \u56823 ' \},\
  bg: \{ name: '\uc0\u1041 \u1098 \u1083 \u1075 \u1072 \u1088 \u1089 \u1082 \u1080 ',    flag: '\u55356 \u56807 \u55356 \u56812 ' \},\
  hr: \{ name: 'Hrvatski',     flag: '\uc0\u55356 \u56813 \u55356 \u56823 ' \},\
  sl: \{ name: 'Sloven\'9a\uc0\u269 ina',  flag: '\u55356 \u56824 \u55356 \u56814 ' \},\
  lt: \{ name: 'Lietuvi\uc0\u371 ',     flag: '\u55356 \u56817 \u55356 \u56825 ' \},\
  lv: \{ name: 'Latvie\'9au',     flag: '\uc0\u55356 \u56817 \u55356 \u56827 ' \},\
  et: \{ name: 'Eesti',        flag: '\uc0\u55356 \u56810 \u55356 \u56810 ' \},\
  uk: \{ name: '\uc0\u1059 \u1082 \u1088 \u1072 \u1111 \u1085 \u1089 \u1100 \u1082 \u1072 ',   flag: '\u55356 \u56826 \u55356 \u56806 ' \},\
  ru: \{ name: '\uc0\u1056 \u1091 \u1089 \u1089 \u1082 \u1080 \u1081 ',      flag: '\u55356 \u56823 \u55356 \u56826 ' \},\
\};\
\
// \uc0\u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \
// 2.  ANCHOR WORD DATABASE  (10 mock words, multi-language)\
//     Each word carries translations per language code.\
//     English is always the "Anchor" (EN).\
// \uc0\u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \
const ANCHOR_WORDS = [\
  \{\
    id: 1,\
    anchor: 'house',\
    level: 'A1',\
    topic: 'Alltag',\
    translations: \{\
      de: 'Haus',       fr: 'maison',     es: 'casa',       it: 'casa',\
      pt: 'casa',       nl: 'huis',       pl: 'dom',        cs: 'd\uc0\u367 m',\
      sk: 'dom',        hu: 'h\'e1z',        ro: 'cas\uc0\u259 ',       sv: 'hus',\
      no: 'hus',        da: 'hus',        fi: 'talo',       el: '\uc0\u963 \u960 \u943 \u964 \u953 ',\
      bg: '\uc0\u1082 \u1098 \u1097 \u1072 ',       hr: 'ku\u263 a',       sl: 'hi\'9aa',       lt: 'namas',\
      lv: 'm\uc0\u257 ja',       et: 'maja',       uk: '\u1073 \u1091 \u1076 \u1080 \u1085 \u1086 \u1082 ',    ru: '\u1076 \u1086 \u1084 ',\
      en: 'house',\
    \},\
    examples: \{\
      en: 'The <em>house</em> is big and comfortable.',\
      de: 'Das <em>Haus</em> ist gro\'df und gem\'fctlich.',\
      fr: 'La <em>maison</em> est grande et confortable.',\
      es: 'La <em>casa</em> es grande y c\'f3moda.',\
      it: 'La <em>casa</em> \'e8 grande e confortevole.',\
      pt: 'A <em>casa</em> \'e9 grande e confort\'e1vel.',\
      nl: 'Het <em>huis</em> is groot en comfortabel.',\
      pl: 'Ten <em>dom</em> jest du\uc0\u380 y i wygodny.',\
      sv: 'Huset \'e4r stort och bekv\'e4mt.',\
      default: 'The <em>house</em> is big and comfortable.',\
    \},\
    hook: 'Das englische "house" klingt wie das deutsche "Haus" \'97 gleicher Ursprung!',\
  \},\
  \{\
    id: 2,\
    anchor: 'water',\
    level: 'A1',\
    topic: 'Alltag',\
    translations: \{\
      de: 'Wasser',     fr: 'eau',        es: 'agua',       it: 'acqua',\
      pt: '\'e1gua',       nl: 'water',      pl: 'woda',       cs: 'voda',\
      sk: 'voda',       hu: 'v\'edz',        ro: 'ap\uc0\u259 ',        sv: 'vatten',\
      no: 'vann',       da: 'vand',       fi: 'vesi',       el: '\uc0\u957 \u949 \u961 \u972 ',\
      bg: '\uc0\u1074 \u1086 \u1076 \u1072 ',       hr: 'voda',       sl: 'voda',       lt: 'vanduo',\
      lv: '\uc0\u363 dens',      et: 'vesi',       uk: '\u1074 \u1086 \u1076 \u1072 ',       ru: '\u1074 \u1086 \u1076 \u1072 ',\
      en: 'water',\
    \},\
    examples: \{\
      en: 'I drink <em>water</em> every morning.',\
      de: 'Ich trinke jeden Morgen <em>Wasser</em>.',\
      fr: 'Je bois de l\\'<em>eau</em> tous les matins.',\
      es: 'Bebo <em>agua</em> cada ma\'f1ana.',\
      default: 'I drink <em>water</em> every morning.',\
    \},\
    hook: '"Water" und "Wasser" \'97 nahezu identisch, germanische Wurzel.',\
  \},\
  \{\
    id: 3,\
    anchor: 'work',\
    level: 'A1',\
    topic: 'Beruf',\
    translations: \{\
      de: 'Arbeit',     fr: 'travail',    es: 'trabajo',    it: 'lavoro',\
      pt: 'trabalho',   nl: 'werk',       pl: 'praca',      cs: 'pr\'e1ce',\
      sk: 'pr\'e1ca',      hu: 'munka',      ro: 'munc\uc0\u259 ',      sv: 'arbete',\
      no: 'arbeid',     da: 'arbejde',    fi: 'ty\'f6',        el: '\uc0\u949 \u961 \u947 \u945 \u963 \u943 \u945 ',\
      bg: '\uc0\u1088 \u1072 \u1073 \u1086 \u1090 \u1072 ',     hr: 'posao',      sl: 'delo',       lt: 'darbas',\
      lv: 'darbs',      et: 't\'f6\'f6',        uk: '\uc0\u1088 \u1086 \u1073 \u1086 \u1090 \u1072 ',     ru: '\u1088 \u1072 \u1073 \u1086 \u1090 \u1072 ',\
      en: 'work',\
    \},\
    examples: \{\
      en: 'She goes to <em>work</em> by train every day.',\
      de: 'Sie f\'e4hrt jeden Tag mit dem Zug zur <em>Arbeit</em>.',\
      fr: 'Elle va au <em>travail</em> en train chaque jour.',\
      default: 'She goes to <em>work</em> by train every day.',\
    \},\
    hook: 'Im Englischen = Verb & Nomen. Anchor f\'fcr "Arbeit/travail/lavoro".',\
  \},\
  \{\
    id: 4,\
    anchor: 'time',\
    level: 'A1',\
    topic: 'Alltag',\
    translations: \{\
      de: 'Zeit',       fr: 'temps',      es: 'tiempo',     it: 'tempo',\
      pt: 'tempo',      nl: 'tijd',       pl: 'czas',       cs: '\uc0\u269 as',\
      sk: '\uc0\u269 as',        hu: 'id\u337 ',        ro: 'timp',       sv: 'tid',\
      no: 'tid',        da: 'tid',        fi: 'aika',       el: '\uc0\u967 \u961 \u972 \u957 \u959 \u962 ',\
      bg: '\uc0\u1074 \u1088 \u1077 \u1084 \u1077 ',      hr: 'vrijeme',    sl: '\u269 as',        lt: 'laikas',\
      lv: 'laiks',      et: 'aeg',        uk: '\uc0\u1095 \u1072 \u1089 ',        ru: '\u1074 \u1088 \u1077 \u1084 \u1103 ',\
      en: 'time',\
    \},\
    examples: \{\
      en: 'There\\'s no <em>time</em> to waste.',\
      de: 'Es gibt keine <em>Zeit</em> zu verlieren.',\
      fr: 'Il n\\'y a pas de <em>temps</em> \'e0 perdre.',\
      default: 'There\\'s no <em>time</em> to waste.',\
    \},\
    hook: '"Zeit" (DE) und "tid" (SV/NO) \'97 alles dieselbe germanische Wurzel.',\
  \},\
  \{\
    id: 5,\
    anchor: 'person',\
    level: 'A1',\
    topic: 'Soziales',\
    translations: \{\
      de: 'Person',     fr: 'personne',   es: 'persona',    it: 'persona',\
      pt: 'pessoa',     nl: 'persoon',    pl: 'osoba',      cs: 'osoba',\
      sk: 'osoba',      hu: 'szem\'e9ly',    ro: 'persoan\uc0\u259 ',   sv: 'person',\
      no: 'person',     da: 'person',     fi: 'henkil\'f6',    el: '\uc0\u960 \u961 \u972 \u963 \u969 \u960 \u959 ',\
      bg: '\uc0\u1095 \u1086 \u1074 \u1077 \u1082 ',      hr: 'osoba',      sl: 'oseba',      lt: 'asmuo',\
      lv: 'persona',    et: 'isik',       uk: '\uc0\u1083 \u1102 \u1076 \u1080 \u1085 \u1072 ',     ru: '\u1095 \u1077 \u1083 \u1086 \u1074 \u1077 \u1082 ',\
      en: 'person',\
    \},\
    examples: \{\
      en: 'Every <em>person</em> has their own story.',\
      de: 'Jede <em>Person</em> hat ihre eigene Geschichte.',\
      default: 'Every <em>person</em> has their own story.',\
    \},\
    hook: 'Aus dem Lateinischen "persona" \'97 in fast allen romanischen Sprachen identisch!',\
  \},\
  \{\
    id: 6,\
    anchor: 'money',\
    level: 'A2',\
    topic: 'Finanzen',\
    translations: \{\
      de: 'Geld',       fr: 'argent',     es: 'dinero',     it: 'denaro',\
      pt: 'dinheiro',   nl: 'geld',       pl: 'pieni\uc0\u261 dze',  cs: 'pen\'edze',\
      sk: 'peniaze',    hu: 'p\'e9nz',       ro: 'bani',       sv: 'pengar',\
      no: 'penger',     da: 'penge',      fi: 'raha',       el: '\uc0\u967 \u961 \u942 \u956 \u945 \u964 \u945 ',\
      bg: '\uc0\u1087 \u1072 \u1088 \u1080 ',       hr: 'novac',      sl: 'denar',      lt: 'pinigai',\
      lv: 'nauda',      et: 'raha',       uk: '\uc0\u1075 \u1088 \u1086 \u1096 \u1110 ',      ru: '\u1076 \u1077 \u1085 \u1100 \u1075 \u1080 ',\
      en: 'money',\
    \},\
    examples: \{\
      en: 'She saves <em>money</em> every month.',\
      de: 'Sie spart jeden Monat <em>Geld</em>.',\
      fr: 'Elle \'e9conomise de l\\'<em>argent</em> chaque mois.',\
      es: 'Ella ahorra <em>dinero</em> cada mes.',\
      default: 'She saves <em>money</em> every month.',\
    \},\
    hook: '"Money" \uc0\u8594  M\'fcnze (DE) \u8594  aus dem Lateinischen "moneta".',\
  \},\
  \{\
    id: 7,\
    anchor: 'city',\
    level: 'A2',\
    topic: 'Reisen',\
    translations: \{\
      de: 'Stadt',      fr: 'ville',      es: 'ciudad',     it: 'citt\'e0',\
      pt: 'cidade',     nl: 'stad',       pl: 'miasto',     cs: 'm\uc0\u283 sto',\
      sk: 'mesto',      hu: 'v\'e1ros',      ro: 'ora\uc0\u537 ',       sv: 'stad',\
      no: 'by',         da: 'by',         fi: 'kaupunki',   el: '\uc0\u960 \u972 \u955 \u951 ',\
      bg: '\uc0\u1075 \u1088 \u1072 \u1076 ',       hr: 'grad',       sl: 'mesto',      lt: 'miestas',\
      lv: 'pils\uc0\u275 ta',    et: 'linn',       uk: '\u1084 \u1110 \u1089 \u1090 \u1086 ',      ru: '\u1075 \u1086 \u1088 \u1086 \u1076 ',\
      en: 'city',\
    \},\
    examples: \{\
      en: 'Paris is a beautiful <em>city</em>.',\
      de: 'Paris ist eine wundersch\'f6ne <em>Stadt</em>.',\
      fr: 'Paris est une belle <em>ville</em>.',\
      default: 'Paris is a beautiful <em>city</em>.',\
    \},\
    hook: '"City" < Latein "civitas" = B\'fcrgerschaft \uc0\u8594  englisch, franz\'f6sisch, spanisch verwandt.',\
  \},\
  \{\
    id: 8,\
    anchor: 'health',\
    level: 'B1',\
    topic: 'Gesundheit',\
    translations: \{\
      de: 'Gesundheit',  fr: 'sant\'e9',     es: 'salud',      it: 'salute',\
      pt: 'sa\'fade',       nl: 'gezondheid',pl: 'zdrowie',    cs: 'zdrav\'ed',\
      sk: 'zdravie',     hu: 'eg\'e9szs\'e9g',  ro: 's\uc0\u259 n\u259 tate',   sv: 'h\'e4lsa',\
      no: 'helse',       da: 'helbred',   fi: 'terveys',    el: '\uc0\u965 \u947 \u949 \u943 \u945 ',\
      bg: '\uc0\u1079 \u1076 \u1088 \u1072 \u1074 \u1077 ',      hr: 'zdravlje',  sl: 'zdravje',    lt: 'sveikata',\
      lv: 'vesel\uc0\u299 ba',    et: 'tervis',    uk: '\u1079 \u1076 \u1086 \u1088 \u1086 \u1074 \\'\u1103 ',  ru: '\u1079 \u1076 \u1086 \u1088 \u1086 \u1074 \u1100 \u1077 ',\
      en: 'health',\
    \},\
    examples: \{\
      en: 'Good <em>health</em> is the greatest wealth.',\
      de: 'Gute <em>Gesundheit</em> ist der gr\'f6\'dfte Reichtum.',\
      fr: 'La bonne <em>sant\'e9</em> est la plus grande richesse.',\
      default: 'Good <em>health</em> is the greatest wealth.',\
    \},\
    hook: '"Health" (EN), "Helse" (NO), "H\'e4lsa" (SV) \'97 gleiche germanische Wurzel "heil".',\
  \},\
  \{\
    id: 9,\
    anchor: 'decision',\
    level: 'B1',\
    topic: 'Beruf',\
    translations: \{\
      de: 'Entscheidung', fr: 'd\'e9cision',  es: 'decisi\'f3n',  it: 'decisione',\
      pt: 'decis\'e3o',      nl: 'beslissing',pl: 'decyzja',   cs: 'rozhodnut\'ed',\
      sk: 'rozhodnutie',  hu: 'd\'f6nt\'e9s',    ro: 'decizie',   sv: 'beslut',\
      no: 'beslutning',   da: 'beslutning',fi: 'p\'e4\'e4t\'f6s',    el: '\uc0\u945 \u960 \u972 \u966 \u945 \u963 \u951 ',\
      bg: '\uc0\u1088 \u1077 \u1096 \u1077 \u1085 \u1080 \u1077 ',      hr: 'odluka',    sl: 'odlo\u269 itev', lt: 'sprendimas',\
      lv: 'l\uc0\u275 mums',       et: 'otsus',     uk: '\u1088 \u1110 \u1096 \u1077 \u1085 \u1085 \u1103 ',   ru: '\u1088 \u1077 \u1096 \u1077 \u1085 \u1080 \u1077 ',\
      en: 'decision',\
    \},\
    examples: \{\
      en: 'It was a difficult <em>decision</em> to make.',\
      de: 'Es war eine schwierige <em>Entscheidung</em>.',\
      fr: 'C\\'\'e9tait une <em>d\'e9cision</em> difficile \'e0 prendre.',\
      default: 'It was a difficult <em>decision</em> to make.',\
    \},\
    hook: 'Latein "decisio" \uc0\u8594  romanische Sprachen fast identisch: decisi\'f3n/d\'e9cision/decisione.',\
  \},\
  \{\
    id: 10,\
    anchor: 'consequence',\
    level: 'B2',\
    topic: 'Beruf',\
    translations: \{\
      de: 'Konsequenz',   fr: 'cons\'e9quence', es: 'consecuencia', it: 'conseguenza',\
      pt: 'consequ\'eancia', nl: 'gevolg',       pl: 'konsekwencja', cs: 'd\uc0\u367 sledek',\
      sk: 'd\'f4sledok',     hu: 'k\'f6vetkezm\'e9ny', ro: 'consecin\uc0\u539 \u259 ',   sv: 'konsekvens',\
      no: 'konsekvens',   da: 'konsekvens',   fi: 'seuraus',      el: '\uc0\u963 \u965 \u957 \u941 \u960 \u949 \u953 \u945 ',\
      bg: '\uc0\u1087 \u1086 \u1089 \u1083 \u1077 \u1076 \u1089 \u1090 \u1074 \u1080 \u1077 ',  hr: 'posljedica',   sl: 'posledica',    lt: 'pasekm\u279 ',\
      lv: 'sekas',        et: 'tagaj\'e4rg',     uk: '\uc0\u1085 \u1072 \u1089 \u1083 \u1110 \u1076 \u1086 \u1082 ',     ru: '\u1087 \u1086 \u1089 \u1083 \u1077 \u1076 \u1089 \u1090 \u1074 \u1080 \u1077 ',\
      en: 'consequence',\
    \},\
    examples: \{\
      en: 'Every action has a <em>consequence</em>.',\
      de: 'Jede Handlung hat eine <em>Konsequenz</em>.',\
      fr: 'Chaque action a une <em>cons\'e9quence</em>.',\
      default: 'Every action has a <em>consequence</em>.',\
    \},\
    hook: 'Latein "consequentia" \'97 im Deutschen, Schwedischen, Polnischen fast gleich buchstabiert!',\
  \},\
];\
\
// \uc0\u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \
// 3.  APP STATE\
// \uc0\u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \
const state = \{\
  currentView: 'onboarding',\
  nativeLang: 'de',\
  targetLang: 'en',\
  goalLevel: 'A1',\
\
  // Progress\
  masteredCount: 150,\
  totalWords: 3000,\
  todayCount: 0,\
  streak: 7,\
  accuracy: 84,\
\
  // Level progress (words mastered per level)\
  levelProgress: \{ A1: 120, A2: 28, B1: 2, B2: 0 \},\
  levelTotal:    \{ A1: 300, A2: 600, B1: 1500, B2: 600 \},\
\
  // Weekly activity (words reviewed per day, Mon\'96Sun)\
  weekActivity: [14, 0, 22, 8, 17, 0, 0],\
\
  // Word states: \{ id -> 'mastered' | 'learning' | 'new' \}\
  wordStates: \{\},\
\
  // Session\
  session: \{\
    queue: [],\
    currentIdx: 0,\
    isFlipped: false,\
    results: \{ easy: 0, hard: 0, failed: 0 \},\
    active: false,\
  \},\
\
  // Library filters\
  libFilter: 'all',\
  libSearch: '',\
\};\
\
// Initialize word states from ANCHOR_WORDS\
(function initWordStates() \{\
  ANCHOR_WORDS.forEach((w, i) => \{\
    if (i < 5)       state.wordStates[w.id] = 'mastered';\
    else if (i < 8)  state.wordStates[w.id] = 'learning';\
    else             state.wordStates[w.id] = 'new';\
  \});\
\})();\
\
// \uc0\u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \
// 4.  NAVIGATION\
// \uc0\u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \
function navigate(viewName) \{\
  if (state.currentView === viewName) return;\
\
  // Hide all views\
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));\
\
  // Show target view\
  const el = document.getElementById(`view-$\{viewName\}`);\
  if (!el) return;\
  el.classList.remove('hidden');\
  // Restart animation\
  el.style.animation = 'none';\
  requestAnimationFrame(() => \{ el.style.animation = ''; \});\
\
  state.currentView = viewName;\
\
  // Update nav active state\
  document.querySelectorAll('.nav-btn').forEach(btn => \{\
    btn.classList.toggle('active', btn.dataset.view === viewName);\
  \});\
\
  // Close mobile menu\
  document.getElementById('nav-links').classList.remove('open');\
\
  // View-specific init\
  if (viewName === 'dashboard') initDashboard();\
  if (viewName === 'study')     initStudy();\
  if (viewName === 'library')   initLibrary();\
\
  window.scrollTo(\{ top: 0, behavior: 'smooth' \});\
\}\
\
// \uc0\u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \
// 5.  MOBILE MENU\
// \uc0\u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \
function toggleMenu() \{\
  document.getElementById('nav-links').classList.toggle('open');\
\}\
\
// \uc0\u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \
// 6.  ONBOARDING\
// \uc0\u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \
function updateLanguagePreview() \{\
  const nativeSel = document.getElementById('native-lang');\
  const targetSel = document.getElementById('target-lang');\
  state.nativeLang = nativeSel.value;\
  state.targetLang = targetSel.value;\
\
  const nl = LANGUAGES[state.nativeLang];\
  const tl = LANGUAGES[state.targetLang];\
\
  document.getElementById('preview-native').textContent = `$\{nl.flag\} $\{nl.name\}`;\
  document.getElementById('preview-target').textContent = `$\{tl.flag\} $\{tl.name\}`;\
\}\
\
function selectLevel(level) \{\
  state.goalLevel = level;\
  document.querySelectorAll('.level-btn').forEach(btn => \{\
    btn.classList.toggle('active', btn.dataset.level === level);\
  \});\
\}\
\
// Topic chip toggle\
document.querySelectorAll('.topic-chip').forEach(chip => \{\
  chip.addEventListener('click', () => \{\
    chip.classList.toggle('active');\
  \});\
\});\
\
function saveProfile() \{\
  state.nativeLang = document.getElementById('native-lang').value;\
  state.targetLang = document.getElementById('target-lang').value;\
  navigate('dashboard');\
\}\
\
// \uc0\u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \
// 7.  DASHBOARD\
// \uc0\u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \
function initDashboard() \{\
  // Greeting\
  const hour = new Date().getHours();\
  let greeting = 'Guten Morgen';\
  if (hour >= 12 && hour < 18) greeting = 'Guten Tag';\
  else if (hour >= 18) greeting = 'Guten Abend';\
  document.getElementById('dash-greeting').textContent = greeting;\
\
  // Headline with target lang\
  const tl = LANGUAGES[state.targetLang];\
  document.getElementById('dash-headline').textContent =\
    `Bereit f\'fcr $\{tl ? tl.name : 'English'\}?`;\
\
  // Core numbers\
  document.getElementById('ring-count').textContent      = state.masteredCount;\
  document.getElementById('remaining-count').textContent = state.totalWords - state.masteredCount;\
  document.getElementById('streak-count').textContent    = state.streak;\
  document.getElementById('accuracy-count').textContent  = `$\{state.accuracy\}%`;\
  document.getElementById('today-count').textContent     = state.todayCount;\
\
  // Current level badge\
  const currentLevel = computeCurrentLevel();\
  document.getElementById('stat-level-badge').textContent = `Niveau: $\{currentLevel\}`;\
\
  // Due count (mock)\
  const dueCount = ANCHOR_WORDS.filter(w => state.wordStates[w.id] !== 'mastered').length;\
  document.getElementById('due-count').textContent = dueCount;\
\
  // Progress ring\
  const pct = state.masteredCount / state.totalWords;\
  const circumference = 2 * Math.PI * 52; // r=52\
  const offset = circumference * (1 - pct);\
  const ringCircle = document.getElementById('ring-fill-circle');\
  // Inject gradient defs if not present\
  injectSvgGradient();\
  setTimeout(() => \{\
    ringCircle.style.strokeDasharray  = circumference;\
    ringCircle.style.strokeDashoffset = offset;\
  \}, 100);\
\
  // Level bars\
  renderLevelBars();\
\
  // Week chart\
  renderWeekChart();\
\}\
\
function computeCurrentLevel() \{\
  const m = state.masteredCount;\
  if (m < 300)  return 'A1';\
  if (m < 900)  return 'A2';\
  if (m < 2400) return 'B1';\
  return 'B2';\
\}\
\
function injectSvgGradient() \{\
  const svg = document.getElementById('progress-ring-svg');\
  if (!svg || svg.querySelector('defs')) return;\
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');\
  defs.innerHTML = `\
    <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">\
      <stop offset="0%"   stop-color="#4f9cf9"/>\
      <stop offset="100%" stop-color="#38bdf8"/>\
    </linearGradient>`;\
  svg.prepend(defs);\
\}\
\
const LEVEL_COLORS = \{\
  A1: '#34d399',\
  A2: '#38bdf8',\
  B1: '#fbbf24',\
  B2: '#f87171',\
\};\
\
function renderLevelBars() \{\
  const container = document.getElementById('level-bars');\
  container.innerHTML = '';\
  ['A1', 'A2', 'B1', 'B2'].forEach(level => \{\
    const done  = state.levelProgress[level];\
    const total = state.levelTotal[level];\
    const pct   = Math.round((done / total) * 100);\
    const row   = document.createElement('div');\
    row.className = 'level-bar-row';\
    row.innerHTML = `\
      <div class="level-bar-label">$\{level\}</div>\
      <div class="level-bar-track">\
        <div class="level-bar-fill" style="width:0%; background:$\{LEVEL_COLORS[level]\}" data-target="$\{pct\}%"></div>\
      </div>\
      <div class="level-bar-pct">$\{done\} / $\{total\}</div>`;\
    container.appendChild(row);\
  \});\
  // Animate fills\
  setTimeout(() => \{\
    container.querySelectorAll('.level-bar-fill').forEach(fill => \{\
      fill.style.width = fill.dataset.target;\
    \});\
  \}, 120);\
\}\
\
const DAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];\
\
function renderWeekChart() \{\
  const container = document.getElementById('week-chart');\
  container.innerHTML = '';\
  const today = (new Date().getDay() + 6) % 7; // 0=Mon\
  const max   = Math.max(...state.weekActivity, 1);\
\
  DAYS.forEach((day, i) => \{\
    const val  = state.weekActivity[i];\
    const pct  = (val / max) * 100;\
    const isToday = i === today;\
    const wrap = document.createElement('div');\
    wrap.className = 'week-bar-wrap';\
    wrap.innerHTML = `\
      <div class="week-bar$\{isToday ? ' today' : ''\}"\
           style="height:$\{Math.max(pct, 5)\}%; background:$\{isToday ? 'linear-gradient(180deg,#4f9cf9,#3b82f6)' : 'rgba(79,156,249,0.25)'\}"\
           title="$\{val\} W\'f6rter">\
      </div>\
      <div class="week-day-label">$\{day\}</div>`;\
    container.appendChild(wrap);\
  \});\
\}\
\
// \uc0\u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \
// 8.  STUDY SESSION\
// \uc0\u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \
function initStudy() \{\
  // Build queue: non-mastered words + mastered ones at end\
  const queue = [\
    ...ANCHOR_WORDS.filter(w => state.wordStates[w.id] !== 'mastered'),\
    ...ANCHOR_WORDS.filter(w => state.wordStates[w.id] === 'mastered'),\
  ];\
\
  state.session = \{\
    queue,\
    currentIdx: 0,\
    isFlipped: false,\
    results: \{ easy: 0, hard: 0, failed: 0 \},\
    active: true,\
  \};\
\
  // Show card scene, hide end screen\
  document.getElementById('card-scene').classList.remove('hidden');\
  document.getElementById('sr-buttons').classList.remove('hidden');\
  document.getElementById('session-end').classList.add('hidden');\
\
  // Lang pair label\
  const nl = LANGUAGES[state.nativeLang];\
  const tl = LANGUAGES[state.targetLang];\
  document.getElementById('session-lang-pair').textContent =\
    `$\{nl.flag\}$\{nl.name.substring(0,2).toUpperCase()\} \uc0\u8594  $\{tl.flag\}$\{tl.name.substring(0,2).toUpperCase()\}`;\
\
  renderCard();\
\}\
\
function renderCard() \{\
  const sess = state.session;\
  const word = sess.queue[sess.currentIdx];\
  if (!word) \{ endSession(); return; \}\
\
  // Reset flip\
  sess.isFlipped = false;\
  const fc = document.getElementById('flashcard');\
  fc.classList.remove('flipped');\
\
  // Progress bar + text\
  const total = sess.queue.length;\
  const idx   = sess.currentIdx;\
  const pct   = (idx / total) * 100;\
  document.getElementById('session-bar-fill').style.width    = `$\{pct\}%`;\
  document.getElementById('session-progress-text').textContent = `$\{idx + 1\} / $\{total\}`;\
\
  // Front face\
  document.getElementById('fc-level-badge').textContent = word.level;\
  document.getElementById('fc-topic-badge').textContent  = word.topic;\
  document.getElementById('fc-word').textContent         = word.anchor; // English anchor shown\
\
  // Show target language word in example context\
  const targetWord = getWordInLang(word, state.targetLang);\
  const targetEx   = getExample(word, state.targetLang);\
  document.getElementById('fc-word').textContent = targetWord;\
  document.getElementById('fc-example').innerHTML = targetEx;\
\
  // Back face\
  const nativeWord = getWordInLang(word, state.nativeLang);\
  const nativeEx   = getExample(word, state.nativeLang);\
  document.getElementById('fc-translation').textContent    = nativeWord;\
  document.getElementById('fc-native-example').innerHTML   = nativeEx;\
  document.getElementById('fc-hook-text').textContent      = word.hook || `Anchor: "$\{word.anchor\}"`;\
\}\
\
function getWordInLang(word, lang) \{\
  return word.translations[lang] || word.translations['en'] || word.anchor;\
\}\
\
function getExample(word, lang) \{\
  return word.examples[lang] || word.examples['default'] || word.examples['en'] || '';\
\}\
\
function flipCard() \{\
  const sess = state.session;\
  if (!sess.active) return;\
  sess.isFlipped = !sess.isFlipped;\
  document.getElementById('flashcard').classList.toggle('flipped', sess.isFlipped);\
\}\
\
function srAnswer(rating) \{\
  const sess = state.session;\
  if (!sess.active) return;\
\
  const word = sess.queue[sess.currentIdx];\
  if (!word) return;\
\
  // Update result counts\
  sess.results[rating]++;\
\
  // Update word state based on rating\
  if (rating === 'easy') \{\
    state.wordStates[word.id] = 'mastered';\
    // Update mastered count & today count\
    state.masteredCount++;\
    state.todayCount++;\
    // Update level progress\
    if (state.levelProgress[word.level] !== undefined)\
      state.levelProgress[word.level]++;\
  \} else if (rating === 'hard') \{\
    state.wordStates[word.id] = 'learning';\
    state.todayCount++;\
  \} else \{\
    // failed \'97 keep in learning\
    state.wordStates[word.id] = 'learning';\
  \}\
\
  // Button feedback animation\
  const btnMap = \{ easy: 'btn-easy', hard: 'btn-hard', failed: 'btn-failed' \};\
  const btn = document.getElementById(btnMap[rating]);\
  if (btn) \{\
    btn.style.transform = 'scale(0.95)';\
    setTimeout(() => \{ btn.style.transform = ''; \}, 150);\
  \}\
\
  // Next card\
  sess.currentIdx++;\
  if (sess.currentIdx >= sess.queue.length) \{\
    endSession();\
  \} else \{\
    renderCard();\
  \}\
\}\
\
function endSession() \{\
  const sess = state.session;\
  sess.active = false;\
\
  document.getElementById('card-scene').classList.add('hidden');\
  document.getElementById('sr-buttons').classList.add('hidden');\
\
  const endEl  = document.getElementById('session-end');\
  endEl.classList.remove('hidden');\
\
  const total = sess.results.easy + sess.results.hard + sess.results.failed;\
  document.getElementById('session-end-stats').textContent =\
    `Du hast heute $\{total\} W\'f6rter in dieser Session bearbeitet.`;\
\
  const resultsEl = document.getElementById('session-end-results');\
  resultsEl.innerHTML = `\
    <div class="result-chip easy"><span>$\{sess.results.easy\}</span>Einfach</div>\
    <div class="result-chip hard"><span>$\{sess.results.hard\}</span>Schwer</div>\
    <div class="result-chip failed"><span>$\{sess.results.failed\}</span>Nicht gewusst</div>`;\
\}\
\
function restartSession() \{\
  initStudy();\
\}\
\
// \uc0\u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \
// 9.  LIBRARY (Wort-Matrix)\
// \uc0\u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \
function initLibrary() \{\
  // Update mini stats\
  const mastered = Object.values(state.wordStates).filter(s => s === 'mastered').length;\
  const learning = Object.values(state.wordStates).filter(s => s === 'learning').length;\
  const newCount = Object.values(state.wordStates).filter(s => s === 'new').length;\
  document.getElementById('lib-mastered').textContent = state.masteredCount;\
  document.getElementById('lib-learning').textContent = learning;\
  document.getElementById('lib-new').textContent = state.totalWords - state.masteredCount - learning;\
\
  renderLibrary();\
\}\
\
function filterLibrary() \{\
  state.libSearch = document.getElementById('lib-search').value.toLowerCase();\
  renderLibrary();\
\}\
\
function setLibFilter(filter, btnEl) \{\
  state.libFilter = filter;\
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));\
  if (btnEl) btnEl.classList.add('active');\
  renderLibrary();\
\}\
\
function renderLibrary() \{\
  const tbody = document.getElementById('library-tbody');\
  const empty = document.getElementById('lib-empty');\
  tbody.innerHTML = '';\
\
  const tl = state.targetLang;\
  const nl = state.nativeLang;\
  const query  = state.libSearch;\
  const filter = state.libFilter;\
\
  const filtered = ANCHOR_WORDS.filter(word => \{\
    const wordStatus = state.wordStates[word.id] || 'new';\
\
    // Level filter\
    if (['A1','A2','B1','B2'].includes(filter) && word.level !== filter) return false;\
    // Status filter\
    if (filter === 'mastered' && wordStatus !== 'mastered') return false;\
    if (filter === 'learning' && wordStatus !== 'learning') return false;\
    if (filter === 'new'      && wordStatus !== 'new')      return false;\
\
    // Search\
    if (query) \{\
      const targetWord = (word.translations[tl] || '').toLowerCase();\
      const nativeWord = (word.translations[nl] || '').toLowerCase();\
      const anchorWord = word.anchor.toLowerCase();\
      if (!targetWord.includes(query) && !nativeWord.includes(query) && !anchorWord.includes(query)) return false;\
    \}\
\
    return true;\
  \});\
\
  if (filtered.length === 0) \{\
    empty.classList.remove('hidden');\
    tbody.parentElement.classList.add('hidden');\
    return;\
  \}\
\
  empty.classList.add('hidden');\
  tbody.parentElement.classList.remove('hidden');\
\
  filtered.forEach(word => \{\
    const status    = state.wordStates[word.id] || 'new';\
    const targetW   = word.translations[tl] || word.anchor;\
    const nativeW   = word.translations[nl] || '\'97';\
    const statusLabel = \{ mastered: 'Gemeistert', learning: 'Im Lernen', new: 'Neu' \}[status];\
    const tr = document.createElement('tr');\
    tr.innerHTML = `\
      <td class="td-id">$\{word.id\}</td>\
      <td class="td-anchor">$\{word.anchor\}</td>\
      <td class="td-target">$\{targetW\}</td>\
      <td class="td-native">$\{nativeW\}</td>\
      <td><span class="level-pill $\{word.level\}">$\{word.level\}</span></td>\
      <td>$\{word.topic\}</td>\
      <td><span class="status-dot $\{status\}">$\{statusLabel\}</span></td>`;\
    tbody.appendChild(tr);\
  \});\
\}\
\
// \uc0\u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \
// 10.  BOOTSTRAP\
// \uc0\u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \
document.addEventListener('DOMContentLoaded', () => \{\
  // Show onboarding first\
  navigate('onboarding');\
\
  // Sync language preview on load\
  updateLanguagePreview();\
\});\
}
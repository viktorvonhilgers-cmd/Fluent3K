#!/usr/bin/env python3
"""Erzeugt die Wortdaten für Fluent3k nach data/<code>.json.

Schwedisch: 3000 häufigste Wörter (Lemmata, nach Häufigkeit). Alle anderen Sprachen: 50 Wörter.
Ausgangssprachen, aus denen man Schwedisch lernt, bekommen ebenfalls 3000 Übersetzungen.

pip install anthropic wordfreq ; export ANTHROPIC_API_KEY=...
python generate.py                    # Schwedisch + Deutsch (3000), Rest 50
python generate.py --native=de,en     # mehrere Ausgangssprachen
Format je Eintrag: [Wort, Beispielsatz, Aussprache/Umschrift]; gleiche Reihenfolge in allen Dateien.
"""
import json, os, sys
from concurrent.futures import ThreadPoolExecutor
import anthropic
from wordfreq import top_n_list

MODEL, BATCH, BIG, SMALL = "claude-haiku-5-5", 50, 3000, 50
LANGS = {"bg": "Bulgarisch", "da": "Dänisch", "de": "Deutsch", "fi": "Finnisch", "fr": "Französisch",
         "el": "Griechisch", "it": "Italienisch", "hr": "Kroatisch", "nl": "Niederländisch", "no": "Norwegisch",
         "pl": "Polnisch", "pt": "Portugiesisch", "ro": "Rumänisch", "ru": "Russisch", "sv": "Schwedisch",
         "sr": "Serbisch (lateinische Schrift)", "sk": "Slowakisch", "cs": "Tschechisch", "uk": "Ukrainisch",
         "hu": "Ungarisch", "en": "Englisch", "zh": "Chinesisch (Mandarin, vereinfacht)", "hi": "Hindi",
         "es": "Spanisch", "ar": "Arabisch"}
client = anthropic.Anthropic()
os.makedirs("data", exist_ok=True)


def ask(prompt):
    for _ in range(4):
        try:
            t = client.messages.create(model=MODEL, max_tokens=8000,
                                       messages=[{"role": "user", "content": prompt}]).content[0].text
            return json.loads(t[t.index("["): t.rindex("]") + 1])
        except Exception as e:
            print("Wiederhole:", e)
    raise RuntimeError("Anfrage fehlgeschlagen")


def concepts():
    path = "data/concepts.json"
    if os.path.exists(path):
        return json.load(open(path, encoding="utf-8"))
    toks = top_n_list("sv", 9000)
    chunks = [toks[i:i + 60] for i in range(0, len(toks), 60)]
    clean = lambda c: ask(f"Häufige schwedische Wörter: {json.dumps(c, ensure_ascii=False)}\n"
                          "Gib pro Wort [Lemma, englische Übersetzung] zurück, gleiche Reihenfolge. "
                          "Gib null zurück bei Eigennamen, Abkürzungen, Zahlen, Nichtwörtern und bei Beugungsformen "
                          "eines Lemmas, das ohnehin in der Liste steht. Nur JSON-Array.")
    with ThreadPoolExecutor(4) as ex:
        parts = list(ex.map(clean, chunks))
    seen, words = set(), []
    for p in parts:
        for x in p:
            if x and len(x) >= 2 and str(x[0]).lower() not in seen:
                seen.add(str(x[0]).lower())
                words.append([str(x[0]).lower(), str(x[1])])
    words = words[:BIG]
    if len(words) < BIG:
        print(f"Warnung: nur {len(words)} Lemmata gefunden (top_n_list vergrößern)")
    json.dump(words, open(path, "w", encoding="utf-8"), ensure_ascii=False)
    return words


def translate(name, chunk):
    for _ in range(4):
        out = ask(f"Schwedische Wörter mit englischer Bedeutung: {json.dumps(chunk, ensure_ascii=False)}\n"
                  f"Gib pro Eintrag [Wort, Beispielsatz, Aussprache] in der Sprache {name} zurück. Wort = Entsprechung "
                  "in Grundform (bei Schwedisch das Lemma unverändert, Nomen ohne Artikel); Beispielsatz kurz (A1-A2) "
                  "und mit dem Wort (Beugung erlaubt); Aussprache = Umschrift bei nicht-lateinischen Schriften "
                  "(Chinesisch: Pinyin mit Tönen), sonst vereinfachte Lautschrift für Deutschsprachige. "
                  "Exakt gleiche Anzahl und Reihenfolge wie die Eingabe. Nur JSON-Array.")
        if len(out) == len(chunk) and all(len(x) >= 2 and x[0] and x[1] for x in out):
            return [[str(x[0]), str(x[1]), str(x[2]) if len(x) > 2 else ""] for x in out]
    raise RuntimeError("Batch fehlgeschlagen")


def build(code, words, n):
    path = f"data/{code}.json"
    if os.path.exists(path) and len(json.load(open(path, encoding="utf-8"))) >= n:
        return
    part = words[:n]
    chunks = [part[i:i + BATCH] for i in range(0, len(part), BATCH)]
    with ThreadPoolExecutor(4) as ex:
        res = list(ex.map(lambda c: translate(LANGS[code], c), chunks))
    json.dump([e for r in res for e in r], open(path, "w", encoding="utf-8"), ensure_ascii=False)
    print("fertig:", code, n)


if __name__ == "__main__":
    args, natives = sys.argv[1:], ["de"]
    if args and args[0].startswith("--native="):
        natives = args.pop(0)[9:].split(",")
    words = concepts()
    for code in (args or LANGS):
        build(code, words, BIG if code == "sv" or code in natives else SMALL)

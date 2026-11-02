#!/usr/bin/env python3
"""Erzeugt die Wortdaten für Fluent3k nach data/<code>.json.

Schwedisch: 3000 häufigste Wörter (Lemmata, nach Häufigkeit). Alle anderen Sprachen: 50 Wörter.
Ausgangssprachen, aus denen man Schwedisch lernt, bekommen ebenfalls 3000 Übersetzungen.

pip3 install wordfreq ; export GEMINI_API_KEY=...   (kostenloser Key: aistudio.google.com/apikey)
python generate.py                    # Schwedisch + Deutsch (3000), Rest 50
python generate.py --native=de,en     # mehrere Ausgangssprachen
Format je Eintrag: [Wort, Beispielsatz, Aussprache/Umschrift]; gleiche Reihenfolge in allen Dateien.
"""
import json, os, sys, time, urllib.request, urllib.error
from wordfreq import top_n_list

MODEL = "gemini-flash-lite-latest"   # falls Fehler "model not found": Namen aus aistudio.google.com ersetzen
PAUSE = 6                            # Sekunden zwischen Anfragen (Gratis-Limit pro Minute)
BATCH, BIG, SMALL = 50, 3000, 50
LANGS = {"bg": "Bulgarisch", "da": "Dänisch", "de": "Deutsch", "fi": "Finnisch", "fr": "Französisch",
         "el": "Griechisch", "it": "Italienisch", "hr": "Kroatisch", "nl": "Niederländisch", "no": "Norwegisch",
         "pl": "Polnisch", "pt": "Portugiesisch", "ro": "Rumänisch", "ru": "Russisch", "sv": "Schwedisch",
         "sr": "Serbisch (lateinische Schrift)", "sk": "Slowakisch", "cs": "Tschechisch", "uk": "Ukrainisch",
         "hu": "Ungarisch", "en": "Englisch", "zh": "Chinesisch (Mandarin, vereinfacht)", "hi": "Hindi",
         "es": "Spanisch", "ar": "Arabisch"}
KEY = os.environ.get("GEMINI_API_KEY") or sys.exit("GEMINI_API_KEY fehlt (export GEMINI_API_KEY=...)")
os.makedirs("data", exist_ok=True)


def ask(prompt):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent"
    body = json.dumps({"contents": [{"parts": [{"text": prompt}]}],
                       "generationConfig": {"maxOutputTokens": 8000}}).encode()
    for _ in range(8):
        try:
            req = urllib.request.Request(url, body, {"Content-Type": "application/json", "x-goog-api-key": KEY})
            with urllib.request.urlopen(req, timeout=120) as r:
                t = json.load(r)["candidates"][0]["content"]["parts"][0]["text"]
            time.sleep(PAUSE)
            return json.loads(t[t.index("["): t.rindex("]") + 1])
        except urllib.error.HTTPError as e:
            print("Wiederhole (HTTP", e.code, ") - warte 40 s")
            print("Grund:", e.read().decode("utf-8", "ignore")[:400])
            if e.code == 404:
                sys.exit("Modell nicht gefunden: MODEL oben im Skript anpassen.")
            time.sleep(40)
        except Exception as e:
            print("Wiederhole:", e)
            time.sleep(PAUSE)
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
    parts = []
    for i, c in enumerate(chunks):
        print(f"Wörter bereinigen {i + 1}/{len(chunks)}")
        parts.append(clean(c))
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


def norm(x):
    """Ein Eintrag -> [Wort, Satz, Aussprache] oder None (auch wenn das Modell Objekte statt Listen liefert)."""
    if isinstance(x, dict):
        x = list(x.values())
    if not isinstance(x, (list, tuple)) or len(x) < 2 or not x[0] or not x[1]:
        return None
    return [str(x[0]), str(x[1]), str(x[2]) if len(x) > 2 and x[2] else ""]


def translate(name, chunk):
    for _ in range(4):
        out = ask(f"Schwedische Wörter mit englischer Bedeutung: {json.dumps(chunk, ensure_ascii=False)}\n"
                  f"Gib pro Eintrag [Wort, Beispielsatz, Aussprache] in der Sprache {name} zurück. Wort = Entsprechung "
                  "in Grundform (bei Schwedisch das Lemma unverändert, Nomen ohne Artikel); Beispielsatz kurz (A1-A2) "
                  "und mit dem Wort (Beugung erlaubt); Aussprache = Umschrift bei nicht-lateinischen Schriften "
                  "(Chinesisch: Pinyin mit Tönen), sonst vereinfachte Lautschrift für Deutschsprachige. "
                  "Jeder Eintrag ein JSON-Array [Wort, Beispielsatz, Aussprache], keine Objekte. "
                  "Exakt gleiche Anzahl und Reihenfolge wie die Eingabe. Nur JSON-Array.")
        res = [norm(x) for x in out] if isinstance(out, list) else []
        if len(res) == len(chunk) and all(res):
            return res
        print("Block ungültig, neuer Versuch")
    raise RuntimeError("Batch fehlgeschlagen")


def build(code, words, n):
    path = f"data/{code}.json"
    if os.path.exists(path) and len(json.load(open(path, encoding="utf-8"))) >= n:
        return
    part = words[:n]
    chunks = [part[i:i + BATCH] for i in range(0, len(part), BATCH)]
    tmp = f"data/_teil_{code}.json"   # Zwischenstand, damit nach einem Abbruch nichts verloren geht
    res = json.load(open(tmp, encoding="utf-8")) if os.path.exists(tmp) else []
    for i in range(len(res), len(chunks)):
        print(f"{code}: Block {i + 1}/{len(chunks)}")
        res.append(translate(LANGS[code], chunks[i]))
        json.dump(res, open(tmp, "w", encoding="utf-8"), ensure_ascii=False)
    json.dump([e for r in res for e in r], open(path, "w", encoding="utf-8"), ensure_ascii=False)
    os.remove(tmp)
    print("fertig:", code, n)


if __name__ == "__main__":
    args, natives = sys.argv[1:], ["de"]
    if args and args[0].startswith("--native="):
        natives = args.pop(0)[9:].split(",")
    words = concepts()
    todo = args or sorted(LANGS, key=lambda c: (c != "sv", c not in natives, c))
    for code in todo:
        build(code, words, BIG if code == "sv" or code in natives else SMALL)

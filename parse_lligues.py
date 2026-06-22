import sys, io, re, pdfplumber
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def parse_sala(path):
    results = {}
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            words = page.extract_words(keep_blank_chars=False)
            rows = {}
            for w in words:
                y = round(w['top'] / 4) * 4
                if y not in rows: rows[y] = []
                rows[y].append(w)
            current_cat = None
            for y in sorted(rows.keys()):
                rw = sorted(rows[y], key=lambda w: w['x0'])
                texts = [w['text'] for w in rw]
                if '|' in texts:
                    pi = texts.index('|')
                    estil = ' '.join(texts[:pi]).strip()
                    rest = ' '.join(texts[pi+1:]).strip()
                    current_cat = estil + ' | ' + rest
                    if current_cat not in results: results[current_cat] = []
                    continue
                if not texts or texts[0] in ('Pos.','Total','TOTAL','Pos'): continue
                if current_cat and texts[0].isdigit():
                    pos = int(texts[0])
                    if pos <= 3:
                        name_words, club_words = [], []
                        in_club = False
                        for i, w in enumerate(rw):
                            if i == 0: continue
                            if i == 1 and re.match(r'^\d{4,6}$', w['text']): continue
                            if w['x0'] >= 260: in_club = True
                            if in_club:
                                if w['x0'] >= 380: break
                                if not club_words and re.match(r'^\d{3,5}$', w['text']): continue
                                club_words.append(w['text'])
                            else:
                                name_words.append(w['text'])
                        results[current_cat].append({'pos': pos, 'name': ' '.join(name_words), 'club': ' '.join(club_words)})
    return results

def parse_al(path):
    results = {}
    CODE_RE = re.compile(r'^[A-Z][A-Z+0-9]{1,5}$')
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            words = page.extract_words(keep_blank_chars=False)
            rows = {}
            for w in words:
                y = round(w['top'] / 4) * 4
                if y not in rows: rows[y] = []
                rows[y].append(w)
            current_style = None
            pending_name = None
            for y in sorted(rows.keys()):
                rw = sorted(rows[y], key=lambda w: w['x0'])
                if not rw: continue
                first = rw[0]
                # Category style header: non-digit, x<110, uppercase
                if not first['text'].isdigit() and first['x0'] < 110 and first['text'].isupper():
                    current_style = ' '.join(w['text'] for w in rw if w['x0'] < 350 and not w['text'].isdigit()).strip()
                    pending_name = None
                    continue
                # Code row (second line of split athlete): starts with code at x~169
                if not first['text'].isdigit() and CODE_RE.match(first['text']) and first['x0'] >= 155:
                    if pending_name is not None and pending_name[0] <= 3:
                        code = first['text']
                        club_words = [w['text'] for w in rw if w['x0'] >= 354 and w['x0'] < 450]
                        cat = (current_style or '') + ' | ' + code
                        if cat not in results: results[cat] = []
                        results[cat].append({'pos': pending_name[0], 'name': pending_name[1], 'club': ' '.join(club_words)})
                    pending_name = None
                    continue
                if first['text'] in ('Pos.','Pos','Total','TOTAL','Categ.'): continue
                # Athlete row
                if first['text'].isdigit() and len(rw) > 2:
                    pos = int(first['text'])
                    pending_name = None
                    if len(rw) > 1 and rw[1]['x0'] < 190 and CODE_RE.match(rw[1]['text']):
                        code = rw[1]['text']
                        name_words = [w['text'] for w in rw if w['x0'] >= 190 and w['x0'] < 354]
                        club_words = [w['text'] for w in rw if w['x0'] >= 354 and w['x0'] < 450]
                        cat = (current_style or '') + ' | ' + code
                        if cat not in results: results[cat] = []
                        if pos <= 3:
                            results[cat].append({'pos': pos, 'name': ' '.join(name_words), 'club': ' '.join(club_words)})
                    else:
                        name_words = [w['text'] for w in rw if w['x0'] >= 190 and w['x0'] < 450]
                        pending_name = (pos, ' '.join(name_words))
    return results

def parse_3d(path):
    """3D format: pos at x~53, then code+cat+license on same or next row, name at x~136, club at x~297"""
    results = {}
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            words = page.extract_words(keep_blank_chars=False)
            rows = {}
            for w in words:
                y = round(w['top'] / 4) * 4
                if y not in rows: rows[y] = []
                rows[y].append(w)
            current_cat = None
            pending_pos = None
            pending_words = []
            ys = sorted(rows.keys())
            for yi, y in enumerate(ys):
                rw = sorted(rows[y], key=lambda w: w['x0'])
                if not rw: continue
                first = rw[0]
                texts = [w['text'] for w in rw]

                # Category header: starts at x<100, not a digit, contains '-'
                if not first['text'].isdigit() and first['x0'] < 60 and '-' in texts:
                    current_cat = ' '.join(w['text'] for w in rw if w['x0'] < 400).strip()
                    if current_cat not in results: results[current_cat] = []
                    pending_pos = None
                    pending_words = []
                    continue

                # Skip header rows
                if texts[0] in ('Pos.','Pos','Total','TOTAL','Dis','Cat.','Posicio','Club'):
                    continue

                # Row with only a position number
                if first['text'].isdigit() and len(rw) == 1 and first['x0'] < 60:
                    pending_pos = int(first['text'])
                    pending_words = []
                    continue

                # Row that starts with disc code (C, B, etc.) at x~63 — continuation of prev pos
                if not first['text'].isdigit() and first['x0'] >= 55 and first['x0'] < 75 and len(first['text']) <= 2:
                    if pending_pos is not None:
                        all_words = rw
                        name_words = [w['text'] for w in all_words if w['x0'] >= 136 and w['x0'] < 296]
                        club_words = [w['text'] for w in all_words if w['x0'] >= 296 and w['x0'] < 405]
                        if current_cat is not None and pending_pos <= 3:
                            results[current_cat].append({'pos': pending_pos, 'name': ' '.join(name_words), 'club': ' '.join(club_words)})
                    pending_pos = None
                    continue

                # Standalone club row (only "Club" keyword + club name words)
                if texts[0] == 'Club' and first['x0'] >= 295:
                    # belongs to last entry in current_cat
                    if current_cat and results[current_cat]:
                        club_words = [w['text'] for w in rw if w['x0'] >= 295 and w['x0'] < 450]
                        if not results[current_cat][-1]['club']:
                            results[current_cat][-1]['club'] = ' '.join(club_words)
                    continue

                # Club-only row (no "Club" keyword, just club words at x>=297)
                if all(w['x0'] >= 295 for w in rw):
                    if current_cat and results[current_cat]:
                        club_words = [w['text'] for w in rw if w['x0'] < 450]
                        if not results[current_cat][-1]['club']:
                            results[current_cat][-1]['club'] = ' '.join(club_words)
                    continue

                # Full row: pos + code + cat + license + name + maybe club
                if first['text'].isdigit() and len(rw) > 3 and first['x0'] < 60:
                    pos = int(first['text'])
                    pending_pos = None
                    name_words = [w['text'] for w in rw if w['x0'] >= 136 and w['x0'] < 296]
                    club_words = [w['text'] for w in rw if w['x0'] >= 296 and w['x0'] < 405]
                    if current_cat is not None and pos <= 3:
                        results[current_cat].append({'pos': pos, 'name': ' '.join(name_words), 'club': ' '.join(club_words)})

    return results

def parse_camp(path):
    results = {}
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            words = page.extract_words(keep_blank_chars=False)
            rows = {}
            for w in words:
                y = round(w['top'] / 4) * 4
                if y not in rows: rows[y] = []
                rows[y].append(w)
            for y in sorted(rows.keys()):
                rw = sorted(rows[y], key=lambda w: w['x0'])
                if not rw: continue
                first = rw[0]
                if not first['text'].isdigit(): continue
                pos = int(first['text'])
                if pos > 3: continue
                cat_words = [w['text'] for w in rw if w['x0'] >= 60 and w['x0'] < 155]
                cat = ' '.join(cat_words).strip()
                name_words = [w['text'] for w in rw if w['x0'] >= 155 and w['x0'] < 336]
                name = ' '.join(name_words).strip()
                club_words = [w['text'] for w in rw if w['x0'] >= 336 and w['x0'] < 470]
                club = ' '.join(club_words).strip()
                if cat not in results: results[cat] = []
                results[cat].append({'pos': pos, 'name': name, 'club': club})
    return results

PDFS = [
    ('sala', parse_sala, r"C:\Users\jcsanchez\Downloads\2025121913394698-2025_Lliga_Cat_Sala_25_26_CLASSIFICACIO_Final_v20251218.pdf"),
    ('al',   parse_al,   r"C:\Users\jcsanchez\Downloads\2026061608174343-2025_2026_Lliga_Cat_ALliure_CLASSIFICACIO_v20260615_final.pdf"),
    ('3d',   parse_3d,   r"C:\Users\jcsanchez\Downloads\2026041413401864-2025_2026_LLIGA_CAT_3D_CLASSIFICACIO_FINAL_v20260414.pdf"),
    ('3denl',parse_3d,   r"C:\Users\jcsanchez\Downloads\202601021352541-Classificació 3D en linea 2025-26.pdf"),
    ('camp', parse_camp, r"C:\Users\jcsanchez\Downloads\2026050414181140-Lliga de Camp 25-26 - Rànking final (1).pdf"),
]

for disc_name, parser, path in PDFS:
    print("\n" + "="*60)
    print("DISC: " + disc_name)
    print("="*60)
    try:
        res = parser(path)
        for cat, entries in res.items():
            top3 = [e for e in entries if e['pos'] <= 3]
            if top3:
                print("\n  [" + cat + "]")
                for e in top3[:3]:
                    print("    " + str(e['pos']) + ". " + e['name'] + "  (" + e['club'] + ")")
    except Exception as ex:
        import traceback; traceback.print_exc()

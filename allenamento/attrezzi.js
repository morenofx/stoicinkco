// Catalogo degli attrezzi che si trovano in qualsiasi palestra.
// Ogni attrezzo: disegno grande (SVG 200x140, macchina color crema + omino che la usa),
// cosa allena, come si usa, e gli esercizi che si possono mettere nella scheda.
// ex: [nome, serie, ripetizioni, recupero in secondi, unita' ('rip' se manca, 'sec', 'min')]
// Le classi dei disegni (fr, pd, gr, ps, pb, hd) hanno i colori nel CSS della pagina.
(() => {
  const L = (x1, y1, x2, y2, w) => `<line class="fr" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"${w ? ` stroke-width="${w}"` : ''}/>`;
  const PL = (pts, w) => `<polyline class="fr" points="${pts}"${w ? ` stroke-width="${w}"` : ''}/>`;
  const PAD = (x, y, w, h, rot) => `<rect class="pd" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"${rot ? ` transform="rotate(${rot} ${x + w / 2} ${y + h / 2})"` : ''}/>`;
  const POLY = pts => `<polygon class="pd" points="${pts}"/>`;
  const RING = (cx, cy, r, w) => `<circle class="fr" cx="${cx}" cy="${cy}" r="${r}"${w ? ` stroke-width="${w}"` : ''}/>`;
  const DISC = (cx, cy, r) => `<circle class="pd" cx="${cx}" cy="${cy}" r="${r}"/>`;
  const BOX = (x, y, w, h) => `<rect class="fr" x="${x}" y="${y}" width="${w}" height="${h}" rx="2"/>`;
  const TH = (x1, y1, x2, y2) => `<line class="fr th" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
  // pacco pesi della macchina
  const ST = (x, y, w, h) => {
    let s = BOX(x, y, w, h);
    for (let yy = y + h - 8; yy > y + h * 0.45; yy -= 7) s += `<rect class="pd" x="${x + 3}" y="${yy}" width="${w - 6}" height="5" rx="1"/>`;
    return s + TH(x + w / 2, y + 3, x + w / 2, y + h * 0.45);
  };
  // manubrio: barra + due dischi per lato
  const DB = (cx, cy, len, ph, rot = 0) => `<g transform="rotate(${rot} ${cx} ${cy})">${L(cx - len / 2, cy, cx + len / 2, cy, 5)}` +
    PAD(cx - len / 2 - 4, cy - ph / 2, 8, ph) + PAD(cx + len / 2 - 4, cy - ph / 2, 8, ph) + '</g>';
  const G = '<line class="gr" x1="6" y1="131" x2="194" y2="131"/>';
  // omino: h testa, n collo/spalle, hp anca; k/f gamba davanti, k2/f2 dietro; e/a braccio davanti, e2/a2 dietro
  // data-p dice che parte del corpo e': il CSS colora quella che lavora (classe hi-leg / hi-arm / hi-torso sull'svg)
  const seg = (cls, w, p, part) => `<polyline class="${cls}" data-p="${part}" stroke-width="${w}" points="${p.map(q => q.join(',')).join(' ')}"/>`;
  const P = (o, both) => {
    const back = both ? 'ps' : 'pb';
    let s = '';
    if (o.k2) s += seg(back, 7, [o.hp, o.k2, o.f2], 'leg');
    if (o.e2) s += seg(back, 6, [o.n, o.e2, o.a2], 'arm');
    s += seg('ps', 12, [o.n, o.hp], 'torso');
    if (o.k) s += seg('ps', 8, [o.hp, o.k, o.f], 'leg');
    if (o.e) s += seg('ps', 7, [o.n, o.e, o.a], 'arm');
    return s + `<circle class="hd" cx="${o.h[0]}" cy="${o.h[1]}" r="9"/>`;
  };
  const ARROW = (x1, y1, x2, y2) => `<g class="ar">${TH(x1, y1, x2, y2)}<circle class="pd" cx="${x2}" cy="${y2}" r="3"/></g>`;

  const ART = {
    tapis: G + POLY('16,118 154,110 156,120 18,128') + L(150,112,168,44,6) + PAD(152,32,38,13,16) + L(164,64,124,66,4) +
      P({ h: [104, 18], n: [102, 31], hp: [98, 70], k: [110, 91], f: [116, 112], k2: [90, 93], f2: [80, 114], e: [112, 50], a: [124, 64], e2: [94, 51], a2: [86, 66] }),
    cyclette: G + L(48,127,172,127,7) + L(84,127,92,104,5) + L(78,62,92,104,5) + L(92,104,142,104,5) + L(142,104,152,48,5) +
      L(146,46,168,44,7) + RING(146,104,19,5) + DISC(146,104,5) + PAD(60,55,32,9) + RING(106,104,6,4) +
      P({ h: [112, 18], n: [102, 31], hp: [76, 54], k: [104, 72], f: [110, 102], k2: [94, 82], f2: [100, 112], e: [126, 40], a: [152, 46], e2: [122, 44], a2: [148, 50] }),
    ellittica: G + L(18,126,182,126,7) + RING(166,100,21,5) + DISC(166,100,5) + L(40,122,160,104,5) +
      PAD(66,106,36,7,-8) + PAD(90,102,36,7,-8) + L(128,122,140,30,5) + L(118,120,130,34,4) + PAD(142,24,26,12,-10) +
      P({ h: [104, 16], n: [102, 29], hp: [98, 66], k: [110, 84], f: [104, 102], k2: [92, 88], f2: [82, 108], e: [116, 46], a: [136, 34], e2: [110, 50], a2: [126, 42] }),
    vogatore: G + L(12,110,168,110,7) + L(18,110,18,129,5) + L(160,110,160,129,5) + L(158,110,170,94,5) + RING(174,90,19,5) + DISC(174,90,5) +
      PAD(62,99,30,9) + PAD(134,86,10,26,25) + TH(124,84,168,88) +
      P({ h: [108, 46], n: [98, 57], hp: [76, 97], k: [112, 70], f: [138, 100], e: [112, 78], a: [124, 84] }),
    stepper: G + PAD(38,121,96,9) + L(118,121,132,30,6) + L(124,30,156,30,7) + PAD(54,100,36,8,-10) + PAD(72,110,36,8,-10) +
      P({ h: [96, 14], n: [96, 27], hp: [94, 64], k: [106, 80], f: [100, 100], k2: [90, 88], f2: [84, 110], e: [110, 40], a: [128, 32], e2: [106, 44], a2: [124, 38] }),
    legpress: G + L(36,122,172,36,7) + L(172,36,178,130,5) + L(28,129,186,129,6) + RING(146,52,14,5) + DISC(146,52,4) +
      POLY('20,72 33,67 52,114 39,119') + PAD(40,111,42,10) + PAD(117,36,11,54,-32) +
      P({ h: [34, 60], n: [42, 73], hp: [58, 109], k: [84, 64], f: [114, 64], e: [48, 94], a: [60, 116] }),
    hack: G + L(40,124,152,20,7) + L(152,20,162,129,5) + L(26,129,170,129,6) + PAD(22,112,48,10,-14) + PAD(64,65,74,11,-43) + DISC(126,36,8) +
      P({ h: [132, 30], n: [121, 44], hp: [90, 82], k: [60, 80], f: [46, 110], e: [112, 56], a: [126, 40] }),
    legext: G + ST(8,52,26,76) + L(38,129,156,129,6) + L(82,94,82,129,6) + PAD(58,84,58,11) + POLY('49,28 62,28 66,84 53,84') +
      TH(34,58,118,92) + DISC(118,92,5) + L(118,92,144,114,6) + DISC(148,116,9) + ARROW(158,118,166,96) +
      P({ h: [60, 20], n: [62, 34], hp: [68, 80], k: [112, 84], f: [140, 108], e: [72, 62], a: [88, 90] }),
    legcurl: G + PAD(26,70,112,11) + L(50,81,50,129,6) + L(120,81,120,129,6) + L(30,129,150,129,6) + L(20,80,20,96,6) +
      DISC(146,76,5) + L(146,76,172,58,6) + DISC(174,54,9) + ARROW(184,74,182,50) +
      P({ h: [34, 56], n: [46, 63], hp: [100, 62], k: [140, 64], f: [168, 48], e: [36, 78], a: [22, 90] }),
    chestpress: G + ST(12,48,26,80) + L(12,129,172,129,6) + L(80,98,80,129,6) + PAD(72,87,48,11) + POLY('66,24 79,24 82,87 69,87') +
      L(72,20,118,20,5) + L(118,20,142,50,5) + L(142,40,142,72,8) +
      P({ h: [84, 24], n: [82, 39], hp: [84, 83], k: [118, 85], f: [120, 126], e: [108, 58], a: [138, 58] }),
    butterfly: G + L(100,96,100,129,6) + L(68,129,132,129,6) + PAD(84,20,32,64) + PAD(72,84,56,11) +
      PL('96,16 60,12 44,24', 5) + PL('104,16 140,12 156,24', 5) + PAD(34,24,18,46) + PAD(148,24,18,46) +
      ARROW(64,96,82,96) + ARROW(136,96,118,96) +
      P({ h: [100, 20], n: [100, 35], hp: [100, 80], k: [88, 100], f: [86, 128], k2: [112, 100], f2: [114, 128], e: [66, 40], a: [50, 34], e2: [134, 40], a2: [150, 34] }, true),
    shoulder: G + ST(160,48,26,80) + L(28,129,186,129,6) + L(84,104,84,129,6) + PAD(74,93,46,11) + POLY('68,22 81,22 84,93 71,93') +
      L(76,18,116,8,5) + L(106,8,128,8,8) + ARROW(140,30,140,10) +
      P({ h: [86, 24], n: [84, 39], hp: [86, 89], k: [118, 91], f: [120, 126], e: [106, 30], a: [116, 10] }),
    lat: G + L(166,129,166,6,7) + L(166,8,104,8,6) + DISC(104,13,5) + TH(104,17,104,56) + PL('68,64 78,56 130,56 140,64', 6) +
      ST(170,54,22,74) + PAD(72,97,48,10) + L(96,107,96,129,6) + DISC(112,80,9) + L(58,129,194,129,6) +
      P({ h: [92, 40], n: [90, 53], hp: [86, 93], k: [118, 84], f: [122, 126], e: [78, 74], a: [102, 58] }),
    pulley: G + PAD(14,103,98,9) + L(28,112,28,129,6) + L(98,112,98,129,6) + PAD(124,84,10,32,20) + ST(162,38,26,90) + L(8,129,192,129,6) +
      TH(164,112,118,92) + PAD(108,87,12,9) +
      P({ h: [66, 42], n: [62, 56], hp: [50, 97], k: [90, 78], f: [124, 98], e: [86, 84], a: [112, 90] }),
    panca: G + PAD(40,84,114,11) + L(56,95,56,129,6) + L(138,95,138,129,6) + L(48,129,48,26,6) + L(48,40,58,40,5) + L(36,129,160,129,6) +
      RING(56,36,17,6) + DISC(56,36,5) +
      P({ h: [56, 73], n: [68, 78], hp: [118, 79], k: [142, 96], f: [148, 127], e: [78, 60], a: [62, 40] }),
    inclinata: G + PAD(76,97,38,10) + POLY('70,104 82,100 52,34 40,38') + L(86,107,86,129,6) + L(60,74,46,129,6) + L(36,129,134,129,6) +
      P({ h: [44, 32], n: [55, 47], hp: [80, 93], k: [112, 91], f: [118, 126], e: [72, 40], a: [68, 16] }) + DB(68, 14, 26, 14),
    addominali: G + PAD(22,71,152,11,22) + L(64,74,58,129,6) + L(150,105,150,129,6) + L(40,129,170,129,6) + DISC(28,40,8) + DISC(42,38,8) +
      P({ h: [124, 34], n: [114, 47], hp: [88, 68], k: [62, 42], f: [36, 50], e: [106, 58], a: [118, 50] }),
    tappetino: G + PAD(14,121,174,8) +
      P({ h: [40, 88], n: [52, 95], hp: [110, 99], k: [142, 108], f: [172, 116], e: [54, 117], a: [76, 117] }),
    scott: G + L(110,80,110,129,6) + PAD(82,58,58,13,35) + PAD(46,95,40,10) + L(66,105,66,129,6) + L(38,129,140,129,6) +
      P({ h: [64, 40], n: [70, 55], hp: [60, 92], k: [90, 98], f: [92, 127], e: [110, 74], a: [126, 52] }) + DB(128, 50, 22, 14, 70),
    manubri: G + P({ h: [100, 22], n: [100, 37], hp: [100, 84], k: [92, 106], f: [90, 129], k2: [108, 106], f2: [110, 129], e: [74, 40], a: [50, 42], e2: [126, 40], a2: [150, 42] }, true) +
      DB(44, 42, 18, 18, 90) + DB(156, 42, 18, 18, 90) + ARROW(30,70,30,48) + ARROW(170,70,170,48),
    bilanciere: G + L(6,72,194,72,6) + PAD(20,30,12,84) + PAD(34,40,10,64) + PAD(168,30,12,84) + PAD(156,40,10,64) + PAD(46,64,6,16) + PAD(148,64,6,16),
    ez: G + PL('8,70 52,70 62,60 74,80 86,60 98,80 110,60 120,80 130,60 140,70 192,70', 6) + PAD(20,40,11,60) + PAD(33,48,9,44) + PAD(169,40,11,60) + PAD(158,48,9,44),
    kettlebell: G + `<path class="fr" stroke-width="12" d="M70 76 C62 18 138 18 130 76"/>` + `<path class="pd" d="M60 92 C60 62 140 62 140 92 C140 116 124 129 100 129 C76 129 60 116 60 92 Z"/>`,
    cavi: G + BOX(8,8,26,121) + BOX(166,8,26,121) + ST(12,66,18,60) + ST(170,66,18,60) + L(20,8,180,8,6) + DISC(38,28,5) + DISC(162,28,5) +
      TH(40,30,92,74) + TH(160,30,108,74) +
      P({ h: [100, 30], n: [100, 45], hp: [100, 88], k: [92, 108], f: [88, 129], k2: [108, 108], f2: [112, 129], e: [84, 62], a: [94, 76], e2: [116, 62], a2: [106, 76] }, true),
    cavoalto: G + BOX(132,6,28,123) + ST(136,56,20,70) + L(132,14,96,14,6) + DISC(96,19,5) + TH(96,23,96,58) + L(96,58,89,80,5) + L(96,58,103,80,5) +
      P({ h: [84, 24], n: [80, 38], hp: [78, 84], k: [84, 106], f: [82, 129], k2: [72, 106], f2: [66, 129], e: [80, 62], a: [92, 80] }) + ARROW(112,56,112,80),
    smith: G + L(40,8,40,129,6) + L(160,8,160,129,6) + L(34,8,166,8,6) + L(24,129,176,129,6) + L(12,46,188,46,6) + PAD(16,28,10,36) + PAD(174,28,10,36) +
      PAD(36,40,8,12) + PAD(156,40,8,12) +
      P({ h: [100, 34], n: [100, 49], hp: [100, 88], k: [78, 106], f: [82, 129], k2: [122, 106], f2: [118, 129], e: [76, 56], a: [70, 46], e2: [124, 56], a2: [130, 46] }, true),
    rack: G + BOX(30,6,140,123) + L(46,6,46,129,3) + L(154,6,154,129,3) +
      [18, 30, 42, 54, 66, 78].map(y => DISC(38, y, 1.6) + DISC(162, y, 1.6)).join('') + L(24,98,176,98,5) +
      L(6,46,194,46,6) + PAD(10,28,10,36) + PAD(180,28,10,36) +
      P({ h: [100, 34], n: [100, 49], hp: [100, 88], k: [78, 106], f: [82, 129], k2: [122, 106], f2: [118, 129], e: [76, 56], a: [70, 46], e2: [124, 56], a2: [130, 46] }, true),
    calf: G + L(152,129,152,10,7) + L(152,30,116,30,6) + PAD(84,25,32,9) + PAD(78,115,46,14) + ST(158,48,28,80) +
      P({ h: [100, 15], n: [100, 31], hp: [100, 72], k: [102, 95], f: [98, 113], e: [110, 46], a: [112, 32] }) + ARROW(134,110,134,86),
    abductor: G + PAD(76,18,48,48) + PAD(62,66,76,11) + L(100,77,100,129,6) + L(68,129,132,129,6) + PAD(34,72,14,38) + PAD(152,72,14,38) +
      ARROW(30,120,12,120) + ARROW(170,120,188,120) +
      P({ h: [100, 22], n: [100, 36], hp: [100, 72], k: [56, 84], f: [52, 112], k2: [144, 84], f2: [148, 112], e: [84, 58], a: [78, 72], e2: [116, 58], a2: [122, 72] }, true),
    trazioni: G + L(16,14,184,14,7) + L(26,14,26,129,6) + L(174,14,174,129,6) +
      P({ h: [100, 40], n: [100, 53], hp: [100, 94], k: [94, 112], f: [98, 126], k2: [106, 112], f2: [104, 126], e: [80, 32], a: [76, 14], e2: [120, 32], a2: [124, 14] }, true),
    parallele: G + L(44,62,164,62,5) + L(54,62,54,129,5) + L(154,62,154,129,5) +
      P({ h: [100, 26], n: [100, 40], hp: [98, 86], k: [96, 104], f: [112, 114], e: [96, 54], a: [100, 70] }) + L(30,70,150,70,7) + L(40,70,40,129,6) + L(140,70,140,129,6)
  };

  // cat: Petto, Schiena, Gambe, Spalle, Braccia, Addome, Cardio
  const LIST = [
    { id: 'manubri', name: 'Manubri', cat: ['Braccia', 'Spalle', 'Petto'],
      allena: 'Quasi tutto il corpo: braccia, spalle, petto, schiena e gambe.',
      come: 'Scegli un peso che ti fa arrivare alle ripetizioni con fatica ma senza perdere la tecnica. Movimento lento e controllato, schiena dritta.',
      ex: [['Curl manubri', 3, 10, 60], ['Lento avanti manubri', 3, 10, 90], ['Alzate laterali', 3, 15, 45], ['Rematore manubrio', 3, 10, 60], ['Affondi con manubri', 3, 10, 90]] },
    { id: 'bilanciere', name: 'Bilanciere', cat: ['Gambe', 'Schiena', 'Braccia'],
      allena: 'Esercizi base multiarticolari: gambe, schiena, braccia.',
      come: 'Metti i dischi uguali sui due lati e chiudi con i fermi. Impugnatura salda, schiena neutra, scendi controllato.',
      ex: [['Rematore bilanciere', 4, 8, 120], ['Stacco da terra', 4, 6, 150], ['Curl bilanciere', 3, 10, 60]] },
    { id: 'ez', name: 'Bilanciere EZ (sagomato)', cat: ['Braccia'],
      allena: 'Bicipiti e tricipiti, con meno stress sui polsi.',
      come: 'Impugna nelle curve della sbarra. Gomiti fermi vicino al corpo, muovi solo l\'avambraccio.',
      ex: [['Curl EZ', 3, 10, 60], ['French press EZ', 3, 10, 60]] },
    { id: 'panca', name: 'Panca piana con rack', cat: ['Petto', 'Braccia'],
      allena: 'Petto, spalle davanti e tricipiti.',
      come: 'Sdraiati con gli occhi sotto il bilanciere, piedi a terra. Scendi a sfiorare il petto e spingi su. Con carichi alti fatti assistere.',
      ex: [['Panca piana bilanciere', 4, 8, 120], ['Panca piana manubri', 3, 10, 90]] },
    { id: 'inclinata', name: 'Panca inclinata', cat: ['Petto', 'Spalle'],
      allena: 'Parte alta del petto e spalle.',
      come: 'Schienale a 30-45 gradi. Spingi in alto sopra il petto, scapole strette contro lo schienale.',
      ex: [['Panca inclinata manubri', 3, 10, 90], ['Panca inclinata bilanciere', 4, 8, 120]] },
    { id: 'addominali', name: 'Panca per addominali', cat: ['Addome'],
      allena: 'Addominali.',
      come: 'Aggancia i piedi sotto i rulli. Sali arrotolando la schiena senza tirare il collo con le mani.',
      ex: [['Crunch panca declinata', 3, 15, 45], ['Sit up', 3, 12, 45]] },
    { id: 'tappetino', name: 'Tappetino', cat: ['Addome'],
      allena: 'Addominali e muscoli profondi del tronco.',
      come: 'Esercizi a corpo libero a terra. Respira: espira quando sali, non trattenere il fiato.',
      ex: [['Crunch', 3, 20, 45], ['Plank', 3, 40, 45, 'sec'], ['Leg raise', 3, 12, 45]] },
    { id: 'scott', name: 'Panca Scott', cat: ['Braccia'],
      allena: 'Bicipiti, isolati.',
      come: 'Appoggia la parte dietro delle braccia sul cuscino inclinato. Sali con il bilanciere EZ e scendi lento senza stendere di colpo.',
      ex: [['Curl alla panca Scott', 3, 10, 60]] },
    { id: 'lat', name: 'Lat machine', cat: ['Schiena', 'Braccia'],
      allena: 'Dorsali (schiena larga) e bicipiti.',
      come: 'Siediti con le cosce bloccate sotto il rullo. Tira la sbarra davanti fino al petto, petto in fuori, risali piano.',
      ex: [['Lat machine', 4, 10, 90], ['Lat machine presa stretta', 3, 10, 90]] },
    { id: 'pulley', name: 'Pulley basso', cat: ['Schiena'],
      allena: 'Centro della schiena e dorsali.',
      come: 'Piedi sulla pedana, ginocchia appena piegate. Tira la maniglia verso la pancia stringendo le scapole, busto fermo.',
      ex: [['Pulley basso', 3, 12, 60]] },
    { id: 'legpress', name: 'Leg press', cat: ['Gambe'],
      allena: 'Quadricipiti, glutei e femorali.',
      come: 'Schiena tutta appoggiata, piedi alla larghezza delle spalle. Sblocca, scendi fino a 90 gradi e spingi senza bloccare le ginocchia.',
      ex: [['Leg press', 3, 12, 90]] },
    { id: 'hack', name: 'Hack squat', cat: ['Gambe'],
      allena: 'Quadricipiti e glutei.',
      come: 'Schiena contro lo schienale, spalle sotto i cuscinetti. Scendi piegando le ginocchia e risali spingendo con i talloni.',
      ex: [['Hack squat', 3, 10, 120]] },
    { id: 'legext', name: 'Leg extension', cat: ['Gambe'],
      allena: 'Quadricipiti (davanti alla coscia).',
      come: 'Seduto, rullo sopra le caviglie. Stendi le gambe, fermati un attimo in alto, scendi lento.',
      ex: [['Leg extension', 3, 12, 60]] },
    { id: 'legcurl', name: 'Leg curl', cat: ['Gambe'],
      allena: 'Femorali (dietro alla coscia).',
      come: 'Sdraiato a pancia in giu\' (o seduto), rullo dietro le caviglie. Porta i talloni verso il sedere e torna piano.',
      ex: [['Leg curl', 3, 12, 60]] },
    { id: 'chestpress', name: 'Chest press', cat: ['Petto', 'Braccia'],
      allena: 'Petto e tricipiti, guidato dalla macchina.',
      come: 'Regola il sedile: maniglie all\'altezza del petto. Spingi in avanti senza staccare la schiena, torna controllato.',
      ex: [['Chest press', 3, 10, 90]] },
    { id: 'butterfly', name: 'Pectoral machine (butterfly)', cat: ['Petto'],
      allena: 'Petto, isolato.',
      come: 'Avambracci o mani sui cuscinetti. Chiudi le braccia davanti al petto come un abbraccio, apri piano.',
      ex: [['Pectoral machine', 3, 12, 60]] },
    { id: 'shoulder', name: 'Shoulder press', cat: ['Spalle', 'Braccia'],
      allena: 'Spalle e tricipiti.',
      come: 'Maniglie all\'altezza delle spalle. Spingi in alto senza inarcare la schiena, scendi fino alle orecchie.',
      ex: [['Shoulder press', 3, 10, 90]] },
    { id: 'cavi', name: 'Cavi (croce ai cavi)', cat: ['Petto', 'Spalle', 'Braccia'],
      allena: 'Petto, spalle e braccia con tensione costante.',
      come: 'Regola le carrucole all\'altezza giusta. Un passo avanti, busto stabile, porta le maniglie insieme davanti a te.',
      ex: [['Croci ai cavi', 3, 12, 60], ['Alzate laterali al cavo', 3, 15, 45], ['Face pull', 3, 15, 45]] },
    { id: 'cavoalto', name: 'Cavo alto con corda', cat: ['Braccia'],
      allena: 'Tricipiti.',
      come: 'Gomiti attaccati ai fianchi. Spingi la corda in basso aprendola alla fine, risali fino a 90 gradi.',
      ex: [['Push down al cavo', 3, 12, 60]] },
    { id: 'smith', name: 'Smith machine (multipower)', cat: ['Gambe', 'Petto', 'Spalle'],
      allena: 'Gambe, petto e spalle con il bilanciere guidato.',
      come: 'Il bilanciere scorre sulle guide: ruota i polsi per sganciarlo e riagganciarlo. Utile per allenarsi senza assistente.',
      ex: [['Squat al multipower', 4, 10, 120], ['Panca al multipower', 3, 10, 90]] },
    { id: 'rack', name: 'Squat rack (gabbia)', cat: ['Gambe', 'Schiena'],
      allena: 'Gambe, glutei e tutto il tronco.',
      come: 'Metti le sbarre di sicurezza poco sotto il punto piu\' basso. Bilanciere sulle spalle, scendi con il sedere indietro e risali.',
      ex: [['Squat', 4, 8, 150], ['Military press', 4, 8, 120]] },
    { id: 'calf', name: 'Calf machine', cat: ['Gambe'],
      allena: 'Polpacci.',
      come: 'Punte sul gradino, spalle sotto i cuscinetti. Scendi coi talloni sotto il gradino e sali sulle punte.',
      ex: [['Calf in piedi', 4, 15, 45]] },
    { id: 'abductor', name: 'Abductor / Adductor', cat: ['Gambe'],
      allena: 'Esterno coscia e glutei (abductor), interno coscia (adductor).',
      come: 'Seduto, cuscinetti contro le ginocchia: apri le gambe (abductor) o chiudile (adductor). Movimento lento.',
      ex: [['Abductor', 3, 15, 45], ['Adductor', 3, 15, 45]] },
    { id: 'trazioni', name: 'Sbarra per trazioni', cat: ['Schiena', 'Braccia'],
      allena: 'Dorsali, bicipiti, presa.',
      come: 'Appeso a braccia tese, sali finche\' il mento supera la sbarra. Se non ce la fai usa l\'elastico o la macchina assistita.',
      ex: [['Trazioni', 4, 6, 120]] },
    { id: 'parallele', name: 'Parallele (dip)', cat: ['Petto', 'Braccia'],
      allena: 'Tricipiti e parte bassa del petto.',
      come: 'Braccia tese sulle barre, scendi piegando i gomiti fino a 90 gradi e risali. Busto dritto = piu\' tricipiti.',
      ex: [['Dip alle parallele', 3, 8, 90]] },
    { id: 'kettlebell', name: 'Kettlebell', cat: ['Gambe', 'Schiena'],
      allena: 'Glutei, schiena, resistenza: tutto il corpo.',
      come: 'Nello swing la spinta parte dalle anche, non dalle braccia. Schiena dritta, la kettlebell sale fino al petto.',
      ex: [['Kettlebell swing', 4, 15, 60], ['Goblet squat', 3, 12, 60]] },
    { id: 'tapis', name: 'Tapis roulant', cat: ['Cardio'], cardio: true,
      allena: 'Cuore e fiato, gambe.',
      come: 'Aggancia la clip di sicurezza. Parti piano, poi aumenta velocita\' o pendenza. Non tenerti ai corrimano.',
      ex: [['Tapis roulant', 1, 20, 0, 'min']] },
    { id: 'cyclette', name: 'Cyclette', cat: ['Cardio'], cardio: true,
      allena: 'Cuore e fiato, gambe, senza colpi sulle ginocchia.',
      come: 'Sellino all\'altezza dell\'anca: in basso la gamba resta appena piegata. Regola la resistenza col pomello.',
      ex: [['Cyclette', 1, 20, 0, 'min']] },
    { id: 'ellittica', name: 'Ellittica', cat: ['Cardio'], cardio: true,
      allena: 'Cuore e fiato, gambe e braccia insieme.',
      come: 'Piedi sempre appoggiati sulle pedane, spingi e tira le maniglie. Movimento fluido, schiena dritta.',
      ex: [['Ellittica', 1, 20, 0, 'min']] },
    { id: 'vogatore', name: 'Vogatore', cat: ['Cardio', 'Schiena'], cardio: true,
      allena: 'Cuore e fiato, schiena, gambe e braccia.',
      come: 'Prima spingi con le gambe, poi tiri con le braccia verso lo sterno. Al ritorno l\'ordine e\' inverso.',
      ex: [['Vogatore', 1, 15, 0, 'min']] },
    { id: 'stepper', name: 'Stepper', cat: ['Cardio'], cardio: true,
      allena: 'Cuore e fiato, glutei e polpacci.',
      come: 'Appoggia tutto il piede sui pedali, passi regolari. Tieniti leggero alle maniglie solo per l\'equilibrio.',
      ex: [['Stepper', 1, 15, 0, 'min']] }
  ];


  // Guida di ogni attrezzo: m = muscolo che lavora, cue = il movimento in 3-4 parole,
  // p = passo passo [posizione e sedile, movimento, ritorno, errore da evitare], hi = parte del corpo da colorare.
  const GUIDE = {
    manubri: { hi: 'arm', m: 'Spalle', cue: 'Alza fino alle spalle', p: ['In piedi, un manubrio per mano lungo i fianchi, piedi larghi come le anche.', 'Alza le braccia di lato, gomiti appena piegati, fino all\'altezza delle spalle.', 'Scendi piano, in 2-3 secondi.', 'Non dare lo slancio con la schiena e non alzare le spalle verso le orecchie.'] },
    bilanciere: { hi: 'torso', m: 'Schiena e gambe', cue: 'Schiena sempre dritta', p: ['Piedi sotto il bilanciere, larghi come le anche. Prendi la sbarra poco più larga delle gambe.', 'Muoviti con la schiena dritta, il peso vicino al corpo.', 'Torna giù controllando il peso, senza curvarti.', 'Mai curvare la schiena: se succede, il peso è troppo.'] },
    ez: { hi: 'arm', m: 'Bicipiti', cue: 'Gomiti fermi ai fianchi', p: ['In piedi, prendi la sbarra nelle curve, braccia lungo il corpo.', 'Piega i gomiti e porta la sbarra verso il petto.', 'Scendi piano fino a braccia quasi tese.', 'Non portare avanti i gomiti e non dondolare.'] },
    panca: { hi: 'arm', m: 'Petto e tricipiti', cue: 'Spingi verso l\'alto', p: ['Sdraiati con gli occhi sotto la sbarra, piedi a terra, scapole strette.', 'Scendi a sfiorare il petto e spingi su espirando.', 'Riscendi piano, gomiti a 45 gradi dal corpo.', 'Non far rimbalzare la sbarra sul petto. Con carichi alti fatti assistere.'] },
    inclinata: { hi: 'arm', m: 'Petto alto e spalle', cue: 'Spingi sopra il petto', p: ['Schienale a 30-45 gradi, un manubrio per mano all\'altezza del petto.', 'Spingi in alto sopra il petto.', 'Scendi piano fino all\'altezza del petto.', 'Non staccare la schiena dallo schienale.'] },
    addominali: { hi: 'torso', m: 'Addominali', cue: 'Arrotola la schiena', p: ['Aggancia i piedi sotto i rulli, mani al petto.', 'Sali arrotolando la schiena, espirando.', 'Scendi piano, vertebra dopo vertebra.', 'Non tirare il collo con le mani.'] },
    tappetino: { hi: 'torso', m: 'Addominali', cue: 'Pancia dentro', p: ['Sdraiato sul tappetino.', 'Stringi la pancia ed esegui il movimento piano.', 'Torna piano alla partenza.', 'Non trattenere il fiato.'] },
    scott: { hi: 'arm', m: 'Bicipiti', cue: 'Braccia sul cuscino', p: ['Siediti, il retro delle braccia appoggiato sul cuscino inclinato.', 'Piega i gomiti portando la sbarra verso le spalle.', 'Scendi piano senza stendere di colpo.', 'Non staccare le braccia dal cuscino.'] },
    lat: { hi: 'arm', m: 'Schiena (dorsali)', cue: 'Tira al petto', p: ['Cosce bloccate sotto il rullo, piedi a terra. Prendi la sbarra larga, poco più delle spalle.', 'Tira la sbarra davanti fino al petto, gomiti in basso e indietro, petto in fuori.', 'Risali piano fino a braccia quasi tese.', 'Non tirare dietro la nuca e non dondolare col busto.'] },
    pulley: { hi: 'arm', m: 'Centro della schiena', cue: 'Gomiti indietro', p: ['Siediti, piedi sulla pedana, ginocchia appena piegate, schiena dritta.', 'Tira la maniglia verso la pancia stringendo le scapole.', 'Torna avanti piano con le braccia tese.', 'Non dondolare avanti e indietro col busto.'] },
    legpress: { hi: 'leg', m: 'Quadricipiti e glutei', cue: 'Spingi coi talloni', p: ['Schiena e testa ben appoggiate. Piedi a metà pedana, larghi come le spalle.', 'Sblocca le maniglie e spingi la pedana coi talloni fino a gambe quasi tese.', 'Scendi piano fino a ginocchia a 90 gradi.', 'Non bloccare le ginocchia tese in alto e non staccare il sedere dallo schienale.'] },
    hack: { hi: 'leg', m: 'Quadricipiti e glutei', cue: 'Spingi coi talloni', p: ['Schiena contro lo schienale, spalle sotto i cuscinetti, piedi a metà pedana.', 'Scendi piegando le ginocchia fino a 90 gradi.', 'Risali spingendo coi talloni.', 'Le ginocchia seguono la punta dei piedi: non farle chiudere verso l\'interno.'] },
    legext: { hi: 'leg', m: 'Quadricipiti (davanti alla coscia)', cue: 'Stendi le gambe', p: ['Regola lo schienale: il ginocchio all\'altezza del perno della macchina. Rullo sopra le caviglie.', 'Stendi le gambe fino in alto e fermati un secondo.', 'Scendi piano, senza far sbattere i pesi.', 'Non dare il colpo e non staccare il sedere dal sedile.'] },
    legcurl: { hi: 'leg', m: 'Femorali (dietro alla coscia)', cue: 'Talloni verso il sedere', p: ['A pancia in giù (o seduto), ginocchia appena fuori dalla panca, rullo sopra i talloni.', 'Piega le ginocchia portando i talloni verso il sedere.', 'Torna giù piano fino a gambe quasi tese.', 'Non alzare il bacino dalla panca.'] },
    chestpress: { hi: 'arm', m: 'Petto e tricipiti', cue: 'Spingi in avanti', p: ['Regola il sedile: maniglie all\'altezza del petto. Schiena tutta appoggiata.', 'Spingi le maniglie in avanti fino a braccia quasi tese, espirando.', 'Torna indietro piano finché le mani arrivano vicino al petto.', 'Non staccare la schiena e non bloccare i gomiti tesi.'] },
    butterfly: { hi: 'arm', m: 'Petto', cue: 'Chiudi come un abbraccio', p: ['Regola il sedile: braccia all\'altezza delle spalle. Schiena appoggiata.', 'Chiudi le braccia davanti al petto come in un abbraccio.', 'Riapri piano finché senti allungare il petto, non oltre.', 'Non aprire troppo indietro: stressi le spalle.'] },
    shoulder: { hi: 'arm', m: 'Spalle e tricipiti', cue: 'Spingi in alto', p: ['Regola il sedile: maniglie all\'altezza delle spalle. Schiena appoggiata.', 'Spingi in alto fino a braccia quasi tese.', 'Scendi piano fino all\'altezza delle orecchie.', 'Non inarcare la schiena e non bloccare i gomiti.'] },
    cavi: { hi: 'arm', m: 'Petto e spalle', cue: 'Mani insieme davanti', p: ['Carrucole all\'altezza giusta, una maniglia per mano, un passo avanti.', 'Porta le maniglie insieme davanti a te, gomiti appena piegati.', 'Riapri piano controllando il cavo.', 'Non farti tirare indietro dal peso.'] },
    cavoalto: { hi: 'arm', m: 'Tricipiti (dietro al braccio)', cue: 'Gomiti attaccati ai fianchi', p: ['In piedi davanti al cavo alto, corda in mano, gomiti attaccati ai fianchi.', 'Spingi la corda in basso fino a braccia tese, aprendola alla fine.', 'Risali piano fino a gomiti a 90 gradi.', 'Non muovere i gomiti e non usare il peso del corpo.'] },
    smith: { hi: 'leg', m: 'Gambe e glutei', cue: 'Sedere indietro', p: ['Bilanciere guidato sulle spalle, piedi un po\' avanti, larghi come le spalle.', 'Scendi portando il sedere indietro, come per sederti.', 'Risali spingendo coi talloni.', 'Non far chiudere le ginocchia verso l\'interno.'] },
    rack: { hi: 'leg', m: 'Gambe e glutei', cue: 'Sedere indietro', p: ['Sbarre di sicurezza poco sotto il punto più basso. Bilanciere sulle spalle.', 'Scendi col sedere indietro, schiena dritta.', 'Risali spingendo coi talloni.', 'Non curvare la schiena: se succede, il peso è troppo.'] },
    calf: { hi: 'leg', m: 'Polpacci', cue: 'Sali sulle punte', p: ['Punte dei piedi sul gradino, spalle sotto i cuscinetti.', 'Sali sulle punte più in alto che puoi.', 'Scendi piano coi talloni sotto il gradino.', 'Non piegare le ginocchia per aiutarti.'] },
    abductor: { hi: 'leg', m: 'Esterno coscia e glutei', cue: 'Apri le gambe', p: ['Siediti, schiena appoggiata, cuscinetti all\'esterno delle ginocchia.', 'Apri le gambe spingendo contro i cuscinetti.', 'Torna piano, senza far toccare i pesi.', 'Non piegarti in avanti col busto per aiutarti.'] },
    trazioni: { hi: 'arm', m: 'Schiena e bicipiti', cue: 'Mento sopra la sbarra', p: ['Appeso alla sbarra, mani poco più larghe delle spalle.', 'Sali finché il mento supera la sbarra.', 'Scendi piano fino a braccia quasi tese.', 'Non dare lo slancio con le gambe.'] },
    parallele: { hi: 'arm', m: 'Tricipiti e petto', cue: 'Gomiti a 90 gradi', p: ['Braccia tese sulle barre, busto dritto.', 'Scendi piegando i gomiti fino a 90 gradi.', 'Risali spingendo.', 'Non scendere troppo in basso: stressi le spalle.'] },
    kettlebell: { hi: 'leg', m: 'Gambe e glutei', cue: 'Spinta dalle anche', p: ['Kettlebell in mano, piedi larghi come le spalle.', 'Esegui il movimento con la spinta delle anche, schiena dritta.', 'Torna controllato.', 'Non tirare con le braccia e non curvare la schiena.'] },
    tapis: { hi: 'leg', m: 'Cuore, fiato e gambe', cue: 'Pendenza 8-10%, passo svelto', p: ['Aggancia la clip di sicurezza e parti a 3 km/h.', 'Porta la pendenza all\'8-10% e la velocità a 4,5-5 km/h: passo svelto, non corsa.', 'Devi riuscire a parlare, con un po\' di fiatone.', 'Non tenerti ai corrimano: il lavoro lo fanno le gambe.'] },
    cyclette: { hi: 'leg', m: 'Cuore, fiato e gambe', cue: 'Pedala regolare', p: ['Sellino all\'altezza dell\'anca: con il pedale in basso la gamba resta appena piegata.', 'Pedala a ritmo regolare, resistenza media.', 'Ritmo da "riesco a parlare".', 'Non tenere il sellino troppo basso: fa male alle ginocchia.'] },
    ellittica: { hi: 'leg', m: 'Cuore, fiato, gambe e braccia', cue: 'Spingi e tira insieme', p: ['Piedi ben appoggiati sulle pedane, mani sulle maniglie mobili.', 'Spingi coi piedi e tira e spingi con le braccia, movimento fluido.', 'Ritmo da "riesco a parlare".', 'Non staccare i talloni e non piegarti in avanti.'] },
    vogatore: { hi: 'leg', m: 'Cuore, fiato, schiena e gambe', cue: 'Prima gambe, poi braccia', p: ['Piedi legati sulla pedana, maniglia in mano, ginocchia piegate.', 'Spingi prima con le gambe, poi tira la maniglia verso lo sterno.', 'Al ritorno: prima braccia avanti, poi pieghi le gambe.', 'Non curvare la schiena.'] },
    stepper: { hi: 'leg', m: 'Cuore, fiato, glutei e polpacci', cue: 'Passi regolari', p: ['Tutto il piede sui pedali, mani leggere sulle maniglie.', 'Passi regolari, non troppo corti.', 'Ritmo da "riesco a parlare".', 'Non appoggiarti con tutto il peso alle maniglie.'] }
  };
  // per gli esercizi che sulla stessa macchina fanno un movimento diverso
  const GUIDE_EX = {
    'adductor': { hi: 'leg', m: 'Interno coscia', cue: 'Chiudi le gambe', p: ['Siediti, schiena appoggiata, cuscinetti all\'interno delle ginocchia, gambe poco aperte.', 'Chiudi le gambe stringendo i cuscinetti.', 'Riapri piano fino a un leggero allungamento.', 'Non partire con le gambe troppo aperte.'] },
    'camminata tranquilla': { hi: 'leg', m: 'Cuore e fiato', cue: 'Passo leggero', p: ['Aggancia la clip di sicurezza.', 'Pendenza 0-3%, velocità 4-5 km/h: una camminata tranquilla.', 'Devi poter parlare senza fiatone.', 'Non correre: oggi è recupero.'] }
  };
  const svg = id => `<svg class="m${GUIDE[id] ? ' hi-' + GUIDE[id].hi : ''}" viewBox="0 0 200 140" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ART[id] || ''}</svg>`;
  // dal nome di un esercizio all'attrezzo che serve (anche per le schede gia' salvate)
  const BY_EX = {};
  for (const a of LIST) for (const e of a.ex) BY_EX[e[0].toLowerCase()] = a.id;
  // foto vere degli esercizi (partenza e arrivo), da free-exercise-db: pubblico dominio (Unlicense),
  // github.com/yuhonas/free-exercise-db. I file stanno in foto-es/.
  const FOTO_ES = { "curl manubri": "dumbbell_bicep_curl", "lento avanti manubri": "dumbbell_shoulder_press", "alzate laterali": "side_lateral_raise", "rematore manubrio": "one-arm_dumbbell_row", "affondi con manubri": "dumbbell_lunges", "rematore bilanciere": "bent_over_barbell_row", "stacco da terra": "barbell_deadlift", "curl bilanciere": "barbell_curl", "curl ez": "ez-bar_curl", "french press ez": "ez-bar_skullcrusher", "panca piana bilanciere": "barbell_bench_press_-_medium_grip", "panca piana manubri": "dumbbell_bench_press", "panca inclinata manubri": "incline_dumbbell_press", "panca inclinata bilanciere": "barbell_incline_bench_press_-_medium_grip", "crunch panca declinata": "decline_crunch", "sit up": "sit-up", "crunch": "crunches", "plank": "plank", "leg raise": "flat_bench_lying_leg_raise", "curl alla panca scott": "preacher_curl", "lat machine": "wide-grip_lat_pulldown", "lat machine presa stretta": "close-grip_front_lat_pulldown", "pulley basso": "seated_cable_rows", "leg press": "leg_press", "hack squat": "hack_squat", "leg extension": "leg_extensions", "leg curl": "lying_leg_curls", "chest press": "leverage_chest_press", "pectoral machine": "butterfly", "shoulder press": "leverage_shoulder_press", "croci ai cavi": "cable_crossover", "alzate laterali al cavo": "cable_seated_lateral_raise", "face pull": "face_pull", "push down al cavo": "triceps_pushdown_-_rope_attachment", "squat al multipower": "smith_machine_squat", "panca al multipower": "smith_machine_bench_press", "squat": "barbell_squat", "military press": "standing_military_press", "calf in piedi": "standing_calf_raises", "abductor": "thigh_abductor", "adductor": "thigh_adductor", "trazioni": "pullups", "dip alle parallele": "dips_-_triceps_version", "kettlebell swing": "one-arm_kettlebell_swings", "goblet squat": "goblet_squat", "tapis roulant": "walking_treadmill", "tapis roulant in salita": "walking_treadmill", "camminata tranquilla": "walking_treadmill", "riscaldamento tapis roulant": "walking_treadmill", "cyclette": "bicycling_stationary", "riscaldamento cyclette": "bicycling_stationary", "ellittica": "elliptical_trainer", "vogatore": "rowing_stationary", "stepper": "stairmaster" };
  const fotoEs = name => { const f = FOTO_ES[String(name).toLowerCase()]; return f ? [`foto-es/${f}-0.jpg`, `foto-es/${f}-1.jpg`] : null; };
  const guida = (name, att) => GUIDE_EX[String(name).toLowerCase()] || GUIDE[att] || null;
  window.ATTREZZI = { LIST, svg, fotoEs, guida, byId: id => LIST.find(a => a.id === id), byExercise: name => BY_EX[String(name).toLowerCase()] };
})();

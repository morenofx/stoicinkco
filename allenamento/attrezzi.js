// Catalogo degli attrezzi che si trovano in qualsiasi palestra.
// Ogni attrezzo: disegno al tratto (SVG 120x80), cosa allena, come si usa,
// e gli esercizi che si possono aggiungere alla scheda con un tocco.
// ex: [nome, serie, ripetizioni, recupero in secondi, unita' ('rip' se manca, 'sec', 'min')]
(() => {
  // pezzi di disegno riusati
  const stack = (x, y, w, h) => {
    let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.5"/>`;
    for (let yy = y + 6; yy < y + h - 2; yy += 6) s += `<line x1="${x + 2}" y1="${yy}" x2="${x + w - 2}" y2="${yy}" stroke-width="1.5"/>`;
    return s;
  };
  const man = (x, y, s = 1) => `<circle cx="${x}" cy="${y}" r="${4.5 * s}"/>`;
  const floor = '<line x1="4" y1="76" x2="116" y2="76" stroke-width="1.5" opacity=".5"/>';

  const ART = {
    manubri: `${floor}
      <rect x="14" y="22" width="8" height="26" rx="2"/><rect x="22" y="27" width="5" height="16" rx="1"/>
      <line x1="27" y1="35" x2="53" y2="35" stroke-width="4"/>
      <rect x="53" y="27" width="5" height="16" rx="1"/><rect x="58" y="22" width="8" height="26" rx="2"/>
      <rect x="62" y="54" width="6" height="18" rx="2"/><line x1="68" y1="63" x2="94" y2="63" stroke-width="4"/><rect x="94" y="54" width="6" height="18" rx="2"/>`,
    bilanciere: `${floor}
      <line x1="4" y1="44" x2="116" y2="44" stroke-width="3"/>
      <rect x="14" y="20" width="7" height="48" rx="2"/><rect x="22" y="26" width="6" height="36" rx="2"/><rect x="29" y="38" width="3" height="12"/>
      <rect x="99" y="20" width="7" height="48" rx="2"/><rect x="92" y="26" width="6" height="36" rx="2"/><rect x="88" y="38" width="3" height="12"/>`,
    ez: `${floor}
      <path d="M8 44 H34 L40 38 L46 50 L52 38 L58 50 L64 38 L70 50 L76 38 L82 44 H112"/>
      <rect x="14" y="26" width="7" height="36" rx="2"/><rect x="99" y="26" width="7" height="36" rx="2"/>`,
    panca: `${floor}
      <rect x="22" y="44" width="78" height="7" rx="3"/>
      <line x1="34" y1="51" x2="34" y2="76"/><line x1="90" y1="51" x2="90" y2="76"/>
      <line x1="26" y1="76" x2="26" y2="10"/><path d="M26 22 h6 v-6"/>
      <circle cx="30" cy="16" r="11"/><circle cx="30" cy="16" r="3"/>`,
    inclinata: `${floor}
      <path d="M28 54 H54"/><path d="M54 54 L90 16" stroke-width="7"/>
      <line x1="36" y1="54" x2="36" y2="76"/><line x1="70" y1="40" x2="82" y2="76"/><line x1="36" y1="66" x2="78" y2="66"/>
      <line x1="94" y1="76" x2="94" y2="8"/><path d="M94 18 h-6 v-6"/><circle cx="92" cy="12" r="9"/>`,
    addominali: `${floor}
      <path d="M20 30 L96 58" stroke-width="7"/>
      <circle cx="18" cy="20" r="4"/><circle cx="26" cy="22" r="4"/><line x1="22" y1="26" x2="24" y2="31"/>
      <line x1="40" y1="38" x2="34" y2="76"/><line x1="84" y1="55" x2="88" y2="76"/>`,
    scott: `${floor}
      <path d="M44 28 L74 44" stroke-width="8"/><line x1="62" y1="40" x2="62" y2="76"/>
      <path d="M22 58 H44"/><line x1="33" y1="58" x2="33" y2="76"/><line x1="52" y1="76" x2="72" y2="76"/>
      <path d="M70 52 L76 48 L80 54 L84 48 L90 52"/><rect x="88" y="42" width="5" height="18" rx="1.5"/>`,
    tappetino: `<rect x="8" y="66" width="104" height="8" rx="3"/>
      ${man(40, 46)}<path d="M44 50 L58 64 L76 64"/><path d="M76 64 L86 50 L96 64"/><path d="M44 46 L54 42"/>`,
    lat: `${floor}
      <line x1="86" y1="76" x2="86" y2="6"/><path d="M86 6 H40"/><circle cx="40" cy="9" r="3"/>
      <line x1="40" y1="12" x2="40" y2="28" stroke-width="1.5"/>
      <path d="M14 34 Q40 24 66 34"/>
      <path d="M28 60 H56"/><line x1="44" y1="60" x2="44" y2="76"/><circle cx="48" cy="48" r="4"/><line x1="48" y1="52" x2="48" y2="60"/>
      ${stack(92, 40, 18, 34)}`,
    pulley: `${floor}
      <path d="M8 60 H78"/><line x1="18" y1="60" x2="18" y2="76"/><line x1="68" y1="60" x2="68" y2="76"/>
      <rect x="34" y="53" width="16" height="6" rx="2"/>
      <path d="M80 46 L84 70"/><line x1="76" y1="46" x2="86" y2="46"/>
      <path d="M58 48 L64 42 L70 48 Z"/><line x1="70" y1="45" x2="96" y2="62" stroke-width="1.5"/>
      ${stack(94, 30, 18, 44)}`,
    legpress: `${floor}
      <line x1="30" y1="72" x2="104" y2="24"/><line x1="36" y1="76" x2="36" y2="68"/><line x1="104" y1="24" x2="104" y2="76"/>
      <path d="M14 38 L26 68 H46"/>
      <path d="M68 32 L84 58" stroke-width="5"/>
      <line x1="84" y1="40" x2="92" y2="36" stroke-width="2"/><rect x="88" y="26" width="7" height="20" rx="2" transform="rotate(-33 91 36)"/>`,
    hack: `${floor}
      <line x1="26" y1="74" x2="88" y2="8"/><line x1="88" y1="8" x2="96" y2="76"/>
      <path d="M44 62 L76 28" stroke-width="6"/><path d="M72 26 h10"/>
      <path d="M12 76 L36 64"/>
      ${man(84, 18)}<path d="M80 24 L50 56 L30 66 L26 72"/>`,
    legext: `${floor}
      <path d="M30 14 L38 50 H68"/><line x1="40" y1="50" x2="40" y2="76"/><line x1="62" y1="50" x2="62" y2="76"/>
      <circle cx="70" cy="52" r="3"/><path d="M70 52 L88 64"/><circle cx="90" cy="66" r="6"/>
      <path d="M86 50 a14 14 0 0 1 6 10" stroke-width="1.5" stroke-dasharray="3 3"/>
      ${stack(10, 40, 16, 34)}`,
    legcurl: `${floor}
      <path d="M14 46 H58 Q66 40 76 46"/><line x1="24" y1="48" x2="24" y2="76"/><line x1="66" y1="48" x2="66" y2="76"/>
      <circle cx="80" cy="48" r="3"/><path d="M80 48 L96 42"/><circle cx="98" cy="38" r="6"/>
      <path d="M100 26 a14 14 0 0 0 -12 -2" stroke-width="1.5" stroke-dasharray="3 3"/>
      <line x1="14" y1="52" x2="10" y2="52"/>`,
    chestpress: `${floor}
      <path d="M38 12 L42 54 H64"/><line x1="46" y1="54" x2="46" y2="76"/>
      <path d="M40 10 H62 L80 28"/><line x1="74" y1="34" x2="90" y2="34" stroke-width="4"/>
      <path d="M92 34 h8" stroke-width="1.5" stroke-dasharray="3 3"/>
      ${stack(10, 30, 18, 44)}`,
    butterfly: `${floor}
      <rect x="52" y="12" width="16" height="42" rx="3"/><rect x="44" y="54" width="32" height="6" rx="2"/>
      <line x1="60" y1="60" x2="60" y2="76"/>
      <path d="M54 10 Q34 6 26 18"/><path d="M66 10 Q86 6 94 18"/>
      <rect x="20" y="18" width="10" height="28" rx="3"/><rect x="90" y="18" width="10" height="28" rx="3"/>
      <path d="M34 32 l6 0 m-3 -3 l3 3 l-3 3" stroke-width="1.5"/><path d="M86 32 l-6 0 m3 -3 l-3 3 l3 3" stroke-width="1.5"/>`,
    shoulder: `${floor}
      <path d="M40 10 V58 H64"/><line x1="48" y1="58" x2="48" y2="76"/>
      <path d="M40 30 L72 22 V4"/><line x1="66" y1="4" x2="78" y2="4" stroke-width="4"/>
      <path d="M72 4 v-2" stroke-width="1.5"/>
      ${stack(90, 32, 18, 42)}`,
    cavi: `${floor}
      <rect x="8" y="8" width="14" height="68" rx="2"/><rect x="98" y="8" width="14" height="68" rx="2"/>
      <line x1="15" y1="8" x2="105" y2="8"/><circle cx="24" cy="18" r="3"/><circle cx="96" cy="18" r="3"/>
      <line x1="25" y1="20" x2="50" y2="50" stroke-width="1.5"/><line x1="95" y1="20" x2="70" y2="50" stroke-width="1.5"/>
      <path d="M46 50 L52 56 L56 50 Z"/><path d="M64 50 L68 56 L74 50 Z"/>
      ${stack(10, 52, 10, 22)}${stack(100, 52, 10, 22)}`,
    cavoalto: `${floor}
      <rect x="70" y="6" width="16" height="70" rx="2"/><path d="M70 10 H50"/><circle cx="50" cy="13" r="3"/>
      <line x1="50" y1="16" x2="50" y2="40" stroke-width="1.5"/>
      <path d="M50 40 L42 58 M50 40 L58 58" stroke-width="4"/><circle cx="42" cy="60" r="2.5"/><circle cx="58" cy="60" r="2.5"/>
      ${stack(72, 44, 12, 30)}`,
    smith: `${floor}
      <line x1="30" y1="6" x2="30" y2="76"/><line x1="90" y1="6" x2="90" y2="76"/><line x1="30" y1="6" x2="90" y2="6"/>
      <line x1="8" y1="34" x2="112" y2="34"/>
      <rect x="12" y="20" width="6" height="28" rx="2"/><rect x="102" y="20" width="6" height="28" rx="2"/>
      <rect x="27" y="30" width="6" height="8"/><rect x="87" y="30" width="6" height="8"/>
      <line x1="24" y1="76" x2="36" y2="76"/><line x1="84" y1="76" x2="96" y2="76"/>`,
    rack: `${floor}
      <rect x="24" y="6" width="72" height="70"/><line x1="36" y1="6" x2="36" y2="76" stroke-width="1.5"/><line x1="84" y1="6" x2="84" y2="76" stroke-width="1.5"/>
      ${[16, 24, 32, 40, 48, 56].map(y => `<circle cx="30" cy="${y}" r="1" /><circle cx="90" cy="${y}" r="1"/>`).join('')}
      <line x1="20" y1="56" x2="100" y2="56" stroke-width="2"/>
      <line x1="6" y1="28" x2="114" y2="28"/>
      <rect x="8" y="16" width="6" height="24" rx="2"/><rect x="106" y="16" width="6" height="24" rx="2"/>`,
    calf: `${floor}
      <line x1="88" y1="76" x2="88" y2="6"/><path d="M88 10 H40"/><rect x="34" y="14" width="22" height="7" rx="3"/>
      ${man(45, 8)}<line x1="45" y1="21" x2="45" y2="48"/><path d="M45 48 L42 62 L44 66"/><path d="M45 48 L48 62 L50 66"/>
      <rect x="34" y="66" width="26" height="8" rx="1"/>
      <path d="M64 54 v-10 m-3 3 l3 -3 l3 3" stroke-width="1.5"/>
      ${stack(92, 36, 18, 38)}`,
    abductor: `${floor}
      <rect x="38" y="10" width="44" height="30" rx="4"/><rect x="34" y="40" width="52" height="8" rx="3"/>
      <line x1="60" y1="48" x2="60" y2="76"/><line x1="44" y1="76" x2="76" y2="76"/>
      <rect x="22" y="44" width="8" height="22" rx="3"/><rect x="90" y="44" width="8" height="22" rx="3"/>
      <path d="M18 56 h-10 m3 -3 l-3 3 l3 3" stroke-width="1.5"/><path d="M102 56 h10 m-3 -3 l3 3 l-3 3" stroke-width="1.5"/>`,
    trazioni: `${floor}
      <line x1="16" y1="8" x2="104" y2="8"/><line x1="22" y1="8" x2="22" y2="76"/><line x1="98" y1="8" x2="98" y2="76"/>
      <path d="M48 8 L54 26"/><path d="M72 8 L66 26"/>${man(60, 22)}
      <line x1="60" y1="27" x2="60" y2="52"/><path d="M54 26 H66"/><path d="M60 52 L55 70"/><path d="M60 52 L65 70"/>`,
    parallele: `${floor}
      <line x1="22" y1="34" x2="86" y2="34"/><line x1="34" y1="26" x2="98" y2="26"/>
      <line x1="30" y1="34" x2="30" y2="76"/><line x1="78" y1="34" x2="78" y2="76"/><line x1="42" y1="26" x2="42" y2="70"/><line x1="90" y1="26" x2="90" y2="70"/>
      ${man(60, 12)}<line x1="60" y1="17" x2="60" y2="44"/><path d="M60 20 L54 30"/><path d="M60 20 L66 30"/><path d="M60 44 L56 58 L62 64"/>`,
    kettlebell: `${floor}
      <path d="M46 40 C42 12 78 12 74 40"/><path d="M52 38 C50 22 70 22 68 38"/>
      <path d="M40 52 C40 38 80 38 80 52 C80 66 70 74 60 74 C50 74 40 66 40 52 Z"/>`,
    tapis: `${floor}
      <path d="M10 70 L96 64"/><circle cx="14" cy="70" r="4"/><circle cx="92" cy="64" r="4"/><path d="M14 74 L92 68"/>
      <line x1="92" y1="64" x2="100" y2="22"/><rect x="88" y="12" width="22" height="10" rx="2" transform="rotate(12 99 17)"/>
      <path d="M98 30 H72"/>`,
    cyclette: `${floor}
      <path d="M28 24 H46"/><line x1="40" y1="24" x2="48" y2="58"/>
      <circle cx="58" cy="58" r="4"/><line x1="48" y1="58" x2="76" y2="58"/>
      <circle cx="88" cy="56" r="13"/><line x1="78" y1="46" x2="86" y2="18"/><path d="M80 16 H96"/>
      <path d="M30 76 V70 H100 V76"/>`,
    ellittica: `${floor}
      <path d="M12 70 H108"/><circle cx="96" cy="56" r="12"/>
      <path d="M22 66 L80 58"/><rect x="32" y="58" width="16" height="5" rx="2" transform="rotate(-8 40 60)"/>
      <line x1="62" y1="62" x2="74" y2="10"/><line x1="70" y1="60" x2="84" y2="14"/>
      <path d="M88 44 L96 22 H104"/>`,
    vogatore: `${floor}
      <path d="M6 64 H96"/><line x1="10" y1="64" x2="10" y2="76"/><line x1="96" y1="64" x2="96" y2="76"/>
      <rect x="36" y="56" width="16" height="6" rx="2"/>
      <circle cx="102" cy="50" r="13"/><path d="M78 48 L84 62"/><path d="M74 48 L82 48"/>
      <path d="M66 40 h8" stroke-width="4"/><line x1="74" y1="40" x2="92" y2="46" stroke-width="1.5"/>`,
    stepper: `${floor}
      <path d="M24 74 H96"/><line x1="70" y1="74" x2="78" y2="10"/><path d="M70 14 H90"/>
      <path d="M34 60 L58 54"/><path d="M38 70 L62 64"/>
      <rect x="30" y="52" width="16" height="5" rx="2"/><rect x="44" y="62" width="16" height="5" rx="2"/>`
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

  const svg = id => `<svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ART[id] || ''}</svg>`;
  // dal nome di un esercizio all'attrezzo che serve (anche per le schede gia' salvate)
  const BY_EX = {};
  for (const a of LIST) for (const e of a.ex) BY_EX[e[0].toLowerCase()] = a.id;
  window.ATTREZZI = { LIST, svg, byId: id => LIST.find(a => a.id === id), byExercise: name => BY_EX[String(name).toLowerCase()] };
})();

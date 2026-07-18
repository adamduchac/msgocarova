// Registry of editable site copy by page.
// Each entry has a stable key, a human label for the CMS, and the default fallback text.

export type CopyEntry = {
  label: string;
  defaultText: string;
};

export type PageCopy = Record<string, CopyEntry>;

export const SITE_COPY_REGISTRY: Record<string, PageCopy> = {
  "index": {
    // Hero
    "hero.eyebrow": { label: "Hero — označení", defaultText: "Mateřská škola Josefa Gočára" },
    "hero.h1.line1": { label: "Hero — H1 první řádek", defaultText: "Místo, kde si děti" },
    "hero.h1.line2": { label: "Hero — H1 druhý řádek (barevný)", defaultText: "hrají, objevují a rostou" },
    "hero.lead": {
      label: "Hero — úvodní odstavec",
      defaultText:
        "Pomáháme dětem přirozeně objevovat svět. Klidné a bezpečné zázemí v centru Hradce Králové s velkou zahradou a respektujícím přístupem.",
    },
    "hero.cta1": { label: "Hero — hlavní tlačítko", defaultText: "Vítejte u nás" },
    "hero.cta2": { label: "Hero — vedlejší tlačítko", defaultText: "Prohlédnout třídy" },

    // Benefits
    "benefits.eyebrow": { label: "Výhody — označení", defaultText: "Přijďte se podívat" },
    "benefits.h2": { label: "Výhody — nadpis", defaultText: "To pravé místo pro vaše děti" },
    "benefits.card1.titleMain": { label: "Výhoda 1 — hlavní název", defaultText: "Velká zahrada" },
    "benefits.card1.titleSub": { label: "Výhoda 1 — podtitulek", defaultText: "s dopravním hřištěm" },
    "benefits.card1.text": {
      label: "Výhoda 1 — text",
      defaultText:
        "Naše zelená oáza v centru města u Labe žije celý rok — podzimní hrátky, zimní bobování, letní osvěžení v bazénu a prvky přírodní zahrady. Součástí je dopravní hřiště i trampolína. Ven chodíme za každého počasí.",
    },
    "benefits.card2.titleMain": { label: "Výhoda 2 — hlavní název", defaultText: "Angličtina" },
    "benefits.card2.titleSub": { label: "Výhoda 2 — podtitulek", defaultText: "a moderní technologie" },
    "benefits.card2.text": {
      label: "Výhoda 2 — text",
      defaultText:
        "Angličtinu máme přirozeně ve všech třídách. Jdeme s dobou. Tradiční hru doplňujeme o interaktivní tabule, robotické myši, mikroskopy i světelný panel.",
    },
    "benefits.card3.titleMain": { label: "Výhoda 3 — hlavní název", defaultText: "Respektující" },
    "benefits.card3.titleSub": { label: "Výhoda 3 — podtitulek", defaultText: "a individuální přístup" },
    "benefits.card3.text": {
      label: "Výhoda 3 — text",
      defaultText:
        "Stavíme na důvěře, bezpečí a partnerské komunikaci mezi dětmi, učiteli i rodiči. Dáváme dětem prostor hledat vlastní řešení, spolupracovat a rozvíjet se vlastním tempem.",
    },
    "benefits.card4.titleMain": { label: "Výhoda 4 — hlavní název", defaultText: "Otevřená" },
    "benefits.card4.titleSub": { label: "Výhoda 4 — podtitulek", defaultText: "a snadná komunikace" },
    "benefits.card4.text": {
      label: "Výhoda 4 — text",
      defaultText:
        "Jsme otevřená školka, pro kterou je spolupráce s rodinou klíčová. Pro omlouvání a přehled o dění využíváme aplikaci Naše MŠ, o víkendech otevíráme zahradu veřejnosti.",
    },

    // Daily rhythm
    "rhythm.eyebrow": { label: "Den — označení", defaultText: "Zažijte to s námi" },
    "rhythm.h2": { label: "Den — nadpis", defaultText: "Jeden den v\u00A0Mateřské škole\u00A0\nJosefa Gočára" },

    // Classes section
    "classes.eyebrow": { label: "Třídy — označení", defaultText: "Barevné kostičky" },
    "classes.h2.line1": { label: "Třídy — H2 první část", defaultText: "Čtyři třídy, jeden" },
    "classes.h2.line2": { label: "Třídy — H2 barevná část", defaultText: "skvělý tým" },
    "classes.toggleIn": { label: "Třídy — přepínač (dovnitř)", defaultText: "Vezmi kostičky dovnitř" },
    "classes.toggleOut": { label: "Třídy — přepínač (ven)", defaultText: "Vezmi kostičky ven" },

    // Activities
    "activities.h2": { label: "Zážitky — nadpis", defaultText: "Zážitky, které si děti odnáší" },
    "activities.card1.title": { label: "Zážitek 1 — nadpis", defaultText: "Klub Předškoláček" },
    "activities.card1.text": {
      label: "Zážitek 1 — text",
      defaultText:
        "Cílená a hravá příprava na zápis do 1. třídy. Trénujeme grafomotoriku, soustředění a logiku tak, aby se děti do školy těšily.",
    },
    "activities.card2.title": { label: "Zážitek 2 — nadpis", defaultText: "Vzdělávání a aktivity" },
    "activities.card2.text": {
      label: "Zážitek 2 — text",
      defaultText:
        "S dětmi nezůstáváme jen za plotem. Pravidelně jezdíme na předplavecký výcvik, pořádáme lyžařské kurzy a jarní školy v přírodě.",
    },
    "activities.card3.title": { label: "Zážitek 3 — nadpis", defaultText: "Akce s rodiči" },
    "activities.card3.text": {
      label: "Zážitek 3 — text",
      defaultText:
        "Školka pro nás nekončí odpoledním vyzvednutím. Pořádáme společné tvořivé dílničky, „Večer se strašidly“ nebo jarní zahradní brigády.",
    },

    // Teachers section header
    "teachers.eyebrow": { label: "Tým — označení", defaultText: "POZNEJTE NÁS" },
    "teachers.h2": { label: "Tým — nadpis", defaultText: "Přestavujeme naše kolegy" },
  },

  "o-skolce": {
    "hero.eyebrow": { label: "Hero — označení", defaultText: "O školce" },
    "hero.h1": { label: "Hero — nadpis", defaultText: "Mateřská škola Josefa Gočára" },
    "hero.lead": {
      label: "Hero — úvodní odstavec",
      defaultText:
        "Nacházíme se v centru Hradce Králové, v klidné části města u břehu Labe. Pracujeme podle školního vzdělávacího programu „Skládáme svět z kostiček“, který vychází ze současných trendů předškolního vzdělávání.",
    },
    "hero.h2": { label: "Hero — podnadpis", defaultText: "Školka, kde má hra a přirozený rozvoj hlavní slovo" },
    "hero.body": {
      label: "Hero — druhý odstavec",
      defaultText:
        "Preferujeme osobní přístup ke každému dítěti a rozvíjíme jeho potenciál. Didaktické pomůcky umísťujeme tak, aby si je děti mohly samostatně brát a přirozeně rozvíjet fantazii i celou svou osobnost. Na estetickém prostředí školy se děti podílejí svými výtvory. Všechny učitelky mají odpovídající kvalifikaci a dále se vzdělávají.",
    },

    "vision.eyebrow": { label: "Vize — označení", defaultText: "Představení a vize" },
    "vision.h2": { label: "Vize — nadpis", defaultText: "Otevřená školka postavená na partnerství a důvěře" },
    "vision.body": {
      label: "Vize — odstavec",
      defaultText:
        "Nejdůležitější je pro nás spolupráce s rodinou. Úzce také spolupracujeme se ZŠ Josefa Gočára, což budoucím školákům usnadňuje přechod do 1. třídy.",
    },
    "vision.card1.title": { label: "Vize — karta 1 (Respekt)", defaultText: "Respektující přístup" },
    "vision.card1.text": {
      label: "Vize — karta 1 text",
      defaultText: "Prostředí založené na důvěře, bezpečí a partnerské komunikaci mezi dětmi, učiteli i rodiči.",
    },
    "vision.card2.title": { label: "Vize — karta 2 (Zvídavost)", defaultText: "Podpora přirozené zvídavosti" },
    "vision.card2.text": {
      label: "Vize — karta 2 text",
      defaultText:
        "Prostor pro hru, malování, tvoření a experimentování. Děti se učí přemýšlet, hledat vlastní řešení a spolupracovat.",
    },
    "vision.card3.title": { label: "Vize — karta 3 (Zahrada)", defaultText: "Zahrada v každém ročním období" },
    "vision.card3.text": {
      label: "Vize — karta 3 text",
      defaultText: "Podzimní aktivity, zimní bobování, letní osvěžení v bazénu a prvky přírodní zahrady po celý rok.",
    },
    "vision.card4.title": { label: "Vize — karta 4 (Pohyb)", defaultText: "Podpora pohybu" },
    "vision.card4.text": {
      label: "Vize — karta 4 text",
      defaultText: "Každodenní přirozený pohyb, plavecká škola i lyžařský kurz pro předškoláky.",
    },
    "vision.card5.title": { label: "Vize — karta 5 (Stravování)", defaultText: "Stravování a pitný režim" },
    "vision.card5.text": {
      label: "Vize — karta 5 text",
      defaultText:
        "Děti se stravují třikrát denně — svačinky připravuje paní kuchařka, obědy dovážíme ze ZŠ Josefa Gočára. Po celý den mají neomezený pitný režim.",
    },

    "education.eyebrow": { label: "Vzdělávání — označení", defaultText: "VZDĚLÁVÁNÍ A AKTIVITY" },
    "education.h2": { label: "Vzdělávání — nadpis", defaultText: "Pestrý program, který rozvíjí celou osobnost dítěte" },
    "education.body": {
      label: "Vzdělávání — úvod",
      defaultText:
        "Vedle každodenní hry dětem nabízíme pestrý program, který přirozeně rozvíjí jazyk, myšlení, pohyb i vztah k přírodě a technologiím.",
    },
    "education.bullet1.title": { label: "Vzdělávání — 1. odrážka nadpis", defaultText: "Jazyky a komunikace" },
    "education.bullet1.text": {
      label: "Vzdělávání — 1. odrážka text",
      defaultText: "Angličtinu máme přirozeně ve všech třídách, v Zelené kostičce navíc rozvíjíme řeč přes Jazykové hrátky.",
    },
    "education.bullet2.title": { label: "Vzdělávání — 2. odrážka nadpis", defaultText: "Myšlení a příprava na školu" },
    "education.bullet2.text": {
      label: "Vzdělávání — 2. odrážka text",
      defaultText: "Předškoláky v Červené kostičce vedeme metodou MIU k logickému uvažování a vlastním strategiím.",
    },
    "education.bullet3.title": { label: "Vzdělávání — 3. odrážka nadpis", defaultText: "Moderní technologie" },
    "education.bullet3.text": {
      label: "Vzdělávání — 3. odrážka text",
      defaultText: "Interaktivní tabule, robotické myši, mikroskopy i světelný panel jsou běžnou součástí výuky.",
    },
    "education.bullet4.title": { label: "Vzdělávání — 4. odrážka nadpis", defaultText: "Pohyb a zážitky" },
    "education.bullet4.text": {
      label: "Vzdělávání — 4. odrážka text",
      defaultText: "Děti chodí na plavecký kurz a předškoláci vyjíždějí do školy v přírodě i na lyžařskou školu.",
    },
    "education.cta": { label: "Vzdělávání — tlačítko", defaultText: "Více o vzdělávání a aktivitách" },

    "team.h2": { label: "Tým — nadpis", defaultText: "Náš tým" },
    "team.pedagogTitle": { label: "Tým — nadpis pedagogického týmu", defaultText: "Pedagogický tým" },
    "team.provozTitle": { label: "Tým — nadpis provozního týmu", defaultText: "Provozní tým" },

    "playground.eyebrow": { label: "Hřiště — označení", defaultText: "Veřejné hřiště" },
    "playground.h2": { label: "Hřiště — nadpis", defaultText: "Naše zahrada o víkendech slouží veřejnosti" },
    "playground.body": {
      label: "Hřiště — odstavec",
      defaultText:
        "Školní zahrada je o sobotách a nedělích otevřená pro širokou veřejnost. Přijďte si s dětmi zaběhat, prolézt prolézačky a užít si klidný park uprostřed města.",
    },
    "playground.seasonLabel": { label: "Hřiště — sezóna", defaultText: "Sobota, neděle" },
    "playground.morningHeader": { label: "Hřiště — dopolední sloupec", defaultText: "Dopolední" },
    "playground.afternoonHeader": { label: "Hřiště — odpolední sloupec", defaultText: "Odpolední" },
    "playground.row1.season": { label: "Hřiště — řádek 1 období", defaultText: "od 15. dubna, květen, červen, září" },
    "playground.row1.morning": { label: "Hřiště — řádek 1 dopoledne", defaultText: "10:00 – 12:00" },
    "playground.row1.afternoon": { label: "Hřiště — řádek 1 odpoledne", defaultText: "13:00 – 17:00" },
    "playground.row2.season": { label: "Hřiště — řádek 2 období", defaultText: "do 15. října" },
    "playground.row2.morning": { label: "Hřiště — řádek 2 dopoledne", defaultText: "10:00 – 12:00" },
    "playground.row2.afternoon": { label: "Hřiště — řádek 2 odpoledne", defaultText: "13:00 – 16:00" },
    "playground.holidayNote": { label: "Hřiště — poznámka svátky", defaultText: "Ve státní svátky je hřiště uzavřeno." },

    "canteen.eyebrow": { label: "Jídelna — označení", defaultText: "Školní jídelna" },
    "canteen.h2": { label: "Jídelna — nadpis", defaultText: "Praktické informace ke stravování" },
    "canteen.card1.title": { label: "Jídelna — karta 1 nadpis", defaultText: "Odhlašování a přihlašování jídel" },
    "canteen.card1.body": {
      label: "Jídelna — karta 1 text",
      defaultText:
        "Teplé pokrmy jsou určeny k přímé spotřebě v den výdeje, nejdéle do 12:30. Stravu na následující den je nutné odhlásit nebo přihlásit den předem do 10:00.",
    },
    "canteen.card1.bullet1": { label: "Jídelna — karta 1 odrážka 1", defaultText: "Osobně v kanceláři školní jídelny" },
    "canteen.card1.bullet2": { label: "Jídelna — karta 1 odrážka 2", defaultText: "Telefonicky " },
    "canteen.card1.phone": { label: "Jídelna — karta 1 telefon", defaultText: "495 019 050" },
    "canteen.card1.bullet3": { label: "Jídelna — karta 1 odrážka 3", defaultText: "Online na " },
    "canteen.card1.link": { label: "Jídelna — karta 1 odkaz", defaultText: "www.strava.cz" },
    "canteen.card1.warning": { label: "Jídelna — karta 1 varování", defaultText: "Zákaz výdeje obědů do skleněných nádob." },
    "canteen.card2.title": { label: "Jídelna — karta 2 nadpis", defaultText: "Platba stravného" },
    "canteen.card2.accountLabel": { label: "Jídelna — karta 2 číslo účtu label", defaultText: "Číslo účtu" },
    "canteen.card2.accountValue": { label: "Jídelna — karta 2 číslo účtu", defaultText: "27-320530297/0100" },
    "canteen.card2.vsLabel": { label: "Jídelna — karta 2 VS label", defaultText: "Variabilní symbol" },
    "canteen.card2.vsValue": { label: "Jídelna — karta 2 VS value", defaultText: "evidenční číslo dítěte" },
    "canteen.card2.ksSlozenkaLabel": { label: "Jídelna — karta 2 KS složenka label", defaultText: "Konstantní symbol (složenka)" },
    "canteen.card2.ksSlozenkaValue": { label: "Jídelna — karta 2 KS složenka value", defaultText: "0379" },
    "canteen.card2.ksPrevodLabel": { label: "Jídelna — karta 2 KS převod label", defaultText: "Konstantní symbol (převod)" },
    "canteen.card2.ksPrevodValue": { label: "Jídelna — karta 2 KS převod value", defaultText: "0558" },
    "canteen.card3.title": { label: "Jídelna — karta 3 nadpis", defaultText: "Výdej jídel" },
    "canteen.schedule.presnak.label": { label: "Jídelna — přesnídávka label", defaultText: "Přesnídávka" },
    "canteen.schedule.presnak.time": { label: "Jídelna — přesnídávka čas", defaultText: "8:30 – 8:55" },
    "canteen.schedule.obed1.label": { label: "Jídelna — oběd 1 label", defaultText: "Oběd (Modrá + Červená)" },
    "canteen.schedule.obed1.time": { label: "Jídelna — oběd 1 čas", defaultText: "11:40 – 12:10" },
    "canteen.schedule.obed2.label": { label: "Jídelna — oběd 2 label", defaultText: "Oběd (Žlutá + Zelená)" },
    "canteen.schedule.obed2.time": { label: "Jídelna — oběd 2 čas", defaultText: "11:50 – 12:20" },
    "canteen.schedule.svacina.label": { label: "Jídelna — svačina label", defaultText: "Svačina" },
    "canteen.schedule.svacina.time": { label: "Jídelna — svačina čas", defaultText: "14:00 – 14:30" },
    "canteen.schedule.nosic.label": { label: "Jídelna — jídlonosič label", defaultText: "Do jídlonosičů (na patrech MŠ)" },
    "canteen.schedule.nosic.time": { label: "Jídelna — jídlonosič čas", defaultText: "11:40 – 12:00" },
  },

  "pro-rodice": {
    "h1": { label: "H1", defaultText: "Pro rodiče" },
    "lead": {
      label: "Úvodní odstavec",
      defaultText:
        "Platby, denní program, co s sebou i kroužky – praktické informace, které budete během roku potřebovat nejčastěji. Dokumenty a formuláře najdete dole ke stažení.",
    },

    "payments.h2": { label: "Platby — nadpis", defaultText: "Platby" },
    "payments.body": {
      label: "Platby — odstavec",
      defaultText:
        "Školné pro školní rok 2025/2026 činí 600 Kč/měsíc, v červenci a srpnu 300 Kč. Platí se nejpozději do 15. dne daného měsíce. Děti v posledním roce před nástupem do školy (i s odkladem) školné neplatí.",
    },
    "payments.card1.title": { label: "Platby — karta 1 nadpis", defaultText: "Školné + kurzovné plavání" },
    "payments.card1.value": { label: "Platby — karta 1 hodnota", defaultText: "35-5744160237/0100" },
    "payments.card2.title": { label: "Platby — karta 2 nadpis", defaultText: "Stravné" },
    "payments.card2.value": { label: "Platby — karta 2 hodnota", defaultText: "27-320530297/0100" },
    "payments.card3.title": { label: "Platby — karta 3 nadpis", defaultText: "Variabilní symbol" },
    "payments.card3.body": { label: "Platby — karta 3 text", defaultText: "Variabilní symbol dítěte je pro všechny platby stejný." },

    "schedule.h2": { label: "Program dne — nadpis", defaultText: "Program dne" },
    "schedule.body": {
      label: "Program dne — odstavec",
      defaultText: "Den v naší školce má jasný rytmus, ale ponechává dětem prostor pro spontánní hru i klid.",
    },
    "schedule.row1.time": { label: "Program dne — řádek 1 čas", defaultText: "6:15 – 7:15" },
    "schedule.row1.activity": { label: "Program dne — řádek 1 aktivita", defaultText: "Scházení dětí ve Žluté kostičce" },
    "schedule.row2.time": { label: "Program dne — řádek 2 čas", defaultText: "7:15 – 9:30" },
    "schedule.row2.activity": { label: "Program dne — řádek 2 aktivita", defaultText: "Spontánní hry, individuální a skupinové aktivity, pohyb, řízená činnost" },
    "schedule.row3.time": { label: "Program dne — řádek 3 čas", defaultText: "8:30 – 8:55" },
    "schedule.row3.activity": { label: "Program dne — řádek 3 aktivita", defaultText: "Hygiena, svačina" },
    "schedule.row4.time": { label: "Program dne — řádek 4 čas", defaultText: "9:30 – 9:40" },
    "schedule.row4.activity": { label: "Program dne — řádek 4 aktivita", defaultText: "Příprava na pobyt venku" },
    "schedule.row5.time": { label: "Program dne — řádek 5 čas", defaultText: "9:40 – 11:40" },
    "schedule.row5.activity": { label: "Program dne — řádek 5 aktivita", defaultText: "Pobyt venku" },
    "schedule.row6.time": { label: "Program dne — řádek 6 čas", defaultText: "11:40 – 12:30" },
    "schedule.row6.activity": { label: "Program dne — řádek 6 aktivita", defaultText: "Oběd, hygiena" },
    "schedule.row7.time": { label: "Program dne — řádek 7 čas", defaultText: "12:30 – 14:00" },
    "schedule.row7.activity": { label: "Program dne — řádek 7 aktivita", defaultText: "Spánek a odpočinek respektující odlišné potřeby dětí, klidové aktivity" },
    "schedule.row8.time": { label: "Program dne — řádek 8 čas", defaultText: "14:00 – 16:45" },
    "schedule.row8.activity": { label: "Program dne — řádek 8 aktivita", defaultText: "Hygiena, odpolední svačina, hry, činnosti, za příznivého počasí zahrada, rozcházení" },

    "clubs.h2": { label: "Kroužky — nadpis", defaultText: "Kroužky a aktivity" },
    "clubs.body": {
      label: "Kroužky — odstavec",
      defaultText: "Nabízíme dětem pravidelné aktivity, které rozvíjejí myšlení, soustředění i radost ze hry.",
    },
    "clubs.card1.title": { label: "Kroužky — karta 1 nadpis", defaultText: "Šachy" },
    "clubs.card1.text": { label: "Kroužky — karta 1 text", defaultText: "Šachový klub Lipky HK, každou středu 15:15 (30 min), říjen–červen, hradí rodiče." },
    "clubs.card2.title": { label: "Kroužky — karta 2 nadpis", defaultText: "Bystrohlavička" },
    "clubs.card2.text": { label: "Kroužky — karta 2 text", defaultText: "Rozvoj pozornosti, paměti a logického myšlení; říjen–květen v lichém týdnu, Červená (po) a Zelená (út) od 13:15." },
    "clubs.card3.title": { label: "Kroužky — karta 3 nadpis", defaultText: "Stolní hry" },
    "clubs.card3.text": { label: "Kroužky — karta 3 text", defaultText: "Pravidla deskových her (Pexeso, Dáma, Domino…), Červená a Zelená od 13:15 dle zájmu." },

    "equipment.h2": { label: "Výbava — nadpis", defaultText: "Co dítě potřebuje do školky" },
    "equipment.body": { label: "Výbava — odstavec", defaultText: "Pro pohodový den ve školce si s sebou dítě přinese:" },
    "equipment.item1": { label: "Výbava — 1. položka", defaultText: "pohodlné oblečení do třídy" },
    "equipment.item2": { label: "Výbava — 2. položka", defaultText: "vhodnou obuv do třídy (bačkory, ne pantofle)" },
    "equipment.item3": { label: "Výbava — 3. položka", defaultText: "pyžamo (netýká se předškoláků)" },
    "equipment.item4": { label: "Výbava — 4. položka", defaultText: "oblečení na ven" },
    "equipment.item5": { label: "Výbava — 5. položka", defaultText: "náhradní oblečení do sáčku v šatně (ponožky, spodní prádlo, tričko)" },
    "equipment.item6": { label: "Výbava — 6. položka", defaultText: "pláštěnku" },
    "equipment.item7": { label: "Výbava — 7. položka", defaultText: "papírové kapesníky" },
    "equipment.item8": { label: "Výbava — 8. položka", defaultText: "kartáček na zuby (pouze Červená a Zelená kostička)" },

    "documents.h2": { label: "Dokumenty — nadpis", defaultText: "Dokumenty ke stažení" },
    "documents.body": {
      label: "Dokumenty — odstavec",
      defaultText: "Formuláře, žádosti a základní dokumenty naší mateřské školy ve formátu PDF.",
    },
    "documents.formsTitle": { label: "Dokumenty — sloupec formuláře", defaultText: "Formuláře a žádosti" },
    "documents.basicTitle": { label: "Dokumenty — sloupec základní", defaultText: "Základní dokumenty" },
    "documents.form1": { label: "Dokumenty — formulář 1", defaultText: "Žádost o přijetí k předškolnímu vzdělávání" },
    "documents.form2": { label: "Dokumenty — formulář 2", defaultText: "Žádost o přijetí — prázdninový provoz" },
    "documents.form3": { label: "Dokumenty — formulář 3", defaultText: "Žádost o uvolnění dítěte z povinného předškolního vzdělávání" },
    "documents.form4": { label: "Dokumenty — formulář 4", defaultText: "Pravidla přijímání dětí — prázdninový provoz 2026" },
    "documents.basic1": { label: "Dokumenty — základní 1", defaultText: "Školní řád mateřské školy" },
    "documents.basic2": { label: "Dokumenty — základní 2", defaultText: "Vnitřní řád školní výdejny" },
    "documents.basic3": { label: "Dokumenty — základní 3", defaultText: "Školní vzdělávací program" },
  },

  "barevne-tridy": {
    "hero.h1": { label: "H1", defaultText: "Barevné třídy" },
    "hero.lead": {
      label: "Úvodní odstavec",
      defaultText:
        "Naše třídy nesou názvy barevných kostiček — symbolu dětské hry, té nejpřirozenější a nejdůležitější činnosti předškoláka. Cílem je podnětné prostředí plné hraček a zajímavých aktivit, kam se děti každý den těší.",
    },

    "cervena.name": { label: "Červená — název", defaultText: "Červená kostička" },
    "cervena.age": { label: "Červená — věk", defaultText: "4–7 let" },
    "cervena.description": {
      label: "Červená — popis",
      defaultText: "Třída pro starší děti, která podporuje samostatnost, spolupráci a předškolní dovednosti.",
    },
    "cervena.specialty.label": { label: "Červená — specialita popisek", defaultText: "Specialita třídy" },
    "cervena.specialty.text": { label: "Červená — specialita text", defaultText: "MIU pro předškoláky — rozvoj myšlení a strategií." },
    "cervena.phone": { label: "Červená — telefon", defaultText: "495 444 425" },

    "zelena.name": { label: "Zelená — název", defaultText: "Zelená kostička" },
    "zelena.age": { label: "Zelená — věk", defaultText: "4–7 let" },
    "zelena.description": {
      label: "Zelená — popis",
      defaultText: "Třída pro starší děti se zaměřením na samostatnost a přípravu na školu.",
    },
    "zelena.specialty.label": { label: "Zelená — specialita popisek", defaultText: "Specialita třídy" },
    "zelena.specialty.text": { label: "Zelená — specialita text", defaultText: "Jazykové hrátky — rozvoj řeči a komunikace." },
    "zelena.phone": { label: "Zelená — telefon", defaultText: "495 444 426" },

    "modra.name": { label: "Modrá — název", defaultText: "Modrá kostička" },
    "modra.age": { label: "Modrá — věk", defaultText: "3–5 let" },
    "modra.description": {
      label: "Modrá — popis",
      defaultText: "Třída pro mladší děti s důrazem na pozvolný a citlivý vstup do kolektivu.",
    },
    "modra.phone": { label: "Modrá — telefon", defaultText: "495 444 423" },

    "zluta.name": { label: "Žlutá — název", defaultText: "Žlutá kostička" },
    "zluta.age": { label: "Žlutá — věk", defaultText: "3–5 let" },
    "zluta.description": {
      label: "Žlutá — popis",
      defaultText: "Třída pro mladší děti s klidným adaptačním režimem; ráno se zde scházejí děti z celé školky.",
    },
    "zluta.phone": { label: "Žlutá — telefon", defaultText: "495 444 424" },

    "labels.teachersTitle": { label: "Popisek — nadpis učitelky", defaultText: "Paní učitelky" },
    "labels.phoneLabel": { label: "Popisek — telefon do třídy", defaultText: "Telefon do třídy" },
  },

  "vzdelavani-a-rozvoj": {
    "hero.h1": { label: "H1", defaultText: "Vzdělávání a aktivity" },
    "hero.lead": {
      label: "Úvodní odstavec",
      defaultText:
        "Vedle každodenní hry nabízíme dětem pestrý program, který přirozeně rozvíjí jazyk, myšlení, pohyb i vztah k přírodě a technologiím. Aktivity přizpůsobujeme věku dětí a jednotlivým třídám.",
    },

    "jazyk.eyebrow": { label: "Jazyk — označení", defaultText: "Vzdělávání" },
    "jazyk.title": { label: "Jazyk — nadpis", defaultText: "Jazyk a komunikace" },
    "jazyk.act1.title": { label: "Jazyk — 1. aktivita nadpis", defaultText: "Angličtina ve všech třídách" },
    "jazyk.act1.text": {
      label: "Jazyk — 1. aktivita text",
      defaultText:
        "Výuku vedou metodicky proškolení učitelé naší MŠ. Děti se přes hry, tanečky, obrázky a jednoduché aktivity seznamují se základní slovní zásobou a běžnými vazbami (It is…, I like…, My name is…). Postupně zvládají i jednoduché otázky (What's your name?, Do you like…?). Témata: barvy, čísla, ovoce a zelenina, svátky, oblečení, části těla, zvířata, dopravní prostředky a další dle věku.",
    },
    "jazyk.act2.title": { label: "Jazyk — 2. aktivita nadpis", defaultText: "Jazykové hrátky (Zelená kostička)" },
    "jazyk.act2.text": {
      label: "Jazyk — 2. aktivita text",
      defaultText:
        "Hravou formou rozvíjíme řeč a komunikaci. Rozhýbáváme mluvidla, pracujeme s dechovými hrami, říkadly, písničkami i pohybem. Vše přirozeně a s ohledem na věk dětí.",
    },

    "priprava.eyebrow": { label: "Příprava — označení", defaultText: "Vzdělávání" },
    "priprava.title": { label: "Příprava — nadpis", defaultText: "Příprava na školu a moderní technologie" },
    "priprava.act1.title": { label: "Příprava — 1. aktivita nadpis", defaultText: "MIU — předškoláci (Červená kostička)" },
    "priprava.act1.text": {
      label: "Příprava — 1. aktivita text",
      defaultText:
        "Metoda MIU rozvíjí myšlení a kognitivní funkce a vede děti k uvědomovanému řešení úkolů, plánování a hledání strategií. Pracujeme s instrumentem Spojování bodů.",
    },
    "priprava.act2.title": { label: "Příprava — 2. aktivita nadpis", defaultText: "Digitální gramotnost" },
    "priprava.act2.text": {
      label: "Příprava — 2. aktivita text",
      defaultText: "Interaktivní tabule ve všech třídách, robotické myši, mikroskopy, světelný panel a další pomůcky.",
    },

    "plavani.eyebrow": { label: "Plavání — označení", defaultText: "Aktivity" },
    "plavani.title": { label: "Plavání — nadpis", defaultText: "Plavecká výuka" },
    "plavani.act1.title": { label: "Plavání — nadpis aktivity", defaultText: "Kurz s Plaveckým střediskem Zéva" },
    "plavani.act1.text": {
      label: "Plavání — text aktivity",
      defaultText:
        "Děti se bezpečně seznamují s vodou, učí se základní plavecké dovednosti a získávají jistotu, koordinaci i odvahu. Kurz probíhá ve třech navazujících cyklech během roku; každý cyklus má 11 lekcí (á 45 min) včetně návštěvy aquacentra. Hradí rodiče.",
    },

    "priroda.eyebrow": { label: "Škola v přírodě — označení", defaultText: "Aktivity" },
    "priroda.title": { label: "Škola v přírodě — nadpis", defaultText: "Škola v přírodě" },
    "priroda.act1.title": { label: "Škola v přírodě — nadpis aktivity", defaultText: "Čtyři dny v Krkonoších" },
    "priroda.act1.text": {
      label: "Škola v přírodě — text aktivity",
      defaultText: "Pro děti z Červené a Zelené kostičky organizujeme čtyřdenní školu v přírodě v Krkonoších.",
    },

    "lyze.eyebrow": { label: "Lyžák — označení", defaultText: "Aktivity" },
    "lyze.title": { label: "Lyžák — nadpis", defaultText: "Lyžařský kurz" },
    "lyze.act1.title": { label: "Lyžák — nadpis aktivity", defaultText: "Pětidenní lyžařská škola pro předškoláky" },
    "lyze.act1.text": {
      label: "Lyžák — text aktivity",
      defaultText:
        "Předškoláci mohou vyjet na pětidenní lyžařskou školu, kde se hravou formou učí základům lyžování a získávají jistotu na sněhu.",
    },

    "akce.eyebrow": { label: "Tradiční akce — označení", defaultText: "Aktivity" },
    "akce.title": { label: "Tradiční akce — nadpis", defaultText: "Tradiční akce" },
    "akce.act1.title": { label: "Tradiční akce — nadpis aktivity", defaultText: "Oblíbené akce během roku" },
    "akce.act1.text": {
      label: "Tradiční akce — text aktivity",
      defaultText:
        "Během školního roku se děti účastní řady oblíbených aktivit. Patří sem podzimní a jarní výlety do přírody, Čertí rej, karneval, návštěvy Divadla Drak, poznávací exkurze a další společné akce.",
    },
  },

  "akce-s-rodici": {
    "hero.h1": { label: "H1", defaultText: "Akce s rodiči" },
    "hero.lead": {
      label: "Úvodní odstavec",
      defaultText:
        "Během roku se ve školce potkávají nejen děti s učitelkami, ale i celé rodiny — od podzimního dlabání dýní přes vánoční posezení až po květnové Slavnosti školy na zahradě. Některé akce se opakují každý rok, jiné vznikají i z nápadů a nabídek samotných rodičů. Aktuální termíny najdete v aplikaci Naše MŠ.",
    },
    "events.h2": { label: "Přehled akcí — nadpis", defaultText: "Přehled akcí" },
    "events.item1.title": { label: "Akce 1 — název", defaultText: "Tvoření dýňáčků" },
    "events.item1.text": { label: "Akce 1 — text", defaultText: "Dlabání dýní s rodiči a sourozenci." },
    "events.item2.title": { label: "Akce 2 — název", defaultText: "Podvečer se strašidly" },
    "events.item2.text": { label: "Akce 2 — text", defaultText: "Večer plný světýlek a fantazie." },
    "events.item3.title": { label: "Akce 3 — název", defaultText: "Vánoční posezení" },
    "events.item3.text": { label: "Akce 3 — text", defaultText: "Společné naladění na advent s krátkým vystoupením dětí." },
    "events.item4.title": { label: "Akce 4 — název", defaultText: "Den rodin" },
    "events.item4.text": { label: "Akce 4 — text", defaultText: "Odpoledne s programem a opékáním buřtů." },
    "events.item5.title": { label: "Akce 5 — název", defaultText: "Slavnosti školy" },
    "events.item5.text": { label: "Akce 5 — text", defaultText: "Květnové setkání na školní zahradě s divadlem." },
    "events.item6.title": { label: "Akce 6 — název", defaultText: "Loučení s předškoláky" },
    "events.item6.text": { label: "Akce 6 — text", defaultText: "Slavnostní rozloučení s dětmi odcházejícími do ZŠ." },
    "events.item7.title": { label: "Akce 7 — název", defaultText: "Péče o zahradu" },
    "events.item7.text": { label: "Akce 7 — text", defaultText: "Společně zvelebujeme venkovní prostředí pro děti." },
    "events.item8.title": { label: "Akce 8 — název", defaultText: "Nabídky rodičů" },
    "events.item8.text": {
      label: "Akce 8 — text",
      defaultText: "Vítáme exkurze, materiály i další podněty, které obohatí program školky.",
    },
    "events.more": { label: "Přehled — poslední řádek", defaultText: "a další…" },
  },

  "predskolacek": {
    "hero.eyebrow": { label: "Hero — označení", defaultText: "Pro rodiče" },
    "hero.h1": { label: "H1", defaultText: "Předškoláček" },
    "hero.lead": {
      label: "Úvodní odstavec",
      defaultText:
        "Předškoláček je program pro budoucí prvňáčky a jejich rodiče. Hravou formou v něm procvičujeme dovednosti důležité pro vstup do první třídy — a zároveň je to společně strávený čas dítěte s rodičem. Setkání vedou naše učitelky v malých skupinkách přibližně deseti dětí.",
    },
    "status.fallbackTitle": {
      label: "Status box — výchozí titulek",
      defaultText: "Termíny Předškoláčka pro rok 2027 zatím nebyly vyhlášeny",
    },
    "status.fallbackBody": {
      label: "Status box — výchozí text",
      defaultText:
        "Jakmile budou termíny známé, najdete je zde a v aplikaci Naše MŠ. Přihlásit se pak bude možné přes aplikaci nebo osobně ve své třídě.",
    },
    "how.title": { label: "Karta 1 — nadpis", defaultText: "Jak Předškoláček probíhá" },
    "how.body": {
      label: "Karta 1 — text",
      defaultText:
        "Program probíhá v Červené i Zelené kostičce, vždy 3× v období únor až březen, od 15:30 do 16:20. Rodiče jsou u toho — vidí své dítě při práci a odnášejí si náměty pro společné aktivity doma. Z každého setkání si děti odnášejí 10 úkolů. Aktivity jsou pestré a přiměřené věku; účast je dobrovolná. Prosíme, aby se setkání neúčastnili mladší sourozenci.",
    },
    "focus.title": { label: "Karta 2 — nadpis", defaultText: "Na co se zaměřujeme" },
    "focus.item1": { label: "Karta 2 — 1. odrážka", defaultText: "grafomotorika — jemná i hrubá motorika, správný úchop tužky" },
    "focus.item2": { label: "Karta 2 — 2. odrážka", defaultText: "řeč — komunikace, výslovnost, slovní zásoba" },
    "focus.item3": { label: "Karta 2 — 3. odrážka", defaultText: "sluch — vnímání rytmu a melodie řeči (příprava na čtení a psaní)" },
    "focus.item4": { label: "Karta 2 — 4. odrážka", defaultText: "zrak — rozlišování tvarů a barev, zraková paměť" },
    "focus.item5": { label: "Karta 2 — 5. odrážka", defaultText: "prostorová a pravolevá orientace — důležitá pro čtení zleva doprava" },
    "focus.item6": { label: "Karta 2 — 6. odrážka", defaultText: "matematické představy — základní tvary a jejich třídění" },
    "bring.title": { label: "Karta 3 — nadpis", defaultText: "Co si přinést" },
    "bring.item1": { label: "Karta 3 — 1. odrážka", defaultText: "trojhrannou tužku (silnější)" },
    "bring.item2": { label: "Karta 3 — 2. odrážka", defaultText: "pastelky" },
    "bring.item3": { label: "Karta 3 — 3. odrážka", defaultText: "ořezávátko" },
    "bring.item4": { label: "Karta 3 — 4. odrážka", defaultText: "desky na úkoly" },
    "bring.item5": { label: "Karta 3 — 5. odrážka", defaultText: "30 kancelářských papírů" },
    "signup.title": { label: "Přihlášení — nadpis", defaultText: "Přihlášení" },
    "signup.body": {
      label: "Přihlášení — text",
      defaultText:
        "Přihlásit se můžete v aplikaci Naše MŠ nebo osobně ve své třídě. Kvůli přípravě pomůcek je přihlášení předem nutné — počítáme s vámi na všechna 3 setkání.",
    },
    "contact.h3": { label: "Kontakt CTA — nadpis", defaultText: "Máte dotaz k Předškoláčkovi?" },
    "contact.body": { label: "Kontakt CTA — text", defaultText: "Ozvěte se nám, rádi vše zodpovíme." },
  },

  "zapis-do-skolky": {
    "hero.eyebrow": { label: "Hero — označení", defaultText: "Pro rodiče" },
    "hero.h1": { label: "H1", defaultText: "Zápis do mateřské školy" },
    "hero.lead": {
      label: "Úvodní odstavec",
      defaultText:
        "Zápis do naší školky probíhá jednou ročně, zpravidla na jaře. Na této stránce najdete aktuální termín, kritéria a vše, co je k zápisu potřeba. Přihlašování i komunikaci vedeme přes aplikaci Naše MŠ.",
    },
    "status.fallbackTitle": {
      label: "Status box — výchozí titulek",
      defaultText: "Zápis pro školní rok 2026/2027 je uzavřen",
    },
    "status.fallbackBody": {
      label: "Status box — výchozí text",
      defaultText:
        "Termín zápisu pro školní rok 2027/2028 zatím nebyl vyhlášen. Jakmile bude známý, zveřejníme ho zde, na nástěnkách školky a v aplikaci Naše MŠ.",
    },
    "how.title": { label: "Karta 1 — nadpis", defaultText: "Jak zápis probíhá" },
    "how.body": {
      label: "Karta 1 — text",
      defaultText:
        "Termín, místo i kritéria pro přijetí stanovuje ředitel školy a zveřejňuje je předem na webu a informačních letácích. Do školky přijímáme děti zpravidla od 3 do 6 let, nejdříve však od 2 let. Pro děti, které do začátku školního roku dosáhnou 5 let, je předškolní vzdělávání povinné. Děti lze přijmout i v průběhu roku, pokud to dovolí kapacita.",
    },
    "prepare.title": { label: "Karta 2 — nadpis", defaultText: "Co si k zápisu připravit" },
    "prepare.item1.pre": { label: "Karta 2 — 1. odrážka text", defaultText: "vyplněnou žádost o přijetí" },
    "prepare.item1.link": { label: "Karta 2 — 1. odrážka odkaz", defaultText: "(Dokumenty ke stažení)" },
    "prepare.item2": { label: "Karta 2 — 2. odrážka", defaultText: "rodný list dítěte" },
    "prepare.item3": { label: "Karta 2 — 3. odrážka", defaultText: "průkaz totožnosti zákonného zástupce" },
    "prepare.item4": {
      label: "Karta 2 — 4. odrážka",
      defaultText:
        "potvrzení dětského lékaře o očkování (součást žádosti); u dětí s povinným předškolním vzděláváním se doklad o očkování nevyžaduje",
    },
    "prepare.item5": {
      label: "Karta 2 — 5. odrážka",
      defaultText: "případně vyjádření školského poradenského zařízení (u dětí se speciálními vzdělávacími potřebami)",
    },
    "summer.title": { label: "Karta 3 — nadpis", defaultText: "Prázdninový provoz (červenec–srpen)" },
    "summer.body": {
      label: "Karta 3 — text",
      defaultText:
        "V létě můžeme přijmout i děti z jiných školek, a to na dobu, kdy má jejich kmenová školka omezený nebo přerušený provoz. Přednost mají děti ze spádového obvodu a s trvalým bydlištěm v Hradci Králové; při převisu rozhoduje los. Podrobná pravidla najdete v dokumentech.",
    },
    "summer.linkText": { label: "Karta 3 — text odkazu", defaultText: "Pravidla přijímání" },
    "after.title": { label: "Po přijetí — nadpis", defaultText: "Po přijetí" },
    "after.body": {
      label: "Po přijetí — text",
      defaultText:
        "Rodiče nově přijatých dětí zveme na společnou schůzku před začátkem docházky, kde se dozvíte vše k nástupu a předáte zbývající dokumenty (evidenční list, přihlášku ke stravování, pověření k vyzvedávání).",
    },
    "contact.h3": { label: "Kontakt CTA — nadpis", defaultText: "Máte dotaz k zápisu?" },
    "contact.body": { label: "Kontakt CTA — text", defaultText: "Ozvěte se nám, rádi vše zodpovíme." },
  },

  "kontakty": {
    "hero.h1": { label: "H1", defaultText: "Kontakty" },
    "hero.lead": {
      label: "Úvodní odstavec",
      defaultText: "Rádi vás uvítáme osobně, nebo se ozvěte telefonem či e-mailem.",
    },
    "hero.phone": { label: "Hlavní telefon", defaultText: "495 444 421" },
    "hero.email": { label: "Hlavní e-mail", defaultText: "kosticky@msjghk.cz" },
    "address.label": { label: "Adresa — popisek", defaultText: "Adresa" },
    "address.name": { label: "Adresa — název", defaultText: "Mateřská škola Josefa Gočára" },
    "address.street": { label: "Adresa — ulice", defaultText: "Škroupova 693" },
    "address.city": { label: "Adresa — město", defaultText: "500 02 Hradec Králové 2" },

    "map.h2": { label: "Mapa — nadpis sekce", defaultText: "Kudy k nám" },

    "rejstrik.h2": { label: "Rejstřík — nadpis sekce", defaultText: "Rejstřík" },
    "rejstrik.sectionVedeni": { label: "Rejstřík — sekce Vedení", defaultText: "Vedení školky" },
    "rejstrik.sectionJidelna": { label: "Rejstřík — sekce Jídelna", defaultText: "Školní jídelna" },
    "rejstrik.sectionTridy": { label: "Rejstřík — sekce Třídy", defaultText: "Barevné třídy" },
    "rejstrik.reditelLabel": { label: "Rejstřík — Ředitel popisek", defaultText: "Ředitel ZŠ a MŠ Josefa Gočára" },
    "rejstrik.reditelName": { label: "Rejstřík — Ředitel jméno", defaultText: "Mgr. Petr Sadílek" },
    "rejstrik.zastupkyneLabel": { label: "Rejstřík — Zástupkyně popisek", defaultText: "Zástupkyně ředitele pro MŠ" },
    "rejstrik.zastupkyneName": { label: "Rejstřík — Zástupkyně jméno", defaultText: "Mgr. Jitka Kouklíková" },
    "rejstrik.jidelnaName": { label: "Rejstřík — Jídelna název", defaultText: "Školní jídelna ZŠ" },
    "rejstrik.jidelnaNote": {
      label: "Rejstřík — Jídelna poznámka",
      defaultText: "Odhlašování obědů nejdéle do 10:00 na příští den.",
    },
    "rejstrik.vydejnaName": { label: "Rejstřík — Výdejna název", defaultText: "Výdejna obědů MŠ" },
  },
};

export const SITE_COPY_PAGES = Object.keys(SITE_COPY_REGISTRY);

export function getPageRegistry(page: string): PageCopy | undefined {
  return SITE_COPY_REGISTRY[page];
}

export function getCopyDefault(page: string, key: string): string | undefined {
  return SITE_COPY_REGISTRY[page]?.[key]?.defaultText;
}

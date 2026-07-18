// Registry of editable site copy by page.
// Each entry has a stable key, a human label for the CMS, and the default fallback text.

export type CopyEntry = {
  label: string;
  defaultText: string;
};

export type PageCopy = Record<string, CopyEntry>;

export const SITE_COPY_REGISTRY: Record<string, PageCopy> = {
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
};

export const SITE_COPY_PAGES = Object.keys(SITE_COPY_REGISTRY);

export function getPageRegistry(page: string): PageCopy | undefined {
  return SITE_COPY_REGISTRY[page];
}

export function getCopyDefault(page: string, key: string): string | undefined {
  return SITE_COPY_REGISTRY[page]?.[key]?.defaultText;
}

-- Jednorázové naplnění CMS původním obsahem webu (tým + dokumenty).
-- Spustit v Supabase SQL Editoru PO aplikaci migrace 20260721000000 a PO merge
-- větve (pořadí viz docs/CMS-SEED.md).
--
-- Bezpečné proti dvojímu spuštění: vkládá jen do PRÁZDNÝCH tabulek.
-- Fotky a PDF se nikam nekopírují — řádky odkazují na soubory, které web už
-- hostuje (cesty /__l5e/...). Když později v adminu nahrajete nový soubor,
-- uloží se normálně do Supabase Storage a odkaz se přepíše.

-- ==================== TÝM ====================
INSERT INTO public.staff
  (title_prefix, first_name, last_name, title_suffix, position, class_color, staff_group, bio, photo_path, sort_order, is_active)
SELECT * FROM (VALUES
  ('Mgr.', 'Jitka', 'Kouklíková', '', 'Zástupkyně ředitele pro MŠ', 'none'::public.class_color, 'pedagog'::public.staff_group,
   $$Jako zástupkyně ředitele pro MŠ propojuji každodenní práci s dětmi s vedením týmu mateřské školy a organizací provozu. Velkou radostí je pro mě vidět aktivní děti a spokojené paní učitelky, kterým se daří připravovat pro děti zajímavé aktivity a vytvářet smysluplné, podnětné prostředí – ve třídách i na školní zahradě. Vzdělávám se v oblasti předškolního vzdělávání, aby naše mateřská škola mohla stále růst a rozvíjet se. Dětem nejraději připravuji aktivity podporující jejich myšlení, tvořivost a radost z objevování. Všímám si toho, co děti zajímá a snažím se jim to nabídnout. Záleží mi na tom, aby jim u nás bylo opravdu dobře. Mám ráda zpěv, hudbu, přírodu a cestování.$$,
   '/__l5e/assets-v1/7a135ea4-2e7f-4a7a-9ff8-b9940431350a/teacher-jitka-kouklikova-v2.webp', 0, true),

  ('Mgr.', 'Nikola', 'Šorfová', '', 'Učitelka v Červené kostičce', 'red'::public.class_color, 'pedagog'::public.staff_group,
   $$Povolání učitelky mateřské školy jsem si zvolila, protože mě práce s dětmi velice naplňuje a zároveň je to pro mě posláním předávat dětem základy, které si ponesou do dalších životních etap. Mým cílem je, a považuji to za velmi důležité, aby se děti v prostředí mateřské školy cítily spokojeně, bezpečně a aby se hlavně rozvíjely tím správným směrem. Ve svém volném čase se ráda věnuji cyklistice, turistice a ze zimních sportů se nejvíce věnuji lyžování a běhu na lyžích. Miluji také hudbu a když jsem byla oslovena Základní uměleckou školou Melodie v Hořicích, kde jsem měla na 4 měsíce působit jako učitelka hry na zobcovou flétnu, neváhala jsem. Ráda zpívám a hraji na zobcové flétny, proto jsem dlouhodobě také členkou flétnového souboru z Lázní Bělohrad. Hudbě bych se více ráda věnovala i při práci s dětmi, neboť hudba léčí, navozuje příjemnou a uklidňující atmosféru, která je pro mě v prostředí mateřské školy klíčová.$$,
   '/__l5e/assets-v1/bed5cd2a-6fb4-4af0-81d0-42badc47aeec/teacher-nikola-sorfova-v2.webp', 1, true),

  ('', 'Jana', 'Tuharská', '', 'Učitelka v Zelené kostičce', 'green'::public.class_color, 'pedagog'::public.staff_group,
   $$Jmenuji se Jana Tuharská a v této mateřské škole pracuji už 30 let. Zaměřuji se na rozvoj grafomotoriky a dovedností, které dětem usnadňují vstup do základní školy. Děti vedu ke kamarádství. Ráda s dětmi dělám legraci. Hraji na kytaru a baví mě s nimi zpívat i tancovat. Zaměřuji se také na pracovní činnosti a tvoření z různých materiálů, které podporují jejich zručnost a kreativitu. Ve volném čase ráda cestuji a mám vztah k přírodě a ke zvířatům.$$,
   '/__l5e/assets-v1/ff4661e7-9487-4c63-85a2-eee303d3396e/teacher-jana-tuharska-v2.webp', 2, true),

  ('', 'Kristýna', 'Vaňátková', 'DiS.', 'Učitelka v Zelené kostičce', 'green'::public.class_color, 'pedagog'::public.staff_group,
   $$Jmenuji se Kristýna a práci v mateřské škole vnímám jako smysluplné poslání. Práce s dětmi pro mě není jen zaměstnáním, ale také dlouhodobým zájmem. Odjakživa jsem věděla, že se chci věnovat právě vzdělávání. U dětí považuji za nejdůležitější jejich pohodu, bezpečí a důvěru. Snažím se proto vytvářet prostředí, ve kterém se děti nebojí vyjádřit svůj názor a mohou rozvíjet své schopnosti svým vlastním tempem. Důležitou součástí mé práce je výtvarná výchova, ve které ráda experimentuji s různými technikami a podporuji dětskou kreativitu.$$,
   NULL, 3, true),

  ('Bc.', 'Veronika', 'Kremláčková', '', 'Učitelka v Modré kostičce', 'blue'::public.class_color, 'pedagog'::public.staff_group,
   $$Snažím se pro děti i rodiče vytvářet klidné a přátelské klima na základě emocionálně bezpečného prostředí, vstřícnosti a efektivní komunikace. Důvěra, zodpovědnost a férový přístup jsou pro mě vždy na prvním místě. Věřím, že podpora samostatnosti, vzájemného respektu a dovednosti spolupracovat otevírá dětem dveře k naplněnému životu.$$,
   NULL, 4, true),

  ('', 'Milena', 'Svobodová', 'DiS.', 'Učitelka ve Žluté kostičce', 'yellow'::public.class_color, 'pedagog'::public.staff_group,
   $$Ve své pedagogické praxi propojuji současné vzdělávací přístupy, zejména Montessori pedagogiku, program Začít spolu, principy zážitkové pedagogiky a výuku anglického jazyka. Důraz kladu na přirozený rozvoj dítěte, podporu jeho individuality a vytváření prostředí založeného na respektující komunikaci inspirované konceptem Respektovat a být respektován. Usiluji o vytváření bezpečného, podnětného a laskavého vzdělávacího prostředí, které dětem umožňuje objevovat, rozvíjet vlastní potenciál a zažívat radost z učení. Ve výuce využívám také cvičební metodu Lerngymnastiky, která přirozenou cestou podporuje soustředění, koordinaci i celkovou pohodu při učení. Aktivně se zapojuji do mezinárodní spolupráce prostřednictvím platformy eTwinning, kde jsem byla oceněna za realizaci projektů. Podílím se na projektech zaměřených na environmentální výchovu, podporu pohybu, rozvoj spolupráce mezi dětmi i šíření respektujícího přístupu ve vzdělávání napříč Evropou. Ve volném čase se věnuji pohybovým aktivitám, zejména józe, cyklistice a lyžování, které pro mě představují důležitý zdroj rovnováhy, inspirace a osobní pohody.$$,
   NULL, 5, true),

  ('', 'Martina', 'Bartošová', '', 'Učitelka mateřské školy', 'none'::public.class_color, 'pedagog'::public.staff_group,
   $$Jsem kvalifikovaná učitelka mateřské školy s bohatými zkušenostmi z praxe i dalších oborů. Působila jsem v různých mateřských školách, díky čemuž čerpám z pestré pedagogické zkušenosti. Ve své profesní dráze jsem se věnovala také financím a dlouhodobě návrhům interiérů a zahrad pro mateřské školy. Tyto zkušenosti mi pomáhají vytvářet podnětné a bezpečné prostředí pro děti. Blízká je mi kreativní a výtvarná činnost, ráda zkouším nové techniky a předávám je dětem. Hudba je nedílnou součástí mého života a často ji zapojuji do práce s dětmi. Věřím v celoživotní učení a ve své práci propojuji odbornost, kreativitu a individuální přístup k dětem.$$,
   '/__l5e/assets-v1/5c8ea4c2-8bb5-492b-b593-b6ddfd02474a/teacher-martina-bartosova.webp', 6, true),

  ('', 'Lenka', 'Petráčková', '', 'Provozní', 'none'::public.class_color, 'provoz'::public.staff_group, '',
   '/__l5e/assets-v1/81b0eb2d-7d93-481a-821b-a7a9892ab586/staff-lenka-petrackova.webp', 7, true),

  ('', 'Lucie', 'Košťálová', '', 'Provozní', 'none'::public.class_color, 'provoz'::public.staff_group, '',
   '/__l5e/assets-v1/837bdf01-4b6b-4dc5-9d6c-1ccbc52e85ed/staff-lucie-kostalova.webp', 8, true),

  ('', 'Věra', 'Marková', '', 'Provozní', 'none'::public.class_color, 'provoz'::public.staff_group, '',
   '/__l5e/assets-v1/0d5218f9-54cb-4535-899b-bbbc53997579/staff-vera-markova.webp', 9, true)
) AS v(title_prefix, first_name, last_name, title_suffix, position, class_color, staff_group, bio, photo_path, sort_order, is_active)
WHERE NOT EXISTS (SELECT 1 FROM public.staff);

-- ==================== DOKUMENTY ====================
INSERT INTO public.documents (title, category, file_path, sort_order, is_active)
SELECT * FROM (VALUES
  ('Žádost o přijetí k předškolnímu vzdělávání', 'formulare'::public.doc_category,
   '/__l5e/assets-v1/7840cfc0-0333-4db7-9e6a-1025f33b900d/zadost-o-prijeti.pdf', 0, true),
  ('Žádost o přijetí – prázdninový provoz', 'formulare'::public.doc_category,
   '/__l5e/assets-v1/35b4602d-e316-4501-ad1d-898b50f0a90b/zadost-prazdninovy-provoz.pdf', 1, true),
  ('Žádost o uvolnění dítěte z povinného předškolního vzdělávání', 'formulare'::public.doc_category,
   '/__l5e/assets-v1/17e9e06d-2b33-49d1-9e87-b63115d75d26/zadost-o-uvolneni.pdf', 2, true),
  ('Pravidla přijímání dětí – prázdninový provoz 2026', 'formulare'::public.doc_category,
   '/__l5e/assets-v1/4b61175b-fb4b-44b2-a37a-4a2a7dc5d2da/pravidla-prazdninovy-provoz-2026.pdf', 3, true),
  ('Školní řád mateřské školy', 'dokumenty'::public.doc_category,
   '/__l5e/assets-v1/0953441a-a0cf-4862-b9d4-e4e0ea2a3026/skolni-rad.pdf', 0, true),
  ('Vnitřní řád školní výdejny', 'dokumenty'::public.doc_category,
   '/__l5e/assets-v1/9bebab1c-319e-451d-bb29-2906d67f3571/vnitrni-rad-vydejny.pdf', 1, true),
  ('Školní vzdělávací program', 'dokumenty'::public.doc_category,
   '/__l5e/assets-v1/5efa6acb-12e3-4730-a312-078c1df83cef/svp-skladame-svet-z-kosticek.pdf', 2, true)
) AS v(title, category, file_path, sort_order, is_active)
WHERE NOT EXISTS (SELECT 1 FROM public.documents);

-- Kontrola: obě čísla mají být > 0 (10 a 7 při prvním spuštění nad prázdnými tabulkami)
SELECT
  (SELECT count(*) FROM public.staff) AS staff_rows,
  (SELECT count(*) FROM public.documents) AS document_rows;

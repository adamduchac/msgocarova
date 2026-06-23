import preschool from "@/assets/activity-preschool.jpg.asset.json";
import sport from "@/assets/activity-sport.jpg.asset.json";
import parents from "@/assets/activity-parents.jpg.asset.json";

type Activity = {
  title: string;
  text: string;
  image: string;
  alt: string;
};

const activities: Activity[] = [
  {
    title: "Klub Předškoláček",
    text: "Cílená a hravá příprava na zápis do 1. třídy. Trénujeme grafomotoriku, soustředění a logiku tak, aby se děti do školy těšily.",
    image: preschool.url,
    alt: "Soustředěný předškolák kreslí tužkou u stolu",
  },
  {
    title: "Sport a příroda",
    text: "S dětmi nezůstáváme jen za plotem. Pravidelně jezdíme na předplavecký výcvik, pořádáme lyžařské kurzy a jarní školy v přírodě.",
    image: sport.url,
    alt: "Děti s plovacími deskami v bazénu během plaveckého kurzu",
  },
  {
    title: "Akce s rodiči",
    text: "Školka pro nás nekončí odpoledním vyzvednutím. Pořádáme společné tvořivé dílničky, „Večer se strašidly“ nebo jarní zahradní brigády.",
    image: parents.url,
    alt: "Tatínek s malým synem společně dlabou dýni",
  },
];

export function SiteActivities() {
  return (
    <section id="aktivity" className="section-y bg-offwhite">
      <div className="container mx-auto px-6">
        <div className="reveal-up section-header-gap mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-blue">
            Aktivity a život
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink md:text-[40px]">
            Zážitky, které si děti odnesou <span className="text-brand-green">do školy</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
          {activities.map((a, i) => (
            <article
              key={a.title}
              className="reveal-up group flex flex-col overflow-hidden rounded-2xl bg-card transition-[box-shadow,transform] duration-200 ease-out transform-gpu hover:-translate-y-0.5 hover:shadow-[0_22px_45px_-22px_rgba(16,15,16,0.22)]"
              style={{ ["--reveal-delay" as string]: `${i * 110}ms` }}
            >
              <div className="aspect-[5/3] w-full overflow-hidden">
                <img
                  src={a.image}
                  alt={a.alt}
                  width={1024}
                  height={614}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-xl font-semibold text-ink">{a.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-body">{a.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

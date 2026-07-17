import jitkaPhoto from "@/assets/teacher-jitka-kouklikova-v2.webp.asset.json";
import nikolaPhoto from "@/assets/teacher-nikola-sorfova-v2.webp.asset.json";
import janaPhoto from "@/assets/teacher-jana-tuharska-v2.webp.asset.json";
import martinaPhoto from "@/assets/teacher-martina-bartosova.webp.asset.json";
import lenkaPhoto from "@/assets/staff-lenka-petrackova.webp.asset.json";
import luciePhoto from "@/assets/staff-lucie-kostalova.webp.asset.json";
import veraPhoto from "@/assets/staff-vera-markova.webp.asset.json";

export type TeamMember = {
  name: string;
  role: string;
  roleColor: string;
  photo: string | null;
  alt: string;
  group: "pedagog" | "provoz";
};

export const teamMembers: TeamMember[] = [
  {
    name: "Mgr. Jitka Kouklíková",
    role: "Zástupkyně ředitele pro MŠ",
    roleColor: "text-ink/70",
    photo: jitkaPhoto.url,
    alt: "Portrét Mgr. Jitky Kouklíkové",
    group: "pedagog",
  },
  {
    name: "Mgr. Nikola Šorfová",
    role: "Učitelka v Červené kostičce",
    roleColor: "text-brand-red",
    photo: nikolaPhoto.url,
    alt: "Portrét Mgr. Nikoly Šorfové",
    group: "pedagog",
  },
  {
    name: "Jana Tuharská",
    role: "Učitelka v Zelené kostičce",
    roleColor: "text-brand-green",
    photo: janaPhoto.url,
    alt: "Portrét Jany Tuharské",
    group: "pedagog",
  },
  {
    name: "Kristýna Vaňátková, DiS.",
    role: "Učitelka v Zelené kostičce",
    roleColor: "text-brand-green",
    photo: null,
    alt: "Kristýna Vaňátková",
    group: "pedagog",
  },
  {
    name: "Bc. Veronika Kremláčková",
    role: "Učitelka v Modré kostičce",
    roleColor: "text-brand-blue",
    photo: null,
    alt: "Bc. Veronika Kremláčková",
    group: "pedagog",
  },
  {
    name: "Milena Svobodová, DiS.",
    role: "Učitelka ve Žluté kostičce",
    roleColor: "text-brand-yellow",
    photo: null,
    alt: "Milena Svobodová, DiS.",
    group: "pedagog",
  },
  {
    name: "Martina Bartošová",
    role: "Učitelka mateřské školy",
    roleColor: "text-ink/70",
    photo: martinaPhoto.url,
    alt: "Portrét Martiny Bartošové",
    group: "pedagog",
  },
  {
    name: "Lenka Petráčková",
    role: "Provozní",
    roleColor: "text-ink/70",
    photo: lenkaPhoto.url,
    alt: "Portrét Lenky Petráčkové",
    group: "provoz",
  },
  {
    name: "Lucie Košťálová",
    role: "Provozní",
    roleColor: "text-ink/70",
    photo: luciePhoto.url,
    alt: "Portrét Lucie Košťálové",
    group: "provoz",
  },
  {
    name: "Věra Marková",
    role: "Provozní",
    roleColor: "text-ink/70",
    photo: veraPhoto.url,
    alt: "Portrét Věry Markové",
    group: "provoz",
  },
];

export function getInitials(name: string): string {
  return name
    .replace(/,.*$/, "")
    .split(/\s+/)
    .filter((part) => !/\./.test(part) && part.length > 0)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

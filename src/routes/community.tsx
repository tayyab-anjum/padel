import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Trophy, Moon, Users } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CtaBanner } from "@/components/CtaBanner";
import community from "@/assets/community.jpg";
import action2 from "@/assets/action-2.jpg";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — The LTP Hustlers | The Padel Range" },
      { name: "description", content: "Leagues, tournaments, and social nights with the LTP Hustlers at The Padel Range, Faisalabad. Join the crew." },
    ],
  }),
  component: Community,
});

const events = [
  { icon: <Trophy className="h-5 w-5" />, title: "Monthly Tournament", text: "Doubles bracket on the last Saturday of every month. Prize pool, refs, the works." },
  { icon: <Moon className="h-5 w-5" />, title: "Hustler Late Nights", text: "Every Friday 10 PM–2 AM. Open courts, music, and chai. Just show up." },
  { icon: <Users className="h-5 w-5" />, title: "Beginner Socials", text: "Sunday mornings. Coach-led rotation for new players. No pressure." },
];

function Community() {
  return (
    <>
      <PageHeader
        eyebrow="Community"
        title="The LTP Hustlers play here."
        lead="A growing crew of regulars who turned a court into a culture. New faces always welcome."
      />

      <section className="section-pad bg-background">
        <div className="container-x grid items-center gap-10 md:grid-cols-2">
          <img src={community} alt="Players celebrating" className="aspect-[4/3] w-full object-cover" loading="lazy" width={1280} height={960} />
          <div>
            <div className="eyebrow">Who we are</div>
            <h2 className="mt-2 text-4xl md:text-5xl">More than a court. It's a clubhouse.</h2>
            <p className="mt-4 text-muted-foreground">
              The LTP Hustlers started as four friends booking the same midnight slot every week.
              Now there's a roster, a WhatsApp group that never sleeps, and a monthly tournament with
              actual trophies. Roll up — the only requirement is showing up.
            </p>
            <p className="mt-3 text-muted-foreground">
              Whether you're a complete beginner or a seasoned racket-sport player, the regulars will
              match you to a partner and a level. The doors are open 24 hours. So are the rallies.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-secondary">
        <div className="container-x">
          <div className="max-w-2xl">
            <div className="eyebrow">What's on</div>
            <h2 className="mt-2 text-4xl md:text-5xl">Leagues, late nights, and socials.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {events.map((e) => (
              <article key={e.title} className="rounded-md border border-border bg-card p-6">
                <div className="grid h-11 w-11 place-items-center rounded-md bg-lime text-charcoal">{e.icon}</div>
                <h3 className="mt-4 text-2xl">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-background">
        <div className="container-x grid items-center gap-10 md:grid-cols-[3fr_2fr]">
          <img src={action2} alt="Group of regulars" className="aspect-[16/10] w-full object-cover" loading="lazy" width={1280} height={960} />
          <div>
            <div className="eyebrow">Follow the action</div>
            <h2 className="mt-2 text-3xl md:text-4xl">Best of the week lands on Instagram.</h2>
            <p className="mt-4 text-muted-foreground">
              Match highlights, tournament results, and the occasional bandeja that goes viral. Tag us
              and we'll repost the good ones.
            </p>
            <a
              href="https://instagram.com/thepadelrange"
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-6"
            >
              <Instagram className="h-4 w-4" /> @thepadelrange
            </a>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Clock, MapPin, Trophy, Users, Dumbbell, Instagram } from "lucide-react";
import hero from "@/assets/hero-court.jpg";
import community from "@/assets/community.jpg";
import action1 from "@/assets/action-1.jpg";
import action2 from "@/assets/action-2.jpg";
import gear from "@/assets/gear.jpg";
import { CtaBanner } from "@/components/CtaBanner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Padel Range — Faisalabad's Premier Padel Destination" },
      { name: "description", content: "Indoor & outdoor padel courts in Faisalabad. Open 24 hours. Book a court, get coached by M Sajjad, join the LTP Hustlers." },
    ],
  }),
  component: Home,
});

const testimonials = [
  { name: "Ahmed R.", text: "Best padel setup in Faisalabad. Lights are bright, courts are quick, and the regulars make it fun.", stars: 5 },
  { name: "Sara K.", text: "Booked a coaching slot with Sajjad — went from never holding a racket to playing doubles in two weeks.", stars: 5 },
  { name: "Hassan M.", text: "Open 24 hours is a game changer. We hit the court at midnight on weekends.", stars: 4 },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          <img src={hero} alt="" className="h-full w-full object-cover" width={1920} height={1280} />
          <div className="absolute inset-0 bg-charcoal/55" />
        </div>
        <div className="container-x flex min-h-[88vh] flex-col justify-end pb-20 pt-32 text-cream">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-sm bg-lime px-3 py-1 text-xs font-bold uppercase tracking-widest text-charcoal">
              <span className="h-1.5 w-1.5 rounded-full bg-coral" /> Now Open · Faisalabad
            </div>
            <h1 className="mt-5 text-5xl sm:text-7xl md:text-[5.5rem]">
              Faisalabad's Premier <span className="text-lime">Padel</span> Destination.
            </h1>
            <p className="mt-5 max-w-xl text-base text-cream/85 sm:text-lg">
              Pro-grade courts. Floodlit nights. A coach who'll level you up and a crew that
              actually shows up. Welcome to The Padel Range.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/booking" className="btn-accent">Book a Court</Link>
              <Link to="/coaching" className="btn-outline border-cream text-cream hover:bg-cream hover:text-charcoal">
                Train with M Sajjad
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INFO STRIP */}
      <section className="border-y border-border bg-cream">
        <div className="container-x grid divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
          <Stat icon={<Clock className="h-5 w-5" />} label="Open" value="24 hours · 7 days" />
          <Stat
            icon={<Star className="h-5 w-5 fill-lime text-lime" />}
            label="Google rating"
            value="4.5 ★ · 15 reviews"
          />
          <Stat icon={<MapPin className="h-5 w-5" />} label="Find us" value="Canal Villas Rd, Faisalabad" />
        </div>
      </section>

      {/* WHY PLAY HERE */}
      <section className="section-pad bg-background">
        <div className="container-x">
          <div className="max-w-2xl">
            <div className="eyebrow">Why play here</div>
            <h2 className="mt-2 text-4xl md:text-5xl">Built for the game. Built for the crew.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<Trophy className="h-6 w-6" />}
              title="Tournament-grade courts"
              text="Glass-back panoramic courts with pro turf, bright LED floodlights, and surface designed for real bounce."
              img={action1}
            />
            <FeatureCard
              icon={<Dumbbell className="h-6 w-6" />}
              title="Coaching that levels you up"
              text="Group clinics, private lessons, and youth programs led by coach M Sajjad. Beginner to advanced welcome."
              img={gear}
            />
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title="Real community"
              text="The LTP Hustlers play here every night. Open social hours, league nights, and post-game tea."
              img={community}
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-pad bg-secondary">
        <div className="container-x">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="eyebrow">From the regulars</div>
              <h2 className="mt-2 text-4xl md:text-5xl">15 reviews. 4.5 stars.</h2>
            </div>
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noreferrer"
              className="hidden text-sm font-medium text-court underline-offset-4 hover:underline sm:inline"
            >
              Read on Google →
            </a>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="flex flex-col rounded-md border border-border bg-card p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < t.stars ? "fill-lime text-lime" : "text-border"}`}
                    />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-charcoal">
                  "{t.text}"
                </blockquote>
                <figcaption className="mt-5 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  — {t.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM TEASER */}
      <section className="section-pad bg-background">
        <div className="container-x grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="eyebrow">@thepadelrange</div>
            <h2 className="mt-2 text-4xl md:text-5xl">Catch the rallies on Instagram.</h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              1.1K+ followers and growing. League nights, top rallies, and coach clips drop weekly.
            </p>
            <a
              href="https://instagram.com/thepadelrange"
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-6"
            >
              <Instagram className="h-4 w-4" /> Follow @thepadelrange
            </a>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <img src={action1} alt="" className="aspect-square w-full object-cover" loading="lazy" />
            <img src={community} alt="" className="aspect-square w-full object-cover" loading="lazy" />
            <img src={gear} alt="" className="aspect-square w-full object-cover" loading="lazy" />
            <img src={action2} alt="" className="aspect-square w-full object-cover" loading="lazy" />
            <img src={hero} alt="" className="aspect-square w-full object-cover" loading="lazy" />
            <img src={action1} alt="" className="aspect-square w-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 px-2 py-6 md:px-8">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-court text-cream">{icon}</div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="font-display text-lg font-bold text-charcoal">{value}</div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, text, img }: { icon: React.ReactNode; title: string; text: string; img: string }) {
  return (
    <article className="group overflow-hidden rounded-md border border-border bg-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={img} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
      </div>
      <div className="p-6">
        <div className="inline-grid h-10 w-10 place-items-center rounded-md bg-lime text-charcoal">{icon}</div>
        <h3 className="mt-4 text-2xl">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
      </div>
    </article>
  );
}

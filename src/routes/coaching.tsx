import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Users, User } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CtaBanner } from "@/components/CtaBanner";
import coach from "@/assets/coach.jpg";

export const Route = createFileRoute("/coaching")({
  head: () => ({
    meta: [
      { title: "Coaching with M Sajjad — The Padel Range" },
      { name: "description", content: "Private and group padel coaching with M Sajjad at The Padel Range, Faisalabad. Beginner to advanced. Book a session today." },
    ],
  }),
  component: Coaching,
});

function Coaching() {
  return (
    <>
      <PageHeader
        eyebrow="Coaching"
        title="Train with coach M Sajjad."
        lead="Whether you've never picked up a racket or you're chasing a tournament shot, Sajjad will get you there."
      />

      <section className="section-pad bg-background">
        <div className="container-x grid items-start gap-10 md:grid-cols-[3fr_4fr]">
          <div className="overflow-hidden rounded-md border border-border">
            <img src={coach} alt="Coach M Sajjad" className="aspect-[3/4] w-full object-cover" loading="lazy" />
          </div>
          <div>
            <div className="eyebrow">Head Coach</div>
            <h2 className="mt-2 text-4xl md:text-5xl">M Sajjad</h2>
            <p className="mt-4 text-muted-foreground">
              Sajjad has been shaping Faisalabad's padel scene since day one. With a background in
              racket sports and years of on-court coaching, he's built a reputation for clear
              communication, fast progress, and a genuine love for the game.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Stat label="Years coaching" value="8+" />
              <Stat label="Students" value="200+" />
              <Stat label="Levels taught" value="Beginner → Pro" />
              <Stat label="Languages" value="Urdu · English" />
            </div>
            <div className="mt-6">
              <div className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Specialties</div>
              <ul className="mt-3 space-y-2 text-sm">
                {[
                  "Beginner fundamentals — grip, footwork, first serves",
                  "Doubles strategy & court positioning",
                  "Power vs control: when to bandeja, when to smash",
                  "Match prep for local tournaments",
                ].map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-court" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-secondary">
        <div className="container-x">
          <div className="max-w-2xl">
            <div className="eyebrow">Programs</div>
            <h2 className="mt-2 text-4xl md:text-5xl">Pick your session.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Program
              icon={<User className="h-5 w-5" />}
              title="Private Lessons"
              price="PKR 3,500 / hour"
              points={[
                "One-on-one with coach Sajjad",
                "Custom drills for your level",
                "Video review on request",
                "Best for fast progress",
              ]}
            />
            <Program
              icon={<Users className="h-5 w-5" />}
              title="Group Clinics"
              price="PKR 1,500 / person"
              points={[
                "Groups of 3–4 players",
                "Weekly themed sessions",
                "Beginner & intermediate tracks",
                "Best for friends learning together",
              ]}
            />
          </div>
          <div className="mt-10">
            <Link to="/booking" className="btn-primary">Book a Coaching Session</Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-card p-4">
      <div className="font-display text-2xl font-extrabold text-court">{value}</div>
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function Program({ icon, title, price, points }: { icon: React.ReactNode; title: string; price: string; points: string[] }) {
  return (
    <article className="rounded-md border border-border bg-card p-6 md:p-8">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-md bg-court text-cream">{icon}</div>
        <h3 className="text-2xl">{title}</h3>
      </div>
      <div className="mt-4 font-display text-3xl font-extrabold text-charcoal">{price}</div>
      <ul className="mt-5 space-y-2 text-sm">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-court" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

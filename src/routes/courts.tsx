import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CtaBanner } from "@/components/CtaBanner";
import hero from "@/assets/hero-court.jpg";
import court1 from "@/assets/court-1.jpg";
import court2 from "@/assets/court-2.jpg";
import action1 from "@/assets/action-1.jpg";
import action2 from "@/assets/action-2.jpg";
import gear from "@/assets/gear.jpg";

export const Route = createFileRoute("/courts")({
  head: () => ({
    meta: [
      { title: "Courts — The Padel Range Faisalabad" },
      { name: "description", content: "Glass-back panoramic indoor and outdoor padel courts with floodlights, pro turf, and full amenities at The Padel Range, Faisalabad." },
    ],
  }),
  component: Courts,
});

const amenities = [
  "Free parking on-site",
  "Floodlit play 24 hours",
  "Spectator seating",
  "Cold drinks & refreshments",
  "Racket & ball rental",
  "Changing rooms",
  "Live scoring boards",
  "WhatsApp booking",
];

function Courts() {
  return (
    <>
      <PageHeader
        eyebrow="Our Courts"
        title="Tournament-grade courts. Open all night."
        lead="Glass-back panoramic courts, premium turf, and lighting that lets you play at 3 AM if that's your thing."
      />

      <section className="section-pad bg-background">
        <div className="container-x">
          {/* Asymmetric photo grid */}
          <div className="grid gap-3 md:grid-cols-4 md:grid-rows-2">
            <div className="md:col-span-2 md:row-span-2">
              <img src={hero} alt="Indoor padel court" className="h-full max-h-[640px] w-full object-cover" loading="lazy" />
            </div>
            <div className="md:col-span-2">
              <img src={court2} alt="Outdoor court at golden hour" className="h-full max-h-[315px] w-full object-cover" loading="lazy" />
            </div>
            <div>
              <img src={court1} alt="Empty indoor court" className="h-full max-h-[315px] w-full object-cover" loading="lazy" />
            </div>
            <div>
              <img src={action1} alt="Player mid-shot" className="h-full max-h-[315px] w-full object-cover" loading="lazy" />
            </div>
          </div>

          {/* Court types */}
          <div className="mt-16 grid gap-10 md:grid-cols-2">
            <CourtCard
              img={court1}
              tag="Indoor"
              title="Climate-controlled indoor courts"
              specs={[
                "Glass-back panoramic walls",
                "Premium artificial turf",
                "LED floodlighting, 600+ lux",
                "Climate ventilation",
              ]}
            />
            <CourtCard
              img={court2}
              tag="Outdoor"
              title="Floodlit outdoor courts"
              specs={[
                "Open-air play under the stars",
                "Wind-shielded enclosures",
                "Same pro-grade surface",
                "Open 24 hours",
              ]}
            />
          </div>

          {/* Amenities */}
          <div className="mt-20 rounded-md border border-border bg-card p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-[1fr_2fr] md:gap-12">
              <div>
                <div className="eyebrow">Amenities</div>
                <h2 className="mt-2 text-3xl md:text-4xl">Everything you need on-site.</h2>
                <img src={gear} alt="" className="mt-6 aspect-video w-full object-cover" loading="lazy" />
              </div>
              <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {amenities.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-court" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

function CourtCard({ img, tag, title, specs }: { img: string; tag: string; title: string; specs: string[] }) {
  return (
    <article className="overflow-hidden rounded-md border border-border bg-card">
      <img src={img} alt="" className="aspect-[16/10] w-full object-cover" loading="lazy" />
      <div className="p-6 md:p-8">
        <span className="inline-block bg-lime px-2 py-0.5 text-xs font-bold uppercase tracking-widest text-charcoal">
          {tag}
        </span>
        <h3 className="mt-3 text-2xl md:text-3xl">{title}</h3>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          {specs.map((s) => (
            <li key={s} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-court" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

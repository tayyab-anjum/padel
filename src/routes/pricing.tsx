import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CtaBanner } from "@/components/CtaBanner";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — The Padel Range" },
      { name: "description", content: "Court rentals, peak and off-peak rates, memberships, and group bookings at The Padel Range, Faisalabad." },
    ],
  }),
  component: Pricing,
});

const tiers = [
  {
    name: "Off-Peak",
    when: "Weekdays · 6 AM – 5 PM",
    price: "PKR 2,500",
    unit: "/ hour / court",
    points: ["Up to 4 players", "Rackets available to rent", "Free parking", "Best value"],
    accent: false,
  },
  {
    name: "Peak Hour",
    when: "Evenings & weekends",
    price: "PKR 4,000",
    unit: "/ hour / court",
    points: ["Up to 4 players", "Prime floodlit slots", "Includes balls", "Most booked"],
    accent: true,
  },
  {
    name: "Late Night",
    when: "11 PM – 6 AM",
    price: "PKR 2,000",
    unit: "/ hour / court",
    points: ["The LTP Hustler special", "Quiet courts", "Includes balls", "For the night owls"],
    accent: false,
  },
];

const packages = [
  { name: "Starter Pack", detail: "5 hours of court time", price: "PKR 11,000" },
  { name: "Regular's Pack", detail: "10 hours + 1 group clinic", price: "PKR 22,000" },
  { name: "Monthly Membership", detail: "Unlimited off-peak + 4 peak hours", price: "PKR 18,000 / month" },
];

function Pricing() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Simple court rates. No surprises."
        lead="Pay by the hour or grab a pack. Group bookings welcome — bring your crew."
      />

      <section className="section-pad bg-background">
        <div className="container-x">
          <div className="grid gap-5 md:grid-cols-3">
            {tiers.map((t) => (
              <article
                key={t.name}
                className={`relative rounded-md border p-6 md:p-8 ${
                  t.accent
                    ? "border-court bg-court text-cream"
                    : "border-border bg-card text-charcoal"
                }`}
              >
                {t.accent && (
                  <span className="absolute -top-3 left-6 bg-lime px-2 py-0.5 text-xs font-bold uppercase tracking-widest text-charcoal">
                    Most popular
                  </span>
                )}
                <div className={`text-xs font-semibold uppercase tracking-widest ${t.accent ? "text-lime" : "text-muted-foreground"}`}>
                  {t.name}
                </div>
                <div className={`mt-1 text-sm ${t.accent ? "text-cream/70" : "text-muted-foreground"}`}>
                  {t.when}
                </div>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-extrabold">{t.price}</span>
                  <span className={`text-sm ${t.accent ? "text-cream/70" : "text-muted-foreground"}`}>{t.unit}</span>
                </div>
                <ul className="mt-6 space-y-2 text-sm">
                  {t.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${t.accent ? "text-lime" : "text-court"}`} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/booking"
                  className={`mt-7 inline-flex w-full justify-center ${t.accent ? "btn-accent" : "btn-primary"}`}
                >
                  Book this rate
                </Link>
              </article>
            ))}
          </div>

          {/* Packages */}
          <div className="mt-20">
            <div className="eyebrow">Packages & Memberships</div>
            <h2 className="mt-2 text-3xl md:text-4xl">Play more, pay less.</h2>
            <div className="mt-8 overflow-hidden rounded-md border border-border">
              <table className="w-full text-left">
                <thead className="bg-secondary">
                  <tr className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    <th className="px-6 py-4">Package</th>
                    <th className="px-6 py-4">What's included</th>
                    <th className="px-6 py-4 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {packages.map((p) => (
                    <tr key={p.name}>
                      <td className="px-6 py-5 font-display text-lg font-bold">{p.name}</td>
                      <td className="px-6 py-5 text-sm text-muted-foreground">{p.detail}</td>
                      <td className="px-6 py-5 text-right font-display text-lg font-bold text-court">{p.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Group bookings of 8+ players get 10% off any rate. Message us on WhatsApp to arrange.
            </p>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

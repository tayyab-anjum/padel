import { createFileRoute } from "@tanstack/react-router";
import { Phone, MapPin, Clock, MessageCircle, Instagram, Facebook } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — The Padel Range Faisalabad" },
      { name: "description", content: "Visit, call, or message The Padel Range. Canal Villas Rd, Gulshan e Iqbal Town, Faisalabad. Open 24 hours." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Find us. Call us. Come play."
        lead="Open 24 hours, every day of the week. The kettle's always on."
      />

      <section className="section-pad bg-background">
        <div className="container-x grid gap-10 lg:grid-cols-[3fr_2fr]">
          <div className="overflow-hidden rounded-md border border-border">
            <iframe
              title="The Padel Range location"
              src="https://www.google.com/maps?q=Canal+Villas+Road,+Gulshan+e+Iqbal+Town,+Faisalabad&output=embed"
              width="100%"
              height="500"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="space-y-4">
            <ContactCard
              icon={<MapPin className="h-5 w-5" />}
              title="Address"
              body={<>Canal Villas Rd, Gulshan e Iqbal Town,<br />Faisalabad, Pakistan</>}
            />
            <ContactCard
              icon={<Phone className="h-5 w-5" />}
              title="Phone"
              body={
                <a href="tel:+923277744474" className="font-display text-xl font-extrabold text-court">
                  0327 7744474
                </a>
              }
              action={
                <a href="tel:+923277744474" className="btn-outline mt-3 w-full">Call now</a>
              }
            />
            <ContactCard
              icon={<MessageCircle className="h-5 w-5" />}
              title="WhatsApp"
              body="Fastest way to book a court or ask a question."
              action={
                <a
                  href="https://wa.me/923277744474"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-accent mt-3 w-full"
                >
                  Chat on WhatsApp
                </a>
              }
            />
            <ContactCard
              icon={<Clock className="h-5 w-5" />}
              title="Hours"
              body={<>Open <strong>24 hours</strong>, every day. Floodlights on all night.</>}
            />
            <div className="rounded-md border border-border bg-card p-5">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Social</div>
              <div className="mt-3 flex gap-2">
                <a
                  href="https://instagram.com/thepadelrange"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="grid h-10 w-10 place-items-center rounded-md border border-border text-charcoal transition hover:bg-court hover:text-cream"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="grid h-10 w-10 place-items-center rounded-md border border-border text-charcoal transition hover:bg-court hover:text-cream"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="https://wa.me/923277744474"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="grid h-10 w-10 place-items-center rounded-md border border-border text-charcoal transition hover:bg-court hover:text-cream"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  icon, title, body, action,
}: { icon: React.ReactNode; title: string; body: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="rounded-md border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-md bg-court text-cream">{icon}</div>
        <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{title}</div>
      </div>
      <div className="mt-3 text-sm text-charcoal">{body}</div>
      {action}
    </div>
  );
}

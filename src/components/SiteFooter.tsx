import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Phone, MapPin, Clock, MessageCircle } from "lucide-react";

const quickLinks = [
  { to: "/courts", label: "Courts" },
  { to: "/coaching", label: "Coaching" },
  { to: "/pricing", label: "Pricing" },
  { to: "/community", label: "Community" },
  { to: "/gallery", label: "Gallery" },
  { to: "/booking", label: "Book a Court" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="container-x grid gap-10 py-16 md:grid-cols-3">
        <div>
          <div className="font-display text-2xl font-extrabold uppercase tracking-tight">
            The Padel <span className="text-lime">Range</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/70">
            Faisalabad's home for padel. Pro-grade courts, a coach who'll level you up, and a crew that
            actually shows up.
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href="https://instagram.com/thepadelrange"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="rounded-md border border-cream/20 p-2 transition hover:bg-lime hover:text-charcoal"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://wa.me/923277744474"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="rounded-md border border-cream/20 p-2 transition hover:bg-lime hover:text-charcoal"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="rounded-md border border-cream/20 p-2 transition hover:bg-lime hover:text-charcoal"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <div className="eyebrow text-lime">Quick Links</div>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-cream/80 hover:text-lime">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="eyebrow text-lime">Contact</div>
          <ul className="mt-4 space-y-3 text-sm text-cream/80">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
              <span>Canal Villas Rd, Gulshan e Iqbal Town, Faisalabad</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
              <a href="tel:+923277744474" className="hover:text-lime">0327 7744474</a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
              <span>Open 24 hours, every day</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-x flex flex-col items-start justify-between gap-2 py-5 text-xs text-cream/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} The Padel Range. All rights reserved.</p>
          <p>Built for the LTP Hustlers.</p>
        </div>
      </div>
    </footer>
  );
}

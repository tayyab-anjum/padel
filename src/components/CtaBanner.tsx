import { Link } from "@tanstack/react-router";

export function CtaBanner() {
  return (
    <section className="bg-court text-cream">
      <div className="container-x flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
        <div>
          <div className="eyebrow text-lime">Ready to play?</div>
          <h2 className="mt-2 text-4xl md:text-5xl">
            Book a court. <span className="text-lime">Bring the crew.</span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/booking" className="btn-accent">Book a Court</Link>
          <a href="https://wa.me/15551234567" target="_blank" rel="noreferrer" className="btn-outline border-cream text-cream hover:bg-cream hover:text-charcoal">
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}

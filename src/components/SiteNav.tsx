import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/courts", label: "Courts" },
  { to: "/coaching", label: "Coaching" },
  { to: "/pricing", label: "Pricing" },
  { to: "/community", label: "Community" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors ${
        scrolled ? "border-border bg-cream/95 backdrop-blur" : "border-transparent bg-cream"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="text-sm font-medium text-charcoal/70 transition-colors hover:text-charcoal data-[status=active]:text-court"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/booking" className="btn-accent hidden sm:inline-flex">
            Book Now
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-2 text-charcoal lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-cream lg:hidden">
          <nav className="container-x flex flex-col py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                className="border-b border-border/60 py-3 text-sm font-medium text-charcoal data-[status=active]:text-court"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/booking" onClick={() => setOpen(false)} className="btn-accent mt-3 sm:hidden">
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

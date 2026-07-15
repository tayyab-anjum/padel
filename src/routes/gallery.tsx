import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CtaBanner } from "@/components/CtaBanner";
import hero from "@/assets/hero-court.jpg";
import court1 from "@/assets/court-1.jpg";
import court2 from "@/assets/court-2.jpg";
import action1 from "@/assets/action-1.jpg";
import action2 from "@/assets/action-2.jpg";
import community from "@/assets/community.jpg";
import gear from "@/assets/gear.jpg";
import coach from "@/assets/coach.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Padel Hub" },
      { name: "description", content: "Court photos, action shots, and community moments." },
    ],
  }),
  component: Gallery,
});

const images = [
  { src: hero, span: "md:col-span-2 md:row-span-2", alt: "Indoor court at night" },
  { src: action1, span: "md:row-span-2", alt: "Player mid-swing" },
  { src: court2, span: "", alt: "Outdoor court golden hour" },
  { src: community, span: "", alt: "High five on court" },
  { src: coach, span: "md:row-span-2", alt: "Coach with student" },
  { src: gear, span: "", alt: "Padel rackets and balls" },
  { src: court1, span: "md:col-span-2", alt: "Empty indoor court" },
  { src: action2, span: "md:col-span-2", alt: "Group photo of regulars" },
];

function Gallery() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="The court. The crew. The rallies."
        lead="A scrapbook from the floodlights. Tap any image to zoom."
      />

      <section className="section-pad bg-background">
        <div className="container-x">
          <div className="grid auto-rows-[200px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(img.src)}
                className={`group relative overflow-hidden ${img.span}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute inset-0 bg-charcoal/0 transition-colors group-hover:bg-charcoal/20" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/90 p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-md p-2 text-cream hover:bg-cream/10"
          >
            <X className="h-6 w-6" />
          </button>
          <img src={active} alt="" className="max-h-[90vh] max-w-[95vw] object-contain" />
        </div>
      )}

      <CtaBanner />
    </>
  );
}

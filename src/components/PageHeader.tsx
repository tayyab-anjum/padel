export function PageHeader({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <section className="border-b border-border bg-cream">
      <div className="container-x py-16 md:py-24">
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="mt-3 max-w-3xl text-5xl md:text-6xl">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">{lead}</p>}
      </div>
    </section>
  );
}

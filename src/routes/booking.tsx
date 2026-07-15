import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Check, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book a Court — Padel Hub" },
      { name: "description", content: "Reserve a padel court. Quick form or booking page." },
    ],
  }),
  component: Booking,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  phone: z.string().trim().regex(/^[0-9+\s-]{7,20}$/, "Enter a valid phone number"),
  date: z.string().min(1, "Pick a date"),
  time: z.string().min(1, "Pick a time slot"),
  court: z.string().min(1, "Select a court"),
  players: z.string().min(1, "Select number of players"),
  notes: z.string().max(300).optional(),
});

type FormState = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormState, string>>;

const timeSlots = ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00", "00:00"];

function Booking() {
  const [form, setForm] = useState<FormState>({
    name: "", phone: "", date: "", time: "", court: "", players: "", notes: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Errors = {};
      for (const issue of result.error.issues) {
        const k = issue.path[0] as keyof FormState;
        fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setSubmitted(true);
  };

  return (
    <>
      <PageHeader
        eyebrow="Booking"
        title="Reserve your court."
        lead="Fill the form and we'll lock in your slot. Need it instant? Hit WhatsApp."
      />

      <section className="section-pad bg-background">
        <div className="container-x grid items-start gap-10 lg:grid-cols-[2fr_1fr]">
          {submitted ? (
            <div className="rounded-md border-2 border-court bg-card p-8 md:p-12">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-lime text-charcoal">
                <Check className="h-7 w-7" strokeWidth={3} />
              </div>
              <h2 className="mt-5 text-3xl md:text-4xl">Booking received.</h2>
              <p className="mt-3 max-w-md text-muted-foreground">
                Thanks {form.name.split(" ")[0]}! We've got your request for {form.date} at{" "}
                {form.time}. We'll WhatsApp you on <strong>{form.phone}</strong> to confirm within an
                hour.
              </p>
              <button
                type="button"
                className="btn-outline mt-7"
                onClick={() => {
                  setForm({ name: "", phone: "", date: "", time: "", court: "", players: "", notes: "" });
                  setSubmitted(false);
                }}
              >
                Book another
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="rounded-md border border-border bg-card p-6 md:p-10">
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Full name" error={errors.name}>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="field"
                    placeholder="Your name"
                  />
                </Field>
                <Field label="Phone number" error={errors.phone}>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="field"
                    placeholder="+1 (555) 123-4567"
                  />
                </Field>
                <Field label="Date" error={errors.date}>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => update("date", e.target.value)}
                    className="field"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </Field>
                <Field label="Time slot" error={errors.time}>
                  <select value={form.time} onChange={(e) => update("time", e.target.value)} className="field">
                    <option value="">Pick a time</option>
                    {timeSlots.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Court" error={errors.court}>
                  <select value={form.court} onChange={(e) => update("court", e.target.value)} className="field">
                    <option value="">Select court</option>
                    <option value="Indoor 1">Indoor Court 1</option>
                    <option value="Indoor 2">Indoor Court 2</option>
                    <option value="Outdoor 1">Outdoor Court 1</option>
                    <option value="Any">Any available</option>
                  </select>
                </Field>
                <Field label="Number of players" error={errors.players}>
                  <select value={form.players} onChange={(e) => update("players", e.target.value)} className="field">
                    <option value="">How many?</option>
                    <option value="2">2 players</option>
                    <option value="3">3 players</option>
                    <option value="4">4 players</option>
                  </select>
                </Field>
              </div>
              <Field label="Notes (optional)" error={errors.notes}>
                <textarea
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  className="field min-h-[90px] resize-y"
                  placeholder="Need rackets? Coaching? Tell us."
                  maxLength={300}
                />
              </Field>
              <button type="submit" className="btn-primary mt-6 w-full md:w-auto">
                Confirm Booking
              </button>
            </form>
          )}

          <aside className="rounded-md border border-border bg-secondary p-6 md:p-8">
            <div className="eyebrow">Faster?</div>
            <h3 className="mt-2 text-2xl">Quick book on WhatsApp</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Send us your preferred time and we'll lock it in instantly.
            </p>
            <a
              href="https://wa.me/15551234567?text=Hi%20Padel%20Hub%2C%20I%27d%20like%20to%20book%20a%20court."
              target="_blank"
              rel="noreferrer"
              className="btn-accent mt-5 w-full"
            >
              <MessageCircle className="h-4 w-4" /> Message us
            </a>
            <div className="mt-8 border-t border-border pt-6 text-sm">
              <div className="font-display text-base font-bold uppercase tracking-wider">Or call</div>
              <a href="tel:+15551234567" className="mt-1 block font-display text-2xl font-extrabold text-court">
                +1 (555) 123-4567
              </a>
              <p className="mt-2 text-muted-foreground">Phones answered 24 hours.</p>
            </div>
          </aside>
        </div>
      </section>

      <style>{`
        .field {
          width: 100%;
          background: var(--color-background);
          border: 1.5px solid var(--color-border);
          border-radius: 4px;
          padding: 0.65rem 0.85rem;
          font-size: 0.95rem;
          font-family: var(--font-sans);
          color: var(--color-foreground);
          transition: border-color 0.15s ease;
        }
        .field:focus {
          outline: none;
          border-color: var(--color-court);
        }
      `}</style>
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-widest text-charcoal">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

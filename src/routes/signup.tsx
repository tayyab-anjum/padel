import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [{ title: "Sign Up | The Padel Range" }],
  }),
  component: Signup,
});

function Signup() {
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await signUp(email, password, fullName);
    setLoading(false);
    if (error) {
      setError(error);
      return;
    }
    setDone(true);
  }

  return (
    <>
      <PageHeader
        eyebrow="Join the ladder"
        title="Create your account"
        lead="Sign up to join the ladder rankings, report match results, and climb the board."
      />
      <section className="section-pad bg-background">
        <div className="container-x max-w-md">
          {done ? (
            <div className="rounded-md border border-border bg-card p-6 text-center">
              <p className="text-lg font-medium">Check your email</p>
              <p className="mt-2 text-sm text-muted-foreground">
                We sent a confirmation link to {email}. Confirm it, then log in to join the ladder.
              </p>
              <Link to="/login" className="btn-primary mt-6 inline-flex">
                Go to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="fullName">Full name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1.5"
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? "Creating account…" : "Sign up"}
              </button>
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-court">
                  Log in
                </Link>
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

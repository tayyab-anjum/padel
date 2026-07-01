import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { Trophy } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CtaBanner } from "@/components/CtaBanner";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ladder")({
  head: () => ({
    meta: [
      { title: "Ladder Rankings | The Padel Range" },
      { name: "description", content: "Live ladder rankings for The Padel Range. Win a match, climb the board." },
    ],
  }),
  component: Ladder,
});

type LadderRow = {
  user_id: string;
  rank_position: number;
  wins: number;
  losses: number;
  profiles: { full_name: string } | null;
};

async function fetchLadder(): Promise<LadderRow[]> {
  const { data, error } = await supabase
    .from("ladder_players")
    .select("user_id, rank_position, wins, losses, profiles(full_name)")
    .order("rank_position", { ascending: true });
  if (error) throw error;
  return (data ?? []) as unknown as LadderRow[];
}

function Ladder() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: ladder, isLoading } = useQuery({ queryKey: ["ladder"], queryFn: fetchLadder });

  const [opponentId, setOpponentId] = useState("");
  const [result, setResult] = useState<"win" | "loss">("win");
  const [score, setScore] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);

  const opponents = (ladder ?? []).filter((row) => row.user_id !== user?.id);

  async function handleReportMatch(e: FormEvent) {
    e.preventDefault();
    if (!user || !opponentId) return;
    setSubmitting(true);
    setFormError(null);
    setFormSuccess(false);

    const winner_id = result === "win" ? user.id : opponentId;
    const loser_id = result === "win" ? opponentId : user.id;

    const { error } = await supabase.rpc("report_match", {
      p_winner_id: winner_id,
      p_loser_id: loser_id,
      p_score: score || null,
    });

    setSubmitting(false);
    if (error) {
      setFormError(error.message);
      return;
    }
    setFormSuccess(true);
    setScore("");
    queryClient.invalidateQueries({ queryKey: ["ladder"] });
  }

  return (
    <>
      <PageHeader
        eyebrow="Live rankings"
        title="The Ladder"
        lead="Beat someone ranked above you and you take their spot. Simple as that."
      />

      <section className="section-pad bg-background">
        <div className="container-x grid gap-10 lg:grid-cols-[3fr_2fr]">
          <div>
            <div className="overflow-hidden rounded-md border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-4 py-3 font-semibold">#</th>
                    <th className="px-4 py-3 font-semibold">Player</th>
                    <th className="px-4 py-3 font-semibold text-right">W</th>
                    <th className="px-4 py-3 font-semibold text-right">L</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center text-muted-foreground">
                        Loading ladder…
                      </td>
                    </tr>
                  )}
                  {!isLoading && (ladder ?? []).length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center text-muted-foreground">
                        Nobody's on the ladder yet — sign up to be #1.
                      </td>
                    </tr>
                  )}
                  {(ladder ?? []).map((row) => (
                    <tr
                      key={row.user_id}
                      className={cn(
                        "border-t border-border",
                        row.user_id === user?.id && "bg-lime/20",
                      )}
                    >
                      <td className="px-4 py-3 font-display text-lg">
                        {row.rank_position === 1 ? (
                          <span className="inline-flex items-center gap-1 text-court">
                            <Trophy className="h-4 w-4" /> 1
                          </span>
                        ) : (
                          row.rank_position
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {row.profiles?.full_name ?? "Unknown player"}
                        {row.user_id === user?.id && (
                          <span className="ml-2 text-xs text-muted-foreground">(you)</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">{row.wins}</td>
                      <td className="px-4 py-3 text-right">{row.losses}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div className="rounded-md border border-border bg-card p-6">
              <h2 className="text-2xl">Report a match</h2>
              {!user ? (
                <p className="mt-3 text-sm text-muted-foreground">
                  Log in to report match results and join the ladder.
                </p>
              ) : (
                <form onSubmit={handleReportMatch} className="mt-4 space-y-4">
                  <div>
                    <label className="text-sm font-medium">Opponent</label>
                    <select
                      value={opponentId}
                      onChange={(e) => setOpponentId(e.target.value)}
                      required
                      className="mt-1.5 flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
                    >
                      <option value="">Select opponent…</option>
                      {opponents.map((row) => (
                        <option key={row.user_id} value={row.user_id}>
                          {row.profiles?.full_name ?? "Unknown player"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Result</label>
                    <div className="mt-1.5 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setResult("win")}
                        className={cn("btn-outline flex-1", result === "win" && "bg-charcoal text-cream")}
                      >
                        I won
                      </button>
                      <button
                        type="button"
                        onClick={() => setResult("loss")}
                        className={cn("btn-outline flex-1", result === "loss" && "bg-charcoal text-cream")}
                      >
                        I lost
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Score (optional)</label>
                    <input
                      value={score}
                      onChange={(e) => setScore(e.target.value)}
                      placeholder="6-4, 6-2"
                      className="mt-1.5 flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm placeholder:text-muted-foreground"
                    />
                  </div>
                  {formError && <p className="text-sm text-destructive">{formError}</p>}
                  {formSuccess && <p className="text-sm text-court">Match reported — ladder updated.</p>}
                  <button type="submit" disabled={submitting} className="btn-primary w-full">
                    {submitting ? "Reporting…" : "Report match"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

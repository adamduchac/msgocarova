import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin_/login")({
  head: () => ({
    meta: [{ title: "Přihlášení do CMS – MŠ Josefa Gočára" }],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (mounted && data.session) {
        void navigate({ to: "/admin", replace: true });
      }
    });
    return () => {
      mounted = false;
    };
  }, [navigate]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (signInError) {
      setError("Nesprávný email nebo heslo.");
      setLoading(false);
      return;
    }
    await navigate({ to: "/admin", replace: true });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F1E8] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-black/5">
        <div className="mb-6 text-center">
          <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">MŠ Josefa Gočára</div>
          <h1 className="mt-2 text-2xl font-semibold text-foreground">Přihlášení do CMS</h1>
          <p className="mt-1 text-sm text-muted-foreground">Přístup pouze pro administrátory.</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
              Heslo
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Přihlašuji…" : "Přihlásit se"}
          </button>
        </form>
      </div>
    </div>
  );
}

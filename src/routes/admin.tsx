import { createFileRoute, Link, Outlet, useLocation, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, Megaphone, Users, FileText, GraduationCap, ClipboardList, LogOut } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Administrace – MŠ Josefa Gočára" }],
  }),
  component: AdminLayout,
});

type CheckState =
  | { status: "loading" }
  | { status: "unauthenticated" }
  | { status: "forbidden" }
  | { status: "ok"; user: User };

const NAV_ITEMS = [
  { to: "/admin", label: "Přehled", icon: LayoutDashboard, exact: true },
  { to: "/admin/zpravy", label: "Top zprávy", icon: Megaphone },
  { to: "/admin/zamestnanci", label: "Zaměstnanci", icon: Users },
  { to: "/admin/dokumenty", label: "Dokumenty", icon: FileText },
  { to: "/admin/predskolacek", label: "Předškoláček", icon: GraduationCap },
  { to: "/admin/zapis", label: "Zápis", icon: ClipboardList },
] as const;

function AdminLayout() {
  const navigate = useNavigate();
  const [state, setState] = useState<CheckState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function check() {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        if (!cancelled) setState({ status: "unauthenticated" });
        return;
      }
      const user = sessionData.session.user;
      const { data: roleRows, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (cancelled) return;
      if (error || !roleRows) {
        setState({ status: "forbidden" });
        return;
      }
      setState({ status: "ok", user });
    }

    void check();

    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") setState({ status: "unauthenticated" });
      if (event === "SIGNED_IN") void check();
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (state.status === "unauthenticated") {
      void navigate({ to: "/admin/login", replace: true });
    }
  }, [state.status, navigate]);

  if (state.status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F1E8]">
        <div className="text-sm text-muted-foreground">Načítám…</div>
      </div>
    );
  }

  if (state.status === "unauthenticated") {
    return null;
  }

  if (state.status === "forbidden") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F1E8] px-4">
        <div className="max-w-md text-center rounded-2xl bg-white p-8 shadow-sm border border-black/5">
          <h1 className="text-xl font-semibold">Nemáte přístup</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Tento účet nemá roli administrátora.
          </p>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              void navigate({ to: "/admin/login", replace: true });
            }}
            className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Odhlásit se
          </button>
        </div>
      </div>
    );
  }

  return <AdminShell user={state.user} onSignOut={async () => {
    await supabase.auth.signOut();
    void navigate({ to: "/admin/login", replace: true });
  }} />;
}

function AdminShell({ user, onSignOut }: { user: User; onSignOut: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex bg-[#F6F1E8]">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-black/5 bg-white flex flex-col">
        <div className="px-5 py-5 border-b border-black/5">
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">MŠ Josefa Gočára</div>
          <div className="mt-1 text-sm font-semibold text-foreground">CMS Administrace</div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const active = item.exact ? pathname === item.to : pathname === item.to || pathname.startsWith(item.to + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-primary/10 text-foreground font-medium"
                    : "text-muted-foreground hover:bg-black/5 hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-3 border-t border-black/5">
          <div className="px-3 py-2 text-xs text-muted-foreground truncate">{user.email}</div>
          <button
            onClick={onSignOut}
            className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-black/5 hover:text-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Odhlásit se
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}

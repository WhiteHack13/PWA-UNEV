import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="hover:opacity-90">
          <Logo />
        </Link>

        {user ? (
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-slate-600">
              {user.name ? user.name : user.email}
            </span>

            <Link
              to="/results"
              className={"rounded-xl px-3 py-2 text-sm font-semibold " + (loc.pathname.startsWith("/results")
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-800 hover:bg-slate-200")}
            >
              Resultados
            </Link>

            <button
              onClick={() => { logout(); nav("/login"); }}
              className="rounded-xl bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100"
            >
              Salir
            </button>
          </div>
        ) : (
          <div className="text-sm text-slate-500">Modo invitado</div>
        )}
      </div>
    </header>
  );
}

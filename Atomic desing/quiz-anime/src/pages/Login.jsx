import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import Toast from "../components/Toast";
import Logo from "../components/Logo";
import Goku from "../assets/goku.png";
export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("demo@anime.com");
  const [password, setPassword] = useState("demo1234");
  const [toast, setToast] = useState({ message: "", type: "info" });

  const show = (message, type="info") => {
    setToast({ message, type });
    window.clearTimeout(window.__aqp_toast);
    window.__aqp_toast = window.setTimeout(() => setToast({ message: "", type: "info" }), 2400);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email.trim(), password);
      show("Bienvenido 👀", "success");
      nav("/");
    } catch (err) {
      show(err.message || "Error al iniciar sesión", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-6">
          <Logo />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <div className="text-2xl font-extrabold tracking-tight">Iniciar sesión</div>

            <form className="mt-5 grid gap-3" onSubmit={onSubmit}>
              <label className="grid gap-1">
                <span className="text-sm font-semibold text-slate-700">Correo</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-900"
                  placeholder="tucorreo@dominio.com"
                  autoComplete="email"
                />
              </label>

              <label className="grid gap-1">
                <span className="text-sm font-semibold text-slate-700">Contraseña</span>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-900"
                  placeholder="••••••••"
                  type="password"
                  autoComplete="current-password"
                />
              </label>

              <button className="mt-2 rounded-2xl bg-slate-900 px-4 py-3 font-bold text-white hover:bg-slate-800">
                Entrar
              </button>

              <div className="text-sm text-slate-600">
                ¿No tienes cuenta?{" "}
                <Link className="font-bold text-slate-900 hover:underline" to="/register">
                  Regístrate
                </Link>
              </div>
            </form>
          </Card>

          <div className="flex justify-center items-center mx-auto">
              <img style={{ width: "350px", height: "400px" }} src={Goku} alt="goku kame hame ha" />
          </div>
        </div>
      </div>

      <Toast message={toast.message} type={toast.type} />
    </div>
  );
}

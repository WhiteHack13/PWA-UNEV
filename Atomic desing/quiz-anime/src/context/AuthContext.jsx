import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { clearSession, getSession, loginUser, registerUser } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = getSession();
    if (session) setUser(session);
  }, []);

  const api = useMemo(() => ({
    user,
    login: async (email, password) => {
      const u = loginUser({ email, password });
      setUser(u);
      return u;
    },
    register: async (name, email, password) => {
      const u = registerUser({ name, email, password });
      setUser(u);
      return u;
    },
    logout: () => {
      clearSession();
      setUser(null);
    }
  }), [user]);

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvide");
  return ctx;
}

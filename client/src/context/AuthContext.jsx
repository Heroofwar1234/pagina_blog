import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  function checkSession() {
    fetch("http://localhost:8000/session-info", { credentials: "include" })
      .then(res => res.json())
      .then(data => setIsAuth(!!data.id_author))
      .catch(() => setIsAuth(false));
  }

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, checkSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, hasFirebaseConfig } from '../firebase/config';
import { localAuth } from '../firebase/localAuth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let unsub;
    if (hasFirebaseConfig && auth) {
      unsub = onAuthStateChanged(auth, (u) => { setUsuario(u); setCargando(false); });
    } else {
      unsub = localAuth.onAuthStateChanged((u) => { setUsuario(u); setCargando(false); });
    }
    return unsub;
  }, []);

  return <AuthContext.Provider value={{ usuario, cargando }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth fuera de AuthProvider');
  return ctx;
}

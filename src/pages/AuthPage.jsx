import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';

export default function AuthPage() {
  const { usuario, cargando } = useAuth();
  const [modoReg, setModoReg] = useState(false);

  if (cargando) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="animate-spin h-10 w-10 border-4 border-violet-500 border-t-transparent rounded-full" />
    </div>
  );

  if (usuario) return <Navigate to="/quest" replace />;

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
      {/* Fondo decorativo */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 -left-48 w-96 h-96 bg-violet-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-pink-600/8 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-block">
            <span className="text-4xl font-black bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              🎮 Excel Quest
            </span>
          </a>
          <p className="text-slate-500 text-sm mt-2 font-mono">PORTAL DE HÉROES</p>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 shadow-2xl shadow-violet-500/5"
        >
          {/* Tabs */}
          <div className="flex bg-slate-800/60 rounded-xl p-1 mb-6">
            {[['login', '⚔️ Iniciar sesión', false], ['registro', '🚀 Registrarse', true]].map(([id, label, isReg]) => (
              <button
                key={id}
                id={`tab-${id}`}
                onClick={() => setModoReg(isReg)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all font-mono ${
                  modoReg === isReg
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {modoReg ? (
            <RegisterForm onToggle={() => setModoReg(false)} />
          ) : (
            <LoginForm onToggle={() => setModoReg(true)} />
          )}
        </motion.div>

        <p className="text-center mt-6 text-slate-600 text-sm">
          <a href="/" className="hover:text-slate-400 transition-colors">← Volver al inicio</a>
        </p>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CLAVE_DOCENTE = '2228';

/**
 * Modal de acceso docente con clave de verificación.
 * @param {function} onAcceso - Callback al ingresar correctamente
 * @param {function} onCerrar - Callback al cancelar
 */
export default function TeacherAuthModal({ onAcceso, onCerrar }) {
  const [clave, setClave] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (clave === CLAVE_DOCENTE) {
      onAcceso();
    } else {
      setError(true);
      setShake(true);
      setClave('');
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
        onClick={(e) => e.target === e.currentTarget && onCerrar()}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: shake ? [1, 1.02, 0.98, 1.02, 1] : 1, opacity: 1, y: 0 }}
          transition={{ duration: shake ? 0.4 : 0.3 }}
          className="bg-slate-900 border border-slate-700 rounded-3xl p-8 w-full max-w-sm shadow-2xl shadow-violet-500/10"
        >
          {/* Ícono */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-500/20 border border-violet-500/40 mb-3">
              <span className="text-3xl">🎓</span>
            </div>
            <h2 className="text-white text-xl font-black">Ingreso Docente</h2>
            <p className="text-slate-400 text-sm mt-1">Ingresá la clave de acceso al panel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-400 text-xs font-mono mb-2 tracking-wider">CLAVE DE ACCESO</label>
              <input
                id="input-clave-docente"
                type="password"
                value={clave}
                onChange={(e) => { setClave(e.target.value); setError(false); }}
                placeholder="••••"
                autoFocus
                className={`w-full px-4 py-3 rounded-xl bg-slate-800 border text-white text-center text-2xl tracking-[0.5em] font-mono placeholder-slate-600
                  focus:outline-none focus:ring-2 transition-all
                  ${error
                    ? 'border-red-500 focus:ring-red-500/30'
                    : 'border-slate-600 focus:border-violet-500 focus:ring-violet-500/30'
                  }`}
              />
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-400 text-xs text-center mt-2"
                  >
                    ❌ Clave incorrecta. Intentá de nuevo.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <button
              id="btn-ingresar-docente"
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white transition-all shadow-lg shadow-violet-500/20 active:scale-[0.98]"
            >
              🎓 Ingresar al Panel
            </button>
            <button
              type="button"
              onClick={onCerrar}
              className="w-full py-3 rounded-xl text-sm text-slate-500 hover:text-slate-300 transition-colors"
            >
              Cancelar
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

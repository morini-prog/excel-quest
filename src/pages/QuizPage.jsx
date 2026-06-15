import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { misiones } from '../data/missions';
import { calcularScorecard } from '../utils/scoring';
import { guardarScorecard } from '../firebase/firestore';
import MisionCard from '../components/Quiz/MisionCard';
import XPBar from '../components/Quiz/XPBar';
import { cerrarSesion } from '../firebase/auth';

export default function QuizPage() {
  const { usuario, cargando } = useAuth();
  const navigate = useNavigate();
  const [indice, setIndice] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [streak, setStreak] = useState(0);
  const [guardando, setGuardando] = useState(false);

  if (cargando) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="animate-spin h-10 w-10 border-4 border-violet-500 border-t-transparent rounded-full" />
    </div>
  );
  if (!usuario) return <Navigate to="/auth" replace />;

  const misionActual = misiones[indice];
  const total = misiones.length;
  const esUltima = indice >= total - 1;

  const handleResponder = async (opcionIdx) => {
    const esCorrecta = opcionIdx === misionActual.correcta;
    const nuevoStreak = esCorrecta ? streak + 1 : 0;
    setStreak(nuevoStreak);

    const nuevasRespuestas = [...respuestas, opcionIdx];
    setRespuestas(nuevasRespuestas);

    if (!esUltima) {
      setIndice((p) => p + 1);
      return;
    }

    // Última misión — calcular y guardar
    setGuardando(true);
    const scorecard = calcularScorecard(nuevasRespuestas);

    const partes = (usuario.displayName || '').split(' ');
    const nombre = usuario.nombre || partes[0] || '';
    const apellido = usuario.apellido || partes.slice(1).join(' ') || '';

    try {
      await guardarScorecard({
        uid: usuario.uid,
        nombre,
        apellido,
        email: usuario.email,
        porcentaje: scorecard.porcentaje,
        correctas: scorecard.correctas,
        incorrectas: scorecard.incorrectas,
        total: scorecard.total,
        rango: { rank: scorecard.rango.rank, nombre: scorecard.rango.nombre, emoji: scorecard.rango.emoji },
        statsPorNivel: scorecard.statsPorNivel,
        indicesCorrectos: scorecard.indicesCorrectos,
        indicesIncorrectos: scorecard.indicesIncorrectos,
      });
    } catch (err) {
      console.error('Error guardando scorecard:', err);
    }

    navigate('/scorecard', { state: { scorecard, nombre, apellido, email: usuario.email } });
  };

  if (guardando) return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="h-14 w-14 border-4 border-violet-500 border-t-transparent rounded-full"
      />
      <p className="text-slate-300 text-lg font-mono">Calculando tu destino...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-3 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-30">
        <span className="font-black text-lg bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
          🎮 Excel Quest
        </span>
        <div className="flex items-center gap-3">
          <span className="text-slate-400 text-sm hidden sm:block">
            {(usuario.displayName || usuario.email || '').split(' ')[0]}
          </span>
          <button onClick={async () => { await cerrarSesion(); navigate('/'); }} className="text-slate-600 hover:text-slate-400 text-xs transition-colors">
            Salir
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-8">
        <div className="w-full max-w-2xl space-y-6">
          {/* Barra XP */}
          <XPBar actual={indice + 1} total={total} nivel={misionActual.nivel} streak={streak} />

          {/* Card de misión */}
          <div className="bg-slate-900/80 border border-slate-700/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-violet-500/5">
            <MisionCard
              key={indice}
              mision={misionActual}
              onResponder={handleResponder}
              index={indice}
            />
          </div>

          {/* Contador */}
          <p className="text-center text-slate-700 text-xs font-mono">
            {total - indice - 1} misiones restantes en el quest
          </p>
        </div>
      </main>
    </div>
  );
}

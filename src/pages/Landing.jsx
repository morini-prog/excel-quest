import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TeacherAuthModal from '../components/UI/TeacherAuthModal';

const ZONAS = [
  { nivel: 'Inicial', emoji: '⚔️', color: 'text-sky-400', border: 'border-sky-500/30', bg: 'bg-sky-500/10', desc: 'Calabozos del Principiante' },
  { nivel: 'Básico', emoji: '🛡️', color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', desc: 'Cavernas del Conocimiento' },
  { nivel: 'Intermedio', emoji: '🔥', color: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/10', desc: 'Templo de las Fórmulas' },
  { nivel: 'Avanzado', emoji: '⚡', color: 'text-violet-400', border: 'border-violet-500/30', bg: 'bg-violet-500/10', desc: 'Ciudadela de los Avanzados' },
  { nivel: 'Experto', emoji: '👑', color: 'text-rose-400', border: 'border-rose-500/30', bg: 'bg-rose-500/10', desc: 'Olimpo de los Expertos' },
];

const RANGOS_PREVIEW = [
  { rank: 1, emoji: '💀', nombre: 'Desconocedor', pct: '0–14%', color: '#6b7280' },
  { rank: 2, emoji: '🌱', nombre: 'Novato', pct: '15–29%', color: '#22c55e' },
  { rank: 3, emoji: '⚔️', nombre: 'Aprendiz', pct: '30–44%', color: '#3b82f6' },
  { rank: 4, emoji: '🛡️', nombre: 'Practicante', pct: '45–59%', color: '#a855f7' },
  { rank: 5, emoji: '🔥', nombre: 'Avanzado', pct: '60–74%', color: '#f97316' },
  { rank: 6, emoji: '⚡', nombre: 'Maestro Fórmulas', pct: '75–89%', color: '#eab308' },
  { rank: 7, emoji: '👑', nombre: 'Experto Excel', pct: '90–100%', color: '#ec4899' },
];

export default function Landing() {
  const navigate = useNavigate();
  const [showTeacherModal, setShowTeacherModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Fondo animado */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-3/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-600/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* HEADER con botón Ingreso Docente */}
      <header className="relative flex items-center justify-between px-4 sm:px-8 py-4 border-b border-slate-800/40">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎮</span>
          <span className="font-black text-xl bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
            Excel Quest
          </span>
        </div>
        <button
          id="btn-ingreso-docente"
          onClick={() => setShowTeacherModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-violet-500/40 bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 hover:border-violet-400 transition-all text-sm font-bold"
        >
          🎓 Ingreso Docente
        </button>
      </header>

      <div className="relative max-w-5xl mx-auto px-4 py-12 space-y-20">

        {/* ── HERO ── */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 rounded-full px-4 py-1.5 mb-6">
            <span className="text-violet-400 text-sm font-bold font-mono">🕹️ DIAGNÓSTICO ÉPICO DE EXCEL</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-black mb-4 leading-tight">
            ¿Sos un{' '}
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
              Maestro
            </span>
            {' '}de Excel?
          </h1>

          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Enfrentá <strong className="text-white">25 misiones épicas</strong> en 5 zonas de combate.
            Descubrí tu <strong className="text-white">rango verdadero</strong> entre 7 niveles de poder
            y obtené tu <strong className="text-white">Gaming Scorecard</strong> personalizada.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              id="btn-comenzar-quest"
              onClick={() => navigate('/auth')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="relative px-10 py-5 rounded-2xl font-black text-lg bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-shadow overflow-hidden group"
            >
              <span className="relative z-10">🚀 ¡Comenzar Quest!</span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity" />
            </motion.button>
            <div className="text-slate-500 text-sm font-mono">Sin costo · ~10 min · 25 misiones</div>
          </div>
        </motion.section>

        {/* ── ZONAS ── */}
        <section>
          <h2 className="text-2xl font-black text-center mb-8">
            🗺️ Las 5 Zonas de Combate
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {ZONAS.map((z, i) => (
              <motion.div
                key={z.nivel}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`${z.bg} border ${z.border} rounded-2xl p-4 text-center hover:scale-105 transition-transform`}
              >
                <div className="text-4xl mb-2">{z.emoji}</div>
                <div className={`font-black text-sm ${z.color}`}>{z.nivel}</div>
                <div className="text-slate-500 text-xs mt-1">{z.desc}</div>
                <div className="text-slate-600 text-[10px] font-mono mt-2">5 misiones</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── SISTEMA DE RANGOS ── */}
        <section>
          <h2 className="text-2xl font-black text-center mb-8">
            🏆 Sistema de Rangos (7 niveles)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-7 gap-2">
            {RANGOS_PREVIEW.map((r, i) => (
              <motion.div
                key={r.rank}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 }}
                className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-3 text-center hover:scale-105 transition-transform"
                style={{ borderColor: `${r.color}30` }}
              >
                <div className="text-2xl mb-1">{r.emoji}</div>
                <div className="text-[11px] font-bold" style={{ color: r.color }}>{r.nombre}</div>
                <div className="text-slate-600 text-[9px] font-mono mt-1">{r.pct}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-slate-700 text-sm pb-4">
          <p>Excel Quest · Diagnóstico gamificado de habilidades · Desarrollado en Argentina 🇦🇷</p>
        </footer>
      </div>

      {/* Modal Docente */}
      {showTeacherModal && (
        <TeacherAuthModal
          onAcceso={() => { setShowTeacherModal(false); navigate('/docente'); }}
          onCerrar={() => setShowTeacherModal(false)}
        />
      )}
    </div>
  );
}

import { motion } from 'framer-motion';

/**
 * Barra de XP / progreso gamificada con animación de llenado.
 */
export default function XPBar({ actual, total, nivel, streak }) {
  const pct = Math.round(((actual - 1) / total) * 100);

  const zoneColors = {
    Inicial: { bar: 'from-sky-500 to-blue-600', text: 'text-sky-400', border: 'border-sky-500/40' },
    Básico: { bar: 'from-emerald-500 to-green-600', text: 'text-emerald-400', border: 'border-emerald-500/40' },
    Intermedio: { bar: 'from-amber-500 to-orange-500', text: 'text-amber-400', border: 'border-amber-500/40' },
    Avanzado: { bar: 'from-violet-500 to-purple-600', text: 'text-violet-400', border: 'border-violet-500/40' },
    Experto: { bar: 'from-rose-500 to-pink-600', text: 'text-rose-400', border: 'border-rose-500/40' },
  };
  const c = zoneColors[nivel] || zoneColors.Inicial;

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        {/* Misión actual */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-xs font-mono">MISIÓN</span>
          <span className="text-white font-black text-lg font-mono">{String(actual).padStart(2, '0')}</span>
          <span className="text-slate-600 text-xs font-mono">/ {String(total).padStart(2, '0')}</span>
        </div>

        {/* Racha */}
        {streak > 0 && (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1 bg-orange-500/20 border border-orange-500/40 rounded-full px-3 py-1"
          >
            <span className="text-orange-400 text-xs font-bold">🔥 RACHA ×{streak}</span>
          </motion.div>
        )}

        {/* Zona actual */}
        <div className={`text-xs font-bold px-2 py-1 rounded-full border ${c.border} ${c.text} bg-black/30`}>
          ZONA: {nivel.toUpperCase()}
        </div>
      </div>

      {/* Barra XP */}
      <div className="relative h-3 bg-slate-800 rounded-full border border-slate-700 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${c.bar} relative`}
        >
          {/* Efecto brillo */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full" />
        </motion.div>
        {/* Marcadores de zona (cada 20%) */}
        {[20, 40, 60, 80].map((mark) => (
          <div
            key={mark}
            className="absolute top-0 bottom-0 w-px bg-slate-600/50"
            style={{ left: `${mark}%` }}
          />
        ))}
      </div>

      {/* Etiquetas de zonas */}
      <div className="flex justify-between text-[9px] font-mono text-slate-600">
        {['INICIAL', 'BÁSICO', 'INTER.', 'AVANZ.', 'EXPERTO'].map((z) => (
          <span key={z}>{z}</span>
        ))}
      </div>
    </div>
  );
}

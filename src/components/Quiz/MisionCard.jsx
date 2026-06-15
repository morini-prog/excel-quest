import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LETRAS = ['A', 'B', 'C', 'D'];

const zoneStyles = {
  Inicial: 'border-sky-500/40 hover:border-sky-400',
  Básico: 'border-emerald-500/40 hover:border-emerald-400',
  Intermedio: 'border-amber-500/40 hover:border-amber-400',
  Avanzado: 'border-violet-500/40 hover:border-violet-400',
  Experto: 'border-rose-500/40 hover:border-rose-400',
};

const selectedStyles = {
  Inicial: 'border-sky-400 bg-sky-500/20',
  Básico: 'border-emerald-400 bg-emerald-500/20',
  Intermedio: 'border-amber-400 bg-amber-500/20',
  Avanzado: 'border-violet-400 bg-violet-500/20',
  Experto: 'border-rose-400 bg-rose-500/20',
};

const badgeStyles = {
  Inicial: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
  Básico: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  Intermedio: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Avanzado: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  Experto: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
};

/**
 * Tarjeta de misión gamificada con opciones seleccionables y feedback visual.
 */
export default function MisionCard({ mision, onResponder, index }) {
  const [seleccionada, setSeleccionada] = useState(null);

  const handleOpcion = (i) => {
    if (seleccionada !== null) return;
    setSeleccionada(i);
    setTimeout(() => { setSeleccionada(null); onResponder(i); }, 350);
  };

  const zoneBase = zoneStyles[mision.nivel] || zoneStyles.Inicial;
  const zoneSelected = selectedStyles[mision.nivel] || selectedStyles.Inicial;
  const badge = badgeStyles[mision.nivel] || badgeStyles.Inicial;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Cabecera de misión */}
        <div className="mb-4 flex items-start gap-3">
          <div className={`inline-flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full border ${badge}`}>
            {mision.mision}
          </div>
          <span className="text-slate-600 text-xs mt-1 font-mono">{mision.categoria}</span>
        </div>

        {/* Pregunta */}
        <h2 className="text-white text-lg sm:text-xl font-bold leading-relaxed mb-6">
          {mision.pregunta}
        </h2>

        {/* Opciones */}
        <div className="space-y-3">
          {mision.opciones.map((op, i) => {
            const esSelec = seleccionada === i;
            return (
              <motion.button
                key={i}
                onClick={() => handleOpcion(i)}
                id={`opcion-${index}-${i}`}
                whileHover={{ scale: 1.015, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full text-left flex items-start gap-3 px-4 py-4 rounded-xl border transition-all duration-200 font-mono
                  ${esSelec ? zoneSelected : `bg-slate-900/60 ${zoneBase} border border-slate-700`}
                `}
              >
                <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black border transition-colors
                  ${esSelec ? 'bg-white text-slate-900 border-white' : 'border-slate-600 text-slate-400'}
                `}>
                  {LETRAS[i]}
                </span>
                <span className={`text-sm leading-relaxed ${esSelec ? 'text-white font-semibold' : 'text-slate-300'}`}>
                  {op}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Pista */}
        <div className="mt-4 flex items-center gap-2 text-slate-600 text-xs">
          <span>💡</span>
          <span className="italic">{mision.pista}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip,
} from 'recharts';
import { statsParaRadar, formatearFecha } from '../../utils/scoring';
import { questsDeMejora, NIVELES } from '../../data/missions';

/**
 * La "Tarjeta de Puntos" — Gaming Scorecard épica.
 * Muestra el resultado completo con radar chart y quests de mejora.
 */
export default function GamingScorecard({ scorecard, jugador, onNuevoQuest }) {
  const cardRef = useRef(null);
  const { porcentaje, rango, correctas, incorrectas, total, statsPorNivel } = scorecard;
  const radarData = statsParaRadar(statsPorNivel);

  const displayName = jugador?.displayName || jugador?.nombre
    ? `${jugador.nombre || ''} ${jugador.apellido || ''}`.trim()
    : jugador?.email?.split('@')[0] || 'Jugador';

  // Quests de mejora: los niveles con <60% necesitan más práctica
  const questsRecomendados = NIVELES.filter(
    (n) => (statsPorNivel[n]?.porcentaje ?? 0) < 60
  ).flatMap((n) => questsDeMejora[n] || []).slice(0, 6);

  const handleDownload = useCallback(() => {
    // Copiar texto del scorecard al portapapeles como fallback
    const texto = [
      '🎮 EXCEL QUEST — TARJETA DE PUNTOS',
      '═══════════════════════════════',
      `👤 Jugador: ${displayName}`,
      `📅 Fecha: ${new Date().toLocaleDateString('es-AR')}`,
      `🏆 Rango: ${rango.emoji} ${rango.nombre}`,
      `📊 Puntaje: ${porcentaje}% (${correctas}/${total})`,
      '───────────────────────────────',
      'RENDIMIENTO POR ZONA:',
      ...NIVELES.map((n) => `  ${n}: ${statsPorNivel[n]?.porcentaje ?? 0}%`),
      '───────────────────────────────',
      'Generado en: excel-quest.netlify.app',
    ].join('\n');
    navigator.clipboard.writeText(texto).catch(() => {});
    alert('📋 ¡Scorecard copiado al portapapeles!');
  }, [displayName, rango, porcentaje, correctas, total, statsPorNivel]);

  const coloresNivel = {
    Inicial: '#38bdf8',
    Básico: '#4ade80',
    Intermedio: '#fb923c',
    Avanzado: '#c084fc',
    Experto: '#f472b6',
  };

  return (
    <div ref={cardRef} className="w-full max-w-3xl mx-auto space-y-6">

      {/* ── CABECERA — RANGO Y PUNTUACIÓN ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${rango.gradiente} p-1`}
      >
        <div className="rounded-[22px] bg-slate-950/90 backdrop-blur-sm p-6 sm:p-8">
          {/* Decoración de fondo */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br ${rango.gradiente} opacity-10 blur-3xl`} />
            <div className="absolute top-2 right-4 text-[80px] opacity-10 select-none">{rango.emoji}</div>
          </div>

          <div className="relative flex flex-col sm:flex-row items-center gap-6">
            {/* Badge de rango */}
            <div className="flex-shrink-0 text-center">
              <div className={`relative w-32 h-32 rounded-2xl bg-gradient-to-br ${rango.gradiente} p-0.5 ${rango.glow} shadow-2xl`}>
                <div className="w-full h-full rounded-[14px] bg-slate-950 flex flex-col items-center justify-center">
                  <span className="text-5xl">{rango.emoji}</span>
                  <span className="text-white text-xs font-bold mt-1 font-mono">RANK {rango.rank}</span>
                </div>
              </div>
            </div>

            {/* Info del jugador */}
            <div className="flex-1 text-center sm:text-left">
              <div className="text-slate-400 text-xs font-mono mb-1 tracking-widest">🎮 TARJETA DE PUNTOS</div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">{displayName}</h1>
              <div className="text-slate-400 text-sm mb-3 font-mono">{new Date().toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' })}</div>

              {/* Rango */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${rango.gradiente} shadow-lg`}>
                <span className="text-white font-black text-lg">{rango.nombre}</span>
              </div>
            </div>

            {/* Puntaje circular */}
            <div className="flex-shrink-0 text-center">
              <div className={`w-28 h-28 rounded-full bg-gradient-to-br ${rango.gradiente} p-1 ${rango.glow} shadow-2xl`}>
                <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-white font-mono">{porcentaje}%</span>
                  <span className="text-slate-400 text-[10px] font-mono">{correctas}/{total}</span>
                </div>
              </div>
              <div className="text-slate-500 text-[10px] font-mono mt-2">PUNTAJE FINAL</div>
            </div>
          </div>

          {/* Descripción del rango */}
          <div className="relative mt-4 border-t border-white/10 pt-4 text-center text-slate-400 italic text-sm">
            "{rango.descripcion}"
          </div>
        </div>
      </motion.div>

      {/* ── STATS GRID ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="grid grid-cols-3 gap-3"
      >
        {[
          { label: 'CORRECTAS', value: correctas, color: 'text-emerald-400', icon: '✅' },
          { label: 'INCORRECTAS', value: incorrectas, color: 'text-rose-400', icon: '❌' },
          { label: 'RANGO', value: `#${rango.rank}`, color: 'text-white', icon: rango.emoji },
        ].map((stat) => (
          <div key={stat.label} className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-4 text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className={`text-2xl font-black font-mono ${stat.color}`}>{stat.value}</div>
            <div className="text-slate-500 text-[9px] font-mono mt-1">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* ── RADAR CHART — STATS POR ZONA ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="bg-slate-900/80 border border-slate-700/50 rounded-3xl p-6"
      >
        <h3 className="text-white font-bold text-lg mb-1 flex items-center gap-2">
          📡 <span>Mapa de Habilidades</span>
        </h3>
        <p className="text-slate-500 text-xs font-mono mb-4">RENDIMIENTO POR ZONA DE COMBATE</p>

        {/* Gráfico radar */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis
                dataKey="nivel"
                tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: '#475569', fontSize: 9 }}
                tickCount={4}
              />
              <Radar
                name="Rendimiento"
                dataKey="valor"
                stroke={rango.color}
                fill={rango.color}
                fillOpacity={0.25}
                strokeWidth={2}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: 12 }}
                formatter={(v) => [`${v}%`, 'Rendimiento']}
                labelStyle={{ color: '#94a3b8' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Barras por nivel */}
        <div className="mt-4 space-y-2">
          {NIVELES.map((n) => {
            const pct = statsPorNivel[n]?.porcentaje ?? 0;
            return (
              <div key={n} className="flex items-center gap-3">
                <span className="text-slate-400 text-xs w-24 flex-shrink-0 font-mono">{n}</span>
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: coloresNivel[n] }}
                  />
                </div>
                <span className="text-slate-300 text-xs font-mono w-10 text-right">{pct}%</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* ── QUESTS DE MEJORA ── */}
      {questsRecomendados.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="bg-slate-900/80 border border-slate-700/50 rounded-3xl p-6"
        >
          <h3 className="text-white font-bold text-lg mb-1 flex items-center gap-2">
            🗺️ <span>Quests para Subir de Nivel</span>
          </h3>
          <p className="text-slate-500 text-xs font-mono mb-4">MISIONES DE MEJORA PERSONALIZADAS</p>
          <div className="space-y-3">
            {questsRecomendados.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="flex items-start gap-3 bg-slate-800/60 border border-slate-700 rounded-xl p-4"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-violet-400 text-xs font-black">{i + 1}</span>
                <div>
                  <div className="text-white text-sm font-bold mb-0.5">{q.titulo}</div>
                  <div className="text-slate-400 text-xs leading-relaxed">{q.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── ACCIONES ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <button
          id="btn-nuevo-quest"
          onClick={onNuevoQuest}
          className="flex-1 py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white transition-all shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 active:scale-[0.98]"
        >
          🎮 Nuevo Quest
        </button>
        <button
          id="btn-descargar-scorecard"
          onClick={handleDownload}
          className="flex-1 py-4 rounded-2xl font-bold text-sm border border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white transition-all active:scale-[0.98]"
        >
          📋 Copiar Scorecard
        </button>
      </motion.div>
    </div>
  );
}

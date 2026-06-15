import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
} from 'recharts';
import { localStore } from '../firebase/localStore';
import { obtenerTodosLosResultados } from '../firebase/firestore';
import { hasFirebaseConfig } from '../firebase/config';
import { RANGOS, NIVELES, obtenerRango } from '../data/missions';
import { onSnapshot, collection, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';

const REFRESH_MS = 3000; // polling interval para modo demo

/**
 * Determina el color de la barra según el porcentaje.
 */
function colorPorPct(pct) {
  if (pct >= 90) return '#ec4899';
  if (pct >= 75) return '#eab308';
  if (pct >= 60) return '#f97316';
  if (pct >= 45) return '#a855f7';
  if (pct >= 30) return '#3b82f6';
  if (pct >= 15) return '#22c55e';
  return '#6b7280';
}

/**
 * Panel Docente con actualización en tiempo real.
 * Firebase: usa onSnapshot. Demo: polling cada 3 segundos.
 */
export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [scorecards, setScorecards] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null);
  const [vistaActiva, setVistaActiva] = useState('tabla'); // 'tabla' | 'graficos'
  const [busqueda, setBusqueda] = useState('');
  const [ordenPor, setOrdenPor] = useState('fecha'); // 'fecha' | 'pct' | 'nombre'

  const cargarDatos = useCallback(async () => {
    try {
      const datos = hasFirebaseConfig
        ? await obtenerTodosLosResultados()
        : localStore.obtenerTodos();
      setScorecards(datos);
      setUltimaActualizacion(new Date());
    } catch (err) {
      console.error('Error al cargar scorecards:', err);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    if (hasFirebaseConfig && db) {
      // Real-time con Firestore onSnapshot
      const q = query(collection(db, 'scorecards'), orderBy('fecha', 'desc'));
      const unsub = onSnapshot(q, (snap) => {
        setScorecards(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setUltimaActualizacion(new Date());
        setCargando(false);
      });
      return unsub;
    } else {
      // Modo demo: polling cada REFRESH_MS
      cargarDatos();
      const interval = setInterval(() => {
        setScorecards(localStore.obtenerTodos());
        setUltimaActualizacion(new Date());
      }, REFRESH_MS);
      return () => clearInterval(interval);
    }
  }, [cargarDatos]);

  // ── Filtrado y ordenamiento ──
  const filtered = scorecards
    .filter((s) => {
      if (!busqueda) return true;
      const q = busqueda.toLowerCase();
      return (
        (s.nombre || '').toLowerCase().includes(q) ||
        (s.apellido || '').toLowerCase().includes(q) ||
        (s.email || '').toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (ordenPor === 'pct') return (b.porcentaje ?? 0) - (a.porcentaje ?? 0);
      if (ordenPor === 'nombre') return `${a.nombre} ${a.apellido}`.localeCompare(`${b.nombre} ${b.apellido}`);
      // fecha (default): más reciente primero
      const fa = a.fecha?.toDate ? a.fecha.toDate() : new Date(a.fechaISO || 0);
      const fb = b.fecha?.toDate ? b.fecha.toDate() : new Date(b.fechaISO || 0);
      return fb - fa;
    });

  // ── Estadísticas globales ──
  const totalAlumnos = new Set(scorecards.map((s) => s.uid)).size;
  const totalIntentos = scorecards.length;
  const promedioPct = scorecards.length
    ? Math.round(scorecards.reduce((acc, s) => acc + (s.porcentaje ?? 0), 0) / scorecards.length)
    : 0;

  // Distribución de rangos para gráfico de barras
  const distRangos = RANGOS.map((r) => ({
    nombre: r.nombre.split(' ')[0],
    emoji: r.emoji,
    cantidad: scorecards.filter((s) => {
      const pct = s.porcentaje ?? 0;
      return pct >= r.min && pct <= r.max;
    }).length,
    color: r.color,
  }));

  // Promedio por nivel para radar
  const promedioNivel = NIVELES.map((nivel) => {
    const valores = scorecards
      .filter((s) => s.statsPorNivel?.[nivel] != null)
      .map((s) => s.statsPorNivel[nivel].porcentaje ?? 0);
    return {
      nivel: nivel.slice(0, 5),
      valor: valores.length ? Math.round(valores.reduce((a, b) => a + b, 0) / valores.length) : 0,
    };
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-sm border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎓</span>
            <div>
              <h1 className="text-white font-black text-lg leading-none">Panel Docente</h1>
              <p className="text-slate-500 text-xs font-mono">Excel Quest — Seguimiento en tiempo real</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Indicador de actualización */}
            <div className="hidden sm:flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-xs font-mono">
                {hasFirebaseConfig ? 'TIEMPO REAL' : `DEMO · ${REFRESH_MS / 1000}s`}
              </span>
            </div>
            {ultimaActualizacion && (
              <span className="text-slate-600 text-xs font-mono hidden sm:block">
                Última actualiz.: {ultimaActualizacion.toLocaleTimeString('es-AR')}
              </span>
            )}
            <button
              onClick={() => navigate('/')}
              className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
            >
              ← Salir
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">

        {/* ── KPIs ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Alumnos únicos', value: totalAlumnos, icon: '👥', color: 'text-sky-400' },
            { label: 'Total de intentos', value: totalIntentos, icon: '🎮', color: 'text-violet-400' },
            { label: 'Promedio general', value: `${promedioPct}%`, icon: '📊', color: 'text-amber-400' },
            { label: 'En progreso ahora', value: '—', icon: '⚡', color: 'text-emerald-400' },
          ].map((kpi) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-4 text-center"
            >
              <div className="text-3xl mb-1">{kpi.icon}</div>
              <div className={`text-2xl font-black font-mono ${kpi.color}`}>{kpi.value}</div>
              <div className="text-slate-500 text-xs mt-1">{kpi.label}</div>
            </motion.div>
          ))}
        </div>

        {/* ── GRÁFICOS ── */}
        {scorecards.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Distribución de rangos */}
            <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                🏆 <span>Distribución de Rangos</span>
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={distRangos} margin={{ top: 0, right: 10, bottom: 0, left: -20 }}>
                    <XAxis dataKey="nombre" tick={{ fill: '#64748b', fontSize: 10 }} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 10 }} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: 12 }}
                      formatter={(v, n, p) => [`${v} alumnos`, p.payload.emoji + ' ' + p.payload.nombre]}
                    />
                    <Bar dataKey="cantidad" radius={[4, 4, 0, 0]}>
                      {distRangos.map((r, i) => <Cell key={i} fill={r.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Promedio por zona */}
            <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                📡 <span>Promedio por Zona (clase)</span>
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={promedioNivel}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="nivel" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#475569', fontSize: 8 }} tickCount={4} />
                    <Radar name="Promedio" dataKey="valor" stroke="#a855f7" fill="#a855f7" fillOpacity={0.3} strokeWidth={2} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: 12 }} formatter={(v) => [`${v}%`, 'Promedio']} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* ── TABLA DE ALUMNOS ── */}
        <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl overflow-hidden">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-b border-slate-700/50">
            <h3 className="text-white font-bold flex items-center gap-2">
              📋 <span>Resultados de Alumnos</span>
              <span className="text-slate-500 text-sm font-normal">({filtered.length})</span>
            </h3>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Búsqueda */}
              <input
                type="text"
                placeholder="Buscar alumno..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="flex-1 sm:w-56 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors font-mono"
              />
              {/* Orden */}
              <select
                value={ordenPor}
                onChange={(e) => setOrdenPor(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm text-slate-300 focus:outline-none font-mono"
              >
                <option value="fecha">↓ Más reciente</option>
                <option value="pct">↓ Mayor puntaje</option>
                <option value="nombre">↑ Nombre A-Z</option>
              </select>
            </div>
          </div>

          {/* Tabla */}
          {cargando ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin h-8 w-8 border-2 border-violet-500 border-t-transparent rounded-full" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <p className="text-4xl mb-3">📭</p>
              <p className="text-lg font-bold">
                {scorecards.length === 0 ? 'Aún no hay resultados registrados' : 'Sin coincidencias'}
              </p>
              <p className="text-sm mt-1">
                {scorecards.length === 0 ? 'Los alumnos aparecerán aquí al completar el quiz.' : 'Probá con otro término de búsqueda.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700/50 text-left">
                    {['#', 'Alumno', 'Email', 'Rango', '% Total', 'Inicial', 'Básico', 'Inter.', 'Avanz.', 'Experto', 'Fecha'].map((col) => (
                      <th key={col} className="px-4 py-3 text-slate-400 font-mono text-xs font-bold whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <AnimatePresence>
                    {filtered.map((sc, i) => {
                      const rango = obtenerRango(sc.porcentaje ?? 0);
                      const fecha = sc.fecha?.toDate
                        ? sc.fecha.toDate()
                        : new Date(sc.fechaISO || 0);
                      return (
                        <motion.tr
                          key={sc.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="hover:bg-slate-800/40 transition-colors"
                        >
                          <td className="px-4 py-3 text-slate-500 font-mono text-xs">{i + 1}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="text-white font-semibold">
                              {sc.nombre || '—'} {sc.apellido || ''}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-400 font-mono text-xs whitespace-nowrap">{sc.email}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full bg-slate-800 border border-slate-700">
                              {rango.emoji} {rango.nombre}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all"
                                  style={{
                                    width: `${sc.porcentaje ?? 0}%`,
                                    backgroundColor: colorPorPct(sc.porcentaje ?? 0),
                                  }}
                                />
                              </div>
                              <span className="font-mono text-xs font-bold" style={{ color: colorPorPct(sc.porcentaje ?? 0) }}>
                                {sc.porcentaje ?? 0}%
                              </span>
                            </div>
                          </td>
                          {/* Stats por nivel */}
                          {NIVELES.map((n) => {
                            const pct = sc.statsPorNivel?.[n]?.porcentaje ?? '—';
                            return (
                              <td key={n} className="px-4 py-3 text-center">
                                <span className={`font-mono text-xs font-bold ${
                                  pct === '—' ? 'text-slate-600' :
                                  pct >= 80 ? 'text-emerald-400' :
                                  pct >= 60 ? 'text-amber-400' :
                                  pct >= 40 ? 'text-orange-400' : 'text-rose-400'
                                }`}>
                                  {pct === '—' ? '—' : `${pct}%`}
                                </span>
                              </td>
                            );
                          })}
                          <td className="px-4 py-3 text-slate-500 font-mono text-xs whitespace-nowrap">
                            {fecha.toLocaleDateString('es-AR')} {fecha.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-slate-700 text-xs font-mono pb-4">
          {hasFirebaseConfig
            ? '⚡ Actualización en tiempo real vía Firestore onSnapshot'
            : `🔄 Actualización automática cada ${REFRESH_MS / 1000} segundos (modo demo)`}
        </p>
      </main>
    </div>
  );
}

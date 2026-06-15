import { misiones, obtenerRango, calcularPorcentaje, NIVELES } from '../data/missions';

/**
 * Calcula el scorecard completo a partir de las respuestas del jugador.
 * @param {number[]} respuestas - índices de respuesta por posición de misión
 * @returns {object} scorecard completo
 */
export function calcularScorecard(respuestas) {
  let correctas = 0;
  const indicesCorrectos = [];
  const indicesIncorrectos = [];
  const statsPorNivel = {};

  // Inicializar stats
  NIVELES.forEach((n) => { statsPorNivel[n] = { correctas: 0, total: 0, porcentaje: 0 }; });

  misiones.forEach((mision, i) => {
    const nivel = mision.nivel;
    statsPorNivel[nivel].total += 1;
    if (respuestas[i] === mision.correcta) {
      correctas++;
      indicesCorrectos.push(i);
      statsPorNivel[nivel].correctas += 1;
    } else {
      indicesIncorrectos.push(i);
    }
  });

  // Calcular porcentajes por nivel
  NIVELES.forEach((n) => {
    const { correctas: c, total: t } = statsPorNivel[n];
    statsPorNivel[n].porcentaje = t > 0 ? Math.round((c / t) * 100) : 0;
  });

  const porcentaje = calcularPorcentaje(correctas, misiones.length);
  const rango = obtenerRango(porcentaje);

  return {
    correctas,
    incorrectas: misiones.length - correctas,
    total: misiones.length,
    porcentaje,
    rango,
    indicesCorrectos,
    indicesIncorrectos,
    statsPorNivel,
  };
}

/**
 * Convierte los stats por nivel al formato requerido por el radar chart.
 */
export function statsParaRadar(statsPorNivel) {
  return NIVELES.map((nivel) => ({
    nivel: nivel.slice(0, 5), // Abreviar para el gráfico
    nivelCompleto: nivel,
    valor: statsPorNivel[nivel]?.porcentaje ?? 0,
  }));
}

/**
 * Formatea una fecha de Firestore/local para mostrar.
 */
export function formatearFecha(fecha) {
  if (!fecha) return '—';
  const d = fecha.toDate ? fecha.toDate() : new Date(fecha);
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

/**
 * ═══════════════════════════════════════════════════════════
 *  EXCEL QUEST — BANCO DE MISIONES (PREGUNTAS)
 *  25 misiones épicas en 5 niveles de dificultad
 *  Estilo: arcade / gaming / boss battles
 * ═══════════════════════════════════════════════════════════
 */

export const NIVELES = ['Inicial', 'Básico', 'Intermedio', 'Avanzado', 'Experto'];

/**
 * Los 7 RANGOS del sistema de clasificación.
 * Cada rango tiene: nombre, rango numérico, min/max %, colores y emoji de escudo.
 */
export const RANGOS = [
  {
    rank: 1,
    nombre: 'Desconocedor',
    min: 0,
    max: 14,
    emoji: '💀',
    color: '#6b7280',
    gradiente: 'from-gray-600 to-gray-800',
    glow: 'shadow-gray-500/30',
    descripcion: 'El camino del héroe comienza en la oscuridad.',
  },
  {
    rank: 2,
    nombre: 'Novato',
    min: 15,
    max: 29,
    emoji: '🌱',
    color: '#22c55e',
    gradiente: 'from-green-600 to-emerald-800',
    glow: 'shadow-green-500/40',
    descripcion: 'La semilla del conocimiento ya fue plantada.',
  },
  {
    rank: 3,
    nombre: 'Aprendiz',
    min: 30,
    max: 44,
    emoji: '⚔️',
    color: '#3b82f6',
    gradiente: 'from-blue-600 to-blue-900',
    glow: 'shadow-blue-500/40',
    descripcion: 'Empuñás la espada de las fórmulas. Seguís practicando.',
  },
  {
    rank: 4,
    nombre: 'Practicante',
    min: 45,
    max: 59,
    emoji: '🛡️',
    color: '#a855f7',
    gradiente: 'from-purple-600 to-purple-900',
    glow: 'shadow-purple-500/40',
    descripcion: 'Tu escudo de conocimiento te protege de los errores básicos.',
  },
  {
    rank: 5,
    nombre: 'Avanzado',
    min: 60,
    max: 74,
    emoji: '🔥',
    color: '#f97316',
    gradiente: 'from-orange-500 to-red-700',
    glow: 'shadow-orange-500/40',
    descripcion: 'El fuego del dominio arde en tus celdas.',
  },
  {
    rank: 6,
    nombre: 'Maestro de Fórmulas',
    min: 75,
    max: 89,
    emoji: '⚡',
    color: '#eab308',
    gradiente: 'from-yellow-500 to-amber-700',
    glow: 'shadow-yellow-500/40',
    descripcion: '¡Los rayos obedecen tus comandos. Sos temible!',
  },
  {
    rank: 7,
    nombre: 'Experto Excel',
    min: 90,
    max: 100,
    emoji: '👑',
    color: '#ec4899',
    gradiente: 'from-pink-500 via-rose-500 to-purple-600',
    glow: 'shadow-pink-500/60',
    descripcion: '¡LEYENDA! La corona de Excel te pertenece.',
  },
];

/**
 * Determina el rango a partir del porcentaje.
 * @param {number} porcentaje (0–100)
 * @returns {object} rango completo
 */
export function obtenerRango(porcentaje) {
  return RANGOS.find((r) => porcentaje >= r.min && porcentaje <= r.max) || RANGOS[0];
}

/**
 * Calcula el porcentaje a partir de respuestas correctas.
 * @param {number} correctas
 * @param {number} total
 */
export function calcularPorcentaje(correctas, total = 25) {
  return Math.round((correctas / total) * 100);
}

// ═══════════════════════════════════════════════════════════
//  BANCO DE MISIONES — 25 PREGUNTAS ÉPICAS
// ═══════════════════════════════════════════════════════════

export const misiones = [

  // ─────────────────────────────────────────────────────────
  //  ZONA 1 — CALABOZOS DEL PRINCIPIANTE (Nivel: Inicial)
  // ─────────────────────────────────────────────────────────
  {
    id: 1,
    nivel: 'Inicial',
    categoria: 'Interfaz',
    mision: '⚔️ MISIÓN 1 — El Mapa del Tesoro',
    pregunta: 'En el universo de Excel, el cruce exacto entre una fila y una columna forma la unidad básica de todo el reino. ¿Cómo se llama este legendario punto?',
    opciones: ['Libro de trabajo', 'Celda', 'Hoja de cálculo', 'Rango activo'],
    correcta: 1,
    pista: 'Es donde vive cada dato individualmente.',
  },
  {
    id: 2,
    nivel: 'Inicial',
    categoria: 'Fórmulas',
    mision: '⚔️ MISIÓN 2 — El Hechizo de la Suma',
    pregunta: 'El archimago necesita sumar los cristales mágicos guardados en A1 hasta A5. ¿Cuál de estos encantamientos es el correcto?',
    opciones: ['=SUMA(A1-A5)', '=SUMA(A1:A5)', '=TOTAL[A1,A5]', '=SUM(A1+A5)'],
    correcta: 1,
    pista: 'Los dos puntos (:) indican un rango continuo.',
  },
  {
    id: 3,
    nivel: 'Inicial',
    categoria: 'Formato',
    mision: '⚔️ MISIÓN 3 — El Sello del Archivo',
    pregunta: 'El guardián del archivo exige que los pergaminos de Excel (desde 2016) lleven el sello correcto. ¿Cuál es la extensión que debes usar?',
    opciones: ['.xls', '.xlm', '.xlsx', '.xlb'],
    correcta: 2,
    pista: 'La x final es clave en el nombre moderno.',
  },
  {
    id: 4,
    nivel: 'Inicial',
    categoria: 'Atajos',
    mision: '⚔️ MISIÓN 4 — El Portal de Regreso',
    pregunta: '¡El héroe está perdido en la última fila de datos! ¿Qué combinación de teclas activa el portal de regreso inmediato a la celda A1?',
    opciones: ['Ctrl + Fin', 'Ctrl + Inicio', 'Alt + A1', 'Shift + Home'],
    correcta: 1,
    pista: 'El "comienzo" del viaje siempre es A1.',
  },
  {
    id: 5,
    nivel: 'Inicial',
    categoria: 'Formato',
    mision: '⚔️ MISIÓN 5 — La Armadura Negrita',
    pregunta: 'Para forjar la armadura de negrita sobre el texto de una celda, ¿qué conjuro de teclado debes lanzar?',
    opciones: ['Ctrl + N', 'Ctrl + B', 'Ctrl + G', 'Alt + N'],
    correcta: 1,
    pista: 'En inglés "Bold" empieza por B.',
  },

  // ─────────────────────────────────────────────────────────
  //  ZONA 2 — CAVERNAS DEL CONOCIMIENTO (Nivel: Básico)
  // ─────────────────────────────────────────────────────────
  {
    id: 6,
    nivel: 'Básico',
    categoria: 'Funciones',
    mision: '🛡️ BOSS 1 — El Guardián del Máximo',
    pregunta: 'El guardián del cofre solo revela el mayor valor del rango A1:A10. ¿Cuál es la fórmula que lo invoca correctamente?',
    opciones: ['=MAYOR(A1:A10)', '=MAXIMO(A1:A10)', '=MAX(A1:A10)', '=CIMA(A1:A10)'],
    correcta: 2,
    pista: 'El nombre viene del inglés "Maximum".',
  },
  {
    id: 7,
    nivel: 'Básico',
    categoria: 'Referencias',
    mision: '🛡️ BOSS 2 — El Escudo Inamovible',
    pregunta: 'En la fórmula =A1*$B$1, el símbolo $B$1 actúa como un escudo que no se mueve al copiar. ¿Qué tipo de referencia es?',
    opciones: ['Referencia relativa', 'Referencia mixta', 'Referencia absoluta', 'Referencia circular'],
    correcta: 2,
    pista: 'El dólar ($) congela la posición.',
  },
  {
    id: 8,
    nivel: 'Básico',
    categoria: 'Funciones',
    mision: '🛡️ BOSS 3 — El Contador de Guerreros',
    pregunta: '¿Cuál es la función que cuenta ÚNICAMENTE las celdas con valores numéricos, ignorando texto y celdas vacías?',
    opciones: ['=CONTARA()', '=CONTAR()', '=CONTAR.SI()', '=CONTAR.BLANCO()'],
    correcta: 1,
    pista: 'El nombre sin sufijo cuenta solo números.',
  },
  {
    id: 9,
    nivel: 'Básico',
    categoria: 'Herramientas',
    mision: '🛡️ BOSS 4 — El Centinela Inmóvil',
    pregunta: '¡El título de la tabla desaparece al desplazarse! ¿Qué poder de Excel mantiene las filas y columnas siempre visibles sin importar cuánto scrollees?',
    opciones: [
      'Proteger hoja',
      'Inmovilizar paneles',
      'Bloquear celdas',
      'Dividir ventana',
    ],
    correcta: 1,
    pista: 'La palabra clave es "inmovilizar".',
  },
  {
    id: 10,
    nivel: 'Básico',
    categoria: 'Atajos',
    mision: '🛡️ BOSS 5 — El Sello de la Fecha',
    pregunta: '¡El reloj de la mazmorra requiere la fecha actual de forma instantánea! ¿Cuál es el atajo que inserta HOY mismo en la celda?',
    opciones: ['Ctrl + T', 'Ctrl + ;', 'Ctrl + Shift + F', 'Alt + D'],
    correcta: 1,
    pista: 'El punto y coma es la llave del tiempo.',
  },

  // ─────────────────────────────────────────────────────────
  //  ZONA 3 — TEMPLO DE LAS FÓRMULAS (Nivel: Intermedio)
  // ─────────────────────────────────────────────────────────
  {
    id: 11,
    nivel: 'Intermedio',
    categoria: 'Lógica',
    mision: '🔥 RAID 1 — El Oráculo Condicional',
    pregunta: 'El oráculo proclama: =SI(5>3,"Victoria","Derrota"). ¿Qué respuesta entrega el oráculo?',
    opciones: ['Derrota', 'Victoria', '#ERROR!', 'VERDADERO'],
    correcta: 1,
    pista: '5 es mayor que 3, entonces la condición es verdadera.',
  },
  {
    id: 12,
    nivel: 'Intermedio',
    categoria: 'Búsqueda',
    mision: '🔥 RAID 2 — El Espía de la Tabla',
    pregunta: 'En =BUSCARV(valor, tabla, col, FALSO), ¿qué hace el argumento FALSO que lo convierte en el espía más confiable?',
    opciones: [
      'Ordena la tabla de forma descendente',
      'Busca una coincidencia aproximada',
      'Exige una coincidencia exacta o falla con #N/A',
      'Permite valores duplicados en la búsqueda',
    ],
    correcta: 2,
    pista: 'FALSO = exacto. VERDADERO = aproximado.',
  },
  {
    id: 13,
    nivel: 'Intermedio',
    categoria: 'Análisis',
    mision: '🔥 RAID 3 — El Altar de los Datos',
    pregunta: '¿Cuál es el arma secreta de Excel para resumir, analizar y reorganizar miles de filas de datos sin escribir una sola fórmula?',
    opciones: [
      'Gráfico dinámico animado',
      'Tabla dinámica (PivotTable)',
      'Formato condicional inteligente',
      'Power Automate integrado',
    ],
    correcta: 1,
    pista: 'Dinámica porque se puede reorganizar arrastrando campos.',
  },
  {
    id: 14,
    nivel: 'Intermedio',
    categoria: 'Formato',
    mision: '🔥 RAID 4 — El Escudo Cromático',
    pregunta: '¿Qué poder hace que las celdas cambien de color automáticamente según su valor, como si el libro de Excel tuviera vida propia?',
    opciones: [
      'Formatear como tabla',
      'Estilos de celda predefinidos',
      'Formato condicional',
      'Temas de color del libro',
    ],
    correcta: 2,
    pista: 'El color es CONDICIONAL al valor.',
  },
  {
    id: 15,
    nivel: 'Intermedio',
    categoria: 'Texto',
    mision: '🔥 RAID 5 — El Cirujano de Cadenas',
    pregunta: '¡Solo necesitás los primeros 3 caracteres de una palabra para la clave secreta! ¿Qué función corta exactamente desde la izquierda?',
    opciones: ['=DERECHA()', '=EXTRAE()', '=IZQUIERDA()', '=CORTAR()'],
    correcta: 2,
    pista: 'La dirección es la clave: ¿desde dónde cortas?',
  },

  // ─────────────────────────────────────────────────────────
  //  ZONA 4 — CIUDADELA DE LOS AVANZADOS (Nivel: Avanzado)
  // ─────────────────────────────────────────────────────────
  {
    id: 16,
    nivel: 'Avanzado',
    categoria: 'Fórmulas',
    mision: '⚡ ÉLITE 1 — Las Fórmulas Matriciales',
    pregunta: '¿Cuál es el superpoder que distingue una fórmula matricial (array) de una fórmula común y corriente?',
    opciones: [
      'Solo funciona en Excel 365 de pago',
      'Procesa múltiples valores a la vez y puede devolver un arreglo de resultados',
      'Nunca usa funciones de SUMA o PROMEDIO',
      'Solo se aplica en contextos estadísticos avanzados',
    ],
    correcta: 1,
    pista: 'Piensa en "array": múltiples valores, múltiples resultados.',
  },
  {
    id: 17,
    nivel: 'Avanzado',
    categoria: 'Automatización',
    mision: '⚡ ÉLITE 2 — El Golem de las Tareas',
    pregunta: '¿Cuál es el ser que puede automatizar tareas repetitivas en Excel, ejecutando instrucciones guardadas con un solo clic?',
    opciones: [
      'Un gráfico interactivo avanzado',
      'Una plantilla .xltx especial',
      'Una macro programada en VBA',
      'Un complemento de Office Store',
    ],
    correcta: 2,
    pista: 'VBA = Visual Basic for Applications.',
  },
  {
    id: 18,
    nivel: 'Avanzado',
    categoria: 'Funciones',
    mision: '⚡ ÉLITE 3 — El GPS de la Tabla',
    pregunta: 'La fórmula =INDICE(A1:C5, 3, 2) actúa como un GPS que localiza un dato exacto. ¿A dónde apunta este GPS?',
    opciones: [
      'A la celda A3 directamente',
      'Al valor en la fila 3 y columna 2 del rango A1:C5',
      'Al número de filas del rango A1:C5',
      'Devuelve error sin la función COINCIDIR',
    ],
    correcta: 1,
    pista: 'ÍNDICE(rango, fila, columna) — es el GPS de las tablas.',
  },
  {
    id: 19,
    nivel: 'Avanzado',
    categoria: 'Análisis',
    mision: '⚡ ÉLITE 4 — El Optimizador Supremo',
    pregunta: '¡El jefe necesita minimizar costos cambiando variables de decisión con restricciones! ¿Qué herramienta de Excel convoca a este poder de optimización?',
    opciones: ['Buscar objetivo', 'Solver', 'Power Query', 'Análisis de hipótesis'],
    correcta: 1,
    pista: 'Su nombre en inglés es "Solver" — resuelve problemas complejos.',
  },
  {
    id: 20,
    nivel: 'Avanzado',
    categoria: 'Datos',
    mision: '⚡ ÉLITE 5 — El Alquimista de Datos',
    pregunta: '¿Cuál es la herramienta que importa, transforma y limpia datos de múltiples fuentes ANTES de que entren al libro de Excel?',
    opciones: [
      'Macros VBA de importación',
      'Tablas dinámicas con datos externos',
      'Power Query (Editor de consultas)',
      'Conexión ODBC directa',
    ],
    correcta: 2,
    pista: 'Power Query es el "ETL" nativo de Excel.',
  },

  // ─────────────────────────────────────────────────────────
  //  ZONA 5 — OLIMPO DE LOS EXPERTOS (Nivel: Experto)
  // ─────────────────────────────────────────────────────────
  {
    id: 21,
    nivel: 'Experto',
    categoria: 'VBA',
    mision: '👑 JEFE FINAL 1 — El Dios Código',
    pregunta: '¡El ritual requiere colorear en rojo interior todas las celdas de A1:A10 con valor >100! ¿Qué fragmento de VBA cumple el ritual perfectamente?',
    opciones: [
      'For Each c In Range("A1:A10") : If c > 100 Then c.Font.Color = RGB(255,0,0) : Next c',
      'For Each c In Range("A1:A10") : If c > 100 Then c.Interior.Color = RGB(255,0,0) : Next c',
      'Do While c < 100 : c.Interior.Color = RGB(255,0,0) : Loop',
      'Range("A1:A10").ColorIndex = 3 If Value > 100',
    ],
    correcta: 1,
    pista: 'Interior.Color es el fondo. Font.Color es el texto.',
  },
  {
    id: 22,
    nivel: 'Experto',
    categoria: 'Excel 365',
    mision: '👑 JEFE FINAL 2 — El Mago de los Únicos',
    pregunta: '¡La lista tiene 500 entradas duplicadas! ¿Cuál de estas funciones dinámicas de Excel 365 extrae automáticamente los valores únicos?',
    opciones: ['=UNICOS()', '=SIN.DUPLICADOS()', '=DISTINTOS()', '=FILTRAR.UNICOS()'],
    correcta: 0,
    pista: 'Su nombre en español es exactamente "UNICOS".',
  },
  {
    id: 23,
    nivel: 'Experto',
    categoria: 'Power Pivot',
    mision: '👑 JEFE FINAL 3 — El Lenguaje de los Dioses',
    pregunta: '¿Qué lenguaje secreto usa Power Pivot de Excel para crear métricas calculadas y columnas en los modelos de datos?',
    opciones: [
      'SQL extendido para Excel',
      'DAX (Data Analysis Expressions)',
      'M Language de Power Query',
      'VBA adaptado para Power Pivot',
    ],
    correcta: 1,
    pista: 'DAX = Data Analysis Expressions. Diferente de M o SQL.',
  },
  {
    id: 24,
    nivel: 'Experto',
    categoria: 'VBA',
    mision: '👑 JEFE FINAL 4 — Sub vs. Function',
    pregunta: '¡El grimorio del código revela la diferencia crucial! ¿Cuál es la distinción REAL entre un procedimiento Sub y una Function en VBA?',
    opciones: [
      'Sub solo corre desde botones; Function solo desde el Editor VBA',
      'Sub ejecuta acciones sin retornar valor; Function retorna un valor usable en fórmulas',
      'Sub es más rápido que Function en todos los escenarios',
      'No hay diferencia funcional real, solo es convención de nombres',
    ],
    correcta: 1,
    pista: 'Function = puede devolver un valor. Sub = solo ejecuta.',
  },
  {
    id: 25,
    nivel: 'Experto',
    categoria: 'Fórmulas',
    mision: '👑 JEFE FINAL 5 — La Fórmula Definitiva',
    pregunta: '¡La prueba suprema! Para calcular el promedio de ventas (col B) SOLO cuando el producto (col A) es "Laptop" Y la región (col C) es "Sur", ¿cuál es la fórmula correcta?',
    opciones: [
      '=PROMEDIO.SI(A:A,"Laptop",B:B)',
      '=PROMEDIO.SI.CONJUNTO(B:B, A:A,"Laptop", C:C,"Sur")',
      '=SUMAR.SI(B:B,A:A,"Laptop",C:C,"Sur")/CONTAR.SI(A:A,"Laptop")',
      '=SI(Y(A:A="Laptop",C:C="Sur"),PROMEDIO(B:B),0)',
    ],
    correcta: 1,
    pista: 'SI.CONJUNTO admite múltiples criterios — plural de condiciones.',
  },
];

/**
 * Quests de mejora (recomendaciones gamificadas) por nivel.
 */
export const questsDeMejora = {
  Inicial: [
    { titulo: '🗺️ Quest: Explorar la Interfaz', desc: 'Completa el tour guiado de Excel: cinta, barra de fórmulas, tipos de celda y navegación básica.' },
    { titulo: '🧪 Quest: Dominar SUMA y PROMEDIO', desc: 'Practica las fórmulas SUMA, PROMEDIO, MIN y MAX con datos reales de 50+ filas.' },
    { titulo: '⌨️ Quest: 10 Atajos de Teclado', desc: 'Memoriza Ctrl+C, V, Z, S, Inicio, Ctrl+Fin, F2, F4, y Ctrl+; esta semana.' },
  ],
  Básico: [
    { titulo: '🔗 Quest: Dominar Referencias', desc: 'Crea una hoja con referencias absolutas ($A$1), relativas (A1) y mixtas ($A1). Comprende cuándo usar cada una.' },
    { titulo: '📊 Quest: El Contador Maestro', desc: 'Practica CONTAR, CONTARA, CONTAR.SI y CONTAR.SI.CONJUNTO con un dataset real.' },
    { titulo: '❄️ Quest: Inmovilizar el Tiempo', desc: 'Trabaja con hojas de más de 100 filas usando inmovilización de paneles para no perderte.' },
  ],
  Intermedio: [
    { titulo: '🔍 Quest: Amo del BUSCARV', desc: 'Reemplaza 5 fórmulas BUSCARV por BUSCARX. Nota las ventajas: sin ordenar, búsqueda inversa.' },
    { titulo: '🌀 Quest: Primera Tabla Dinámica', desc: 'Crea una tabla dinámica con segmentadores y campos calculados desde cero.' },
    { titulo: '🎨 Quest: Formato Condicional Avanzado', desc: 'Aplica barras de datos, escalas de color y reglas de fórmulas en un dashboard.' },
  ],
  Avanzado: [
    { titulo: '🤖 Quest: Tu Primera Macro VBA', desc: 'Graba una macro, luego edítala en el editor VBA para agregar un If/Else y un bucle For Each.' },
    { titulo: '🔎 Quest: ÍNDICE + COINCIDIR', desc: 'Reemplaza 3 BUSCARV con ÍNDICE+COINCIDIR. Domina la búsqueda bidireccional.' },
    { titulo: '⚙️ Quest: Power Query Pipeline', desc: 'Conecta una fuente de datos CSV, aplica 5 transformaciones y carga el resultado en Excel.' },
  ],
  Experto: [
    { titulo: '🌩️ Quest: VBA Avanzado con Clases', desc: 'Crea un módulo VBA con manejo de errores, clases y procedimientos reutilizables.' },
    { titulo: '📐 Quest: Modelo DAX en Power Pivot', desc: 'Construye un modelo estrella con medidas DAX: CALCULATE, FILTER y SUMX.' },
    { titulo: '✨ Quest: Funciones Dinámicas 365', desc: 'Domina UNICOS, FILTRAR, ORDENAR, SECUENCIA y LAMBDA para análisis modernos.' },
  ],
};

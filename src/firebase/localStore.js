/** Local storage for scorecards (demo mode) */
const KEY = 'xq_scorecards';
const getAll = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } };
const saveAll = (items) => localStorage.setItem(KEY, JSON.stringify(items));

export const localStore = {
  guardar(datos) {
    const items = getAll();
    const id = `sc-${Date.now()}`;
    items.unshift({ id, ...datos, fecha: { toDate: () => new Date(datos.fechaISO) } });
    saveAll(items);
    return id;
  },
  obtenerPorUid: (uid) => getAll().filter((i) => i.uid === uid),
  obtenerTodos: () => getAll(),
};

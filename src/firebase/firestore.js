import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import { db, hasFirebaseConfig } from './config';
import { localStore } from './localStore';

const COL = 'scorecards';

export async function guardarScorecard(datos) {
  if (hasFirebaseConfig && db) {
    const ref = await addDoc(collection(db, COL), { ...datos, fecha: serverTimestamp() });
    return ref.id;
  }
  return localStore.guardar({ ...datos, fechaISO: new Date().toISOString() });
}

export async function obtenerScorecardsPorUsuario(uid) {
  if (hasFirebaseConfig && db) {
    const q = query(collection(db, COL), where('uid', '==', uid), orderBy('fecha', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }
  return localStore.obtenerPorUid(uid);
}

export async function obtenerTodosLosResultados() {
  if (hasFirebaseConfig && db) {
    const q = query(collection(db, COL), orderBy('fecha', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }
  return localStore.obtenerTodos();
}


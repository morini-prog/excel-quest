/**
 * Sistema de autenticación local con localStorage (modo demo).
 */
const USERS_KEY = 'xq_users';
const SESSION_KEY = 'xq_session';

const getUsers = () => { try { return JSON.parse(localStorage.getItem(USERS_KEY) || '{}'); } catch { return {}; } };
const saveUsers = (u) => localStorage.setItem(USERS_KEY, JSON.stringify(u));
const saveSession = (u) => localStorage.setItem(SESSION_KEY, JSON.stringify(u));
const clearSession = () => localStorage.removeItem(SESSION_KEY);

const listeners = new Set();
let currentUser = (() => { try { return JSON.parse(localStorage.getItem(SESSION_KEY)); } catch { return null; } })();

const notify = (u) => listeners.forEach((fn) => fn(u));

export const localAuth = {
  registrar(nombre, apellido, email, password) {
    const users = getUsers();
    const key = email.toLowerCase().trim();
    if (users[key]) { const e = new Error(); e.code = 'auth/email-already-in-use'; throw e; }
    if (password.length < 6) { const e = new Error(); e.code = 'auth/weak-password'; throw e; }
    const uid = `local-${Date.now()}`;
    const user = { uid, email: key, displayName: `${nombre} ${apellido}`, nombre, apellido };
    users[key] = { ...user, password };
    saveUsers(users);
    currentUser = user;
    saveSession(user);
    notify(user);
    return { user };
  },
  iniciarSesion(email, password) {
    const users = getUsers();
    const key = email.toLowerCase().trim();
    const stored = users[key];
    if (!stored) { const e = new Error(); e.code = 'auth/user-not-found'; throw e; }
    if (stored.password !== password) { const e = new Error(); e.code = 'auth/wrong-password'; throw e; }
    const user = { uid: stored.uid, email: stored.email, displayName: stored.displayName, nombre: stored.nombre, apellido: stored.apellido };
    currentUser = user;
    saveSession(user);
    notify(user);
    return { user };
  },
  cerrarSesion() { currentUser = null; clearSession(); notify(null); },
  onAuthStateChanged(cb) {
    listeners.add(cb);
    setTimeout(() => cb(currentUser), 0);
    return () => listeners.delete(cb);
  },
  getCurrentUser() { return currentUser; },
};

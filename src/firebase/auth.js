import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, updateProfile,
} from 'firebase/auth';
import { auth, hasFirebaseConfig } from './config';
import { localAuth } from './localAuth';

export async function registrarUsuario(nombre, apellido, email, password) {
  if (hasFirebaseConfig && auth) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: `${nombre} ${apellido}` });
    return cred;
  }
  return Promise.resolve(localAuth.registrar(nombre, apellido, email, password));
}

export async function iniciarSesion(email, password) {
  if (hasFirebaseConfig && auth) return signInWithEmailAndPassword(auth, email, password);
  return Promise.resolve(localAuth.iniciarSesion(email, password));
}

export async function cerrarSesion() {
  if (hasFirebaseConfig && auth) return signOut(auth);
  localAuth.cerrarSesion();
}

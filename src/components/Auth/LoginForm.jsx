import { useState } from 'react';
import { motion } from 'framer-motion';
import { iniciarSesion } from '../../firebase/auth';

export default function LoginForm({ onToggle }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const set = (k) => (e) => { setForm((p) => ({ ...p, [k]: e.target.value })); setError(''); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      await Promise.resolve(iniciarSesion(form.email, form.password));
    } catch (err) {
      const msgs = {
        'auth/invalid-credential': 'Correo o contraseña incorrectos.',
        'auth/user-not-found': 'No existe una cuenta con ese correo.',
        'auth/wrong-password': 'Contraseña incorrecta.',
        'auth/too-many-requests': 'Demasiados intentos. Esperá un momento.',
        'auth/invalid-email': 'El correo no es válido.',
      };
      setError(msgs[err.code] || 'Error al iniciar sesión.');
    } finally { setCargando(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="text-center mb-4">
        <h2 className="text-xl font-black text-white">¡Bienvenido de vuelta, Héroe!</h2>
        <p className="text-slate-500 text-xs mt-1 font-mono">CONTINUAR AVENTURA</p>
      </div>
      {[['email', 'Correo electrónico', 'juan@ejemplo.com', 'email'], ['password', 'Contraseña', 'Tu contraseña', 'current-password']].map(([k, label, ph, ac]) => (
        <div key={k}>
          <label className="block text-slate-400 text-xs font-mono mb-1">{label.toUpperCase()}</label>
          <input id={`input-login-${k}`} name={k} type={k === 'email' ? 'email' : 'password'} required autoComplete={ac} value={form[k]} onChange={set(k)} placeholder={ph} className="input-quest" />
        </div>
      ))}
      {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-2 text-red-400 text-xs">{error}</motion.div>}
      <button id="btn-iniciar-sesion" type="submit" disabled={cargando} className="btn-quest-primary w-full">
        {cargando ? '⏳ Ingresando...' : '⚔️ Iniciar sesión'}
      </button>
      <p className="text-center text-slate-500 text-xs">
        ¿No tenés cuenta?{' '}
        <button type="button" onClick={onToggle} className="text-violet-400 hover:text-violet-300 font-bold transition-colors">Registrate gratis</button>
      </p>
    </form>
  );
}

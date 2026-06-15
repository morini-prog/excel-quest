import { useState } from 'react';
import { motion } from 'framer-motion';
import { registrarUsuario } from '../../firebase/auth';

export default function RegisterForm({ onToggle }) {
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', password: '', confirmar: '' });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const set = (k) => (e) => { setForm((p) => ({ ...p, [k]: e.target.value })); setError(''); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.apellido.trim()) return setError('Ingresá nombre y apellido.');
    if (form.password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres.');
    if (form.password !== form.confirmar) return setError('Las contraseñas no coinciden.');
    setCargando(true);
    try {
      await Promise.resolve(registrarUsuario(form.nombre.trim(), form.apellido.trim(), form.email, form.password));
    } catch (err) {
      const msgs = {
        'auth/email-already-in-use': 'Ese correo ya está registrado.',
        'auth/invalid-email': 'El correo no es válido.',
        'auth/weak-password': 'Contraseña demasiado débil.',
      };
      setError(msgs[err.code] || 'Error al registrar. Intentá de nuevo.');
    } finally { setCargando(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="text-center mb-4">
        <h2 className="text-xl font-black text-white">Crear cuenta de jugador</h2>
        <p className="text-slate-500 text-xs mt-1 font-mono">NUEVO HÉROE</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[['nombre', 'Nombre', 'Juan'], ['apellido', 'Apellido', 'García']].map(([k, label, ph]) => (
          <div key={k}>
            <label className="block text-slate-400 text-xs font-mono mb-1">{label.toUpperCase()}</label>
            <input id={`input-${k}`} name={k} type="text" required value={form[k]} onChange={set(k)} placeholder={ph} className="input-quest" />
          </div>
        ))}
      </div>
      {[['email', 'Correo electrónico', 'juan@ejemplo.com', 'email'], ['password', 'Contraseña', 'Mínimo 6 caracteres', 'new-password'], ['confirmar', 'Confirmar contraseña', 'Repetí tu contraseña', 'new-password']].map(([k, label, ph, ac]) => (
        <div key={k}>
          <label className="block text-slate-400 text-xs font-mono mb-1">{label.toUpperCase()}</label>
          <input id={`input-${k}`} name={k} type={k === 'email' ? 'email' : 'password'} required autoComplete={ac} value={form[k]} onChange={set(k)} placeholder={ph} className="input-quest" />
        </div>
      ))}
      {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-2 text-red-400 text-xs">{error}</motion.div>}
      <button id="btn-registrar" type="submit" disabled={cargando} className="btn-quest-primary w-full">
        {cargando ? '⏳ Registrando...' : '🚀 Crear cuenta y comenzar'}
      </button>
      <p className="text-center text-slate-500 text-xs">
        ¿Ya tenés cuenta?{' '}
        <button type="button" onClick={onToggle} className="text-violet-400 hover:text-violet-300 font-bold transition-colors">Iniciá sesión</button>
      </p>
    </form>
  );
}

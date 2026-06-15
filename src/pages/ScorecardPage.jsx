import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import GamingScorecard from '../components/Scorecard/GamingScorecard';
import { cerrarSesion } from '../firebase/auth';

export default function ScorecardPage() {
  const { usuario, cargando } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const scorecard = location.state?.scorecard;
  const nombre = location.state?.nombre || '';
  const apellido = location.state?.apellido || '';
  const email = location.state?.email || '';

  if (cargando) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="animate-spin h-10 w-10 border-4 border-violet-500 border-t-transparent rounded-full" />
    </div>
  );

  if (!usuario) return <Navigate to="/auth" replace />;
  if (!scorecard) return <Navigate to="/" replace />;

  const handleNuevoQuest = () => {
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-3 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-30">
        <span className="font-black text-lg bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
          🎮 Excel Quest
        </span>
        <div className="flex items-center gap-3">
          <button onClick={async () => { await cerrarSesion(); navigate('/'); }} className="text-slate-600 hover:text-slate-400 text-xs transition-colors">
            Salir
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow px-4 py-8 overflow-y-auto">
        <GamingScorecard
          scorecard={scorecard}
          jugador={{ nombre, apellido, email, displayName: usuario.displayName }}
          onNuevoQuest={handleNuevoQuest}
        />
      </main>
    </div>
  );
}

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AuthPage from './pages/AuthPage';
import QuizPage from './pages/QuizPage';
import ScorecardPage from './pages/ScorecardPage';
import TeacherDashboard from './pages/TeacherDashboard';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Redirigir la raíz / directamente a la pantalla de Registro/Login */}
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/quest" element={<QuizPage />} />
          <Route path="/scorecard" element={<ScorecardPage />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

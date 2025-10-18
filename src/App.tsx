import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Hook para ler o estado do Redux
import type { RootState } from './redux/store'; // Tipo da RootState

import LoginPage from './pages/LoginPage';
import AtendentePage from './pages/AtendentePage';
import PacientePage from './pages/PacientePage';

import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/NavBar';
import { UsuarioPage } from './pages/UsuarioPage';


// Componente para Redirecionamento baseado na Role
const NavigateByRole: React.FC = () => {
    // 1. Obtém a role do estado do Redux
    const role = useSelector((state: RootState) => state.auth.role);

    // Lógica de Redirecionamento
    if (role === 'ROLE_ATENDENTE') return <Navigate to="/atendente" replace />;
    if (role === 'ROLE_PACIENTE') return <Navigate to="/paciente" replace />;
    
    // Se estiver logado, mas por algum motivo a role for nula (e não for redirecionado acima), volta para o login
    return <Navigate to="/login" replace />; 
};

const App: React.FC = () => {
    // 2. Obtém isAuthenticated do estado do Redux
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    return (
        <div className="app-container">
            <Navbar /> {/* Componente de navegação */}
            
            <Routes>
                <Route path="/login" element={<LoginPage />} />

                      <Route path="/cadastropaciente" element={<UsuarioPage />} />  
                {/* Rotas Protegidas (Reutilizando seu ProtectedRoute já refatorado) */}
                <Route element={<ProtectedRoute allowedRoles={['ROLE_ATENDENTE']} />}>
                    <Route path="/atendente" element={<AtendentePage />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={['ROLE_PACIENTE']} />}>
                    <Route path="/paciente" element={<PacientePage />} />
                </Route>
                
                {/* Rota raiz: Redireciona com base na autenticação */}
                <Route 
                    path="/" 
                    element={
                        // Se autenticado, usa o componente que decide o redirecionamento pela role
                        isAuthenticated ? <NavigateByRole /> : <Navigate to="/login" replace />
                    } 
                />
                 {/* Rota para acesso não autorizado (opcional, mas bom ter) */}
                <Route path="/unauthorized" element={<h1 className="text-danger text-center mt-5">Acesso Não Autorizado</h1>} />

                 {/* Rota 404/Not Found */}
                <Route path="*" element={<h1 className="text-center mt-5">404 - Página Não Encontrada</h1>} />
            </Routes>
        </div>
    );
};

export default App;
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'; // 👈 Importar o hook do Redux
import type { RootState } from '../redux/store'; // 👈 Importe o tipo da sua RootState

// Definição de tipos (mantida do seu código original)
type AllowedRole = 'ROLE_ATENDENTE' | 'ROLE_PACIENTE';

interface ProtectedRouteProps {
    allowedRoles?: AllowedRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    // 1. SUBSTITUIÇÃO: Usa useSelector para obter isAuthenticated e role do Redux
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const role = useSelector((state: RootState) => state.auth.role); // Role é do tipo UserRole, que é compatível com AllowedRole | null

    // 2. Verifica se está autenticado
    if (!isAuthenticated) {
        // Redireciona para /login se não estiver autenticado
        return <Navigate to="/login" replace />;
    }

    // 3. Verifica a permissão (Role-Based Access Control)
    // Se allowedRoles foi fornecido E o usuário tem uma role E essa role NÃO está nas permitidas
    if (allowedRoles && role && !allowedRoles.includes(role as AllowedRole)) {
        // Redireciona para /unauthorized se o papel não for permitido
        return <Navigate to="/unauthorized" replace />;
    }

    // 4. Permite o acesso
    // Renderiza o componente filho da rota (Outlet)
    return <Outlet />;
};

export default ProtectedRoute;
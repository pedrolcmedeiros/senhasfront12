import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // 👈 Importar hooks do Redux
import { logout } from '../redux/authSlice'; // 👈 Importar a action de logout
import type { RootState } from '../redux/store'; // 👈 Importar o tipo da RootState
6
const Navbar: React.FC = () => {
    // 1. Obtém o estado e a role do Redux
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const role = useSelector((state: RootState) => state.auth.role);
    
    // 2. Obtém o dispatcher para disparar ações
    const dispatch = useDispatch();

    // 3. Define a função de logout para disparar a action
    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Sistema de Senhas ({role || 'Visitante'})
                </Link>
                <div className="collapse navbar-collapse justify-content-end">
                    <ul className="navbar-nav">
                        {isAuthenticated ? (
                            <li className="nav-item">
                                <button 
                                    className="btn btn-danger" 
                                    onClick={handleLogout} // 👈 Usa a nova função
                                >
                                    Sair
                                </button>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link className="btn btn-outline-light" to="/login">
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
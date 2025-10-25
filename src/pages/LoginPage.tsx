import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importar 'Link' para o botão de senha
import { useDispatch } from 'react-redux';
import { loginSucesso } from '../redux/authSlice';
import { LoginNovo } from '../services/authService';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Obter o dispatch do Redux

 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {

    const response = await LoginNovo({ email, senha });
    console.log("Resposta da API:", response);
    debugger;
    const token = response.token;
    const role = response.role; // <- role vinda do backend

    if (token) {
     // login(token, email); 
     dispatch(loginSucesso({usuario:{email:email,role:role},token:token})); // Dispatch a ação de login com token e role
      // Redireciona conforme role
      if (role === "ROLE_ATENDENTE") {
        navigate('/atendente', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } else {
      setError('Resposta de login inválida.');
    }

  } catch (err: any) {
    const errorMessage = err.response?.status === 401 
      ? 'Credenciais inválidas. Tente novamente.' 
      : 'Erro de conexão ou servidor. Tente novamente mais tarde.';
      
    setError(errorMessage);
    console.error('Erro de login detalhado:', err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="d-flex justify-content-center align-items-center bg-light" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center">
          {/*  */}
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            
            <div className="card shadow-lg border-0 rounded-4">
              {/*  */}
              <div className="card-header bg-primary text-white text-center py-4">
                <h3 className="mb-1 fw-bold">Acesso ao Sistema de Senhas</h3>
                <p className="small mb-0">Faça login para gerenciar ou gerar senhas.</p>
              </div>
              
              {/*  */}
              <div className="card-body p-4 p-md-5">
                <form onSubmit={handleLogin}>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-semibold">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="form-control form-control-lg" 
                      placeholder="Email"
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                      disabled={loading} 
                    />
                  </div>
                  
                  <div className="mb-3"> 
                    <div className="d-flex justify-content-between align-items-center">
                      <label htmlFor="senha" className="form-label fw-semibold">Senha</label>
                      <Link to="/esqueciminhasenha" className="text-decoration-none small">
                        Esqueci minha senha
                      </Link>
                    </div>
                    <input 
                      type="password" 
                      id="senha" 
                      className="form-control form-control-lg" 
                      placeholder="Senha"
                      value={senha} 
                      onChange={(e) => setSenha(e.target.value)} 
                      required 
                      disabled={loading} 
                    />
                  </div>
                  
                  {error && <div className="alert alert-danger text-center">{error}</div>}
                  
                  <div className="d-grid mt-4"> 
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg fw-bold" 
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Autenticando...
                        </>
                      ) : 'Entrar no Sistema'}
                    </button>
                  </div>
                </form>
              </div>
              
              {/* Rodapé */}
              <div className="card-footer text-center bg-light text-muted small py-3">
                © 2025 Sistema de Senhas
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EsqueciSenhaPage: React.FC = () => {
  // Mantemos o estado apenas para controlar o input do email
  const [email, setEmail] = useState('');

  // Função fictícia apenas para demonstração da UI
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Solicitação de redefinição para: ${email}. A lógica de API real virá depois.`);
    // A implementação real do requestPasswordReset será adicionada aqui futuramente.
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-light" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            
            <div className="card shadow-lg border-0 rounded-4">
              
              {/* Cabeçalho */}
              <div className="card-header bg-primary text-white text-center py-4">
                <h3 className="mb-1 fw-bold">Recuperação de Senha</h3>
                <p className="small mb-0">Informe seu e-mail para receber as instruções.</p>
              </div>
              
              {/* Corpo do Formulário (UI Pura) */}
              <div className="card-body p-4 p-md-5">
                
                <form onSubmit={handleSubmit}>
                    
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label fw-semibold">Email Cadastrado</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="form-control form-control-lg" 
                            placeholder="Seu e-mail"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    
                    {/* Alerta de feedback temporário (pode ser removido na integração real) */}
                    <div className="alert alert-info text-center small" role="alert">
                        Você receberá um link de redefinição no e-mail informado.
                    </div>
                    
                    <div className="d-grid mt-4">
                        <button 
                            type="submit" 
                            className="btn btn-primary btn-lg fw-bold" 
                        >
                            Enviar Link de Redefinição
                        </button>
                    </div>
                </form>
                
                <div className="mt-4 text-center">
                    {/* Link para voltar à tela de Login */}
                    <Link to="/login" className="btn btn-link">
                        Lembrou da senha? Voltar ao Login
                    </Link>
                </div>

              </div> {/* Fim card-body */}
              
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

export default EsqueciSenhaPage;
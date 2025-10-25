import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const RedefinirSenhaPage: React.FC = () => {
    // Leitura do token da URL - Essencial para a conexão do fluxo
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token'); 

    // Estados controlados para os inputs (mantidos para estrutura do formulário)
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    // Função síncrona/fictícia que será substituída pela lógica real
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // A lógica real de chamar registrarNovaSenha(token, novaSenha) virá aqui.
        alert(`Formulário submetido. Token: ${token}, Senha: ${novaSenha}.`);
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-light" style={{ minHeight: '100vh' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
                        
                        <div className="card shadow-lg border-0 rounded-4">
                            
                            {/* Cabeçalho - Usando bg-primary (Mesma cor da EsqueciSenhaPage) */}
                            <div className="card-header bg-primary text-white text-center py-4">
                                <h3 className="mb-1 fw-bold">Definir Nova Senha</h3>
                                <p className="small mb-0">Insira sua nova senha para completar a redefinição.</p>
                            </div>
                            
                            {/* Corpo do Formulário */}
                            <div className="card-body p-4 p-md-5">
                                
                                {/* Aviso sobre o Token lido na URL */}
                                <div className="alert alert-warning text-center small" role="alert">
                                    Token na URL: <strong>{token || "NÃO ENCONTRADO"}</strong>
                                </div>
                                
                                <form onSubmit={handleSubmit}>
                                    
                                    <div className="mb-4">
                                        <label htmlFor="novaSenha" className="form-label fw-semibold">Nova Senha</label>
                                        <input 
                                            type="password" 
                                            id="novaSenha" 
                                            className="form-control form-control-lg" 
                                            placeholder="Sua nova senha"
                                            value={novaSenha} 
                                            onChange={(e) => setNovaSenha(e.target.value)} 
                                            required 
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="confirmarSenha" className="form-label fw-semibold">Confirmar Nova Senha</label>
                                        <input 
                                            type="password" 
                                            id="confirmarSenha" 
                                            className="form-control form-control-lg" 
                                            placeholder="Confirme a nova senha"
                                            value={confirmarSenha} 
                                            onChange={(e) => setConfirmarSenha(e.target.value)} 
                                            required 
                                        />
                                    </div>
                                    
                                    <div className="d-grid mt-4">
                                        {/* Botão de envio - Usando bg-primary (Mesma cor da EsqueciSenhaPage) */}
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary btn-lg fw-bold" 
                                        >
                                            Redefinir Senha
                                        </button>
                                    </div>
                                </form>
                                
                                <div className="mt-4 text-center">
                                    <Link to="/login" className="btn btn-link">
                                        Voltar ao Login
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

export default RedefinirSenhaPage;
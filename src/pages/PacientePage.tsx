import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { TipoSenha } from '../types/Senha'; 
import type { RootState } from '../redux/store';
import API from '../services/apiConfig';

const PacientePage: React.FC = () => {

    const token = useSelector((state: RootState) => state.auth.token);
    
    const [mensagem, setMensagem] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGerarSenha = async (tipo: TipoSenha) => {
      
        if (!token) {
            setMensagem('Erro: Não autenticado. Por favor, faça login.');
            return;
        }
        
        setLoading(true);
        setMensagem('');

        try {
            
            const response = await API.post(`/senhas/gerar/${tipo}`, {}, {
                headers: { 'Authorization': `Bearer ${token}` } 
            });
            
            const novaSenha = response.data;
            setMensagem(`Senha ${novaSenha.numero} (${tipo}) gerada com sucesso!`);
            
        } catch (error) {
            setMensagem('Falha ao gerar senha. Verifique o servidor ou sua permissão.');
            console.error('Erro ao gerar senha:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5 text-center">
            <h2 className="mb-4">Bem-vindo(a) ao Guichê Virtual</h2>
            
            {/* Exibir mensagem de erro se não houver token antes de tentar */}
            {!token && (
                 <div className="alert alert-danger mt-4" role="alert">
                    Sessão expirada ou não autenticada. Por favor, faça login para gerar senhas.
                </div>
            )}

            <p className="lead mb-4">Selecione o tipo de atendimento:</p>
            
            <div className="d-flex justify-content-center gap-3">
                <button 
                    onClick={() => handleGerarSenha('NORMAL')} 
                    // Os botões ficam desabilitados se estiver carregando OU se não houver token
                    disabled={loading || !token} 
                    className="btn btn-lg btn-success"
                >
                    {loading ? 'Gerando...' : 'Senha Normal'}
                </button>
                
                <button 
                    onClick={() => handleGerarSenha('PREFERENCIAL')} 
                    // Os botões ficam desabilitados se estiver carregando OU se não houver token
                    disabled={loading || !token}
                    className="btn btn-lg btn-warning text-dark"
                >
                    {loading ? 'Gerando...' : 'Senha Preferencial'}
                </button>
            </div>

            {mensagem && (
                <div className="alert alert-info mt-4" role="alert">
                    {mensagem}
                </div>
            )}
        </div>
    );
};

export default PacientePage;
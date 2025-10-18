import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { SenhaAtendimento, StatusSenha } from '../types/Senha';
import SenhaCard from '../components/SenhaCard';
import type { RootState } from '../redux/store';
import API from '../services/apiConfig';

const STATUS_COLUNAS: Record<StatusSenha, string> = {
    AGUARDANDO: 'Fila de Espera',
    CHAMADA: 'Em Atendimento',
    ATENDIDA: 'Atendida',
};

const AtendentePage: React.FC = () => {
    // 1. SUBSTITUIÇÃO: Usa useSelector para obter o token do estado de autenticação do Redux
    const token = useSelector((state: RootState) => state.auth.token);
    
    const [senhas, setSenhas] = useState<SenhaAtendimento[]>([]);
    const [loading, setLoading] = useState(false);
    const [chamando, setChamando] = useState(false);

    // O useCallback e useEffect dependem do token, agora vindo do Redux
    const fetchSenhas = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        try {
            // Chama o endpoint de senhas ativas (AGUARDANDO e CHAMADA)
            const responseAtivas = await API.get<SenhaAtendimento[]>('/senhas/listar/ativas', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            // Chama o endpoint de senhas atendidas (ATENDIDA)
            const responseAtendidas = await API.get<SenhaAtendimento[]>('/senhas/listar/atendidas', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            // Combina as duas listas para mostrar o estado 'senhas'
            const todasSenhas = [...responseAtivas.data, ...responseAtendidas.data];
            setSenhas(todasSenhas);

        } catch (error) {
            console.error('Erro ao carregar senhas:', error);
        } finally {
            setLoading(false);
        }
    }, [token]); // token é a dependência

    useEffect(() => {
        // A busca é feita apenas se o token existir
        if (token) {
            fetchSenhas();
            // Atualiza a cada 10 segundos
            const intervalId = setInterval(fetchSenhas, 10000); 
            return () => clearInterval(intervalId);
        }
    }, [fetchSenhas, token]); // fetchSenhas e token são as dependências

    const handleChamarProxima = async () => {
        if (!token) return;
        setChamando(true);
        try {
            await API.get('/senhas/chamar', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchSenhas(); 
        } catch (error: any) {
            console.error(`Falha ao chamar: ${error.response?.data?.message || 'Erro de conexão.'}`, error);
        } finally {
            setChamando(false);
        }
    };

    const handleFinalizarAtendimento = async (id: number) => {
        if (!token) return;
        
        try {
            await API.put(`/senhas/finalizar/${id}`, {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchSenhas(); 
        } catch (error) {
            console.error('Falha ao finalizar o atendimento:', error);
        }
    };
    
    // Lógica para agrupar senhas
    const senhasPorStatus = senhas.reduce((acc, senha) => {
        acc[senha.status] = acc[senha.status] || [];
        acc[senha.status].push(senha);
        return acc;
    }, {} as Record<StatusSenha, SenhaAtendimento[]>);

    return (
        <div className="container-fluid mt-4">
            <h2 className="mb-4">Painel de Gerenciamento de Senhas</h2>
            
            {/* Aviso se não houver token/autenticação */}
            {!token && (
                <div className="alert alert-danger mb-4" role="alert">
                    Sessão expirada. Por favor, faça login novamente para acessar o painel de atendente.
                </div>
            )}

            <div className="d-flex mb-4">
                <button 
                    onClick={handleChamarProxima} 
                    disabled={chamando || !token} // Desabilitar se não houver token
                    className="btn btn-lg btn-primary shadow"
                >
                    {chamando ? 'Chamando...' : 'Chamar Próxima Senha'}
                </button>
            </div>

            {loading && <div className="alert alert-info">Carregando senhas...</div>}
            
            {/* Renderizar colunas apenas se o token estiver presente ou se estiver carregando */}
            {(token || loading) && (
                <div className="row">
                    {(Object.keys(STATUS_COLUNAS) as StatusSenha[]).map(status => (
                        <div key={status} className="col-md-4">
                            <div className="card mb-3">
                                <div className="card-header bg-light">
                                    <h4 className="mb-0">{STATUS_COLUNAS[status]} ({senhasPorStatus[status]?.length || 0})</h4>
                                </div>
                                <div className="card-body p-3" style={{ minHeight: '400px', maxHeight: '70vh', overflowY: 'auto', backgroundColor: '#f8f9fa' }}>
                                    {(senhasPorStatus[status] || []).map(senha => (
                                        <SenhaCard 
                                            key={senha.id} 
                                            senha={senha} 
                                            onFinalizar={handleFinalizarAtendimento} // Passa a ação para o componente filho
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AtendentePage;
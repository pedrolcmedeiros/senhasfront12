import React from 'react';
import type { SenhaAtendimento, StatusSenha } from '../types/Senha';
interface SenhaCardProps {
  senha: SenhaAtendimento;
  onFinalizar?: (id: number) => void;
}

const getBadgeClass = (status: StatusSenha) => {
  switch (status) {
    case 'AGUARDANDO': return 'bg-warning text-dark';
    case 'CHAMADA': return 'bg-info';
    case 'ATENDIDA': return 'bg-success';
    default: return 'bg-secondary';
  }
};

const SenhaCard: React.FC<SenhaCardProps> = ({ senha, onFinalizar }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 className="card-title mb-0">{senha.numero}</h5>
          <span className={`badge ${getBadgeClass(senha.status)}`}>
            {senha.status.replace('_', ' ')}
          </span>
          <p className="card-text text-muted small mt-1">Tipo: {senha.tipo}</p>
        </div>
        {senha.status === 'CHAMADA' && onFinalizar && (
          <button 
            className="btn btn-sm btn-danger"
            onClick={() => onFinalizar(senha.id)}
          >
            Finalizar
          </button>
        )}
      </div>
    </div>
  );
};

export default SenhaCard;
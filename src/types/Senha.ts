export type StatusSenha = 'AGUARDANDO' | 'CHAMADA' | 'ATENDIDA';
export type TipoSenha = 'NORMAL' | 'PREFERENCIAL';

export interface SenhaAtendimento {
  id: number;
  numero: string; 
  tipo: TipoSenha;
  status: StatusSenha;
}
import { useState, useEffect } from 'react';
import { buscarTodosUsuarios, type Usuario } from '../services/usuarioService';

 export function UsuarioPage() {

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

   useEffect(() => {
    const carregarUsuario = async () => {
        const usuarios = await buscarTodosUsuarios();
        setUsuarios(usuarios);

    };
    carregarUsuario();
  }, []); 

return (

    <div className="mt-4">
        <h2>Painel de Usuários</h2>
        <table className="table table-striped tabl-hover">
           <thead>
            <tr>
                <td>ID</td>
                <td>Nome</td>
                <td>CPF</td>
                <td>Email</td>
            </tr>
           </thead>
              <tbody>
            {
                usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                        <td>{usuario.id}</td>
                        <td>{usuario.nome}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.cpf}</td>

                    </tr>
                ))}
              </tbody>
        </table>
    </div>
)}
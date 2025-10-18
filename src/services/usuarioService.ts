import API from "./apiConfig";

export interface Usuario {

    id: number;
    nome: string,
    cpf: string,
    email: string

}

export async function buscarTodosUsuarios() : Promise<Usuario[]>{
    const response = await API.get<Usuario[]>("/usuarios/listarTodos" );
    return response.data;

}
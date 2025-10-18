import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Definição dos tipos
type UserRole = 'ROLE_ATENDENTE' | 'ROLE_PACIENTE' | null;

interface Usuario {
    email: string;
    role: string;
}

interface AuthState {
    isAuthenticated: boolean;
    usuario: Usuario | null;
    token: string | null;
    role: UserRole; // Adicionado para manter a role no estado
    // menus: [] // Deixado comentado, como no original
}

// Função auxiliar para decodificar a role
// Mantenha essa função pura, sem dependências externas, para ser usada no reducer.
const decodeRoleFromEmail = (role: string): UserRole => {
    // A lógica de inclusão da palavra "atendente" é mantida
    if (role.includes('ROLE_ATENDENTE')) {
        return 'ROLE_ATENDENTE';
    }
    return 'ROLE_PACIENTE';
};

// Estado inicial
const initialState: AuthState = {
    isAuthenticated: false,
    usuario: null,
    token: null,
    role: null, // Inicialmente nulo
    // menus: []
};

// Criação do Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSucesso: (state, action: PayloadAction<{ usuario: Usuario, token: string }>) => {
            const { usuario, token } = action.payload;

            // 1. Atualiza as propriedades de autenticação
            state.isAuthenticated = true;
            state.token = token;
            state.usuario = usuario;

            // 2. Decodifica e armazena a role usando o email do usuário
            if (usuario.role) {
                state.role = decodeRoleFromEmail(usuario.role);
            } else {
                state.role = null;
            }
        },
        logout: (state) => {
            // Limpa todas as informações de autenticação
            state.isAuthenticated = false;
            state.token = null;
            state.usuario = null;
            state.role = null; // Limpa a role
            // state.menus = [];
        }
    }
});

// Exporta as actions e o reducer
export const { loginSucesso, logout } = authSlice.actions;
export default authSlice.reducer;
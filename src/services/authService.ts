import API from "./apiConfig";

 
export interface LoginRequestDto {
   email: string,
   senha: string
}
 
export interface LoginResponseDto {
   token: string, 
    role: string
}
 
export async function LoginNovo(loginRequestDto : LoginRequestDto) : Promise<LoginResponseDto>{
 const response = await API.post<LoginResponseDto>("auth/login", loginRequestDto);
   return response.data;
}
 
const login = async (loginRequestDto : LoginRequestDto): Promise<LoginResponseDto> =>{
    const response = await API.post<LoginResponseDto>("auth/login", loginRequestDto);
    return response.data;
}
 
const authService ={
    login
}
 
export default authService;
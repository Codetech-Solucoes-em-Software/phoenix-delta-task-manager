/* eslint-disable import/no-anonymous-default-export */
import api from './Api';
import { getAllUsers } from './UserService';
import { getUserByEmail, updateUser } from './UserService';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TOKEN_EXPIRATION_TIME = 60 * 60 * 1000;

interface AuthResponse {
  access_token: { access_token: string; user: any }; 
}


const generateToken = (email: string): string => {
  return `${email}-${Math.random().toString(36).substr(2, 9)}`;
};

const generateRefreshToken = (email: string): string => {
  return `${email}-refresh-${Math.random().toString(36).substr(2, 9)}`;
};

const authenticateUser = async (data: any): Promise<AuthResponse> => {
  try {
    const response: any = await api.post(`/login`, data);
    if (!response && !response.data) {
      console.error('Resposta inválida da API:', response);
    }
    return response.data;
  } catch (error: any) {
    console.error('Erro durante a autenticação:', error.message);
    return error;
  }
};

const validateToken = async (token: string): Promise<boolean> => {
  const users = await getAllUsers();
  return users.some((user) => user.token === token);
};

const refreshToken = async (refreshToken: string): Promise<string> => {
  const users = await getAllUsers();  
  const user = users.find((u) => u.refreshToken === refreshToken);

  if (!user || !user.email) {
    throw new Error('Não encontrou o usuário');
  }

  const newToken = generateToken(user.email);
  user.token = newToken;

  await updateUser(user);
  return newToken;
};

export {
  refreshToken,
  validateToken,
  authenticateUser,
  generateRefreshToken,
  generateToken
}

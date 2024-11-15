import { User } from "../context/AuthContext";

const TOKEN_EXPIRATION_TIME = 60 * 60 * 1000; // 1 hora em milissegundos

// Função para gerar um token (simples, para testes)
const generateToken = (email: string): string => {
  return `${email}-${Math.random().toString(36).substr(2, 9)}`;
};

const generateRefreshToken = (email: string): string => {
  return `${email}-refresh-${Math.random().toString(36).substr(2, 9)}`;
};

const authenticateUser = (email: string, password: string): User | null => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find((u: User) => u.email === email && u.password === password);
  
  if (!user) return null;

  // Gerar novos tokens
  const token = generateToken(email);
  const refreshToken = generateRefreshToken(email);

  // Atualizar o usuário com os novos tokens
  user.token = token;
  user.refreshToken = refreshToken;
  localStorage.setItem('users', JSON.stringify(users));
  
  return user;
};

// Função para validar o token
const validateToken = (token: string): boolean | string => {
  return token && token.includes('-');
};

// Função para renovar o token usando o refresh token
const refreshToken = (refreshToken: string): string | null => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find((u: User) => u.refreshToken === refreshToken);

  if (!user) return null;

  const newToken = generateToken(user.username);
  user.token = newToken;
  localStorage.setItem('users', JSON.stringify(users));

  return newToken;
};


export {
  generateRefreshToken,
  generateToken,
  authenticateUser,
  validateToken,
  refreshToken
};
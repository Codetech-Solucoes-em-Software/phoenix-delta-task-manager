/* eslint-disable import/no-anonymous-default-export */
import { User } from '../models/User';
import { getAllUsers } from './UserService';
import { getUserByEmail, updateUser } from './UserService';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TOKEN_EXPIRATION_TIME = 60 * 60 * 1000;

const generateToken = (email: string): string => {
  return `${email}-${Math.random().toString(36).substr(2, 9)}`;
};

const generateRefreshToken = (email: string): string => {
  return `${email}-refresh-${Math.random().toString(36).substr(2, 9)}`;
};

const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  if (!email) return null;
  const user = await getUserByEmail(email);

  if (!user || user.password !== password) return null;

  const token = generateToken(email);
  const refreshToken = generateRefreshToken(email);

  const updatedUser = { ...user, token, refreshToken };
  await updateUser(updatedUser);

  return updatedUser;
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

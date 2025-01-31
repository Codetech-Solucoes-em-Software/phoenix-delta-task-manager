import { User } from "../models/User";
import api from "./Api";

// Função para obter todos os usuários
const getAllUsers = async (): Promise<User[]> => {
  try {
    const url = '/users';
    const response: any = await api.get<User[]>(url);
    return response.data;    
  } catch (error: any) {
    throw new Error(error);
  }
};

// Função para obter um usuário pelo email
const getUserByEmail = async (email: string): Promise<User> => {
  if (!email) throw new Error('Usuário não existente');
  const response: any = await api.get<User>(`users/${email}`);
  const users = await response.data[0];
  return users;
};

const createUser = async (user: User) => {
  const response = await fetch("http://localhost:5000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const newUser = await response.json();
  return newUser;
};

// Função para atualizar um usuário existente
/*const updateUser = async (updatedUser: User): Promise<boolean> => {
  const response = await fetch(`${API_URL}/${updatedUser.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedUser),
  });

  return response.ok;
};

// Função para deletar um usuário
const deleteUser = async (userId: number): Promise<boolean> => {
  const response = await fetch(`${API_URL}/${userId}`, {
    method: 'DELETE',
  });

  return response.ok;
}; */

const userExists = async (email: string): Promise<boolean> => {
  const users = await getAllUsers();
  return users.some(user => user.email === email);
};

const getLoggedInUser = () => {};


export {
  getAllUsers,
  getUserByEmail,
  createUser,
  // updateUser,
  // deleteUser,
  getLoggedInUser,
  userExists
};

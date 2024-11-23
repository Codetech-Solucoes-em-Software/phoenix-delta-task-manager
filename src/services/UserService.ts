import { User } from "../models/User";

const API_URL = 'http://localhost:5000/users';

// Função para obter todos os usuários
const getAllUsers = async (): Promise<User[]> => {
  const response = await fetch(API_URL);
  return await response.json();
};

// Função para obter um usuário pelo email
const getUserByEmail = async (email: string): Promise<User> => {
  if (!email) throw new Error('Usuário não existente');
  const response = await fetch(`${API_URL}?email=${email}`);
  const users = await response.json();
  return users[0];
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
const updateUser = async (updatedUser: User): Promise<boolean> => {
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
};

const userExists = async (email: string): Promise<boolean> => {
  const users = await getAllUsers();
  return users.some(user => user.email === email);
};

const getLoggedInUser = () => {};


export {
  getAllUsers,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  getLoggedInUser,
  userExists
};

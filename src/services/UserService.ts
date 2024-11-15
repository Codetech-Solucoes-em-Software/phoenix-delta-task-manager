import { User } from "../context/AuthContext";

// Função para obter todos os usuários do localStorage
const getAllUsers = (): User[] => {
  return JSON.parse(localStorage.getItem('users') || '[]');
};

const getUserByEmail = (email: string): User | undefined => {
  const users = getAllUsers();
  return users.find(user => user.email === email);
};

// Função para salvar a lista de usuários no localStorage
const saveAllUsers = (users: User[]) => {
  localStorage.setItem('users', JSON.stringify(users));
};

// Função para criar um novo usuário
const createUser = (user: User): boolean => {
  const users = getAllUsers();
  if (users.some((u) => u.email === user.email)) {
    return false; // Usuário já existe
  }
  users.push(user);
  saveAllUsers(users);
  return true;
};

// Função para obter um usuário pelo nome
const getUser = (username: string): User | undefined => {
  const users = getAllUsers();
  return users.find((user) => user.email === username);
};

// Função para atualizar um usuário existente
const updateUser = (updatedUser: User): boolean => {
  const users = getAllUsers();
  const index = users.findIndex((u) => u.email === updatedUser.email);
  if (index === -1) return false;
  users[index] = updatedUser;
  saveAllUsers(users);
  return true;
};

// Função para deletar um usuário
const deleteUser = (username: string): boolean => {
  const users = getAllUsers();
  const updatedUsers = users.filter((user) => user.email !== username);
  if (updatedUsers.length === users.length) return false;
  saveAllUsers(updatedUsers);
  return true;
};

// Função para verificar se um usuário já existe
const userExists = (username: string): boolean => {
  return !!getUser(username);
};

const getLoggedInUser = (): User | null => {
  const userData = localStorage.getItem('loggedInUser');

  if (!userData) return null;

  try {
    return JSON.parse(userData);
  } catch (error) {
    console.error('Erro ao parsear o usuário logado:', error);
    return null;
  }
};

export {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  userExists,
  saveAllUsers,
  getUserByEmail,
  getLoggedInUser
}
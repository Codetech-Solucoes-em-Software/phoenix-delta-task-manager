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

const createUser = async (userData: 
  {
    cim: string;
    lodge_id: number;
    name: string;
    email: string;
    password: string;
    degree: string;
    role: string;
  }) => {
  try {
    const response: any = await api.post('/users', userData);
    return response.data;
  } catch (error: any) {
    throw new Error('Ocorreu um erro ao registrar o usuário', error);
  }
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

const updateRequirementStatus = async (userRequirementId: number) => {
  try {
    const response = await api.put(`/userRequirements/${userRequirementId}/finished_date`, {
      finished_date: new Date().toISOString(),
      status: "ENTREGUE",
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar status do requisito:", error);
    throw error;
  }
};

const changePassword = async (userId: number, currentPassword: string, newPassword: string) => {
  try {
    const storedData = localStorage.getItem("user");
    console.log(storedData);
    const parsedData = storedData ? JSON.parse(storedData) : null;
    console.log(parsedData);
    const token = parsedData?.token;
    console.log(token);
    if (!token) { 
      console.error("Erro: não foi possível pegar o token"); 
      return;
    } 
    const response = await api.put(`/change-password/${userId}`, {
      currentPassword,
      newPassword,
    }, {
      headers: {
        authorization: token,
        "Content-Type": "application/json"
      }
    });
    console.log('Retorno da API: ' + response);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Erro ao alterar senha";
  }
};


export {
  getAllUsers,
  getUserByEmail,
  createUser,
  // updateUser,
  // deleteUser,
  getLoggedInUser,
  userExists,
  updateRequirementStatus,
  changePassword
};

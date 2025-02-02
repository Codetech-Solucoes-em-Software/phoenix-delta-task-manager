import api from "./Api";

export interface Reading {
  id: number;
  userId: number;
  name: string;
  expected_date: string;
  finished_date?: string;
  approved_date?: string;
  status: string;
}


const getReadings = async (role: string, userId: number): Promise<Reading[]> => {
  try {
    const url = role === 'ADMIN' ? '/readings' : `/readings /${userId}`
    const response = await api.get<Reading[]>(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar instruções:", error);
    return [];
  }
};

export {
  getReadings
}
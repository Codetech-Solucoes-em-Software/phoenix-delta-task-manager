import api from "./Api";

export interface Visitation {
  id: number;
  userId: number;
  name: string;
  expected_date: string;
  finished_date?: string;
  approved_date?: string;
  status: string;
}


const getVisitations = async (role: string, userId: number): Promise<Visitation[]> => {
  try {
    const url = role === 'ADMIN' ? '/visitations' : `/visitations/${userId}`
    const response = await api.get<Visitation[]>(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar instruções:", error);
    return [];
  }
};

export {
  getVisitations
}
import api from "./Api";

export interface CompletionWork {
  id: number;
  userId: number;
  name: string;
  expected_date: string;
  finished_date?: string;
  approved_date?: string;
  status: string;
}


const getCompletionWorks = async (role: string, userId: number): Promise<CompletionWork[]> => {
  try {
    const url = role === 'ADMIN' ? '/completionWorks' : `/completionWorks/${userId}`
    const response = await api.get<CompletionWork[]>(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar instruções:", error);
    return [];
  }
};

export {
  getCompletionWorks
}
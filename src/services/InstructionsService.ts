import api from "./Api";

export interface Instruction {
  id: number;
  userId: number;
  name: string;
  expected_date: string;
  finished_date: string;
  approved_date: string;
  status: string;
}

export interface CreateInstructionDTO {
  userId: number;
  name: string;
  expected_date: string;
  status?: string;
}

const getInstructions = async (role: string, userId: number): Promise<Instruction[]> => {
  try {
    const url = role === 'ADMIN' ? '/classicalLessons' : `/classicalLessons/${userId}`
    const response = await api.get<Instruction[]>(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar instruções:", error);
    return [];
  }
};

const createInstruction = async (data: CreateInstructionDTO) => {
  try {
    const response = await api.post("/classicalLessons", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar a instrução:", error);
    throw error;
  }
}

export {
  getInstructions,
  createInstruction
};

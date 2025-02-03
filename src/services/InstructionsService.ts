import api from "./Api";

export interface Instruction {
  id: number;
  userId: number;
  name: string;
  expected_date: string;
  finished_date?: string;
  approved_date?: string;
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

const getInstructionById = async (id: number): Promise<Instruction> => {
  try {
    const response: any = await api.get<Instruction>(`/classicalLessons/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error('Ocorreu um erro ao buscar a instrução', error);
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

const updateInstruction = async (id: number, instruction: Instruction) => {
  try {
     const update = await api.put(`/classicalLessons/${id}`, instruction);
     return update;
  } catch (error: any) {
    throw new Error('Ocorreu um erro ao modificar a instrução', error);
  }
};

const deleteInstruction = async (id: number): Promise<boolean> => {
  try {
    await api.delete(`/classicalLessons/${id}`);
    return true;
  } catch (error: any) {
    console.error('Ocorreu um erro ao excluir a instrução: ', error);
    return false;
  }
};

export {
  getInstructions,
  createInstruction,
  updateInstruction,
  getInstructionById,
  deleteInstruction
};

import api from "./Api"

const getRequirements = async (lodge_id: number, filter: string) => {
  try {
    const response = await api.get(`/lodges/requirements/${lodge_id}`, {
      params: {
        order: filter 
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Não foi possível listar os requisitos da loja' + error);
  }
}

export {
  getRequirements
}
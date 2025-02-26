import api from "./Api"

const getRequirements = async (lodge_id: number) => {
  try {
    const response = await api.get(`/lodges/requirements/${lodge_id}`);
    return response.data;
  } catch (error) {
    throw new Error('Não foi possível listar os requisitos da loja' + error);
  }
}

export {
  getRequirements
}
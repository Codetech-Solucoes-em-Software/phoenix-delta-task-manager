import api from "./Api";

const uploadFile = async (file: File, userId: number) => {
  const formData = new FormData();
  formData.append('file', file);  // Adiciona o arquivo ao FormData

  try {
    const response = await api.post(`/upload/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Especificando o tipo de conteúdo
      },
    });
    return response.data; // Retorna os dados da resposta, caso necessário
  } catch (error) {
    console.error('Erro ao enviar o arquivo:', error);
    throw error; // Propaga o erro caso ocorra
  }
};

const downloadVoucher = async (requirementId: number) => {}

export {
  uploadFile,
  downloadVoucher
};
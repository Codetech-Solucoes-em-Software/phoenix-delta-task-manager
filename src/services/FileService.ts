import api from "./Api";

const uploadFile = async (file: FormData, userId: number) => {
  try {
    const response = await api.post(`/api/upload/${userId}`, {
      body: file,
    });

    if (!response) {
      throw new Error("Erro ao enviar arquivo");
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const downloadVoucher = async (requirementId: number) => {}

export {
  uploadFile,
  downloadVoucher
};
import api from "./Api";

const uploadFile = async (formData: FormData, userRequirementId: number) => {
  try {
    const response = await api.post(`/vouchers/upload/${userRequirementId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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

const downloadVoucher = async (requirementId: number) => {
  try {
    const response = await api.get(`/vouchers/download/${requirementId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      "Ocorreu um erro ao selecionar o arquivo para download: " + error
    );
  }
};

export { uploadFile, downloadVoucher };

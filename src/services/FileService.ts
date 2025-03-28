import api from "./Api";

const uploadFile = async (formData: FormData, userRequirementId: number) => {
  try {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) throw new Error("Usuário não encontrado no localStorage.");

    const user = JSON.parse(storedUser);
    const token = user.token;

    if (!token) throw new Error("Token não fornecido.");
    const response = await api.post(`/vouchers/upload/${userRequirementId}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
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

const downloadVoucher = async (voucherId: number) => {
  try {
    const response: any = await api.get(`/vouchers/download/${voucherId}`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `comprovante-${voucherId}.pdf`); // Ajuste a extensão conforme necessário
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Erro ao baixar comprovante:", error);
    throw error;
  }
};

export { uploadFile, downloadVoucher };

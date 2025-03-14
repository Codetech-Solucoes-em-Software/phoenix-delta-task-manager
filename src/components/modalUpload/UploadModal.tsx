import { useState } from "react";
import Modal from "react-modal";
import { uploadFile } from "../../services/FileService";
import { useAuth } from "../../context/AuthContext";
import { styles } from "./styles";
import { updateRequirementStatus } from "../../services/UserService";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  requirementId: number;
}

const UploadModal = ({ isOpen, onClose, requirementId }: UploadModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile) {
      const allowedTypes = ["image/png", "application/pdf"];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Apenas arquivos .png ou .pdf são permitidos.");
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!user) return;
    if (!file) {
      setError("Selecione um arquivo para enviar.");
      return;
    }
  
    // 📌 Verificar tipo e tamanho do arquivo
    const allowedTypes = ["image/png", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      setError("Apenas arquivos .png ou .pdf são permitidos.");
      return;
    }
  
    const maxSize = file.type === "image/png" ? 1.5 * 1024 * 1024 : 3 * 1024 * 1024; // 1.5MB para PNG, 3MB para PDF
    if (file.size > maxSize) {
      setError(`O arquivo é muito grande! Máximo permitido: ${file.type === "image/png" ? "1.5MB" : "3MB"}.`);
      return;
    }
  
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("requirementId", String(requirementId));
  
      await uploadFile(formData, requirementId, user.id);
      await updateRequirementStatus(requirementId);
      alert("Arquivo enviado com sucesso!");
      onClose();
    } catch (err) {
      console.error("Erro ao enviar arquivo:", err);
      setError("Erro ao enviar arquivo. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Upload de Comprovante" style={{
      overlay: styles.overlay,
      content: styles.modal
    }}>
      <div style={styles.container}>
        <h2>Enviar Comprovante</h2>
        <input type="file" accept=".png, .pdf" onChange={handleFileChange} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div style={styles.buttonContainer}>
          <button onClick={handleUpload} disabled={loading} style={styles.buttonDownload}>
            {loading ? "Enviando..." : "Enviar"}
          </button>
          <button onClick={onClose} disabled={loading} style={styles.buttonExit}>
            Fechar
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default UploadModal;
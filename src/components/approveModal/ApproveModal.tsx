/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { modalStyles } from "./styles";
import { approveRequirement } from "../../services/InstructionsService";

interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  requirementId: number;
  userId: number;
}

const ApproveModal: React.FC<ApproveModalProps> = ({ isOpen, onClose, onApprove, requirementId, userId }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [approving, setApproving] = useState(false);

  if (!isOpen) return null;

  const handleApprove = async () => {
    if (!requirementId || !userId) return;
    console.log('ID do requisito: ' + requirementId);
    console.log('ID do usuário: ' + userId);
  
    setApproving(true); // Exibe o loading no botão
  
    try {
      console.log('Faz a chamada para o serviço...');
      await approveRequirement(requirementId, userId);
      alert("Requisito aprovado com sucesso!");
      console.log('Requisito aprovado');
  
      // Chama a função de atualização passada pelo pai
      if (onApprove) {
        await onApprove();
      }
  
      onClose(); // Fecha o modal após o sucesso
    } catch (error) {
      console.error("Erro ao aprovar requisito:", error);
      alert("Ocorreu um erro ao aprovar o requisito. Tente novamente.");
    } finally {
      setApproving(false); // Finaliza o loading
    }
  };


  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h3>Deseja aprovar este requisito?</h3>
        {message ? (
          <p>{message}</p> // Exibe a mensagem de sucesso ou erro
        ) : (
          <div style={modalStyles.buttons}>
            <button style={modalStyles.cancelButton} onClick={onClose} disabled={loading}>
              Não
            </button>
            <button style={modalStyles.approveButton} onClick={handleApprove} disabled={loading}>
              {loading ? "Aprovando..." : "Sim"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApproveModal;

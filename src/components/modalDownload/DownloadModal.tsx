import React, { useState } from 'react'
import { styles } from './styles';
import { downloadVoucher } from '../../services/FileService';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  requirementId: number;
}

const DownloadModal = ({ isOpen, onClose, requirementId }: DownloadModalProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadVoucher(requirementId);
    } catch (error) {
      console.error("Erro ao baixar comprovante:", error);
    } finally {
      setIsDownloading(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Download do Comprovante</h2>
        <p>Deseja baixar o comprovante deste requisito?</p>
        <div style={styles.buttonContainer}>
          <button style={styles.cancelButton} onClick={onClose} disabled={isDownloading}>
            Cancelar
          </button>
          <button style={{
            ...styles.downloadButton,
            backgroundColor: isHovered ? 'blue' : '#007bff'
          }} onClick={handleDownload} 
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}
              disabled={isDownloading}>
            {isDownloading ? "Baixando..." : "Baixar Comprovante"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DownloadModal